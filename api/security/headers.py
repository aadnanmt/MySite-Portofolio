from flask import request

def security_headers(app):

	@app.after_request
	def add_header(response):
    	if request.path.startswith('/static'):
        	response.headers['Cache-Control'] = 'public, max-age=31536000'
    	else:
        	response.headers['Cache-Control'] = 'public, max-age=0'
        	response.headers['X-Content-Type-Options'] = 'nosniff'
        	response.headers['X-Frame-Options'] = 'DENY'
        	response.headers['X-XSS-Protection'] = '1; mode=block'
    return response