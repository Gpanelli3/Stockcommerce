from flask import Blueprint, request
from modelsDb.model_usuario import Usuario
from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError

from modelsDb import conexion

apiUser= Blueprint('signUp', __name__, url_prefix='/signUp')

@apiUser.post('/registroUsuario')
def testUser():
    try:
        email = request.json['email']
        password = request.json['password']
        newUser = {
            "email": email,
            "password": password
        }
        userValidation= userRegisterSchema().load(newUser)
        userValidado= Usuario(email=userValidation['email'], password=userValidation['password'])
        conexion.session.add(userValidado)
        conexion.session.commit()
        return (f'{email} cargado')

    except ValidationError as badValidation:
        print(f'error {badValidation}')


