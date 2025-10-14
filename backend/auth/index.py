import json
import os
from typing import Dict, Any
import psycopg2

def get_password_from_db(conn) -> str:
    cursor = conn.cursor()
    cursor.execute("SELECT setting_value FROM admin_settings WHERE setting_key = 'admin_password'")
    result = cursor.fetchone()
    cursor.close()
    
    if result:
        password_data = result[0]
        start = password_data.find('Z')
        end = password_data.rfind('Z')
        if start != -1 and end != -1 and start < end:
            return password_data[start+1:end]
    return ""

def set_password_in_db(conn, new_password: str):
    cursor = conn.cursor()
    cursor.execute("SELECT setting_value FROM admin_settings WHERE setting_key = 'admin_password'")
    result = cursor.fetchone()
    
    if result:
        old_data = result[0]
        start = old_data.find('Z')
        end = old_data.rfind('Z')
        if start != -1 and end != -1 and start < end:
            new_data = old_data[:start+1] + new_password + old_data[end:]
            cursor.execute(
                "UPDATE admin_settings SET setting_value = %s, updated_at = CURRENT_TIMESTAMP WHERE setting_key = 'admin_password'",
                (new_data,)
            )
            conn.commit()
    cursor.close()

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Авторизация с паролем в базе данных
    Args: event - dict с httpMethod, body
          context - объект с request_id, function_name
    Returns: HTTP response dict с результатом авторизации
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    if not database_url:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Database not configured'}),
            'isBase64Encoded': False
        }
    
    conn = psycopg2.connect(database_url)
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        action = body_data.get('action', 'login')
        password = body_data.get('password', '')
        
        correct_password = get_password_from_db(conn)
        
        if action == 'login':
            if password == correct_password:
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'token': 'admin_authenticated',
                        'admin': {'username': 'admin'}
                    }),
                    'isBase64Encoded': False
                }
            else:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный пароль'}),
                    'isBase64Encoded': False
                }
        
        elif action == 'change_password':
            old_password = body_data.get('old_password', '')
            new_password = body_data.get('new_password', '')
            
            if old_password != correct_password:
                return {
                    'statusCode': 401,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Неверный текущий пароль'}),
                    'isBase64Encoded': False
                }
            
            set_password_in_db(conn, new_password)
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({
                    'success': True, 
                    'message': 'Пароль успешно изменен'
                }),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid action'}),
            'isBase64Encoded': False
        }
    finally:
        conn.close()
