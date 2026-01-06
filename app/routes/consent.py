from fastapi import APIRouter
from app.db.database import SessionLocal
from app.db.models import Consent

router = APIRouter(prefix="/consent")

@router.post("/")
def give_consent(patient_id: str):
    db = SessionLocal()
    consent = Consent(patient_id=patient_id, consent_given=True)
    db.add(consent)
    db.commit()
    return {"message": "Consent recorded"}
