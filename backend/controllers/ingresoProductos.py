from flask import Blueprint, request

#from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import Session
from modelsDb.model_stock import Stock

session=Session()


productos=Blueprint("ingresoProductos", __name__, url_prefix="ingresoProductos")

@productos.post("/")
def ingresoProductos():
    try:
        nombre=request.json["nombre"]
        proveedor=request.json["proveedor"]
        categoria=request.json["categoria"]
        cantidad=request.json["cantidad"]
        precio_costo=request.json["precio_costo"]
        precio_venta=request.json["precio_venta"]

        producto=Stock(nombre=nombre,cantidad=cantidad,precio_costo=precio_costo,precio_venta=precio_venta,categoria=categoria, id_proveedor=proveedor)
        conexion.session.add(producto)
        conexion.session.commit()
        return(f'{nombre} cargado en el sistema')


    except ValidationError as badValidation:
        print(f"error {badValidation}")



