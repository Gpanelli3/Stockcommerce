from flask import Blueprint
from backend.controllers.registroCliente import apiUser
from controllers.bajaUsuario import bajaUser
from controllers.registroCliente import registro

apimain= Blueprint('apimain', __name__, url_prefix='/apimain')

apimain.register_blueprint(registro)
apimain.register_blueprint(bajaUser)

