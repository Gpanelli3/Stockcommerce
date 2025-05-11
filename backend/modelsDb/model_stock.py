from modelsDb import conexion
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

class Stock(conexion.Base):
     
     __tablename__='stock'

     id_producto=Column(Integer, autoincrement=True, primary_key=True)
     nombre=Column(String,nullable=False)
     cantidad=Column(Integer,nullable=False)
     precio_costo=Column(Integer,nullable=False)
     precio_venta=Column(Integer,nullable=False)
     id_proveedor=Column(Integer, ForeignKey("proveedores.id_proveedor"))
     categoria = Column(Integer, ForeignKey('categoria.id_categoria'))

     idcategoria = relationship("Categoria")
     idproveedor=relationship("Proveedor")