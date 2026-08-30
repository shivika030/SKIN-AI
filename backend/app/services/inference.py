import torch
import torch.nn as nn
from torchvision import models
from app.services.preprocess import preprocess_image
import json

# Load labels
with open("ml/labels.json", "r") as f:
    LABELS = json.load(f)

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# Load model
model = models.resnet18(pretrained=False)

num_features = model.fc.in_features

model.fc = nn.Linear(num_features, len(LABELS))

model.load_state_dict(
    torch.load("ml/skin_model.pth", map_location=device)
)

model = model.to(device)

model.eval()

def predict_skin_disease(image_bytes: bytes):

    image = preprocess_image(image_bytes)

    image = image.to(device)

    with torch.no_grad():

        outputs = model(image)

        probabilities = torch.softmax(outputs[0], dim=0)

        top_probs, top_indices = torch.topk(probabilities, 3)

    top_3 = []

    for prob, idx in zip(top_probs, top_indices):

        top_3.append({
            "label": LABELS[idx],
            "score": round(prob.item(), 4)
        })

    return {
        "prediction": top_3[0]["label"],
        "confidence": top_3[0]["score"],
        "top_3": top_3,
        "disclaimer": "AI prediction only. Consult a dermatologist."
    }