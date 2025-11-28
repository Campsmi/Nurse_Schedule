from dataclasses import dataclass
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from db import Base


class Nurse(Base):
    __tablename__ = "nurses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    current_hours = Column(Integer, default=0)


class Shift(Base):
    __tablename__ = "shifts"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(Integer, nullable=False)
    week_day = Column(String, nullable=False)
    time = Column(String, nullable=False)  # Morning, Afternoon, Night
    


    