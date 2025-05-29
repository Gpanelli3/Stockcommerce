from flask import Blueprint, request, jsonify
from flask_cors import CORS, cross_origin
from sqlalchemy import update, delete
#from schemas.user_schema import userRegisterSchema
from marshmallow import ValidationError

from modelsDb import conexion
from modelsDb.conexion import session
from modelsDb.model_stock import Stock
from modelsDb.model_detafact import DetalleFactura


#UPDATE `stockControl`.`stock` SET `cantidad` = '20', `precio_costo` = '1500', `precio_venta` = '2500' WHERE (`id_producto` = '1');

borrarProductos=Blueprint("borrarProductos", __name__, url_prefix="/borrarProductos")

@borrarProductos.post("/")
def borrar():
    try:
        producto=request.json["producto"]


        # session.execute(delete(DetalleFactura).where(DetalleFactura.id_productos == producto))
        session.execute(delete(Stock).where(Stock.id_producto == producto))
        session.commit()

        session.commit()

        return jsonify(f'numero {producto} de producto borrado correctamente')
    except ValidationError as badValidation:
        print(f"error {badValidation}")
        return jsonify({"error": "Error de validación", "detalle": str(badValidation)}), 400