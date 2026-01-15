from flask import Flask, render_template, request
# from flask_talisman import Talisman
from flask_minify import Minify

app = Flask(__name__, template_folder='../templates', static_folder='../static')

Minify(app=app, html=True, js=True, cssless=True)

# Talisman(app, 
#     content_security_policy=None,
#     force_https=False
# )

@app.route('/')
def home():
    return render_template('main.html')

# @app.route('/')
# def Maintenance_page():
#     return render_template('Maintenance.html')

@app.route('/blog')
def blog():
    return render_template('404.html')

if __name__ == '__main__':
    app.run
