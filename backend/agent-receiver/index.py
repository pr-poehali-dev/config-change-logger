import json
from typing import Dict, Any
from datetime import datetime

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    """
    Принимает данные от агентов мониторинга Windows
    Сохраняет метрики системы и изменения конфигураций
    """
    method: str = event.get('httpMethod', 'POST')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Agent-Id',
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
    
    try:
        body_data = json.loads(event.get('body', '{}'))
        
        system_info = body_data.get('system', {})
        changes = body_data.get('changes', [])
        timestamp = body_data.get('timestamp', datetime.now().isoformat())
        
        hostname = system_info.get('hostname', 'unknown')
        ip_address = system_info.get('ip', 'unknown')
        
        response_data = {
            'status': 'received',
            'agent': {
                'hostname': hostname,
                'ip': ip_address
            },
            'metrics': {
                'cpu': system_info.get('cpu', 0),
                'memory': system_info.get('memory', 0),
                'disk': system_info.get('disk', 0)
            },
            'changes_count': len(changes),
            'timestamp': timestamp,
            'message': f'Data from {hostname} ({ip_address}) received successfully'
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(response_data),
            'isBase64Encoded': False
        }
        
    except json.JSONDecodeError:
        return {
            'statusCode': 400,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({'error': 'Invalid JSON format'}),
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
