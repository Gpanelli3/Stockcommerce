from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base=declarative_base()
engine= create_engine('mysql+pymysql://genarodesarrollo:password@localhost:3306/stockControl')
Session=sessionmaker(bind=engine)
session=Session()

#la idea seria usar por ahora la base de datos en el workbench para avanzar en el proyecto. (working)

#debo cambiar la conexion al workbench, ya que esta con docker compose.


# INGRESO PRODUCTOS
# GENERAR VENTAS
# INGRESO DE CLIENTES
# INCORPORAR API DE MP
