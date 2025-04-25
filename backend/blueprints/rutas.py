from flask import Blueprint
from stockstorage.backend.controllers.registroCliente import signUp
from controllers.bajaUsuario import bajaUser

apimain= Blueprint('apimain', __name__, url_prefix='/apimain')


apimain.register_blueprint(signUp)
apimain.register_blueprint(bajaUser)
