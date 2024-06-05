from flask import jsonify
import numpy as np
import joblib
import pandas as pd
import datetime as dt
import os
from keras.models import load_model
def graph():
    try:
        print(os.getcwd())
        model = load_model('./predict/model.h5')
        df = joblib.load('./predict/data.joblib')
        scaler = joblib.load('./predict/scaler.joblib')
    except Exception as e:
        print(f"Error loading model or data: {str(e)}")
        model, df, scaler = None, None, None
    if model is None or df is None or scaler is None:
        return jsonify({"error": "Model or data not available"}), 500

    try:
        prediction_days = 60
        test_start = '2011-01-01'
        test_data = df.iloc[df.index >= test_start].copy()
        total_data = pd.concat([df['close'], test_data['close']])
        model_inputs = total_data[len(total_data)-len(test_data)-prediction_days:].values
        model_inputs = model_inputs.reshape(-1, 1)
        model_inputs = scaler.fit_transform(model_inputs)

        x_test = [model_inputs[x-prediction_days:x, 0] for x in range(prediction_days, len(model_inputs))]
        x_test = np.array(x_test)
        x_test = np.reshape(x_test, (x_test.shape[0], x_test.shape[1], 1))
        prediction_price = model.predict(x_test)
        prediction_price = scaler.inverse_transform(prediction_price)

        # Predict Next 30 days
        real_data = [model_inputs[len(model_inputs) + 1 - prediction_days: len(model_inputs) + 1, 0]]
        real_data = np.array(real_data)
        real_data = np.reshape(real_data, (real_data.shape[0], real_data.shape[1], 1))
        prediction = model.predict(real_data)
        prediction = scaler.inverse_transform(prediction)
        prediction = prediction.astype(float)

        futur_days = 30
        prediction = np.reshape(prediction, (futur_days))
        dates_list = [dt.datetime.now() + dt.timedelta(days=i) for i in range(30)]
        timestamps = [int(date.timestamp() * 1000) for date in dates_list]
        result = [[timestamps[i], prediction[i].tolist()] for i in range(futur_days)]
        print(result)
        return jsonify(result)

    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({"error": "Error during prediction"}), 500