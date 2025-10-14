import json
from typing import Dict, Any

# ====================================
# НАСТРОЙКА ПАРОЛЯ
# Пароль находится между символами Z
# Чтобы изменить пароль, замените текст между Z на новый пароль
# Пример: ...Zмой_новый_парольZ...
# ====================================
PASSWORD_DATA = "K7#mP9$vL2@qX5!nR8&wY4^tZoscar507@12Z1%jH6*bF3(eU0)iO9+gA4-dS7_cV2=xN5?kM8`lD6~pQ1{hJ3}yB0|zE9:rT4;uC7"

def get_password() -> str:
    start = PASSWORD_DATA.find('Z')
    end = PASSWORD_DATA.rfind('Z')
    if start != -1 and end != -1 and start < end:
        return PASSWORD_DATA[start+1:end]
    return ""

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Простая авторизация с паролем в коде
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
    
    correct_password = get_password()
    
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
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({
                'success': True, 
                'message': 'Для смены пароля отредактируйте файл backend/auth/index.py (строка 11) и измените текст между символами Z'
            }),
            'isBase64Encoded': False
        }
    
    return {
        'statusCode': 400,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Invalid action'}),
        'isBase64Encoded': False
    }