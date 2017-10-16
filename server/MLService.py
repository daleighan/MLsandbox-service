from flask import Flask, render_template, request, abort, jsonify
from sklearn import datasets, svm, metrics
from base64 import b64decode
from numpy import min, max, floor, float, divide
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
@app.route("/api/predict", methods=["POST"])
def predict():
	if not request.json or not 'image' in request.json:
		abort(400)
	image_data = b64decode(request.json["image"])
	filename = "image.jpg"
	with open(filename, "wb") as f:
		f.write(image_data)
	img = imread("image.jpg")
	img = imresize(img, (8, 8))
	img = img[:, :, 0]

	min_value = min(img)
	max_value = max(img)
	normalize_img = floor(divide((img - min_value).astype(float),(max_value - min_value).astype(float)) * 16)
	print(normalize_img)
	predicted = classifier.predict(normalize_img.reshape((1,normalize_img.shape[0] * normalize_img.shape[1])))
	to_send = predicted.tolist()[0]
	return jsonify({ "prediction": to_send }), 201

if __name__ == "__main__":
	app.run()