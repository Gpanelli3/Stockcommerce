from flask import Blueprint
#from controllers.bajaUsuario import bajaUser
from controllers.registroCliente import registro
from controllers.ingresoProductos import productos   
from controllers.venta import ventas   
from controllers.usuarios import usuarios


apimain= Blueprint('apimain', __name__, url_prefix='/apimain')

apimain.register_blueprint(registro)
apimain.register_blueprint(productos)
apimain.register_blueprint(ventas)
apimain.register_blueprint(usuarios)




