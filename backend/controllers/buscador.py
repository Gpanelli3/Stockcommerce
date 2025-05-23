from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.model_stock import Stock
from sqlalchemy import select


buscador=Blueprint("buscador", __name__, url_prefix="/buscador")

@buscador.get("/")
def buscar():
    busqueda=request.args.get("producto", "")

    productos = session.query(Stock).filter(Stock.nombre.ilike(f"%{busqueda}%")).all()
    resultados = [{"id": p.id_producto, "name": p.nombre, "costoPrice": p.precio_costo,"salePrice": p.precio_venta,"quantity": p.cantidad } for p in productos]
    return jsonify(resultados)
