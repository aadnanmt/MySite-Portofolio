# api/app.py
from flask import Flask, request
from flask_minify import Minify
from route import main_bp # use main_bp, right now

# change to absolute path | start code
base_dir = os.path.dirname(os.path.abspath(__file__))

template_dir = os.path.join(base_dir, '..', 'templates')
static_dir = os.path.join(base_dir, '..', 'static')

app = Flask(__name__, template_folder=template_dir, static_folder=static_dir)

# end code abolute path

Minify(app=app, html=True, js=True, cssless=True)

app.register_blueprint(main_bp)

@app.after_request
def add_header(response):
    if request.path.startswith('/static'):
        response.headers['Cache-Control'] = 'public, max-age=31536000'
    else:
        response.headers['Cache-Control'] = 'public, max-age=0'
        response.headers['X-Content-Type-Options'] = 'nosniff'
        response.headers['X-Frame-Options'] = 'DENY'
        response.headers['X-XSS-Protection'] = '1; mode=block'
    return response

if __name__ == '__main__':
    app.run