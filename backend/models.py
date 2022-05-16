from pydantic import BaseModel

# Sample schema
class User(BaseModel):
    _id: int
    username: str
    password: str
    email: str
    name: str
    is_student: bool