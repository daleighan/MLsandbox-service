from flask import Flask, render_template, request, abort, jsonify
from base64 import b64decode
import numpy as np
from scipy.misc import imread, imresize
from sklearn.externals import joblib

# Instantiate the server
app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

# Serve the react app
@app.route("/")
def index():
  return render_template("index.html")

# Set up a route for prediction
@app.route("/api/predict", methods=["POST"])
def predict():
	if not request.json or not 'image' in request.json:
		abort(400)
	image_data = b64decode(request.json["image"])
	filename = "image.jpg"
	with open(filename, "wb") as f:
		f.write(image_data)

	img = imread("image.jpg")
	img = imresize(img, (28, 28))
	img = img[:, :, 0]
	
	classifier = joblib.load('MNIST_PICKLE.pkl')

	predicted = classifier.predict(img.reshape((1,img.shape[0] * img.shape[1])))
	to_send = predicted.tolist()[0]
	return jsonify({ "prediction": to_send }), 201

if __name__ == "__main__":
	app.run()
