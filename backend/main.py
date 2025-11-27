
from fastapi import FastAPI
from db import database  # your Database instance from db.py
from models import Nurse, Shift, mapper_registry
from sqlalchemy import select

app = FastAPI()

@app.lifespan("startup")
async def startup():
    await database.connect()

@app.lifespan("shutdown")
async def shutdown():
    await database.disconnect()

@app.get("/")
async def root():
    return {"message": "Nurse Scheduler API is running!"}