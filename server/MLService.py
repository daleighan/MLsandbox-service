from flask import Flask, render_template, request, jsonify
from sklearn import datasets, svm, metrics

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
	print(request.json)
	return jsonify({ 'image': request.json["image"] }), 201


if __name__ == "__main__":
	app.run()