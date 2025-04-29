from flask import Flask, Response, jsonify, request
from flask_cors import CORS
from flask import Blueprint

from blueprints.rutas import apimain
# from modelsDb import conexion

app = Flask(__name__)

CORS(
    app,
    resources={r"*": {"origins": "*"}},
    supports_credentials=True,
    allow_headers=["*"],
)
app.config["CORS_HEADERS"] = "application/json"

# conexion.Base.metadata.create_all(conexion.engine)
app.register_blueprint(apimain)


@app.route("/")
def hello_world():
    response = jsonify({"msg": "Hola, Mundo"})
    response.headers.add("Access-Control-Allow-Origin", "*")
    return response


if __name__ == "__main__":
    app.run (debug=True)