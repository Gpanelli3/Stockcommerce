from flask import Blueprint, request, jsonify
from datetime import datetime,date

#from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError
from sqlalchemy import select, extract, func
from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.model_factura import Factura
from sqlalchemy import select
from modelsDb.model_stock import Stock
from modelsDb.model_detafact import DetalleFactura


ventasMes=Blueprint("ventasMes", __name__, url_prefix="/ventasMes") 
masVendido=Blueprint("masVendido", __name__, url_prefix="/masVendido") 


@ventasMes.post("/")
def datos():
    #VENTAS TOTALES DEL AÑO, hacer una seleccion para el mes y listo
    mes=request.json["mes"]

    ventas = (
    select(func.sum(Factura.total).label("suma"))
    .where(extract('month', Factura.fecha) == mes)
)
    result = session.execute(ventas).scalar()

    return jsonify(f"las ventas totales del {mes} es de: {result or 0}")




@masVendido.get("/")
def vendido():
    stmt = (
        select(
            DetalleFactura.id_productos,
            func.count().label("mas_vendido"),
            Stock.nombre
        )
        .join(Stock, DetalleFactura.id_productos == Stock.id_producto)
        .group_by(DetalleFactura.id_productos, Stock.nombre)
        .order_by(func.count().desc())
        .limit(1)
    )

    result = session.execute(stmt).first()

    if result:
        id_productos, mas_vendido, nombre = result
        return jsonify({
            "id_producto": id_productos,
            "cantidad_vendida": mas_vendido,
            "nombre_producto": nombre
        })
    else:
        return jsonify({"mensaje": "No hay datos"}), 404
