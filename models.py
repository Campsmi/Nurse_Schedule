from dataclasses import dataclass, field
from typing import List

@dataclass 
class Shift:
    id: int
    day: int
    week_day: str   # Monday, Tuesday, etc.
    time: str       # Morning, Afternoon, Night
    

@dataclass
class Nurse:
    id: int
    name: str
    current_hours: int  # Hours worked
    