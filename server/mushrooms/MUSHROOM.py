from sklearn.externals import joblib
from sklearn.cross_validation import train_test_split
# from sklearn.ensemble import RandomForestClassifier
from sklearn.svm import SVC
from sklearn.preprocessing import LabelEncoder
import pandas as pd 
import time

def run():
    mushroom_data = pd.read_csv("mushroom_data/mushroom_data.csv")

    svc = SVC(gamma=.01)
    label_encoder = LabelEncoder()

    for col in mushroom_data.columns:
        mushroom_data[col] = label_encoder.fit_transform(mushroom_data[col])

    mushroom_data.to_csv('mushroom_data/mushroom_data_encoded.csv')

    labels = mushroom_data["class"]
    train1 = mushroom_data.drop(["class"], axis=1)

    x_train, x_test, y_train, y_test = train_test_split(train1, labels, test_size = 0.2)

    svc.fit(x_train, y_train)

    print (svc.score(x_test, y_test))

    joblib.dump(svc, "MUSHROOM_PICKLE.pkl")

if __name__ == "__main__":
    start_time = time.time()
    results = run()
    end_time = time.time()
    print("Total Running Time: ", end_time - start_time)