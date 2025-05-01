from flask import Blueprint, request, jsonify
from schemas.user_schema import userUnsuscribe
from modelsDb.model_cliente import Cliente
from modelsDb import conexion
from modelsDb.conexion import Session

from marshmallow import ValidationError

usuarios= Blueprint('usuarios', __name__, url_prefix='/usuarios')
session=Session()

@usuarios.get("/")
def usuarios_consulta():
    try:
        nombres=session.query(Cliente.nombre).all()
        solo_nombres = [n[0] for n in nombres]
        print(jsonify(solo_nombres))
        return jsonify(solo_nombres)


    except ValidationError as badValidation:
        print(f"error {badValidation}")

        return "error"




