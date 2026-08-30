"""
evaluate.py

Runs the trained SkinAI model against the validation dataset and reports
real accuracy, per-class precision/recall/F1, a confusion matrix, and
average inference latency per image.

Usage:
    Place this file in the `ai/` folder (same level as train.py),
    then run:
        pip install scikit-learn --break-system-packages   # if not already installed
        python evaluate.py
"""

import time
import torch
import torch.nn as nn
from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader
from sklearn.metrics import classification_report, confusion_matrix, accuracy_score

# =========================
# CONFIG — must match train.py exactly
# =========================

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
print("Using device:", device)

val_dir = "dataset/val"
model_path = "model/skin_model.pth"

val_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# =========================
# LOAD VALIDATION DATA
# =========================

val_dataset = datasets.ImageFolder(val_dir, transform=val_transforms)
val_loader = DataLoader(val_dataset, batch_size=32, shuffle=False)

class_names = val_dataset.classes
print("Classes:", class_names)
print(f"Validation set size: {len(val_dataset)} images\n")

# =========================
# LOAD MODEL — must match train.py architecture exactly
# =========================

model = models.resnet18(pretrained=False)
num_features = model.fc.in_features
model.fc = nn.Linear(num_features, len(class_names))

model.load_state_dict(torch.load(model_path, map_location=device))
model = model.to(device)
model.eval()

# =========================
# RUN EVALUATION
# =========================

all_preds = []
all_labels = []
inference_times = []

with torch.no_grad():
    for images, labels in val_loader:
        images = images.to(device)
        labels = labels.to(device)

        start = time.time()
        outputs = model(images)
        elapsed = time.time() - start

        # per-image average time for this batch
        inference_times.append(elapsed / images.size(0))

        _, predicted = torch.max(outputs, 1)

        all_preds.extend(predicted.cpu().numpy())
        all_labels.extend(labels.cpu().numpy())

# =========================
# REPORT
# =========================

accuracy = accuracy_score(all_labels, all_preds)
avg_inference_time_ms = (sum(inference_times) / len(inference_times)) * 1000

print("=" * 50)
print(f"Overall Accuracy: {accuracy * 100:.2f}%")
print(f"Average inference time per image: {avg_inference_time_ms:.2f} ms (on {device})")
print("=" * 50)

print("\nPer-Class Report (precision / recall / f1-score):\n")
print(classification_report(all_labels, all_preds, target_names=class_names, digits=3))

print("\nConfusion Matrix (rows = actual, columns = predicted):")
print("Classes order:", class_names)
print(confusion_matrix(all_labels, all_preds))
