from modelsDb import conexion
from sqlalchemy import Column, Integer, String

class Categoria(conexion.Base):
    __tablename__='categoria'

    idCategoria=Column(Integer,nullable=False, autoincrement=True)
    categoriaProducto=Column(String(50), nullable=False)

    def __init__(self,categoria):
        self.categoria=categoria