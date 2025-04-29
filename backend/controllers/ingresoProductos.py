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
    if request.method == "OPTIONS":
        # Responde correctamente a la solicitud OPTIONS sin redirección
        return '', 200  # OK con respuesta vacía

    try:
        nombre=request.json["name"]
        proveedor=request.json["supplier"]
        categoria=request.json["category"]
        cantidad=request.json["quantity"]
        precio_costo=request.json["costPrice"]
        precio_venta=request.json["salePrice"]

        producto=Stock(nombre=nombre,cantidad=cantidad,precio_costo=precio_costo,precio_venta=precio_venta,categoria=categoria, id_proveedor=proveedor)
        conexion.session.add(producto)
        conexion.session.commit()
        return(f'{nombre} cargado en el sistema')


    except ValidationError as badValidation:
        print(f"error {badValidation}")



