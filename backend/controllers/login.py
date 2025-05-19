from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy import update
#from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.administrador import Administrador

login=Blueprint("login", __name__, url_prefix="/login")

@login.post("/")
def inicioSesion():
    nombre=request.json["nombre"]
    password=request.json["password"]
    
    usuario = conexion.session.query(Administrador).filter_by(nombre=nombre, password=password).first()

    if usuario:
        return jsonify({"mensaje": "usuario encontrado", "nombre": usuario.nombre,"pass": usuario.password})
    
    else:
        return jsonify({"mensaje": "usuario no encontrado"})
    
#     {
#     "nombre": "genaro",
#     "password": 123456
# }