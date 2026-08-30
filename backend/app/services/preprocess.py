from PIL import Image
from torchvision import transforms
import io

transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor(),
])

def preprocess_image(image_bytes: bytes):
    image = Image.open(io.BytesIO(image_bytes)).convert("RGB")

    image = transform(image)

    image = image.unsqueeze(0)

    return image