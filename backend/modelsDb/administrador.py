from modelsDb import conexion
from sqlalchemy import Column, Integer, String

class Administrador(conexion.Base):
    __tablename__='administrador'

    idAdministrador= Column(Integer, autoincrement=True, primary_key=True)
    nombre=Column(String, nullable=False)
    dni= Column(Integer, nullable=False)
    telefono= Column(Integer, nullable=False)
                     
    def __init__(self,idCliente,nombre,dni,telefono):
        self.idCliente=idCliente
        self.nombre=nombre
        self.dni=dni
        self.telefono=telefono




