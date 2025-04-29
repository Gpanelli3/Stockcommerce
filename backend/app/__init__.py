from flask import Flask
from flask_cors import CORS
from modelsDb import conexion

def create_app():
    app=Flask(__name__)
    #Esta linea lo que hace es ver si no esta creada la tabla, la crea
    CORS(app)
    conexion.Base.metadata.create_all(conexion.engine)


    return app
