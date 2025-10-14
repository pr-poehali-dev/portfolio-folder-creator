import json
import os
import re
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Простая авторизация через файл с паролем
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
    
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action', 'login')
    password = body_data.get('password', '')
    
    password_file = os.path.join(os.path.dirname(__file__), '.adminpass')
    
    try:
        with open(password_file, 'r') as f:
            file_content = f.read().strip()
    except FileNotFoundError:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Configuration error'}),
            'isBase64Encoded': False
        }
    
    match = re.search(r'Z(.*?)Z', file_content)
    if not match:
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Configuration error'}),
            'isBase64Encoded': False
        }
    
    correct_password = match.group(1)
    
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
        
        new_content = file_content.replace(f'Z{correct_password}Z', f'Z{new_password}Z')
        
        with open(password_file, 'w') as f:
            f.write(new_content)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'success': True, 'message': 'Пароль успешно изменен'}),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 400,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Invalid action'}),
        'isBase64Encoded': False
    }
