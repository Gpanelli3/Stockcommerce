from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.ext.declarative import declarative_base

Base=declarative_base()
engine = create_engine(
    'mysql+pymysql://genarodesarrollo:password@127.0.0.1:3306/stockControl',
    connect_args={"connect_timeout": 10}
)
Session=sessionmaker(bind=engine)
session=Session()




# esta hecho en FLASK, SQL ALCHEMY Y REACT EN EL FRONT