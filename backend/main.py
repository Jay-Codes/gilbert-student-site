from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Json
import models
from db import SessionLocal


app = FastAPI()

class User(BaseModel):
    fullname: str
    email: str
    number: str
    role: str

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
    new_user = models.User(
        fullname=user.fullname,
        email=user.email,
        number=user.number,
        role=user.role,
    )
    db.add(new_user)
    db.commit()
    return {"userId": new_user.userId}

# Yet to be fixed
@app.post("/api/project/upload/{userId}", status_code=201)
def upload_project(userId: int, project: Project):
    new_project = models.Project(
        projectName=project.projectName,
        projectDescription=project.projectDescription,
        studentID={userId},
        evaluatorID=project.evaluatorID,
        investorID=project.investorID,
        approved=project.approved,
        evaluatorComment=project.evaluatorComment,
        category=project.category,
    )
    db.add(new_project)
    db.commit()
    return {"projectId": new_project.projectId}

@app.get("/api/project/{userId}", status_code=200)
def get_project(userId: int):
    my_project = db.query(models.Project).filter(models.Project.studentID==userId).all()
    return my_project