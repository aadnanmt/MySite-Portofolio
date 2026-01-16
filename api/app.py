from flask import Flask, render_template, request
from flask_minify import Minify

app = Flask(__name__, template_folder='../templates', static_folder='../static')

Minify(app=app, html=True, js=True, cssless=True, caching_limit=1000)

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

@app.route('/')
def home():
    return render_template('main.html')

# @app.route('/')
# def Maintenance_page():
#     return render_template('maintenance.html')

@app.route('/blog')
def blog():
    return render_template('404.html')

if __name__ == '__main__':
    app.run
