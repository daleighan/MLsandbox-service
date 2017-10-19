import numpy as np
import pandas as pd
import seaborn as sns
import time
from sklearn.linear_model import LinearRegression
from sklearn.cross_validation import train_test_split

def run():
    housing_data = pd.read_csv("KC_HOUSING/kc_house_data.csv")
    print("housing data loaded")
    
    regression = LinearRegression()
    labels = housing_data['price']
    conv_dates = [1 if values == 2014 else 0 for values in housing_data.date]
    housing_data['date'] = conv_dates
    train1 = housing_data.drop(['id', 'price'], axis=1)
    x_train, x_test, y_train, y_test = train_test_split(train1, labels, test_size = 0.1, random_state = 2)
    
    regression.fit(x_train, y_train)
    
    print(regression.score(x_test, y_test))

if __name__ == "__main__":
    start_time = time.time()
    results = run()
    end_time = time.time()
    print("Total Running Time: ", end_time - start_time)
