# SkinAI — AI-Powered Skin Condition Detection

SkinAI is a full-stack web application that uses a deep learning model to classify common skin conditions from an uploaded photo. It provides an instant prediction with a confidence score, and is built end-to-end — from model training to a live, deployed web app.

**🔗 Live demo:** [skin-ai-beta-sooty.vercel.app](https://skin-ai-beta-sooty.vercel.app)
*(Note: the backend runs on a free-tier server that spins down after inactivity — the first request may take 30–60 seconds to respond while it wakes up.)*

---

## What it does

Upload a photo of a skin area, and SkinAI returns:
- The predicted condition (Normal, Acne, Wrinkles, Eczema, Rosacea, or Dark Spots)
- A confidence score
- The top 3 most likely predictions
- A clear disclaimer that this is an AI prediction, not a medical diagnosis

## Tech Stack

**Frontend**
- React + TypeScript
- Vite
- Tailwind CSS + shadcn/ui
- Deployed on Vercel

**Backend**
- FastAPI (Python)
- PyTorch + Torchvision (ResNet18)
- OpenCV, Pillow for image preprocessing
- Dockerized, deployed on Render

**Model**
- ResNet18 convolutional neural network
- Trained on a custom dataset across 6 classes: normal, acne, wrinkles, eczema, rosacea, dark spots
- Input images resized to 224×224 before inference

## Architecture

```
┌─────────────┐         ┌──────────────────┐         ┌─────────────────┐
│   React     │  HTTPS  │  FastAPI Backend │         │  ResNet18 Model │
│  Frontend   │────────▶│  (Dockerized,     │────────▶│  (.pth, PyTorch)│
│  (Vercel)   │◀────────│   on Render)      │◀────────│                 │
└─────────────┘  JSON   └──────────────────┘  tensor  └─────────────────┘
```

1. User uploads an image via the React frontend.
2. The image is sent as `multipart/form-data` to the FastAPI `/predict` endpoint.
3. The backend preprocesses the image (resize, tensor conversion) and runs it through the trained ResNet18 model.
4. The prediction, confidence score, and top-3 results are returned as JSON and displayed in the UI.

## Running Locally

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```
The API will be available at `http://localhost:8000`. Interactive docs at `http://localhost:8000/docs`.

### Frontend
```bash
cd frontend
npm install
npm run dev
```
Create a `.env` file in `frontend/` with:
```
VITE_API_URL=http://localhost:8000
```

### Running the backend with Docker
```bash
cd backend
docker build -t skinai-backend .
docker run -p 8000:8000 skinai-backend
```

## API Reference

**POST** `/predict`
Accepts a multipart form with a single `file` field (image).

Example response:
```json
{
  "prediction": "class2_wrinkles",
  "confidence": 0.8815,
  "top_3": [
    { "label": "class2_wrinkles", "score": 0.8815 },
    { "label": "class0_normal", "score": 0.0528 },
    { "label": "class3_Eczema", "score": 0.0229 }
  ],
  "disclaimer": "AI prediction only. Consult a dermatologist."
}
```

**GET** `/health`
Returns a simple status check.

## Important Note on Model Performance

This project currently does not report formal accuracy/precision/recall metrics from a held-out evaluation set — that's a planned next step. The model was trained on a curated but relatively small dataset, and predictions should be treated as a proof-of-concept rather than a clinically validated tool.

## Disclaimer

SkinAI is a student/portfolio project intended to demonstrate a full-stack machine learning application. It is **not** a medical device and should not be used for actual diagnosis. Always consult a qualified dermatologist for skin concerns.

## Author

Built by Shivika Bhawsar as a portfolio/academic project.
