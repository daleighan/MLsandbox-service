from flask import Flask, render_template, request, abort, jsonify
from sklearn import preprocessing
import python_speech_features as mfcc
from scipy.io.wavfile import read
from base64 import b64decode
import numpy as np
from scipy.misc import imread, imresize
from sklearn.externals import joblib
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
from sklearn.externals import joblib
import logging
import os

# Instantiate the server
app = Flask(__name__, static_folder="../static/dist", template_folder="../static")

# train chatterbot
#chatbot = ChatBot("Tairy Greene")
#chatbot.set_trainer(ChatterBotCorpusTrainer)
#chatbot.train("chatterbot.corpus.english")

def get_MFCC(sr, audio):
   features = mfcc.mfcc(audio, sr, 0.025, 0.01, 13, appendEnergy=False)
   features = preprocessing.scale(features)
   return features
# Serve the react app
@app.route("/")
def index():
    return render_template("index.html")

# Set up a route for handwriting prediction
@app.route("/api/numberpredict", methods=["POST"])
def predict_number():
    if not request.json or not "image" in request.json:
    	abort(400)
    image_data = b64decode(request.json["image"])
    filename = "image.jpg"
    with open(filename, "wb") as f:
    	f.write(image_data)
    
    img = imread("image.jpg")
    img = imresize(img, (28, 28))
    img = img[:, :, 0]

    classifier = joblib.load("server/MNIST/MNIST_PICKLE.pkl")
    
    predicted = classifier.predict(img.reshape((1,img.shape[0] * img.shape[1])))
    to_send = predicted.tolist()[0]
    return jsonify({ "prediction": to_send }), 201

# Set up a route for housing price prediction
@app.route("/api/houseprices", methods=["POST"])
def predict_price():
    if not request or not "info" in request.json: 
        abort(400)
    classifier = joblib.load("server/housing/HOUSING_PICKLE.pkl") 
    
    house_object = np.array(request.json["info"], dtype="float64")

    predicted = classifier.predict([house_object])
    to_send = predicted.tolist()[0]
    return jsonify({ "prediction": to_send }), 201

@app.route("/api/tairygreene", methods=["POST"])
def have_chat():
    if not request or not "message" in request.json: 
        abort(400)
    message_response = str(chatbot.get_response(request.json["message"]))
    return jsonify({ "response": message_response}), 201

@app.route("/api/speech", methods=["POST"])
def predict_speech():
    #audio = b64decode(request.data.blob)
    print(request.json["data"]["blobURL"])
    sourcepath = "server/SPEECH/pygender/my_tests/test3.wav"
    modelpath = "server/SPEECH/pygender"

    models = [joblib.load("server/SPEECH/male.gmm"), joblib.load("server/SPEECH/female.gmm")]

    genders = ["male", "female"]

    file = os.path.join(sourcepath)

    to_send = ""

    sr, audio = read(file)
    features = get_MFCC(sr,audio)
    scores = None
    log_likelihood = np.zeros(len(models)) 
    for i in range(len(models)):
        gmm = models[i]  
        scores = np.array(gmm.score(features))
        log_likelihood[i] = scores.sum()
    winner = np.argmax(log_likelihood)
    to_send = str(genders[winner])
    return jsonify({ "prediction": to_send}), 201

@app.after_request
def add_header(response):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    response.headers['X-UA-Compatible'] = 'IE=Edge,chrome=1'
    response.headers['Cache-Control'] = 'public, max-age=0'
    return response    

if __name__ == "__main__":
    app.run()
    
