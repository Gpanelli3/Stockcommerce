from flask import Blueprint, request

#from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.model_cliente import Cliente
from modelsDb.conexion import session


registro= Blueprint('registroCliente', __name__, url_prefix='/registroCliente')

@registro.post('/')
def registroCliente():
    try:
        nombre = request.json['name']
        dni = request.json['dni']
        telefono= request.json['phone']
        newUser = {
            "nombre": nombre,
            "dni": dni,
            "telefono": telefono
        }
        #userValidation= userRegisterSchema().load(newUser)
        #userValidado= Cliente(email=userValidation['email'], password=userValidation['password'])

        nuevoUsuario=Cliente( nombre=nombre, dni=dni, telefono=telefono)
        conexion.session.add(nuevoUsuario)
        conexion.session.commit()
        return (f'{nombre} cargado')

    except ValidationError as badValidation:
        print(f'error {badValidation}')


