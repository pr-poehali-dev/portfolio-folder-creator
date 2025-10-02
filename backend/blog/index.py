import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления блогом (CRUD операции с постами)
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с request_id
    Returns: HTTP response dict с данными постов или результатом операции
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    database_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(database_url)
    
    try:
        if method == 'GET':
            query_params = event.get('queryStringParameters', {})
            post_id = query_params.get('id')
            slug = query_params.get('slug')
            
            cursor = conn.cursor(cursor_factory=RealDictCursor)
            
            if post_id:
                cursor.execute(
                    "SELECT * FROM t_p51155524_portfolio_folder_cre.blog_posts WHERE id = %s",
                    (post_id,)
                )
                post = cursor.fetchone()
                cursor.close()
                
                if not post:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Post not found'}),
                        'isBase64Encoded': False
                    }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(post), default=str),
                    'isBase64Encoded': False
                }
            
            if slug:
                cursor.execute(
                    "SELECT * FROM t_p51155524_portfolio_folder_cre.blog_posts WHERE slug = %s",
                    (slug,)
                )
                post = cursor.fetchone()
                cursor.close()
                
                if not post:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Post not found'}),
                        'isBase64Encoded': False
                    }
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(dict(post), default=str),
                    'isBase64Encoded': False
                }
            
            cursor.execute(
                "SELECT id, title, slug, excerpt, category, image, read_time, created_at FROM t_p51155524_portfolio_folder_cre.blog_posts ORDER BY created_at DESC"
            )
            posts = cursor.fetchall()
            cursor.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(p) for p in posts], default=str),
                'isBase64Encoded': False
            }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            cursor = conn.cursor()
            cursor.execute(
                """
                INSERT INTO t_p51155524_portfolio_folder_cre.blog_posts 
                (title, slug, excerpt, content, category, image, read_time)
                VALUES (%s, %s, %s, %s, %s, %s, %s)
                RETURNING id
                """,
                (
                    body_data.get('title'),
                    body_data.get('slug'),
                    body_data.get('excerpt'),
                    body_data.get('content'),
                    body_data.get('category'),
                    body_data.get('image'),
                    body_data.get('read_time', '5 мин')
                )
            )
            post_id = cursor.fetchone()[0]
            conn.commit()
            cursor.close()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'id': post_id}),
                'isBase64Encoded': False
            }
        
        if method == 'PUT':
            query_params = event.get('queryStringParameters', {})
            post_id = query_params.get('id')
            
            if not post_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Post ID required'}),
                    'isBase64Encoded': False
                }
            
            body_data = json.loads(event.get('body', '{}'))
            
            cursor = conn.cursor()
            cursor.execute(
                """
                UPDATE t_p51155524_portfolio_folder_cre.blog_posts 
                SET title = %s, slug = %s, excerpt = %s, content = %s, 
                    category = %s, image = %s, read_time = %s, updated_at = CURRENT_TIMESTAMP
                WHERE id = %s
                """,
                (
                    body_data.get('title'),
                    body_data.get('slug'),
                    body_data.get('excerpt'),
                    body_data.get('content'),
                    body_data.get('category'),
                    body_data.get('image'),
                    body_data.get('read_time', '5 мин'),
                    post_id
                )
            )
            conn.commit()
            cursor.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        if method == 'DELETE':
            query_params = event.get('queryStringParameters', {})
            post_id = query_params.get('id')
            
            if not post_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Post ID required'}),
                    'isBase64Encoded': False
                }
            
            cursor = conn.cursor()
            cursor.execute(
                "DELETE FROM t_p51155524_portfolio_folder_cre.blog_posts WHERE id = %s",
                (post_id,)
            )
            conn.commit()
            cursor.close()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'success': True}),
                'isBase64Encoded': False
            }
        
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    finally:
        conn.close()
