from sqlalchemy.orm import Session
from models import Nurse
from schemas import NurseCreate


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
    
