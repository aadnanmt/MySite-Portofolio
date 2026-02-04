from flask import Blueprint, render_template, current_app
from api.utility.util import get_posts_cached
import markdown
import os
import frontmatter

blog_bp = Blueprint('blog', __name__, url_prefix='/blog')

# Route: /blog/
@blog_bp.route('/')
def index():
    posts = get_posts_cached(current_app.root_path) 
    return render_template('pages/blog/blog_index.html', posts=posts)

# Route: /blog/<slug> for (Post)
@blog_bp.route('/<slug>')
def post(slug):
    post_folder = os.path.join(current_app.root_path, 'posts') 
    filepath = os.path.join(post_folder, f'{slug}.md')
    
    if not os.path.exists(filepath):
        return render_template('pages/errors/404.html'), 404
        
    with open(filepath, 'r', encoding='utf-8') as f:
        post_data = frontmatter.load(f)
        content = markdown.markdown(
            post_data.content, 
            extensions=['fenced_code', 'codehilite', 'tables', 'attr_list']
        )
        
    return render_template('pages/blog/blog_post.html', post=post_data, content=content)