from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from sqlalchemy import select
from modelsDb.model_cliente import Cliente


verClientes=Blueprint("verClientes", __name__, url_prefix="/verClientes")

@verClientes.get("/")
def verCli():
    try:
        clientes = session.query(
            Cliente.cliente_id,
            Cliente.nombre,
            Cliente.dni,
            Cliente.telefono
        ).all()

        lista_clientes = [
            {
                "id": cliente_id,
                "nombre": nombre,
                "telefono": telefono,
                "dni": dni
            }
            for cliente_id, nombre, dni, telefono in clientes
        ]

        return jsonify(lista_clientes)

    except Exception as e:
        return jsonify({"error": str(e)}), 500