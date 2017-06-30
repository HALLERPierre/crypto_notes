import flask
import front
import api

if __name__ == '__main__':
	#TODO :Set port in conf file
	app = flask.Flask(__name__)
	front.routes(app)
	api.routes(app)
	app.run(debug=True, port=52525)

