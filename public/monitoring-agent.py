# Configuration Monitoring Agent v1.0.0
# Windows Monitoring Agent for Configuration Changes
# 
# Installation:
# 1. Install Python 3.8+ from https://www.python.org/downloads/
# 2. Open Command Prompt as Administrator
# 3. Install dependencies: python -m pip install requests psutil
# 4. Run: python monitoring-agent.py
#
# For automatic startup:
# - Add to Windows Task Scheduler with "Run at startup" trigger
# - Or use: pythonw monitoring-agent.py (runs in background)

import os
import sys
import time
import json
import socket
import hashlib
import requests
from datetime import datetime

try:
    import psutil
except ImportError:
    print("ERROR: psutil not installed. Run: pip install psutil")
    sys.exit(1)

# Configuration
API_ENDPOINT = "https://functions.vadim.frolunin/a22df9d8-5c25-4f3c-8bc1-7621149ed218"
CHECK_INTERVAL = 60  # seconds

# Paths to monitor (edit as needed)
CONFIG_PATHS = [
    r"C:\Windows\System32\config",
    r"C:\inetpub\wwwroot",
    r"C:\Program Files",
    r"C:\ProgramData",
]

# File extensions to monitor
MONITOR_EXTENSIONS = ('.conf', '.config', '.xml', '.json', '.ini', '.yml', '.yaml', '.properties')

def get_checksum(filepath):
    """Calculate MD5 checksum of file"""
    try:
        with open(filepath, 'rb') as f:
            return hashlib.md5(f.read()).hexdigest()
    except Exception as e:
        return None

def get_system_info():
    """Collect system metrics"""
    try:
        hostname = socket.gethostname()
        try:
            ip = socket.gethostbyname(hostname)
        except:
            ip = "unknown"
        
        return {
            "hostname": hostname,
            "ip": ip,
            "os": f"Windows {sys.platform}",
            "cpu": round(psutil.cpu_percent(interval=1), 2),
            "memory": round(psutil.virtual_memory().percent, 2),
            "disk": round(psutil.disk_usage('C:\\').percent, 2)
        }
    except Exception as e:
        print(f"Error collecting system info: {e}")
        return {
            "hostname": "unknown",
            "ip": "unknown",
            "os": "unknown",
            "cpu": 0,
            "memory": 0,
            "disk": 0
        }

def monitor_configs():
    """Scan configuration files and calculate checksums"""
    changes = []
    
    for path in CONFIG_PATHS:
        if not os.path.exists(path):
            continue
        
        try:
            for root, dirs, files in os.walk(path):
                for file in files:
                    if file.endswith(MONITOR_EXTENSIONS):
                        filepath = os.path.join(root, file)
                        
                        try:
                            checksum = get_checksum(filepath)
                            if checksum:
                                changes.append({
                                    "file": filepath,
                                    "checksum": checksum,
                                    "timestamp": datetime.now().isoformat(),
                                    "user": os.getlogin()
                                })
                        except Exception as e:
                            continue
        except Exception as e:
            print(f"Error scanning {path}: {e}")
            continue
    
    return changes

def send_data(data):
    """Send data to monitoring server"""
    try:
        response = requests.post(
            API_ENDPOINT,
            json=data,
            timeout=10,
            headers={'Content-Type': 'application/json'}
        )
        
        if response.status_code == 200:
            result = response.json()
            print(f"✓ Data sent successfully: {result.get('message', 'OK')}")
            return True
        else:
            print(f"✗ Server returned error: {response.status_code}")
            return False
            
    except requests.exceptions.ConnectionError:
        print("✗ Connection error: Cannot reach monitoring server")
        return False
    except requests.exceptions.Timeout:
        print("✗ Timeout: Server did not respond in time")
        return False
    except Exception as e:
        print(f"✗ Error sending data: {e}")
        return False

def main():
    """Main monitoring loop"""
    print("=" * 60)
    print("Configuration Monitoring Agent v1.0.0")
    print("=" * 60)
    print(f"API Endpoint: {API_ENDPOINT}")
    print(f"Check Interval: {CHECK_INTERVAL} seconds")
    print(f"Monitoring paths:")
    for path in CONFIG_PATHS:
        exists = "✓" if os.path.exists(path) else "✗"
        print(f"  {exists} {path}")
    print("=" * 60)
    print()
    print("Agent started. Press Ctrl+C to stop.")
    print()
    
    cycle_count = 0
    
    while True:
        try:
            cycle_count += 1
            print(f"\n[{datetime.now().strftime('%Y-%m-%d %H:%M:%S')}] Cycle #{cycle_count}")
            
            # Collect system metrics
            print("  → Collecting system metrics...")
            system_info = get_system_info()
            print(f"     CPU: {system_info['cpu']}% | Memory: {system_info['memory']}% | Disk: {system_info['disk']}%")
            
            # Scan configuration files
            print("  → Scanning configuration files...")
            config_changes = monitor_configs()
            print(f"     Found {len(config_changes)} monitored files")
            
            # Prepare payload
            payload = {
                "system": system_info,
                "changes": config_changes,
                "timestamp": datetime.now().isoformat()
            }
            
            # Send to server
            print("  → Sending data to server...")
            send_data(payload)
            
            # Wait for next cycle
            print(f"  → Next check in {CHECK_INTERVAL} seconds...")
            time.sleep(CHECK_INTERVAL)
            
        except KeyboardInterrupt:
            print("\n\nAgent stopped by user. Goodbye!")
            break
        except Exception as e:
            print(f"\n✗ Unexpected error: {e}")
            print(f"  → Retrying in {CHECK_INTERVAL} seconds...")
            time.sleep(CHECK_INTERVAL)

if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"\nFatal error: {e}")
        input("Press Enter to exit...")
        sys.exit(1)