from sklearn.mixture import GMM
from scipy.io.wavfile import read
import python_speech_features as mfcc
from sklearn import preprocessing
from sklearn.externals import joblib
import numpy as np
import time
import warnings
warnings.filterwarnings("ignore")


def get_MFCC(sr, audio):
    features = mfcc.mfcc(audio, sr, 0.025, 0.01, 13, appendEnergy=False)
    features = preprocessing.scale(features)
    return features

    gmm = GMM(n_components = 8, n_iter = 200, convariance_type="diag", n_init=3)
    gmm.fit(features)

