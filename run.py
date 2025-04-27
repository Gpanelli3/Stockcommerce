from flask import Flask
from flask_cors import CORS
from flask import Blueprint

from backend.app import create_app

app = create_app()

@app.route('/')
def hello_world():
    return "Hola, Mundo"

if __name__ == '__main__':
    app.run(debug=True)

