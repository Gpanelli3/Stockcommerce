from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.model_detafact import DetalleFactura
from modelsDb.model_stock import Stock
from modelsDb.model_factura import Factura
from sqlalchemy import select


detalle=Blueprint("detalle", __name__, url_prefix="/detalle")

@detalle.get("/")
def traerDetalles():
    ultimo_id_factura = session.query(DetalleFactura.facturaId).order_by(DetalleFactura.facturaId.desc()).first()
    if ultimo_id_factura:
        prod = session.query(
            DetalleFactura.idDetalle,
            DetalleFactura.facturaId,
            Stock.nombre,
            Stock.precio_venta,
            DetalleFactura.cantidad,
            DetalleFactura.subtotal
            ).join(Stock, DetalleFactura.id_productos == Stock.id_producto) \
            .filter(DetalleFactura.facturaId == ultimo_id_factura[0]).all()
        # total_factura = session.query(Factura.total).filter(Factura.nro_factura == ultimo_id_factura[0]).first()

    else:
        prod = []

    resultado = [
    {
        "nroDetalle": d.idDetalle,
        "factura": d.facturaId,
        "producto": d.nombre,   # este es el nombre del producto
        "precio": d.precio_venta,
        "cantidad": d.cantidad,
        "subtotal": d.subtotal
    } for d in prod
]

    return jsonify(resultado)
