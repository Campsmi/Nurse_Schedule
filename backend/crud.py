from sqlalchemy.orm import Session
from models import Nurse, Shift
from schemas import NurseCreate, ShiftCreate


def get_all_nurses(db: Session):
    return db.query(Nurse).all()

def create_nurse(db: Session, nurse: NurseCreate):
    db_nurse = Nurse(name=nurse.name, current_hours=nurse.current_hours)
    db.add(db_nurse)
    db.commit()
    db.refresh(db_nurse)
    return db_nurse

def delete_nurse(db: Session, nurse_id: int):
    nurse = db.query(Nurse).filter(Nurse.id == nurse_id).first()
    db.delete(nurse)
    db.commit()
    

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
