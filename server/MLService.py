from flask import Flask, render_template, request, abort, jsonify
from sklearn import datasets, svm, metrics
from base64 import b64decode
from numpy import min, max, floor, float, divide
from scipy.misc import imread, imresize
from sklearn.externals import joblib
from sklearn.preprocessing import normalize, scale
from PIL import Image, ImageFilter
from sklearn.datasets import fetch_mldata

classifier = joblib.load('MNIST2_PICKLE.pkl')

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

	min_value = min(img)
	max_value = max(img)
	# normalize_img = floor(divide((img - min_value).astype(float),(max_value - min_value).astype(float)) * 1)
	# normalize_img = normalize(img)
	mnist = fetch_mldata('MNIST original', data_home='./server/MNIST_data')
	for item in mnist:
		print(item)

	normalize_img = img
	predicted = classifier.predict(normalize_img.reshape((1,normalize_img.shape[0] * normalize_img.shape[1])))
	to_send = predicted.tolist()[0]
	print(predicted)
	return jsonify({ "prediction": to_send }), 201

if __name__ == "__main__":
	app.run()