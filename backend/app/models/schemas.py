from pydantic import BaseModel
from typing import List

class PredictionItem(BaseModel):
    label: str
    score: float

class PredictionResponse(BaseModel):
    prediction: str
    confidence: float
    top_3: List[PredictionItem]
    disclaimer: str