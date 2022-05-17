from db import Base, engine
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, Text

# Sample schema
class User(Base):
    __tablename__ = 'users'
    userId = Column(Integer, primary_key=True)
    fullname = Column(String(60), nullable=False)
    email = Column(String(30), nullable=False)
    number = Column(String(20), nullable=False)
    role = Column(String(20), nullable=False)

class Project(Base):
    __tablename__ = 'projects'
    projectId = Column(Integer, primary_key=True)
    projectName = Column(String(60), nullable=False)
    projectDescription = Column(Text, nullable=False)
    studentID = Column(Integer, ForeignKey('users.userId'), nullable=True)
    evaluatorID = Column(Integer, ForeignKey('users.userId'), nullable=True) 
    investorID = Column(Integer, ForeignKey('users.userId'), nullable=True)
    approved = Column(Boolean, nullable=False)
    evaluatorComment = Column(Text, nullable=True)
    category = Column(String(20), nullable=False)

Base.metadata.create_all(bind=engine)