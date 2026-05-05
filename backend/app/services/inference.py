def predict_skin_disease(image_bytes: bytes):
    return {
        "prediction": "eczema",
        "confidence": 0.91,
        "top_3": [
            {"label": "eczema", "score": 0.91},
            {"label": "psoriasis", "score": 0.06},
            {"label": "fungal_infection", "score": 0.03}
        ],
        "disclaimer": "AI prediction only. Consult a dermatologist."
    }