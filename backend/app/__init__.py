from flask import Flask
from flask_cors import CORS
from backend.modelsDb import conexion
from backend.controllers.registroCliente import registro

def create_app():
    app=Flask(__name__)
    #Esta linea lo que hace es ver si no esta creada la tabla, la crea
    conexion.Base.metadata.create_all(conexion.engine)
    CORS(app)


    return app
