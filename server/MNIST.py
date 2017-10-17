import time
from sklearn.datasets import fetch_mldata
from sklearn import datasets, svm, metrics
import pickle
from sklearn.externals import joblib


def run():
	# Load in the digits dataset
	mnist = fetch_mldata('MNIST original', data_home='./server/MNIST_data')
	num_samples = len(mnist.data)
	data = mnist.data.reshape(num_samples, -1)
	print('Data reshaped')
	# Create the model
	# Support Vector Classifaction will be used
	classifier = svm.SVC(gamma = 0.001)
	# Fit the model to the numbers data
	print('Preparing to fit the data')
	classifier.fit(data[:num_samples], mnist.target[:num_samples])
	print('Fit complete')
	#save the modle with pickle
	joblib.dump(classifier, 'MNIST_PICKLE.pkl')
	print('pickle dump complete')

	#clf = joblib.load('filename.pkl') use this to load data


if __name__ == "__main__":
	start_time = time.time()
	results = run()
	end_time = time.time()
	print ("Overall running time: ", end_time - start_time)