import torch
import torch.nn as nn
import torch.optim as optim

from torchvision import datasets, transforms, models
from torch.utils.data import DataLoader

from tqdm import tqdm
import os

# Device
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

print("Using device:", device)

# =========================
# DATA TRANSFORMS
# =========================

train_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.RandomHorizontalFlip(),
    transforms.RandomRotation(10),
    transforms.ToTensor(),
])

val_transforms = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

# =========================
# DATASET PATHS
# =========================

train_dir = "dataset/train"
val_dir = "dataset/val"

# =========================
# LOAD DATASETS
# =========================

train_dataset = datasets.ImageFolder(
    train_dir,
    transform=train_transforms
)

val_dataset = datasets.ImageFolder(
    val_dir,
    transform=val_transforms
)

# =========================
# DATALOADERS
# =========================

train_loader = DataLoader(
    train_dataset,
    batch_size=32,
    shuffle=True
)

val_loader = DataLoader(
    val_dataset,
    batch_size=32,
    shuffle=False
)

# =========================
# CLASS NAMES
# =========================

class_names = train_dataset.classes

print("Classes:", class_names)

# =========================
# LOAD RESNET18
# =========================

model = models.resnet18(pretrained=True)

# Freeze feature layers
for param in model.parameters():
    param.requires_grad = False

# Replace final layer
num_features = model.fc.in_features

model.fc = nn.Linear(
    num_features,
    len(class_names)
)

model = model.to(device)

# =========================
# LOSS + OPTIMIZER
# =========================

criterion = nn.CrossEntropyLoss()

optimizer = optim.Adam(
    model.fc.parameters(),
    lr=0.001
)

# =========================
# TRAINING LOOP
# =========================

epochs = 5

best_accuracy = 0.0

for epoch in range(epochs):

    model.train()

    running_loss = 0.0
    correct = 0
    total = 0

    loop = tqdm(train_loader)

    for images, labels in loop:

        images = images.to(device)
        labels = labels.to(device)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs, labels)

        loss.backward()

        optimizer.step()

        running_loss += loss.item()

        _, predicted = torch.max(outputs, 1)

        total += labels.size(0)

        correct += (predicted == labels).sum().item()

        loop.set_description(f"Epoch [{epoch+1}/{epochs}]")

    train_accuracy = 100 * correct / total

    # =========================
    # VALIDATION
    # =========================

    model.eval()

    val_correct = 0
    val_total = 0

    with torch.no_grad():

        for images, labels in val_loader:

            images = images.to(device)
            labels = labels.to(device)

            outputs = model(images)

            _, predicted = torch.max(outputs, 1)

            val_total += labels.size(0)

            val_correct += (predicted == labels).sum().item()

    val_accuracy = 100 * val_correct / val_total

    print(f"\nEpoch {epoch+1}")
    print(f"Train Accuracy: {train_accuracy:.2f}%")
    print(f"Validation Accuracy: {val_accuracy:.2f}%")

    # Save best model
    if val_accuracy > best_accuracy:

        best_accuracy = val_accuracy

        os.makedirs("model", exist_ok=True)

        torch.save(
            model.state_dict(),
            "model/skin_model.pth"
        )

        print("✅ Best model saved!")

print("\n🔥 Training Complete!")