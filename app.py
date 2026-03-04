# app.py
import os
import sys

# change to absolute path
current_directory = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_directory)

from flask import Flask, request
from flask_minify import Minify

from backend.security.headers import security_headers
from backend.routes.home import main_bp
from backend.routes.blog import blog_bp
from backend.routes.seo import seo_bp

template_directory = os.path.join(current_directory, 'templates')
static_directory = os.path.join(current_directory, 'static')

app = Flask(__name__, template_folder=template_directory, static_folder=static_directory)

Minify(app=app, html=True, js=True, cssless=True)

security_headers(app)

# auto cahche busting static/
def static_ver(filename):

    # fix: fallback to file mtime
    commit_sha = os.environ.get('VERCEL_GIT_COMMIT_SHA') or os.environ.get('VERCEL_DEPLOYMENT_ID')
    if commit_sha:
        return commit_sha[:7]
    
    filepath = os.path.join(static_directory, filename)
    try:
        return int(os.path.getmtime(filepath))
    except OSError:
        return 0

app.jinja_env.globals['static_ver'] = static_ver

app.register_blueprint(main_bp)
app.register_blueprint(blog_bp)
app.register_blueprint(seo_bp)

if __name__ == '__main__':
    app.run()