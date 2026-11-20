"""Local preview that serves public/ like nginx with `try_files $uri $uri.html =404`."""
import http.server
import os
import urllib.parse

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'public')


class Handler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        relative = urllib.parse.unquote(path.split('?')[0]).strip('/') or 'index.html'
        full = os.path.join(ROOT, relative)
        return full if os.path.isfile(full) else full + '.html'


print('http://127.0.0.1:8765')
http.server.ThreadingHTTPServer(('127.0.0.1', 8765), Handler).serve_forever()
