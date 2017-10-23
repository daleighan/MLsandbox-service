from sklearn.externals import joblib
import pandas as pd 

def run():
    mushroom_data = pd.read_csv("mushroom_data/mushroom_data.csv")
    print("mushroom data loaded")