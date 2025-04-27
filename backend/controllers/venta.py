from flask import Blueprint, request
from datetime import datetime

#from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import Session
from modelsDb.model_factura import Factura
from sqlalchemy import select
from modelsDb.model_stock import Stock

session=Session()

ventas=Blueprint("ventas", __name__, url_prefix="ventas")

@ventas.post("/")
def ventasProductos():
        #cliente_id = request.json["idCliente"]

    prod = session.execute(select(Stock)).scalars().all()

        # Imprimir los resultados
    for p in prod:
        print(p.nombre)
    
    return p.nombre, p.cantidad
        #productos = request.json["productos"]  # Listado de productos deberia traerlos de la base de datos
