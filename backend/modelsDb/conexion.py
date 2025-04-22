from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base=declarative_base()
engine= create_engine('mysql+pymysql://usuario:root@database:3306/stockcommerce')
Session=sessionmaker(bind=engine)
session=Session()

#la idea seria usar por ahora la base de datos en el workbench para avanzar en el proyecto.

#debo cambiar la conexion al workbench, ya que esta con docker compose.


# INGRESO PRODUCTOS
# GENERAR VENTAS
# INGRESO DE CLIENTES
# INCORPORAR API DE MP
