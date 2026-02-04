# api/route.py
from flask import Blueprint, render_template, current_app
from utility import get_posts_cached
import markdown
import os
import frontmatter

# make blueprint
main_bp = Blueprint('main', __name__)

# app.route --> main_bp.route
@main_bp.route('/')
def home():
    return render_template('layouts/base.html')

# blog page
@main_bp.route('/blog')
def blog_index():
    posts = get_posts_cached(current_app.root_path) 
    return render_template('pages/blog/blog_index.html', posts=posts)

@main_bp.route('/blog/<slug>')
def blog_post(slug):
    post_folder = os.path.join(current_app.root_path, 'posts') 
    filepath = os.path.join(post_folder, f'{slug}.md')
    
    if not os.path.exists(filepath):
        return render_template('404.html')
        
    with open(filepath, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
        content = markdown.markdown(
            post.content, 
            extensions=['fenced_code', 'codehilite', 'tables', 'attr_list']
        )
        
    return render_template('pages/blog/blog_post.html', post=post, content=content)
    pass