import json
import os
from typing import Dict, Any, List, Optional
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления товарами (CRUD операции)
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
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
            return handle_get(event, conn)
        elif method == 'POST':
            return handle_post(event, conn)
        elif method == 'PUT':
            return handle_put(event, conn)
        elif method == 'DELETE':
            return handle_delete(event, conn)
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    finally:
        conn.close()


def handle_get(event: Dict[str, Any], conn) -> Dict[str, Any]:
    params = event.get('queryStringParameters') or {}
    product_id = params.get('id')
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    
    if product_id:
        cursor.execute('SELECT * FROM products WHERE id = %s', (product_id,))
        product = cursor.fetchone()
        cursor.close()
        
        if not product:
            return {
                'statusCode': 404,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Product not found'}),
                'isBase64Encoded': False
            }
        
        product_dict = dict(product)
        product_dict['created_at'] = product_dict['created_at'].isoformat() if product_dict.get('created_at') else None
        product_dict['updated_at'] = product_dict['updated_at'].isoformat() if product_dict.get('updated_at') else None
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(product_dict),
            'isBase64Encoded': False
        }
    else:
        cursor.execute('SELECT * FROM products ORDER BY created_at DESC')
        products = cursor.fetchall()
        cursor.close()
        
        products_list = []
        for p in products:
            product_dict = dict(p)
            product_dict['created_at'] = product_dict['created_at'].isoformat() if product_dict.get('created_at') else None
            product_dict['updated_at'] = product_dict['updated_at'].isoformat() if product_dict.get('updated_at') else None
            products_list.append(product_dict)
        
        return {
            'statusCode': 200,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps(products_list),
            'isBase64Encoded': False
        }


def handle_post(event: Dict[str, Any], conn) -> Dict[str, Any]:
    body_data = json.loads(event.get('body', '{}'))
    
    required_fields = ['title', 'category', 'price', 'image', 'description']
    for field in required_fields:
        if field not in body_data:
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': f'Missing required field: {field}'}),
                'isBase64Encoded': False
            }
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute('''
        INSERT INTO products (title, category, price, image, description, features, materials, sizes)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
        RETURNING *
    ''', (
        body_data['title'],
        body_data['category'],
        body_data['price'],
        body_data['image'],
        body_data['description'],
        body_data.get('features', []),
        body_data.get('materials', []),
        body_data.get('sizes', [])
    ))
    
    new_product = cursor.fetchone()
    conn.commit()
    cursor.close()
    
    product_dict = dict(new_product)
    product_dict['created_at'] = product_dict['created_at'].isoformat() if product_dict.get('created_at') else None
    product_dict['updated_at'] = product_dict['updated_at'].isoformat() if product_dict.get('updated_at') else None
    
    return {
        'statusCode': 201,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(product_dict),
        'isBase64Encoded': False
    }


def handle_put(event: Dict[str, Any], conn) -> Dict[str, Any]:
    params = event.get('queryStringParameters') or {}
    product_id = params.get('id')
    
    if not product_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Product ID required'}),
            'isBase64Encoded': False
        }
    
    body_data = json.loads(event.get('body', '{}'))
    
    cursor = conn.cursor(cursor_factory=RealDictCursor)
    cursor.execute('''
        UPDATE products 
        SET title = %s, category = %s, price = %s, image = %s, 
            description = %s, features = %s, materials = %s, sizes = %s,
            updated_at = CURRENT_TIMESTAMP
        WHERE id = %s
        RETURNING *
    ''', (
        body_data.get('title'),
        body_data.get('category'),
        body_data.get('price'),
        body_data.get('image'),
        body_data.get('description'),
        body_data.get('features', []),
        body_data.get('materials', []),
        body_data.get('sizes', []),
        product_id
    ))
    
    updated_product = cursor.fetchone()
    
    if not updated_product:
        cursor.close()
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Product not found'}),
            'isBase64Encoded': False
        }
    
    conn.commit()
    cursor.close()
    
    product_dict = dict(updated_product)
    product_dict['created_at'] = product_dict['created_at'].isoformat() if product_dict.get('created_at') else None
    product_dict['updated_at'] = product_dict['updated_at'].isoformat() if product_dict.get('updated_at') else None
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps(product_dict),
        'isBase64Encoded': False
    }


def handle_delete(event: Dict[str, Any], conn) -> Dict[str, Any]:
    params = event.get('queryStringParameters') or {}
    product_id = params.get('id')
    
    if not product_id:
        return {
            'statusCode': 400,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Product ID required'}),
            'isBase64Encoded': False
        }
    
    cursor = conn.cursor()
    cursor.execute('DELETE FROM products WHERE id = %s RETURNING id', (product_id,))
    deleted = cursor.fetchone()
    
    if not deleted:
        cursor.close()
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Product not found'}),
            'isBase64Encoded': False
        }
    
    conn.commit()
    cursor.close()
    
    return {
        'statusCode': 200,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'success': True, 'id': deleted[0]}),
        'isBase64Encoded': False
    }