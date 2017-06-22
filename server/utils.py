import flask

"""
Get response to send via API
"""
def getResponse(text, status_code):
	resp = flask.Response(text)
	resp.headers['Access-Control-Allow-Origin'] = '*'
	resp.status_code = status_code
	return resp