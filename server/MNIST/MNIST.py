import random
from numpy import arange
from sklearn.datasets import fetch_mldata
from sklearn.ensemble import RandomForestClassifier
from sklearn.externals import joblib
import time


def run():
    mnist = fetch_mldata('MNIST original', data_home='./server/MNIST/MNIST_data')
    # Trunk the data
    n_train = 60000
    n_test = 10000

    # Define training and testing sets
    indices = arange(len(mnist.data))
    random.seed(0)
    
    train_idx = arange(0,n_train)
    test_idx = arange(n_train+1,n_train+n_test)

    X_train, y_train = mnist.data[train_idx], mnist.target[train_idx]
    X_test, y_test = mnist.data[test_idx], mnist.target[test_idx]

    # Apply a learning algorithm
    print("Applying a learning algorithm...")
    classifier = RandomForestClassifier(n_estimators=10,n_jobs=2)
    classifier.fit(X_train, y_train)

    # Make a prediction
    print("Making predictions...")
    y_pred = classifier.predict(X_test)

    print(y_pred)

    # Evaluate the prediction
    print("Evaluating results...")
    print("Mean accuracy: \t", classifier.score(X_test, y_test))

    joblib.dump(classifier, 'MNIST_PICKLE.pkl')

if __name__ == "__main__":
    start_time = time.time()
    results = run()
    end_time = time.time()
    print "Overall running time:", end_time - start_time
