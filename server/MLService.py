from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/api/predict", methods=['POST'])
def predict():
	print('hello')
	if not request.json or not 'image' in request.json:
		abort(400)
	print(request.json)
	return jsonify({ 'response': 'hello'}), 201


if __name__ == "__main__":
	app.run()