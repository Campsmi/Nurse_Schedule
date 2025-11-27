from dataclasses import dataclass
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import registry, relationship



@dataclass
class Nurse:
    __tablename__ = "nurses"

    id: int = Column(Integer, primary_key=True, index=True)
    name: str = Column(String)
    current_hours: int = Column(Integer, default=0)

    shifts: list = relationship("Shift", back_populates="nurse")
    
    
@dataclass 
class Shift:
    __tablename__ = "shifts"

    id: int = Column(Integer, primary_key=True)
    day: int = Column(Integer)
    week_day: str = Column(String)
    time: str = Column(String)
    nurse_id: int = Column(Integer, ForeignKey("nurses.id"))

    nurse: Nurse = relationship("Nurse", back_populates="shifts")
    


    