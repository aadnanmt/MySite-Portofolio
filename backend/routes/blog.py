from flask import Blueprint, render_template, current_app
from backend.utility.util import get_posts_cached
import markdown
import os
import frontmatter

blog_bp = Blueprint('blog', __name__, url_prefix='/blog')

# route: /blog/
@blog_bp.route('/')
def index():
    posts = get_posts_cached(current_app.root_path) 
    return render_template('pages/blog/blog_index.html', posts=posts)

# route: /blog/<slug> for (post)
@blog_bp.route('/<slug>')
def post(slug):
    post_folder = os.path.join(current_app.root_path, 'content', 'posts') 
    filepath = os.path.join(post_folder, f'{slug}.md')
    
    if not os.path.exists(filepath):
        return render_template('pages/errors/404.html'), 404
        
    with open(filepath, 'r', encoding='utf-8') as f:
        post_data = frontmatter.load(f)
        content = markdown.markdown(
            post_data.content, 
            extensions=['fenced_code', 'codehilite', 'tables', 'attr_list']
        )
        # normalize desc
        if not post_data.get('description') and post_data.get('desc'):
            post_data['description'] = post_data['desc']
        
    return render_template('pages/blog/blog_post.html', post=post_data, content=content)