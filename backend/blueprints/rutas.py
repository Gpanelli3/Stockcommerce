from flask import Blueprint
#from controllers.bajaUsuario import bajaUser
from controllers.registroCliente import registro
from controllers.ingresoProductos import ingresoProductos   
from controllers.venta import ventas   
from controllers.usuarios import usuarios
from controllers.productos import productos
from controllers.explorarProductos import catalogoProductos
from controllers.login import login
from controllers.editarProductos import editarProductos
from controllers.editarProductos import productosParaEditar
from controllers.estadisticas import ventasMes
from controllers.estadisticas import masVendido

apimain= Blueprint('apimain', __name__, url_prefix='/apimain')

apimain.register_blueprint(registro)
apimain.register_blueprint(ingresoProductos)
apimain.register_blueprint(ventas)
apimain.register_blueprint(usuarios)
apimain.register_blueprint(productos)
apimain.register_blueprint(catalogoProductos)
apimain.register_blueprint(login)
apimain.register_blueprint(editarProductos)
apimain.register_blueprint(productosParaEditar)
apimain.register_blueprint(ventasMes)
apimain.register_blueprint(masVendido)









