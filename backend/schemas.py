from pydantic import BaseModel
from typing import Optional

# Input schema for creating a nurse
class NurseCreate(BaseModel):
    name: str
    current_hours: int = 0

# Output schema for returning a nurse
class NurseRead(BaseModel):
    id: int
    name: str
    current_hours: int

    class Config:
        orm_mode = True  # allows returning ORM objects directly

# Input schema for creating a shift
class ShiftCreate(BaseModel):
    day: int
    week_day: str
    time: str
    nurse_id: Optional[int] = None

# Output schema for returning a shift
class ShiftRead(BaseModel):
    id: int
    day: int
    week_day: str
    time: str
    nurse_id: Optional[int]

    class Config:
        orm_mode = True