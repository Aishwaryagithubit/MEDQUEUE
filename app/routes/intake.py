from fastapi import APIRouter, UploadFile, File, Form, HTTPException
from app.db.database import SessionLocal
from app.db.models import Consent, Visit
from app.services.ai_service import generate_summary
from app.services.storage_service import upload_image

router = APIRouter(prefix="/intake")

@router.post("/")
async def patient_intake(
    patient_id: str = Form(...),
    symptoms: str = Form(...),
    image: UploadFile = File(None)
):
    db = SessionLocal()

    # 🔐 Consent Check
    consent = db.query(Consent)\
        .filter(Consent.patient_id == patient_id)\
        .order_by(Consent.timestamp.desc())\
        .first()

    if not consent or not consent.consent_given:
        raise HTTPException(status_code=403, detail="Consent required")

    # 🧠 AI Summary
    summary = generate_summary(symptoms)

    # 💾 Save Visit
    visit = Visit(patient_id=patient_id, summary=summary)
    db.add(visit)
    db.commit()
    db.refresh(visit)

    # 🖼️ Optional Image Upload
    if image:
        path = f"patient/{patient_id}/visit/{visit.id}.jpg"
        upload_image(image.file, path)

    return {
        "visit_id": visit.id,
        "doctor_summary": summary
    }
