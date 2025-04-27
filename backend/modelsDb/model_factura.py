from modelsDb import conexion
from sqlalchemy import Column, Integer, String, Date

class Factura(conexion.Base):
    __tablename__='factura'

    nroFactura= Column(Integer, autoincrement=True, primary_key=True)
    id_cliente=Column(Integer,nullable=False) #aca va la relacion con cliente
    fecha=Column(Date,nullable=False)
    descripcion=Column(String, nullable=False )
    medioDePago=Column(Integer, nullable=False )
    descuento=Column(Integer,nullable=False)
    total=Column(Integer,nullable=False) 

    def __init__(self,nroFactura,idCLiente,fecha,descripcion,medioDePago,descuento,total):
        self.nroFactura=nroFactura
        self.id_cliente=idCLiente
        self.fecha=fecha
        self.descripcion=descripcion
        self.medioDePago=medioDePago
        self.descuento=descuento
        self.total=total