from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.model_stock import Stock
from sqlalchemy import select
from modelsDb.model_categoria import Categoria
from modelsDb.model_proveedor import Proveedor


catalogoProductos=Blueprint("catalogoProductos", __name__, url_prefix="/catalogoProductos")

@catalogoProductos.get("/")
def productos():
    try:
        prod = session.query(
        Stock.id_producto, Stock.nombre, Stock.cantidad,
        Stock.precio_costo, Stock.precio_venta,
        Proveedor.empresa, Categoria.categoria_producto
         ).join(Categoria, Stock.categoria == Categoria.id_categoria
        ).join(Proveedor, Stock.id_proveedor == Proveedor.id_proveedor
        ).all()
        
        listar_productos = [
    {
        "id": id,
        "name": nombre_producto,
        "quantity": cantidad,
        "costPrice": precio_costo,
        "salePrice": precio_venta,
        "supplier": empresa,
        "category": categoria
    }
        for id, nombre_producto, cantidad, precio_costo, precio_venta, empresa, categoria in prod
]

        return jsonify(listar_productos)
    
    except ValidationError as badValidation:
        print(f"error {badValidation}")
        return "error", 400