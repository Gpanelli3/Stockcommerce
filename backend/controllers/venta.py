from flask import Blueprint, request
from datetime import datetime,date

#from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import Session
from modelsDb.model_factura import Factura
from sqlalchemy import select
from modelsDb.model_stock import Stock
from modelsDb.model_detafact import DetalleFactura

session=Session()

ventas=Blueprint("ventas", __name__, url_prefix="ventas")

@ventas.post("/")
def ventasProductos():

    cliente_id = request.json["cliente_id"]
    ids_productos=request.json["idsProductos"] #recibe una lista
    descripcion=request.json['descripcion']
    medio_de_pago=request.json['medio_de_pago']
    descuento=request.json['descuento']
    #crear una lista con el id del producto y la cantidad


    #TRAER SOLO LOS PRODUCTOS VENDIDOS
    productos_vendidos = session.execute(
    select(Stock).where(Stock.id_producto.in_(ids_productos))
    ).scalars().all()

    # Suponiendo que Stock tiene un atributo como 'nombre' y 'cantidad'
    for producto in productos_vendidos:
        print(f"Producto ID: {producto.id_producto}, Nombre: {producto.nombre}, Cantidad: {producto.cantidad}")

      # Calcular total
    total_sin_descuento = sum(p.precio_venta for p in productos_vendidos)

    total = total_sin_descuento - (total_sin_descuento * descuento / 100)

     # Crear la factura
    nueva_factura=Factura(id_cliente=cliente_id, fecha=date.today(), descripcion=descripcion, medio_de_pago=medio_de_pago, descuento=descuento, total=total)
    conexion.session.add(nueva_factura)
    conexion.session.commit()
    

    # Obtener el id de la factura después del commit
    factura_id = nueva_factura.nro_factura

    detalles = [] 
    print(request.json["productos"])
    

    for producto in productos_vendidos:
        # Aquí asumes que la cantidad vendida se recibe en el frontend
        cantidad_vendida = request.json["productos"][str(producto.id_producto)]  # Obtener la cantidad de ese producto

        if cantidad_vendida is None:
            return {"error": f"No se especificó cantidad para el producto {producto.id_producto}"}

        
        # Verificar si hay suficiente stock
        if cantidad_vendida > producto.cantidad:
            return {"error": f"No hay suficiente stock para el producto {producto.id_producto}"}

        # Calcular subtotal
        subtotal = producto.precio_venta * cantidad_vendida

        # Crear un objeto DetalleFactura
        detalle = DetalleFactura(
            facturaId=factura_id,
            id_productos=producto.id_producto,
            cantidad=cantidad_vendida,
            subtotal=subtotal
            )
        detalles.append(detalle)  # Agregar al listado de detalles

        total += subtotal  # Acumular en el total de la factura


    # Agregar los detalles de la factura a la base de datos
    try:
        for detalle in detalles:
            conexion.session.add(detalle)
        conexion.session.commit()
    except Exception as e:
        conexion.session.rollback()
        print(f"Error al guardar detalles: {e}")

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