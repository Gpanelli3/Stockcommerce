from backend.modelsDb import conexion
import conexion
from conexion import Session
from sqlalchemy import Column, Integer, String

class Cliente(conexion.Base):
    __tablename__='cliente'

    cliente_id= Column(Integer, autoincrement=True, primary_key=True)
    nombre=Column(String, nullable=False)
    dni= Column(Integer)
    telefono= Column(Integer)
    

    def __init__(self,nombre,dni,telefono):
        self.nombre=nombre
        self.dni=dni
        self.telefono=telefono

session=Session()
usuarios=session.query(Cliente).all()

for u in usuarios:
    print(u.nombre, u.dni, u.telefono)