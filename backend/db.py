from sqlalchemy.orm import declarative_base, sessionmaker
from sqlalchemy import create_engine

engine=create_engine('mysql://beingnile:beingnile@localhost/collab', echo=True)

Base=declarative_base()

SessionLocal=sessionmaker(bind=engine)
