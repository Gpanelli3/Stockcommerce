from modelsDb import conexion
from sqlalchemy import Column, Integer, String, Date

class Factura(conexion.Base):
    __tablename__='factura'

    nro_factura= Column(Integer, autoincrement=True, primary_key=True)
    id_cliente=Column(Integer,nullable=False) #aca va la relacion con cliente
    fecha=Column(Date,nullable=False)
    descripcion=Column(String, nullable=False )
    medio_de_pago=Column(Integer, nullable=False )
    descuento=Column(Integer,nullable=False)
    total=Column(Integer,nullable=False) 

