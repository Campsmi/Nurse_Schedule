
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
def create_shift(shift: schemas.ShiftCreate, db: Session = Depends(get_db)):
    return crud.create_shift(db, shift)


@app.post("/addassignments")
def create_assignment(assignment: schemas.AssignmentCreate, db: Session = Depends(get_db)):
    return crud.create_assignment(db, assignment.nurse_id, assignment.shift_id)

@app.get("/assignments")
def get_assignments(db: Session = Depends(get_db)):
    return crud.get_assignments(db)

@app.get("/assignments/nurse/{nurse_id}")
def get_assignments_for_nurse(nurse_id: int, db: Session = Depends(get_db)):
    return crud.get_assignments_for_nurse(db, nurse_id)

@app.get("/assignments/shift/{shift_id}")
def get_assignments_for_shift(shift_id: int, db: Session = Depends(get_db)):
    return crud.get_assignments_for_shift(db, shift_id)

@app.delete("/assignments/{assignment_id}")
def delete_assignment(assignment_id: int, db: Session = Depends(get_db)):
    return crud.delete_assignment(db, assignment_id)