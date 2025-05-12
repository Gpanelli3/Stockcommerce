from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy import update
#from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.model_stock import Stock

#UPDATE `stockControl`.`stock` SET `cantidad` = '20', `precio_costo` = '1500', `precio_venta` = '2500' WHERE (`id_producto` = '1');

editarProductos=Blueprint("editarProductos", __name__, url_prefix="/editarProductos")

@editarProductos.post("/")
def editar():
    try:
        producto=request.json["producto"]
        cantidadPr=request.json["cantidad"]
        costo=request.json["precio_costo"]
        venta=request.json["precio_venta"]


        stment=(update(Stock).where(Stock.id_producto == producto).values(cantidad=cantidadPr, precio_costo=costo, precio_venta=venta))
        session.execute(stment)
        session.commit()

        return jsonify(f'numero {producto} de producto editado correctamente')
    except ValidationError as badValidation:
        print(f"error {badValidation}")
        return jsonify({"error": "Error de validación", "detalle": str(badValidation)}), 400

#PRODUCTOS LISTA
productosParaEditar=Blueprint("productosParaEditar", __name__, url_prefix="/productosParaEditar")

@productosParaEditar.get("/")
def traer_productos():
    try:
        prod=session.query(Stock.id_producto, Stock.nombre, Stock.precio_venta,Stock.precio_costo ,Stock.cantidad) #ver luego si puedo traer la cantidad tambien
        listar_productos=[{"id": id, "name":nombre_producto, "costPrice": precio_costo , "salePrice":precio_venta,"quantity": cantidad} for id, nombre_producto, precio_costo,precio_venta, cantidad in prod]

        return jsonify(listar_productos)
    
    except ValidationError as badValidation:
        print(f"error {badValidation}")
        return "error", 400