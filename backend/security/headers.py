from flask import request

def security_headers(app):
    
    @app.after_request
    def add_header(response):
        path = request.path

        if path.startswith('/static/css') or path.startswith('/static/js'):
            # css,js cache 
            response.headers['Cache-Control'] = 'public, max-age=88888, must-revalidate'
        elif path.startswith('/static'):
            # font, image, svg, webfonts| immutable
            response.headers['Cache-Control'] = 'public, max-age=31536000, immutable'
        else:
            response.headers['Cache-Control'] = 'public, max-age=0'
            response.headers['X-Content-Type-Options'] = 'nosniff'
            response.headers['X-Frame-Options'] = 'DENY'
            response.headers['X-XSS-Protection'] = '1; mode=block'
            
        return response