# app.py
import os
import sys

# change to absolute path
current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(current_dir)

from flask import Flask, request
from flask_minify import Minify

from api.security.headers import security_headers
from api.routes.home import main_bp
from api.routes.blog import blog_bp

template_directory = os.path.join(current_dir, 'templates')
static_dir = os.path.join(current_dir, 'static')

app = Flask(__name__, template_folder=template_directory, static_folder=static_dir)

Minify(app=app, html=True, js=True, cssless=True)

app.register_blueprint(main_bp)
app.register_blueprint(blog_bp)

if __name__ == '__main__':
    app.run