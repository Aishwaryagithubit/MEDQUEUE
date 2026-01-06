from fastapi import FastAPI
from app.routes import consent, intake

app = FastAPI(title="MEDQUEUE Backend")

app.include_router(consent.router)
app.include_router(intake.router)

@app.get("/health")
def health():
    return {"status": "ok"}
