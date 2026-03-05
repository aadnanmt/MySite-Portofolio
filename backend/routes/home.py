# api/route.py
from flask import Blueprint, render_template, current_app
import markdown
import os
import json
import frontmatter

# make blueprint
main_bp = Blueprint('main', __name__)

def load_data(filename):
    path = os.path.join('data', filename)
    with open(path, encoding='utf-8') as f:
        return json.load(f)

@main_bp.errorhandler(404)
def not_found_error(error):
    return render_template('pages/errors/404.html'), 404
    
@main_bp.route('/')
def home():
    projects = load_data('projects.json')
    skills   = load_data('skills.json')
    socials  = load_data('socials.json')
    meta     = load_data('meta.json')
    return render_template('pages/home.html', projects=projects, skills=skills, socials=socials, meta=meta)