from flask import Flask
from flask_cors import CORS
from flask import Blueprint
from blueprints.rutas import apimain
from modelsDb import conexion

app=Flask(__name__)

conexion.Base.metadata.create_all(conexion.engine)
app.register_blueprint(apimain)

CORS(app, resources={r"/api/*": {"origins": "*"}})
app.config['CORS_HEADERS'] = 'Content-Type' 
app.config['Access-Control-Allow-Credentials'] = "true"

@app.route('/')
def hello_world():
    return "Hola, Mundo"

if __name__ == '__main__':
    app.run(debug=True)



