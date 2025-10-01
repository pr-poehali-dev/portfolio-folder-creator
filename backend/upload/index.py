import json
import base64
import os
import time
from typing import Dict, Any
from urllib import request as urllib_request

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Upload images to CDN and return URL
    Args: event - dict with httpMethod, body (base64 image)
    Returns: HTTP response dict with CDN URL
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Method not allowed'}),
            'isBase64Encoded': False
        }
    
    body_str = event.get('body', '{}')
    if not body_str:
        body_str = '{}'
    body_data = json.loads(body_str)
    image_data = body_data.get('image', '')
    
    if not image_data:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Image data required'}),
            'isBase64Encoded': False
        }
    
    if image_data.startswith('data:image'):
        image_data = image_data.split(',')[1]
    
    image_bytes = base64.b64decode(image_data)
    filename = body_data.get('filename', f'{int(time.time() * 1000)}.jpg')
    
    boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
    body_parts = []
    body_parts.append(f'--{boundary}'.encode())
    body_parts.append(f'Content-Disposition: form-data; name="file"; filename="{filename}"'.encode())
    body_parts.append(b'Content-Type: image/jpeg')
    body_parts.append(b'')
    body_parts.append(image_bytes)
    body_parts.append(f'--{boundary}--'.encode())
    
    multipart_body = b'\r\n'.join(body_parts)
    
    req = urllib_request.Request(
        'https://cdn.poehali.dev/upload',
        data=multipart_body,
        headers={
            'Content-Type': f'multipart/form-data; boundary={boundary}'
        },
        method='POST'
    )
    
    try:
        with urllib_request.urlopen(req) as response:
            result = json.loads(response.read())
            return {
                'statusCode': 200,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'body': json.dumps({'url': result.get('url')}),
                'isBase64Encoded': False
            }
    except Exception as e:
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': str(e)}),
            'isBase64Encoded': False
        }