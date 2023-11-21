from flask import Flask, jsonify
from flask_cors import CORS

def createDataSet():

    # Ejemplo
    data = [

  {
    'lane': 'E2',
    'arrivalTime': 0.5,
    'queuePosition': 0,
    'processTime': 10.445663385136658,
    'verificationType': 'Qr',
    'verificationState': 'Pendiente'

  },

  {
    'lane': 'E2',
    'arrivalTime': 0.633,
    'queuePosition': 0,
    'processTime': 10.973850955396038,
    'verificationType': 'Qr',
    'verificationState': 'Pendiente'

  },

  {
    'lane': 'S2',
    'arrivalTime': 1.000,
    'queuePosition': 0,
    'processTime': 3.8875715114826983,
    'verificationType': 'Tarjeta',
    'verificationState': 'Pendiente'

  },

  {
    'lane': 'S2',
    'arrivalTime': 1.500,
    'queuePosition': 0,
    'processTime': 3.8875715114826983,
    'verificationType': 'Tarjeta',
    'verificationState': 'Pendiente'
  },


]
    return data

app = Flask(__name__)
CORS(app)

@app.route('/')
def json_endpoint():
    data = createDataSet()
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
