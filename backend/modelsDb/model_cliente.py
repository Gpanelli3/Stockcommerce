from modelsDb import conexion
from sqlalchemy import Column, Integer, String

class Cliente(conexion.Base):
    __tablename__='cliente'

    cliente_id= Column(Integer, autoincrement=True, primary_key=True)
    nombre=Column(String, nullable=False)
    dni= Column(Integer)
    telefono= Column(Integer)
    

 