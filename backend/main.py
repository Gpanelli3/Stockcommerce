from flask import Flask
from flask_cors import CORS
from flask import Blueprint
from blueprints.rutas import apimain
from modelsDb import conexion
from controllers.ingresoProductos import productos   

app = Flask(__name__)
CORS(app)
# CORS(app, resources={r"/*": {"origins": "*"}}, 
#      supports_credentials=True,
#      allow_headers=["Content-Type", "Authorization"],
#      methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"])

# CORS(app, resources={r"*": {"origins":"*"}})
# app.config["CORS_HEADERS"]="application/json"

# @app.after_request
# def add_cors_headers(response):
#     response.headers.add("Access-Control-Allow-Origin", "*")
#     response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")
#     response.headers.add("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS")

conexion.Base.metadata.create_all(conexion.engine)
app.register_blueprint(apimain, url_prefix="/apimain")

@app.route('/')
def hello_world():
    return "Hola, Mundo"

if __name__ == '__main__':
    app.run(debug=True)

       

