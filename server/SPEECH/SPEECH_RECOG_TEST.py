from scipy.io.wavfile import read
import python_speech_features as mfcc
from sklearn import preprocessing
from sklearn.externals import joblib
import numpy as np
import time
import os

def get_MFCC(sr, audio):
    features = mfcc.mfcc(audio, sr, 0.025, 0.01, 13, appendEnergy=False)
    feat = np.asarray(())
    for i in range(features.shape[0]):
        temp = features[i, :]
        if np.isnan(np.min(temp)):
            continue
        else:
            if feat.size == 0:
                feat = temp
            else:
                feat = np.vstack((feat, temp))
    features = feat;
    features = preprocessing.scale(features)
    return features

def run():
    sourcepath = "pygender/test_data/AudioSet/male_clips"
    modelpath = "pygender"

    gmm_files = [os.path.join(modelpath, fname) for fname in os.listdir(modelpath) if fname.endswith(".gmm")]

    models = [joblib.load("male.gmm"), joblib.load("female.gmm")]
    print(models)

    genders = ["male", "female"]
    files = [os.path.join(sourcepath, f) for f in os.listdir(sourcepath) if f.endswith(".wav")]

    for f in files:
        #print(f.split("\\")[-1])
        sr, audio  = read(f)
        features   = get_MFCC(sr,audio)
        scores     = None
        log_likelihood = np.zeros(len(models)) 
        for i in range(len(models)):
            gmm    = models[i]         #checking with each model one by one
            scores = np.array(gmm.score(features))
            log_likelihood[i] = scores.sum()
        winner = np.argmax(log_likelihood)
        print("\tdetected as - ", genders[winner],"\n\tscores:female ",log_likelihood[0],",male ", log_likelihood[1],"\n")

if __name__ == "__main__":
    start_time = time.time()
    result = run()
    end_time = time.time()
    print("Total running time: ", end_time - start_time) 
