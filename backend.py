import math
from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

rocket_materials = {
    'Aluminum-Lithium Alloy': 2550,
    'Carbon Fiber': 1800,
    'Glass': 2500,
    'Gold': 19320,
    'Ice': 917,
    'Inconel': 8497,
    'Peanutbutter': 1091,
    'Plastic': 1040,
    'Porcelain Ceramic': 2400,
    'Silver': 10490,
    'Steel': 7850,
    'Titanium': 4540,
    'Wood': 440,
}   # In kg/m^3

fuels = {
    'Hydrazine': [1010, 3500],
    'Hydrogen Peroxide': [1450, 1800],
    'Liquid Hydrogen': [70.9, 6553],
    'Liquid Methane': [422.6, 3450],
    'Liquid Oxygen': [1141, 3000],
    'Nitrous Oxide': [1220, 2300],
    'Refined Petroleum-1': [820, 2700]
}   # List is density (kg/m^3), exhaust velocity (m/s)

@app.route('/ping')
def ping():
    return {'message': 'pong'}

# Route: GET /materials
@app.route('/materials', methods=['GET'])
def get_materials():
    return jsonify(list(rocket_materials.keys()))  # May need to modify if not returned in the sorted order to page


# Route: GET /fuels
@app.route('/fuels', methods=['GET'])
def get_fuels():
    return jsonify(list(fuels.keys()))  # May need to modify if not returned in the sorted order to page


# Route: POST /calculate
@app.route('/calculate', methods=['POST'])
def calculate_delta_v():
    data = request.json
    material = data.get('material')
    fuel_type = data.get('fuel_type')
    try:
        height = float(data.get('height', 0))
        diameter = float(data.get('diameter', 0))
        fill_percentage = float(data.get('fuel_fill_percentage', 0)) * 0.01
    except ValueError:
        return jsonify({'error': 'Invalid number input'}), 400

    if material not in rocket_materials or fuel_type not in fuels:
        return jsonify({'error': 'Invalid material or fuel type'}), 400
    if height <= 0 or diameter <= 0 or not (0 <= fill_percentage <= 1):
        return jsonify({'error': 'Invalid height, diameter, or fill percentage'}), 400

    
    # Calculate empty rocket mass
    total_vol = math.pi * ((diameter/2)**2) * height
    cabin_vol = math.pi * (((diameter * .5)/2)**2) * (height * .5)  # Empty space within rocket
    rocket_vol = total_vol - cabin_vol
    mf = rocket_vol * rocket_materials[material]    # Final/dry mass when rocket is empty

    # Calculate mass with fuel level
    fuel_volume = rocket_vol**1.75  # Exponential increase of fuel volume to rocket volume
    final_fuel_mass =  fuel_volume * fuels[fuel_type][0] * fill_percentage
    m0 = mf + final_fuel_mass   # Inital mass with desired fuel added

    # Calculate delta_v w/ Tsiolkovsky rocket equation
    delta_v = fuels[fuel_type][1] * math.log(m0 / mf) 

    return jsonify({'delta_v': delta_v})


if __name__ == '__main__':
    app.run(debug=True)
