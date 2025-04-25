from flask import Blueprint, request
from modelsDb.model_cliente import Cliente
from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import Session

session=Session()

apiUser= Blueprint('signUp', __name__, url_prefix='/signUp')

@apiUser.post('/registroCliente')
def testUser():
    try:
        nombre = request.json['nombre']
        dni = request.json['dni']
        telefono= request.json['telefono']
        newUser = {
            "nombre": nombre,
            "dni": dni,
            "telefono": telefono
        }
        #userValidation= userRegisterSchema().load(newUser)
        #userValidado= Cliente(email=userValidation['email'], password=userValidation['password'])

        conexion.session.add(newUser)
        conexion.session.commit()
        return (f'{nombre} cargado')

    except ValidationError as badValidation:
        print(f'error {badValidation}')


