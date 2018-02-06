# ml-sandbox-service

### Overview
This is a prediction service for the webapp found at ml-sandbox.io. It provides a REST API for 5 different services.

### Tech Stack
* Python
* Flask
* Scikit Learn

### Startup
To start up this service:
* clone the repo
* install python3
* pip3 install -r requirements.txt
* python3 server/MLService.py

### Demo
The app that this service was made for may be found at ml-sandbox.io

### REST API routes
* a get request to / returns an html page with a link to ml-sandbox.io
* a post request to /api/numberpredict with a body containing a b64 encoded image of a handwritten digit as the property "image" returns a json object with a prediction about what that digit might be
* a post request to /api/houseprices with all of the properties that are provided by ml-sandbox.io when a housing price prediction is requested in an array that is the "info" property of the body
* a post request to /api/mushrooms does the same, except the property is called "data"
* a post request to /api/tairygreen with a message as the property "message" returns a response from the chatbot
* a post request to /api/speech needs to have a javascript blob sent as form data in the post request and returns a prediction about whether the voice in the audio is male or female

### Training
* To train the housing price predictor, run python3 server/housing/HOUSING.py. The training data is stored in server/housing/kc_housing_data/kc_house_data.csv
* To train the handwriting predictor, run python3 server/MNIST/MNIST.py. the training data is in the file server/MNIST/MNIST_data/mnist-original.mat
* To train the edible mushroom predictor, run python3 server/mushrooms/MUSHROOM.py. It is trained with server/mushrooms/mushroom_data
* To train the speech recognition, run server/SPEECH/SPEECH_RECOG.py. The training data is not included in this repo because the files are large, but the .gmm pickle files in that folder are already trained
* To train the chatbot, start the server. It is trained anytime the server is started

### Developers
* Alex Leigh
* Max Jacobs
* Jason Nguyen
