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
        clientes = session.query(Cliente.cliente_id, Cliente.nombre).all()
        lista_clientes = [{"id": id, "nombre": nombre} for id, nombre in clientes]
        return jsonify(lista_clientes)

    except ValidationError as badValidation:
        print(f"error {badValidation}")
        return "error", 400




