from flask import Blueprint, request, jsonify
from schemas.user_schema import userUnsuscribe
from modelsDb.model_cliente import Cliente
from modelsDb import conexion
from modelsDb.conexion import session

from marshmallow import ValidationError

clientesEditar= Blueprint('clientesEditar', __name__, url_prefix='/clientesEditar')

@clientesEditar.get("/")
def usuarios_consulta():
    try:
        session.commit()
        clientes = session.query(Cliente.cliente_id, Cliente.nombre, Cliente.dni).all()
        lista_clientes = [{"id": id,  "dni": dni, "nombre": nombre} for id, nombre, dni in clientes]

        return jsonify(lista_clientes)

    except ValidationError as badValidation:
        print(f"error {badValidation}")
        return "error", 400

