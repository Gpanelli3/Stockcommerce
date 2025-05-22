from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy import update
#from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.model_cliente import Cliente

editarCliente=Blueprint("editarCliente", __name__, url_prefix="/editarCliente")

@editarCliente.post("/")
def editarCli():
    try:
        name= request.json["nombre"]
        dni= request.json["dni"]
        phone= request.json["telefono"]

        stment=(update(Cliente).where(Cliente.dni == dni).values(nombre=name, telefono=phone))
        session.execute(stment)
        session.commit()
        return jsonify(f'cliente editado correctamente:{name}' )
    
    except ValidationError as badValidation:
        print(f"error {badValidation}")
        return jsonify({"error": "Error de validación", "detalle": str(badValidation)}), 400