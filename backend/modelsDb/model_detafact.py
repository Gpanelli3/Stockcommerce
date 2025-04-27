from modelsDb import conexion
from sqlalchemy import Column, Integer

class DetalleFactura(conexion.Base):
     
     __tablename__='detalle_Factura'
     
     idDetalle= Column(Integer, autoincrement=True, primary_key=True)
     cantidad=Column(Integer, nullable=False )
     total=Column(Integer, nullable=False )
     facturaID= Column(Integer)#clave foranea con factura
     idProductos= Column(Integer)#clave foranea productos
   
     def __init__(self,idDetalle,cantidad,total,facturaId,idProductos):
         self.idDetalle=idDetalle
         self.cantidad=cantidad
         self.facturaID=facturaId
         self.idProductos=idProductos
         self.total=total