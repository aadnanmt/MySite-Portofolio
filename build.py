"""
build.py - compile SCSS to CSS
usage: python build.py
"""
import os
import sass

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
SCSS_ENTRY = os.path.join(BASE_DIR, 'frontend', 'scss', 'main.scss')
CSS_OUTPUT = os.path.join(BASE_DIR, 'static', 'css', 'main.css')

def build_css():
    compiled = sass.compile(
        filename=SCSS_ENTRY,
        output_style='compressed'
    )
    with open(CSS_OUTPUT, 'w', encoding='utf-8') as f:
        f.write(compiled)
    print(f"[build] CSS compiled --> static/css/main.css")

if __name__ == '__main__':
    build_css()
