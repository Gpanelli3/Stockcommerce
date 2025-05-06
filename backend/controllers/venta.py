from flask import Blueprint, request
from datetime import datetime,date

#from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.model_factura import Factura
from sqlalchemy import select
from modelsDb.model_stock import Stock
from modelsDb.model_detafact import DetalleFactura


ventas=Blueprint("ventas", __name__, url_prefix="/ventas") #falta terminar este endpoint

@ventas.post("/")
def ventasProductos():
    cliente_id = request.json["cliente_id"]
    descripcion = request.json['descripcion']
    descuento = request.json['descuento']
    medio_de_pago = request.json['medio_de_pago']
    ids_productos = request.json["product_ids"]  # recibe una lista
    cantidades_por_producto = request.json["product_quantities"]  # diccionario tipo {"4": 2, "7": 1}

    detalles = []


    detalle = DetalleFactura(
        facturaId=None,  # lo seteamos después
        id_productos=producto.id_producto,
        cantidad=cantidad_vendida,
        subtotal=subtotal
        )
    detalles.append(detalle)

        # Actualizar el stock
    producto.cantidad -= cantidad_vendida

    # Crear la factura
    nueva_factura = Factura(
        id_cliente=cliente_id,
        fecha=date.today(),
        descripcion=descripcion,
        medio_de_pago=medio_de_pago,
        descuento=descuento,
        total=total
    )
    conexion.session.add(nueva_factura)
    conexion.session.commit()

    # Actualizar facturaId en los detalles
    for detalle in detalles:
        detalle.facturaId = nueva_factura.nro_factura
        conexion.session.add(detalle)

    try:
        conexion.session.commit()
    except Exception as e:
        conexion.session.rollback()
        print(f"Error al guardar detalles: {e}")
        return {"error": "No se pudieron guardar los detalles de la factura."}

    return f'Factura {nueva_factura.nro_factura} cargada en el sistema con {len(detalles)} productos.'

#     {
#     "cliente_id": 12,
#     "idsProductos":[4,7],
#     "productos": {
#         "4":2,
#         "7":1
#     },
#     "descripcion": "dos manaos y un hielo",
#     "medio_de_pago": "efectivo",
#     "descuento": 0


# }