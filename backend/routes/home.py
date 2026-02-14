# api/route.py
from flask import Blueprint, render_template, current_app
import markdown
import os
import frontmatter

# make blueprint
main_bp = Blueprint('main', __name__)

@main_bp.errorhandler(404)
def not_found_error(error):
    return render_template('pages/errors/404.html'), 404
    
@main_bp.route('/')
def home():
    return render_template('pages/home.html')