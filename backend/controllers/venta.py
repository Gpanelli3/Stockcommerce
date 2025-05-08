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

#determinar en el front la validacion de las cantidades de cada producto
#mejorar: cuando la venta es exitosa, que se borren los numeros de las casillas
#ver despues bien el session

ventas=Blueprint("ventas", __name__, url_prefix="/ventas") #falta terminar este endpoint

@ventas.post("/")
def ventasProductos():
    cliente_id = request.json["cliente_id"]
    descripcion = request.json['descripcion']
    medio_de_pago = request.json['medio_de_pago']
    product_ids = request.json["product_ids"]  # recibe una lista
    cantidades_por_producto = request.json["product_quantities"]  # diccionario tipo {"4": 2, "7": 1}
    subtotal=request.json["subtotal"] 
    detalles = []

    #cantidad_vendida = cantidades_por_producto.get(producto, 0)

    for id, cantidad in cantidades_por_producto.items():
        id_prod=int(id)

        stock=conexion.session.query(Stock).filter_by(id_producto=id_prod).first()
        print("el producto", stock.nombre, "y la cantidad", stock.cantidad)

        if stock and stock.cantidad > 1:
            stock.cantidad-=cantidad # tratando de disminuir la cantidad en el stock

            precio_producto=stock.precio_venta
            tot=precio_producto*cantidad

            detalle = DetalleFactura(
                facturaId=None,  # lo seteamos después
                id_productos=int(id),
                cantidad=cantidad,
                subtotal=tot 
            )
            detalles.append(detalle)
        else:
            return "No se puede realizar ya que falta mercaderia. Revisar Stock"

    # Crear la factura
    nueva_factura = Factura(
        id_cliente=cliente_id,
        fecha=date.today(),
        descripcion=descripcion,
        medio_de_pago=medio_de_pago,
        total=subtotal
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
        print(f"Error al guardar detalles: {e}")
        return {"error": "No se pudieron guardar los detalles de la factura."}

    return f'Factura {nueva_factura.nro_factura} cargada en el sistema con {len(detalles)} productos.'