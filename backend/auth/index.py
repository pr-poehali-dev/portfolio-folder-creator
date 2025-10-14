import json
import os
import hashlib
import secrets
from typing import Dict, Any
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для авторизации администраторов
    Args: event - dict с httpMethod, body
          context - объект с request_id, function_name
    Returns: HTTP response dict с токеном или ошибкой
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
            'body': json.dumps({'error': 'DATABASE_URL not configured'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    action = body_data.get('action', 'login')
    
    conn = psycopg2.connect(database_url)
    
    try:
        if action == 'register':
            return handle_register(body_data, conn)
        elif action == 'login':
            return handle_login(body_data, conn)
        elif action == 'change_password':
            return handle_change_password(body_data, conn)
        else:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Invalid action'}),
                'isBase64Encoded': False
            }
    finally:
        conn.close()


def hash_password(password: str) -> str:
    return hashlib.sha256(password.encode()).hexdigest()


def generate_token() -> str:
    return secrets.token_urlsafe(32)


def handle_register(body_data: Dict[str, Any], conn) -> Dict[str, Any]:
    username = body_data.get('username')
    password = body_data.get('password')
    
    if not username or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Username and password required'}),
            'isBase64Encoded': False
        }
    
    password_hash = hash_password(password)
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute('SELECT id FROM admins WHERE username = %s', (username,))
    existing = cursor.fetchone()
    
    if existing:
        cursor.close()
        return {
            'statusCode': 409,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Username already exists'}),
            'isBase64Encoded': False
        }
    
    cursor.execute('''
        INSERT INTO admins (username, password_hash)
        VALUES (%s, %s)
        RETURNING id, username, created_at
    ''', (username, password_hash))
    
    new_admin = cursor.fetchone()
    conn.commit()
    cursor.close()
    
    token = generate_token()
    
    admin_dict = dict(new_admin)
    admin_dict['created_at'] = admin_dict['created_at'].isoformat() if admin_dict.get('created_at') else None
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'token': token,
            'admin': admin_dict
        }),
        'isBase64Encoded': False
    }


def handle_login(body_data: Dict[str, Any], conn) -> Dict[str, Any]:
    username = body_data.get('username')
    password = body_data.get('password')
    
    print(f"LOGIN ATTEMPT: username={username}, password_length={len(password) if password else 0}")
    
    if not username or not password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Username and password required'}),
            'isBase64Encoded': False
        }
    
    password_hash = hash_password(password)
    print(f"COMPUTED HASH: {password_hash}")
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute('''
        SELECT id, username, password_hash, created_at 
        FROM admins 
        WHERE username = %s
    ''', (username,))
    
    admin = cursor.fetchone()
    
    if admin:
        print(f"DB HASH: {admin['password_hash']}")
        print(f"MATCH: {admin['password_hash'] == password_hash}")
    else:
        print(f"USER NOT FOUND: {username}")
    
    cursor.close()
    
    if not admin or admin['password_hash'] != password_hash:
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid credentials'}),
            'isBase64Encoded': False
        }
    
    token = generate_token()
    
    admin_dict = dict(admin)
    admin_dict['created_at'] = admin_dict['created_at'].isoformat() if admin_dict.get('created_at') else None
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({
            'success': True,
            'token': token,
            'admin': admin_dict
        }),
        'isBase64Encoded': False
    }


def handle_change_password(body_data: Dict[str, Any], conn) -> Dict[str, Any]:
    username = body_data.get('username')
    old_password = body_data.get('old_password')
    new_password = body_data.get('new_password')
    
    print(f"DEBUG: username={username}, has_old_pwd={bool(old_password)}, has_new_pwd={bool(new_password)}")
    
    if not username or not old_password or not new_password:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Username, old password and new password required'}),
            'isBase64Encoded': False
        }
    
    old_password_hash = hash_password(old_password)
    print(f"DEBUG: old_password_hash={old_password_hash[:20]}...")
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute('''
        SELECT id, password_hash FROM admins 
        WHERE username = %s
    ''', (username,))
    
    admin = cursor.fetchone()
    
    if not admin:
        cursor.close()
        print(f"DEBUG: User {username} not found")
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid credentials'}),
            'isBase64Encoded': False
        }
    
    print(f"DEBUG: DB hash={admin['password_hash'][:20]}..., provided hash={old_password_hash[:20]}...")
    
    if admin['password_hash'] != old_password_hash:
        cursor.close()
        print(f"DEBUG: Password mismatch for user {username}")
        return {
            'statusCode': 401,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid credentials'}),
            'isBase64Encoded': False
        }
    
    new_password_hash = hash_password(new_password)
    
    cursor.execute('''
        UPDATE admins 
        SET password_hash = %s
        WHERE username = %s
    ''', (new_password_hash, username))
    
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'message': 'Password changed successfully'}),
        'isBase64Encoded': False
    }