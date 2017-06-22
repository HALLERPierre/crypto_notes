from utils import *
import flask

app = flask.Flask(__name__)

"""
Return the homepage
"""
@app.route('/', methods=['GET'])
def home():
	with open('./index.html', 'rb') as home :
		resp = getResponse(home.read(), 200)
	return resp

"""
return js file
"""
@app.route('/js/<string:fileName>', methods=['GET'])
def js(fileName):
	path = 'public/js/' + fileName
	with open(path, 'rb') as js:
		resp = getResponse(js.read(), 200)
	return resp