# backend/routes/home.py
from flask import Blueprint, render_template, current_app
from backend.utility.util import get_posts_cached
import os
import json

# make blueprint
main_bp = Blueprint('main', __name__)

def load_data(filename):
    try:
        path = os.path.join(current_app.root_path, 'data', filename)
        if not os.path.exists(path):
            return []
        with open(path, encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"Error loading {filename}: {e}")
        return []

@main_bp.app_errorhandler(404)
def not_found_error(error):
    return render_template('pages/errors/404.html'), 404
    
@main_bp.route('/')
def home():
    # Teaser content for Homepage
    all_projects = load_data('projects.json')
    featured_projects = all_projects[:3]  # Top 3 only
    
    all_posts = get_posts_cached(current_app.root_path)
    latest_posts = all_posts[:3]          # Latest 3 only
    
    skills = load_data('skills.json')     # For quick skill view
    
    return render_template('pages/home.html', 
                         projects=featured_projects, 
                         posts=latest_posts, 
                         skills=skills)

@main_bp.route('/projects')
def projects():
    projects = load_data('projects.json')
    return render_template('pages/projects.html', projects=projects)

@main_bp.route('/about')
def about():
    skills = load_data('skills.json')
    return render_template('pages/about.html', skills=skills)
