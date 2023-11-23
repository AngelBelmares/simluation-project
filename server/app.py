from flask import Flask, jsonify
from flask_cors import CORS
import numpy as np

def createDataSet():
    # Define the probabilities
    lane_probs = [0.428098714, 0.114763731, 0.382916873, 0.074220683]
    verificationType_probs = [0.810582632, 0.189417368]
    beta = 1 / 0.053465608

    # Define the categories
    lanes = ['E1', 'E2', 'S1', 'S2']
    verificationTypes = ['Tarjeta', 'Qr']

    # Initialize the data
    data = []

    # Generate data until the sum reaches or exceeds 86000
    suma_acumulada = 0
    while suma_acumulada < 86000:
        dato = np.random.exponential(beta)
        suma_acumulada += dato
        if suma_acumulada <= 86000:
            data.append({
                'lane': np.random.choice(lanes, p=lane_probs),
                'arrivalTime': round(suma_acumulada, 3),
                'queuePosition': 0,
                'processTime': np.random.exponential(scale=1) + 3,
                'verificationType': np.random.choice(verificationTypes, p=verificationType_probs),
                'verificationState': 'Pendiente'
            })

    return data

app = Flask(__name__)
CORS(app)

@app.route('/')
def json_endpoint():
    data = createDataSet()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
