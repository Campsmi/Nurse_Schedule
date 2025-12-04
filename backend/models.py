from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db import Base


class Nurse(Base):
    __tablename__ = "nurses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    current_hours = Column(Integer, default=0)
    
    assignments = relationship("Assignment", back_populates="nurses")


class Shift(Base):
    __tablename__ = "shifts"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(Integer, nullable=False)
    week_day = Column(String, nullable=False)
    time = Column(String, nullable=False)  # Morning, Afternoon, Night
    
    assignments = relationship("Assignment", back_populates="shifts")
    


class Assignment(Base):
    
    __tablename__ = "assignments"
    
    id = Column(Integer, primary_key=True, index=True)
    nurse_id = Column(Integer, ForeignKey("nurses.id"))
    shift_id = Column(Integer, ForeignKey("shifts.id"))

    nurse = relationship("Nurse", back_populates="assignments")
    shift = relationship("Shift", back_populates="assignments")
    


    