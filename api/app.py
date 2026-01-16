from flask import Flask, render_template, request
from flask_minify import Minify
from flask_minify import Minify, decorators as minify_decorators

app = Flask(__name__, template_folder='../templates', static_folder='../static')

@app.after_request
def add_header(response):
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-XSS-Protection'] = '1; mode=block'
    return response

@app.route('/')
@minify_decorators.minify(html=True, js=True, cssless=True, caching_limit=0)
def home():
    return render_template('main.html')

# @app.route('/')
# def Maintenance_page():
#     return render_template('maintenance.html')

@app.route('/blog')
@minify_decorators.minify(html=True, js=True, cssless=True, caching_limit=0)
def blog():
    return render_template('404.html')

if __name__ == '__main__':
    app.run
