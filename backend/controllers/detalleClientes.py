from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.model_detafact import DetalleFactura
from sqlalchemy import select

detalle=Blueprint("detalle", __name__, url_prefix="/detalle")

@detalle.get("/")
def traerDetalles():
    ultimo_id_factura = session.query(DetalleFactura.facturaId).order_by(DetalleFactura.facturaId.desc()).first()
    if ultimo_id_factura:
        prod = session.query(
            DetalleFactura.idDetalle,
            DetalleFactura.facturaId,
            DetalleFactura.id_productos,
            DetalleFactura.cantidad,
            DetalleFactura.subtotal,
        ).filter(DetalleFactura.facturaId == ultimo_id_factura[0]).all()
    else:
        prod = []

    listar_detalle = [{
        "nroDetalle": nro,
        "factura": factura,
        "producto": producto,
        "cantidad": cantidad,
        "subtotal": subtotal
    } for nro, factura, producto, cantidad, subtotal in prod]

    return jsonify(listar_detalle)
