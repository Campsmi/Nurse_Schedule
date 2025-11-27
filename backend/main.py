
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
    return {"message": "Nurse Scheduler running!"}

@app.get("/nurses")
async def get_nurses():
    query = select(Nurse)
    rows = await database.fetch_all(query)
    return rows

@app.get("/shifts")
async def get_shifts():
    query = select(Shift)
    rows = await database.fetch_all(query)
    return rows