import psycopg2
import psycopg2.extras

def get_connection():
    return psycopg2.connect(
        host="localhost",
        port=5432,
        database="nursescheduler",
        user="postgres",
        password="postgres"
    )