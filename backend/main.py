from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import models
from db import SessionLocal


app = FastAPI()

class User(BaseModel):
    fullname: str
    email: str
    number: str
    role: str = 'Student'

class Project(BaseModel):
    projectName: str
    projectDescription: str
    studentID: int
    evaluatorID: int = None
    investorID: int = None
    approved: bool
    evaluatorComment: str = None
    category: str

origins = ['https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    # origins=origins,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)

db = SessionLocal()

@app.post("/api/auth/register", status_code=201)
def register(user: User):
    """
    Posts the user's information during registration
    The information passed as the JSON body is updated to the database

    Returns:
        The project ID
    """
    new_user = models.User(
        fullname=user.fullname,
        email=user.email,
        number=user.number,
        role=user.role,
    )
    db.add(new_user)
    db.commit()
    return {"userId": new_user.userId}

@app.post("/api/users/{userId}/projects/upload", status_code=201)
def upload_project(userId: int, project: Project):
    """
    Posts the project information when student uploads a project
    The information passed as the JSON body is updated to the database

    Returns:
        The project ID
    """
    new_project = models.Project(
        projectName=project.projectName,
        projectDescription=project.projectDescription,
        studentID=userId,
        evaluatorID=project.evaluatorID,
        investorID=project.investorID,
        approved=project.approved,
        evaluatorComment=project.evaluatorComment,
        category=project.category,
    )
    db.add(new_project)
    db.commit()
    return {"projectId": new_project.projectId}

@app.get("/api/users/{userId}/projects", status_code=200)
def get_project(userId: int):
    """
    Gets the user's project information from the database

    Returns:
        A list of Projects uploaded by the students
    """
    my_project = db.query(models.Project).filter(models.Project.studentID==userId).all()
    return my_project

@app.patch("/api/users/{userId}/update", status_code=200)
def update_user(userId: int, user: User):
    """
    Updates the user's information in the database

    Returns:
        The project ID
    """
    # role = db.query(models.User.role).filter(models.User.userId==userId).first()
    my_user = db.query(models.User).filter(models.User.userId==userId).first()
    my_user.fullname = user.fullname
    my_user.email = user.email
    my_user.number = user.number
    # my_user.role = role
    db.commit()
    return {"userId": my_user.userId}
