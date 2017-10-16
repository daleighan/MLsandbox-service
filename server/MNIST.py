import numpy
import random
from numpy import arange
import time

from sklearn import metrics
from sklearn.datasets import fetch_mldata
from sklearn.ensemble import RandomForestClassifier
from sklearn.utils import shuffle


def run():
	n_train = 60000
	n_test = 10000
	mnist = fetch_mldata('MNIST original', data_home='./server/MNIST_data')


if __name__ == "__main__":
	start_time = time.time()
	results = run()
	end_time = time.time()
	print ("Overall running time: ", end_time - start_time)