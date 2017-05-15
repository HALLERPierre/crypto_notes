from flask import Flask
import crypto
import time

app = Flask(__name__)
key = None

"""
Fetch private key
"""
@app.route('/api/connect', methods=['GET'])
def connect():
	global key
	key = crypto.getPrivateKey()
	if key:
		msg = "Connection ok, private key fetched"
	else :
		msg = "Fail during key fetch"
	return msg

"""
Decrypt a message, the crypted message is stored in a file (Maybe change that ?)
GET or POST ?
"""
@app.route('/api/decrypt/<string:fileName>', methods=['GET'])
def decrypt(fileName):
	#Remove that : 
	connect()
	#See if notes should be stored or use another method
	path = 'notes/' + fileName
	with open(path, 'rb') as cryptedFile:
		msg = cryptedFile.read()
	#TODO : get this message IV
	iv = crypto.getIV()
	cipher = crypto.getCipher(key, iv)
	decryptedMsg = crypto.decryptMessage(cipher, iv, msg)
	return decryptedMsg

"""
Crypt a message and store it with a timestamp (change that too)
GET or POST ?
"""
@app.route('/api/encrypt/<string:msg>', methods=['GET'])
def encrypt(msg):
	#Remove that : 
	connect()
	#TODO : generate and stock this message IV
	iv = crypto.getIV()
	cipher = crypto.getCipher(key, iv)
	cryptedMsg = crypto.encryptMessage(cipher, iv, msg)
	storeMessage(cryptedMsg)
	return "OK"

def storeMessage(cryptedMsg, fileName= None):
	if not fileName:
		fileName = time.strftime("%H_%M_%S")+".crn"
	path = 'notes/' + fileName
	with open(path, 'wb') as fileCrypted :
		fileCrypted.write(cryptedMsg) 


if __name__ == '__main__':
	app.run(debug=True)

"""
Limit connection to localhost
"""
def limit_remot_addr():
	if request.remote_addr != '127.0.0.1':
		abort(403)