from fastapi import APIRouter, UploadFile, File, HTTPException
from app.services.inference import predict_skin_disease

router = APIRouter()

@router.post("/predict")
async def predict(file: UploadFile = File(...)):
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    contents = await file.read()
    result = predict_skin_disease(contents)
    return result