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


ventas=Blueprint("ventas", __name__, url_prefix="ventas")

@ventas.post("/")
def ventasProductos():
    cliente_id = request.json["cliente_id"]
    ids_productos = request.json["idsProductos"]  # recibe una lista
    descripcion = request.json['descripcion']
    medio_de_pago = request.json['medio_de_pago']
    descuento = request.json['descuento']
    cantidades_por_producto = request.json["productos"]  # diccionario tipo {"4": 2, "7": 1}

    # TRAER SOLO LOS PRODUCTOS VENDIDOS
    productos_vendidos = session.execute(
        select(Stock).where(Stock.id_producto.in_(ids_productos))
    ).scalars().all()

    detalles = []
    total_sin_descuento = 0

    # Calcular subtotales, verificar stock y crear detalles
    for producto in productos_vendidos:
        cantidad_vendida = cantidades_por_producto.get(str(producto.id_producto), 0)

        if cantidad_vendida > producto.cantidad:
            return {"error": f"No hay suficiente stock para el producto {producto.id_producto}"}

        subtotal = producto.precio_venta * cantidad_vendida
        total_sin_descuento += subtotal

        detalle = DetalleFactura(
            facturaId=None,  # lo seteamos después
            id_productos=producto.id_producto,
            cantidad=cantidad_vendida,
            subtotal=subtotal
        )
        detalles.append(detalle)

        # Actualizar el stock
        producto.cantidad -= cantidad_vendida

    # Aplicar descuento
    total = total_sin_descuento - (total_sin_descuento * descuento / 100)

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