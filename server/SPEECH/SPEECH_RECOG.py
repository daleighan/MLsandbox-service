from sklearn.mixture import GMM
from scipy.io.wavfile import read
import python_speech_features as mfcc
from sklearn import preprocessing
from sklearn.externals import joblib
import numpy as np
import time
import os
import warnings
warnings.filterwarnings("ignore")


def get_MFCC(sr, audio):
    features = mfcc.mfcc(audio, sr, 0.025, 0.01, 13, appendEnergy=False)
    features = preprocessing.scale(features)
    return features

def run():
    source = "pygender/train_data/youtube/male"
    dest = "pygender"
    files = [os.path.join(source, f) for f in os.listdir(source) if f.endswith('.wav')]
    
    features = np.asarray(())
    
    for f in files:
        sr,audio = read(f)
        vector = get_MFCC(sr, audio)
        if features.size == 0:
            features = vector
        else:
            features = np.vstack((features, vector))
    
    gmm = GMM(n_components = 8, n_iter = 200, covariance_type='diag', n_init=3)
    gmm.fit(features)
    
    joblib.dump(gmm,"male.pkl")

if __name__ == "__main__":
    start_time = time.time()
    results = run()
    end_time = time.time()    
    print("Total Running Time: ", end_time - start_time)
