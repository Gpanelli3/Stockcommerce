from modelsDb import conexion
from sqlalchemy import Column, Integer

class DetalleFactura(conexion.Base):
     
     __tablename__='detalle_Factura'
     
     idDetalle= Column(Integer, autoincrement=True, primary_key=True)
     facturaId= Column(Integer)#clave foranea con factura
     id_producto= Column(Integer)#clave foranea productos
     cantidad=Column(Integer, nullable=False )
     subtotal=Column(Integer, nullable=False )
   