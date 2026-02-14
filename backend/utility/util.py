# api/utility.py
import os
import frontmatter
from functools import lru_cache

# processing markdown to HTML
@lru_cache(maxsize=1)
def get_posts_cached(root_path):
    post_folder = os.path.join(root_path, 'posts')

    posts = []
    
    if not os.path.exists(post_folder):
        return []

    for filename in os.listdir(post_folder):
        if filename.endswith('.md'):
            filepath = os.path.join(post_folder, filename)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    post = frontmatter.load(f)
                    posts.append({
                        'title': post.get('title', 'No Title'),
                        'date': post.get('date', '0000-00-00'),
                        'desc': post.get('description', ''),
                        'tags': post.get('tags', []),
                        'slug': filename[:-3]
                    })
            except Exception as e:
                print(f"Error baca file {filename}: {e}")
                continue
            pass 
            
    posts.sort(key=lambda x: x['date'], reverse=True)
    return posts