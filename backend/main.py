
from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy.orm import Session
from models import Nurse, Shift
from sqlalchemy import select

import crud, models, schemas
from db import engine, get_db

models.Base.metadata.create_all(bind=engine)

app = FastAPI()


@app.get("/")
async def root():
    return {"message": "Nurse Scheduler API running!"}

@app.get("/nurses", response_model=list[schemas.NurseRead])
def get_all_nurses(db: Session = Depends(get_db)):
    return crud.get_all_nurses(db)


@app.post("/addnurses")
def create_nurse(nurse: schemas.NurseCreate, db: Session = Depends(get_db)):
    return crud.create_nurse(db, nurse)


@app.get("/shifts", response_model=list[schemas.ShiftRead])
def get_all_shifts(db: Session = Depends(get_db)):
    return crud.get_all_shifts(db)

@app.post("/addshifts")
def create_nurse(shift: schemas.NurseCreate, db: Session = Depends(get_db)):
    return crud.create_shift(db, shift)