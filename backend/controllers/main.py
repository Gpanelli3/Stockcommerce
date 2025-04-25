from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Esto habilita CORS para todas las rutas

@app.route('/')
def hello_world():
    return "Hola, Mundo"

if __name__ == '__main__':
    app.run(debug=True)