from sqlalchemy import Column, Integer, String, Boolean, DateTime, ForeignKey
from datetime import datetime
from .database import Base

class Consent(Base):
    __tablename__ = "consents"
    id = Column(Integer, primary_key=True)
    patient_id = Column(String)
    consent_given = Column(Boolean)
    timestamp = Column(DateTime, default=datetime.utcnow)

class Visit(Base):
    __tablename__ = "visits"
    id = Column(Integer, primary_key=True)
    patient_id = Column(String)
    summary = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
