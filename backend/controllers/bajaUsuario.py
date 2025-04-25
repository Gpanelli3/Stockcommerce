from flask import Blueprint, request
from schemas.user_schema import userUnsuscribe
from stockstorage.backend.modelsDb.model_cliente import Usuario
from modelsDb import conexion
from modelsDb.conexion import session



bajaUser= Blueprint('bajaUser', __name__, url_prefix='/bajaUser')

@bajaUser.post("/bajaUsuario")
def bajaUsuario():
    try:
        email=request.json.get("email")

        user={"email": email}
        #userValidation=userUnsuscribe().load(user)
        usuario=session.query(Usuario).filter_by(email=email).first()

        if usuario:
       
            conexion.session.delete(usuario)
            conexion.session.commit()
            print("none")
            return(f'{email} eliminado')
        else:
            return (f'usuario {email} no encontrado')

    except Exception as e:
        return (f'error {e}'),500









