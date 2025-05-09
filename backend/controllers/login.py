from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin

from modelsDb import conexion
from modelsDb.administrador import Administrador
from modelsDb.conexion import session

login=Blueprint("login", __name__, url_prefix="/login")

@login.post("/")
def inicioSesion():
    nombre=request.json["nombre"]
    password=request.json["password"]
    print("viene del front", nombre, password)
    
    usuario = conexion.session.query(Administrador).filter_by(nombre=nombre, password=password).first()

    if usuario:
        return jsonify({"mensaje": "usuario encontrado", "nombre": usuario.nombre,"pass": usuario.password})
    
    else:
        return jsonify({"mensaje": "usuario no encontrado"})