# Handwriting

### Overview
Handwriting is a simple web app that uses machine learning to identify what number is drawn on a canvas.

### Tech Stack
* React
* Flask
* SciKit Learn

### Startup
This section is a work in progress. Install of python dependencies on machines other than my own is yet to be setup.
* To install all node modules, run npm install.
* To install all python dependencies, run pip install.
* Run npm run compile will bundle the react file.
* Run npm start will start the flask server.
* Go to http://127.0.0.1:5000/ to open the web app.

### Demo
* The page is not hosted anywhere yet, but will be hosted on heroku in the future

### REST API routes
* a post to /api/predict with b64 encoded PNG image in the JSON body will return a prediction of what the number in the image is

### Developers
* Alex Leigh (sole proprieter)
