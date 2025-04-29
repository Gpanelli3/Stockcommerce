from flask import Flask
from flask_cors import CORS
from flask import Blueprint
from blueprints.rutas import apimain
from modelsDb import conexion

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, 
     supports_credentials=True,
     allow_headers=["Content-Type", "Authorization"],
     methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

conexion.Base.metadata.create_all(conexion.engine)
app.register_blueprint(apimain)

@app.route('/')
def hello_world():
    return "Hola, Mundo"

if __name__ == '__main__':
    app.run(debug=True)

       

