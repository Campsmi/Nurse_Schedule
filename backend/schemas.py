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

    model_config = {"from_attributes": True}

# Input schema for creating a shift
class ShiftCreate(BaseModel):
    day: int
    week_day: str
    time: str

# Output schema for returning a shift
class ShiftRead(BaseModel):
    id: int
    day: int
    week_day: str
    time: str

    model_config = {"from_attributes": True}
        
    

class AssignmentCreate(BaseModel):
    nurse_id: int
    shift_id: int

class AssignmentRead(BaseModel):
    id: int
    nurse_id: int
    shift_id: int

    model_config = {"from_attributes": True}