import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления ценами калькулятора
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id
    Returns: HTTP response dict с ценами или результатом обновления
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
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
    
    conn = psycopg2.connect(database_url)
    
    try:
        if method == 'GET':
            return get_all_prices(conn)
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            return update_prices(body_data, conn)
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    finally:
        conn.close()


def get_all_prices(conn) -> Dict[str, Any]:
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    cursor.execute('SELECT * FROM calculator_prices ORDER BY product_type, material')
    calculator_prices = cursor.fetchall()
    
    cursor.execute('SELECT * FROM branding_prices ORDER BY price')
    branding_prices = cursor.fetchall()
    
    cursor.execute('SELECT * FROM logo_size_prices ORDER BY price')
    logo_prices = cursor.fetchall()
    
    cursor.close()
    
    result = {
        'calculator_prices': [dict(row) for row in calculator_prices],
        'branding_prices': [dict(row) for row in branding_prices],
        'logo_size_prices': [dict(row) for row in logo_prices]
    }
    
    for item in result['calculator_prices']:
        if item.get('created_at'):
            item['created_at'] = item['created_at'].isoformat()
        if item.get('updated_at'):
            item['updated_at'] = item['updated_at'].isoformat()
    
    for item in result['branding_prices']:
        if item.get('created_at'):
            item['created_at'] = item['created_at'].isoformat()
        if item.get('updated_at'):
            item['updated_at'] = item['updated_at'].isoformat()
    
    for item in result['logo_size_prices']:
        if item.get('created_at'):
            item['created_at'] = item['created_at'].isoformat()
        if item.get('updated_at'):
            item['updated_at'] = item['updated_at'].isoformat()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(result),
        'isBase64Encoded': False
    }


def update_prices(body_data: Dict[str, Any], conn) -> Dict[str, Any]:
    price_type = body_data.get('type')
    
    cursor = conn.cursor()
    
    if price_type == 'calculator':
        product_type = body_data.get('product_type')
        material = body_data.get('material')
        base_price = body_data.get('base_price')
        a4_modifier = body_data.get('a4_modifier', 0)
        a5_modifier = body_data.get('a5_modifier', 0)
        
        cursor.execute('''
            UPDATE calculator_prices 
            SET base_price = %s, a4_modifier = %s, a5_modifier = %s, updated_at = CURRENT_TIMESTAMP
            WHERE product_type = %s AND material = %s
        ''', (base_price, a4_modifier, a5_modifier, product_type, material))
        
    elif price_type == 'branding':
        branding_type = body_data.get('branding_type')
        price = body_data.get('price')
        
        cursor.execute('''
            UPDATE branding_prices 
            SET price = %s, updated_at = CURRENT_TIMESTAMP
            WHERE branding_type = %s
        ''', (price, branding_type))
        
    elif price_type == 'logo':
        size_type = body_data.get('size_type')
        price = body_data.get('price')
        
        cursor.execute('''
            UPDATE logo_size_prices 
            SET price = %s, updated_at = CURRENT_TIMESTAMP
            WHERE size_type = %s
        ''', (price, size_type))
    else:
        cursor.close()
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Invalid price type'}),
            'isBase64Encoded': False
        }
    
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'message': 'Price updated successfully'}),
        'isBase64Encoded': False
    }
