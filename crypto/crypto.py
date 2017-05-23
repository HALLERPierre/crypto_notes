from Crypto.Cipher import AES
from Crypto import Random
from pathlib import Path
import sys

"""
Generate a random key and store it into a file
length must be 16 (AES-128), 24 (AES-192), or 32 (AES-256) bytes long
TODO : implement an IV and a password
"""
def generateRandomKey(path='private_key', length = 32):
	key = Random.new().read(length)
	with open(path, 'wb') as keyFile:
		keyFile.write(key)

"""
	Generate an IV
	TODO : Do this for every notes and link them to it
"""
def generateIV(path='iv_file', size=AES.block_size):
	iv = Random.new().read(AES.block_size)
	with open(path, 'wb') as ivFile:
		ivFile.write(iv)


"""
Get private key
"""
def getPrivateKey(path = 'private_key'):
	if not Path(path).is_file():
		generateRandomKey()
	with open(path, 'rb') as keyFile:
		return keyFile.read();

"""
get an IV
TODO : Change that!!!!
"""
def getIV(path='iv_file'):
	if not Path(path).is_file():
		generateIV()
	with open(path, 'rb') as ivFile:
		return ivFile.read()

"""
Get AES cipher, allow to encrypt, decrypt
MODE_CFB : Cipher FeedBack (CFB) 
TODO : check other types & add iv
"""
def getCipher(key, iv):
	cipher = AES.new(key, AES.MODE_CFB, iv)
	return cipher

"""
Encrypt message with AES
"""
def encryptMessage(cipher, iv, message):
	msg = iv + cipher.encrypt(str.encode(message))
	return msg

"""
Decrypt and return message with AES
"""
def decryptMessage(cipher, iv, message):
	msg = cipher.decrypt(message)
	#Remove IV
	msg = msg[len(iv):]
	return msg.decode()

def testCrypto():
	generateRandomKey()
	key = getPrivateKey()
	iv = getIV()
	cipher = getCipher(key, iv)
	cryptedMsg = encryptMessage(cipher, iv, "Congratz, AES crypto is ok !")
	decryptedMsg = decryptMessage(cipher, iv, cryptedMsg)
	print(decryptedMsg)

#testCrypto()