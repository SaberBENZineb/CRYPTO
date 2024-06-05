from flask import Flask,request,jsonify
from flask_cors import CORS
from predict.prediction import graph
from add_user import AddUser
import json
app = Flask(__name__)
CORS(app, origins='http://localhost:3000')
@app.route('/', methods=['GET'])
def predict():
    return graph()
@app.route('/add', methods=['POST'])
def add():
    data = json.loads(request.get_data())
    add_user = AddUser(data)
    return jsonify(add_user)


if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
