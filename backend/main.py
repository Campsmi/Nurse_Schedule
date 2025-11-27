from fastapi import FastAPI
from db import get_connection
from models import Nurse, Shift
import psycopg2

app = FastAPI()

@app.get("/")
def root():
    return {"message": "Nurse Scheduler is running!"}

@app.get("/nurses")
def get_nurses():
    conn = get_connection()
    cur = conn.cursor(cursor_factory=psycopg2.extras.RealDictCursor)

    cur.execute("SELECT id, full_name, current_hours FROM nurses")
    rows = cur.fetchall()

    cur.close()
    conn.close()

    # Convert DB rows → Nurse dataclass instances
    nurses = [Nurse(id=row["id"], name=row["full_name"], current_hours=row["max_hours_per_week"]) for row in rows]

    return nurses