from utils import *
import crypto
import time
import json
import sys
import os
import flask


key = None
connected = False

def routes(app):
	"""
	Limit connection to localhost
	"""
	@app.before_request
	def limit_remot_addr():
		if flask.request.remote_addr != '127.0.0.1':
			abort(403)
	
	"""
	Fetch private key (user own this key).
	Later, this key should be crypted with a key stored in DB (we'll own this key)
	TODO : deco
	"""
	@app.route('/api/connect', methods=['GET'])
	def connect():
		global key
		key = crypto.getPrivateKey()
		print('Hello world!', file=sys.stderr)
		if key:
			resp = getResponse("Connection ok", 200)
			connected = True
		else :
			resp = getResponse("Connection failed", 500)
		return resp
	
	"""
	Decrypt a message, the crypted message is stored in a file (Maybe change that ?)
	GET or POST ?
	"""
	@app.route('/api/decrypt/<string:fileName>', methods=['GET'])
	def decrypt(fileName):
		#TODO : HANDLE IF FILE NO EXIST
		#See if notes should be stored or use another method
		path = 'notes/' + fileName
		with open(path, 'rb') as cryptedFile:
			print(path, file=sys.stderr)
			msg = cryptedFile.read()
		#TODO : get this message IV
		try:
			iv = crypto.getIV()
			cipher = crypto.getCipher(key, iv)
			decryptedMsg = crypto.decryptMessage(cipher, iv, msg)
			resp = getResponse(decryptedMsg, 200)
		except Exception:
			resp = getResponse("Fail during decryp message", 500)
		return resp
	
	"""
	Crypt a message and store it with a timestamp (change that too)
	GET or POST ?
	"""
	@app.route('/api/encrypt', methods=['POST'])
	def encrypt():
		#TODO : generate and stock this message IV
		postData = flask.request.data.decode("utf-8")
		postData = json.loads(postData)
		title = postData['title']
		msg = postData['note']
		try :
			iv = crypto.getIV()
			cipher = crypto.getCipher(key, iv)
			cryptedMsg = crypto.encryptMessage(cipher, iv, msg)
			storeMessage(cryptedMsg, title)
			resp = getResponse("Message encrypted and stored", 200)
		except Exception:
			resp = getResponse("Fail during encrypt message", 500)
		return resp
	
	"""
	Get all titles in note directory.
	The goal is to have a DB later and not use this
	"""
	@app.route('/api/getAllTitles', methods=['GET'])
	def getAllTitles():
		titles = []
		if not os.path.isdir('notes'):
			return getResponse("Dir does not exist :(", 500)
		for filename in os.listdir('notes'):
			titles.append(filename)
		return getResponse(json.dumps(titles), 200)
	
	
	
	def storeMessage(cryptedMsg, fileName= None):
		if not fileName:
			fileName = time.strftime("%H_%M_%S")+".crn"
		path = 'notes/' + fileName
		os.makedirs(os.path.dirname(path), exist_ok=True)
		with open(path, 'wb') as fileCrypted :
			fileCrypted.write(cryptedMsg)
	