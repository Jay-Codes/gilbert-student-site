from pydantic import BaseModel

# Sample schema
class User(BaseModel):
    _id: int
    username: str
    password: str
    email: str
    name: str
    is_student: bool
    is_investor: bool
    is_evaluator: bool

class Project(BaseModel):
    _id: int
    name: str
    description: str
    status: str
    owner: str
    evaluators: list
    investors: list
    evaluations: list