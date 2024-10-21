from flask import Blueprint
from controllers.registroUsuario import signUp
from controllers.bajaUsuario import bajaUser

apimain= Blueprint('apimain', __name__, url_prefix='/apimain')


apimain.register_blueprint(signUp)
apimain.register_blueprint(bajaUser)


