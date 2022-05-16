from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Student

app = FastAPI()


origins = ['https://localhost:3000']

app.add_middleware(
    CORSMiddleware,
    # origins=origins,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*'],
)