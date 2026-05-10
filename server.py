import http.server
import socketserver
import json
import os

import os

PORT = int(os.environ.get('PORT', 3000))

class MyHandler(http.server.SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path == '/api/status':
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            # Save to JSON file
            status_path = os.path.join('data', 'status.json')
            with open(status_path, 'w') as f:
                json.dump(data, f, indent=2)
            
            print(f"[SERVER] Status atualizado para: {data.get('online')}")
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'status': 'success'}).encode())
        else:
            self.send_response(404)
            self.end_headers()

    def end_headers(self):
        # Disable caching for status.json
        if 'status.json' in self.path:
            self.send_header('Cache-Control', 'no-store, no-cache, must-revalidate, max-age=0')
        super().end_headers()

with socketserver.TCPServer(("", PORT), MyHandler) as httpd:
    print(f"""
    =========================================
    SISTEMA SOLVÉRIA RP RODANDO (PYTHON)!
    Acesse: http://localhost:{PORT}
    =========================================
    """)
    httpd.serve_forever()
