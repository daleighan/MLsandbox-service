from flask import Flask, render_template, request, abort, jsonify
from sklearn import datasets, svm, metrics
import numpy as np
import base64
from scipy.misc import imread, imresize


# Load in the digits dataset
digits = datasets.load_digits()
num_samples = len(digits.images)
data = digits.images.reshape(num_samples, -1)
# Create the model
classifier = svm.SVC(gamma = 0.001)
# Fit the model to the numbers data
classifier.fit(data[:num_samples], digits.target[:num_samples])

# Instantiate the server
app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

# Serve the react app
@app.route("/")
def index():
  return render_template("index.html")

# Set up a route for prediction
@app.route("/api/predict", methods=['POST'])
def predict():
	if not request.json or not 'image' in request.json:
		abort(400)
	image_data = base64.b64decode(request.json["image"])
	filename = 'image.jpg'
	with open(filename, 'wb') as f:
		f.write(image_data)
	img = imread('image.jpg')
	img = imresize(img, (8, 8))
	img = img[:, :, 0]

	minValueInImage = np.min(img)
	maxValueInImage = np.max(img)
	normaliizeImg = np.floor(np.divide((img - minValueInImage).astype(np.float),(maxValueInImage-minValueInImage).astype(np.float))*16)

	# Predict
	predicted = classifier.predict(normaliizeImg.reshape((1,normaliizeImg.shape[0]*normaliizeImg.shape[1] )))
	print(predicted)
	to_send = predicted.tolist()[0]

	return jsonify({ 'prediction': to_send }), 201

if __name__ == "__main__":
	app.run()