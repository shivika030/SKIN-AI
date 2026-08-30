# SkinAI — AI-Powered Skin Condition Detection

SkinAI is a full-stack web application that uses a deep learning model to classify common skin conditions from an uploaded photo. It provides an instant prediction with a confidence score, and is built end-to-end — from model training to a live, deployed web app.

**🔗 Live demo:** [skin-ai-beta-sooty.vercel.app](https://skin-ai-beta-sooty.vercel.app)
*(Note: the backend runs on a free-tier server that spins down after inactivity — the first request may take 30–60 seconds to respond while it wakes up.)*

📖 [Read the full case study](./CASE_STUDY.md) for the engineering story behind this project.

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
- ResNet18 convolutional neural network (pretrained backbone, fine-tuned final layer)
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

## Model Performance

Evaluated on a held-out validation set of 944 images across 6 classes.

| Metric | Value |
|---|---|
| Overall Accuracy | 72.4% |
| Avg. Inference Time | 19.3 ms/image (CPU) |
| Macro F1-score | 0.704 |

**Per-class results:**

| Class | Precision | Recall | F1-score |
|---|---|---|---|
| Normal | 0.819 | 0.733 | 0.774 |
| Acne | 0.640 | 0.654 | 0.647 |
| Wrinkles | 0.844 | 0.760 | 0.800 |
| Eczema | 0.769 | 0.772 | 0.770 |
| Rosacea | 0.752 | 0.731 | 0.742 |
| Dark Spots | 0.404 | 0.623 | 0.490 |

**Known limitation**: the "Dark Spots" class has the weakest performance — it has the fewest validation samples (61, vs. 240 for "Normal") and is most often confused with the "Normal" class. This points to a clear next step: collecting more balanced training data for this class, or applying class-weighted loss during training.

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

## Disclaimer

SkinAI is a student/portfolio project intended to demonstrate a full-stack machine learning application. It is **not** a medical device and should not be used for actual diagnosis. Always consult a qualified dermatologist for skin concerns.

## Author

Built by Shivika Bhawsar as a portfolio/academic project.
