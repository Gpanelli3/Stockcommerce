from modelsDb import conexion
from sqlalchemy import Column, Integer, String

class Categoria(conexion.Base):
    __tablename__='categoria'

    id_categoria=Column(Integer,nullable=False, autoincrement=True, primary_key=True)
    categoria_producto=Column(String(50), nullable=False)