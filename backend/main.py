from flask import Flask
from flask_cors import CORS
from flask import Blueprint
from blueprints.rutas import apimain

from app import create_app

app = create_app()
app.register_blueprint(apimain)

@app.route('/')
def hello_world():
    return "Hola, Mundo"



if __name__ == '__main__':
    app.run(debug=True)

