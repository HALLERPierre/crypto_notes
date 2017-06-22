import flask
import front
import api

if __name__ == '__main__':
	#TODO :Set port in conf file
	front.app.run(debug=True, port=52525)
	api.app.run(debug=True, port=52525)

