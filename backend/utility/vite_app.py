import os
import json
from flask import url_for
from markupsafe import Markup

# function vite
def init_vite(app):

    def vite_asset(path):
        # chek flask mode
        if app.debug:

            # use Markup for return html tag
            return Markup(f'<script type="module" src="http://localhost:5174/{path}"></script>')
        
        # logic for prod
        manifest_path = os.path.join(app.static_folder, 'dist', '.vite', 'manifest.json')
        
        try:
            with open(manifest_path, 'r') as f:
                manifest = json.load(f)
        except FileNotFound:
            # errror handling
            return Markup("")

        # found file js in manifest
        if path in manifest:
            entry = manifest[path]
            tags = []
            
            # load css
            if 'css' in entry:
                for file_css in entry['css']:
                    link = url_for('static', filename=f"dist/{file_css}")
                    tags.append(f'<link rel="stylesheet" href="{link}">')
            
            # load js
            js_url = url_for('static', filename=f"dist/{entry['file']}")
            tags.append(f'<script type="module" src="{js_url}"></script>')
            
            return Markup('\n'.join(tags))
        
        return Markup(f"")

    # register vite_asset global function
    app.jinja_env.globals['vite_asset'] = vite_asset