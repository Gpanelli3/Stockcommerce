from flask import Flask
from flask_cors import CORS
from flask import Blueprint
from controllers.registroCliente import registro

from app import create_app

app = create_app()
app.register_blueprint(registro)

@app.route('/')
def hello_world():
    return "Hola, Mundo"



if __name__ == '__main__':
    app.run(debug=True)

