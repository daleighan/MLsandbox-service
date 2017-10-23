from sklearn.externals import joblib
from sklearn.cross_validation import train_test_split
from sklearn.ensemble import RandomForestClassfier
import pandas as pd 

def run():
    mushroom_data = pd.read_csv("mushroom_data/mushroom_data.csv")
    print("mushroom data loaded")

    random_forest = RandomForestClassfier()

    labels = mushroom_data["class"]
    train1 = mushroom_data.drop(["class"])

    x_train, x_test, y_train, y_test = train_test_split(train1, labels)

