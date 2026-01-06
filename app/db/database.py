from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()  # <-- This loads the .env file

SQL_CONNECTION = os.getenv("AZURE_SQL_CONNECTION")

if not SQL_CONNECTION:
    raise ValueError("AZURE_SQL_CONNECTION is not set!")

engine = create_engine(
    SQL_CONNECTION,
    connect_args={"check_same_thread": False}  # Needed for SQLite local test
)

SessionLocal = sessionmaker(bind=engine)
Base = declarative_base()
