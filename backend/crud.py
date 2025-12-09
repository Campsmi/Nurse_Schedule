from fastapi import HTTPException
from sqlalchemy.orm import Session
from models import *
from schemas import NurseCreate, ShiftCreate

####### Nurses Functions #########

def get_all_nurses(db: Session):
    return db.query(Nurse).all()

def create_nurse(db: Session, nurse: NurseCreate):
    db_nurse = Nurse(name=nurse.name)
    db.add(db_nurse)
    db.commit()
    db.refresh(db_nurse)
    return db_nurse

def delete_nurse(db: Session, nurse_id: int):
    nurse = db.query(Nurse).filter(Nurse.id == nurse_id).first()
    if not nurse:
        raise HTTPException(status_code=404, detail="Nurse not found")
    db.delete(nurse)
    db.commit()
    return nurse


    

########## Shift Functions ################

def get_all_shifts(db: Session):
    return db.query(Shift).all()

def create_shift(db: Session, shift_data: ShiftCreate):
    new_shift = Shift(
        day=shift_data.day,
        week_day=shift_data.week_day,
        time=shift_data.time
    )
    db.add(new_shift)
    db.commit()
    db.refresh(new_shift)
    return new_shift


########## Assignment Functions #########

def create_assignment(db: Session, nurse_id: int, shift_id: int):
    assignment = Assignment(
        nurse_id=nurse_id,
        shift_id=shift_id
    )
    db.add(assignment)
    db.commit()
    db.refresh(assignment)
    return assignment


def get_assignments(db: Session):
    return db.query(Assignment).all()


def get_assignments_for_nurse(db: Session, nurse_id: int):
    return db.query(Assignment).filter(
        Assignment.nurse_id == nurse_id
    ).all()


def get_assignments_for_shift(db: Session, shift_id: int):
    return db.query(Assignment).filter(
        Assignment.shift_id == shift_id
    ).all()


def delete_assignment(db: Session, assignment_id: int):
    assignment = db.query(Assignment).filter(
        Assignment.id == assignment_id
    ).first()
    if assignment:
        db.delete(assignment)
        db.commit()
    return assignment