from modelsDb import conexion
from sqlalchemy import Column, Integer, String

class Proveedor(conexion.Base):
    __tablename__='proveedores'

    id_proveedor= Column(Integer, autoincrement=True, primary_key=True)
    direccion=Column(String(100),nullable=False)
    empresa=Column(String(100),nullable=False)
    telefono=Column(Integer, nullable=False )
