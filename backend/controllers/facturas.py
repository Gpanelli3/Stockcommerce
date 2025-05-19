from flask import Blueprint, request, jsonify
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.model_factura import Factura
from sqlalchemy import select


facturas=Blueprint("facturas", __name__, url_prefix="/facturas")

@facturas.get("/")
def traerFacturas():
    prod = session.query(
        Factura.nro_factura,
        Factura.id_cliente,
        Factura.fecha,
        Factura.descripcion,
        Factura.medio_de_pago,
        Factura.descuento,
        Factura.total
    ).order_by(Factura.fecha.desc()).all()

    listar_facturas = [
    {
        "nro_factura": nro,
        "id_cliente": cliente,
        "fecha": fecha,
        "descripcion": descripcion,
        "medio_de_pago": pago,
        "descuento": descuento,
        "total": total
    }
    for nro, cliente, fecha, descripcion, pago, descuento, total in prod
]

    return jsonify(listar_facturas)