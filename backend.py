import math
from flask import Flask, jsonify, request
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)

@app.route('/api/delta-v', methods=['POST'])
def calc_delta_v():
    data = request.json
    ve = # Calculate based on fuel type chosen (maybe store a dictionary with ve's for each fuel type)
    m0 = # Calculate inital mass by summing input rocket size (subtract smaller calculation to create the void-make sure fuel fill matches this diamter) and input fuel fill % (fuel will be within rocket, calc with lessened diameter vs rocket structure to simulate)
    mf = # Maybe calculate first when creating rocket structure and its void. Then m0 will work off of this

    delta_v = ve * math.log(m0 / mf)    # Tsiolkovsky rocket equation
    return jsonify({'delta_v': delta_v})

if __name__ == '__main__':
    app.run(debug=True)