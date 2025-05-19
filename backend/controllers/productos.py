from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.model_stock import Stock
from sqlalchemy import select


productos=Blueprint("productos", __name__, url_prefix="/productos")

@productos.get("/")
def traer_productos():
    try:
        prod=session.query(Stock.id_producto, Stock.nombre, Stock.precio_venta, Stock.cantidad)
        listar_productos=[{"id": id, "name":nombre_producto, "price": precio, "stock": stock} for id, nombre_producto, precio, stock in prod]

        return jsonify(listar_productos)
    
    except ValidationError as badValidation:
        print(f"error {badValidation}")
        return "error", 400