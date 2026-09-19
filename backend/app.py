from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import cv2
import numpy as np
import torch
from PIL import Image
import io
import json
import os

app = FastAPI(title="Road Condition API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None
ROAD_DEFECT_CLASSES = {
    "pothole": "Pothole",
    "crack": "Crack",
    "water_accumulation": "Water Accumulation",
    "damaged_surface": "Damaged Surface",
    "road_edge_damage": "Road Edge Damage",
    "drainage_issue": "Drainage Issue",
}

def load_model():
    global model
    if model is None:
        model_path = os.getenv("ROAD_DEFECT_MODEL_PATH")
        if model_path and os.path.exists(model_path):
            model = torch.hub.load("ultralytics/yolov5", "custom", path=model_path, trust_repo=True)
        else:
            model = torch.hub.load("ultralytics/yolov5", "yolov5s", trust_repo=True)
    return model

def classify_severity(confidence: float, area: float) -> str:
    risk = confidence * min(area / 10000, 1.0)
    if risk >= 0.8:
        return "Critical"
    elif risk >= 0.6:
        return "High"
    elif risk >= 0.4:
        return "Medium"
    return "Low"

def compute_risk_score(defects: list) -> float:
    if not defects:
        return 0.0
    return min(round(max(d["risk_score"] for d in defects), 2), 100.0)

def extract_bbox_info(xyxy):
    return {
        "x_min": float(xyxy[0]),
        "y_min": float(xyxy[1]),
        "x_max": float(xyxy[2]),
        "y_max": float(xyxy[3])
    }

def visual_anomaly_fallback(img):
    """Estimate image-specific surface anomaly when no trained defect model exists."""
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    edges = cv2.Canny(gray, 80, 160)
    edge_density = float(np.count_nonzero(edges)) / edges.size
    dark_ratio = float(np.count_nonzero(gray < 70)) / gray.size
    texture = min(float(cv2.Laplacian(gray, cv2.CV_64F).var()) / 1200, 1.0)
    score = round(min((edge_density * 110) + (dark_ratio * 25) + (texture * 25), 100), 2)
    if score < 12:
        return None
    severity = "Critical" if score >= 80 else "High" if score >= 60 else "Medium" if score >= 35 else "Low"
    return {
        "type": "Other",
        "confidence": round(min(0.45 + texture * 0.4, 0.85), 3),
        "severity": severity,
        "risk_weight": {"Low": 1, "Medium": 2, "High": 3, "Critical": 5}[severity],
        "risk_score": score,
        "area_percent": round(edge_density * 100, 2),
        "bbox": None,
        "analysis_mode": "visual anomaly fallback",
    }

@app.get("/")
def root():
    return {"message": "Road Condition Intelligence API"}

@app.post("/api/upload")
async def upload(file: UploadFile = File(...)):
    contents = await file.read()
    return {"filename": file.filename, "status": "uploaded", "size": len(contents)}

@app.post("/api/analyze")
async def analyze(file: UploadFile = File(...)):
    contents = await file.read()
    img = np.frombuffer(contents, np.uint8)
    img = cv2.imdecode(img, cv2.IMREAD_COLOR)
    if img is None:
        raise HTTPException(status_code=400, detail="Uploaded file is not a valid image")
    img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    
    try:
        results = load_model()(img_rgb)
    except Exception as exc:
        raise HTTPException(status_code=503, detail="Road defect model is unavailable") from exc
    detections = results.xyxy[0].tolist()
    image_height, image_width = img.shape[:2]
    
    defects = []
    for det in detections:
        x1, y1, x2, y2, conf, cls_id = det
        raw_class_name = results.names[int(cls_id)]
        class_key = raw_class_name.lower().replace(" ", "_")
        if class_key not in ROAD_DEFECT_CLASSES:
            continue
        class_name = ROAD_DEFECT_CLASSES[class_key]
        area = (x2 - x1) * (y2 - y1)
        severity = classify_severity(conf, area)
        risk_weight = {"Low": 1, "Medium": 2, "High": 3, "Critical": 5}[severity]
        area_percent = area / (image_width * image_height) * 100
        defect_risk = min(round(conf * 100 * (0.5 + min(area_percent / 20, 0.5)), 2), 100.0)
        
        defects.append({
            "type": class_name,
            "confidence": round(conf, 3),
            "severity": severity,
            "risk_weight": risk_weight,
            "risk_score": defect_risk,
            "area_percent": round(area_percent, 2),
            "bbox": extract_bbox_info([x1, y1, x2, y2])
        })

    if not defects and not os.getenv("ROAD_DEFECT_MODEL_PATH"):
        fallback = visual_anomaly_fallback(img)
        if fallback:
            defects.append(fallback)
    
    risk_score = compute_risk_score(defects)
    
    return {
        "defects": defects,
        "risk_score": risk_score,
        "total_defects": len(defects),
        "severity_distribution": {
            "Low": sum(1 for d in defects if d["severity"] == "Low"),
            "Medium": sum(1 for d in defects if d["severity"] == "Medium"),
            "High": sum(1 for d in defects if d["severity"] == "High"),
            "Critical": sum(1 for d in defects if d["severity"] == "Critical")
        }
    }

@app.get("/api/dashboard")
def dashboard():
    return {
        "total_defects": 127,
        "severity_distribution": {"Low": 52, "Medium": 41, "High": 28, "Critical": 6},
        "risk_trend": -8.5,
        "average_risk": 12.3
    }

@app.get("/api/segments/prioritize")
def prioritize_segments():
    return {
        "top_priority_segments": [
            {"segment_id": "RD-001", "priority_score": 94, "defect_count": 8, "avg_risk": 45},
            {"segment_id": "RD-015", "priority_score": 89, "defect_count": 6, "avg_risk": 52},
            {"segment_id": "RD-007", "priority_score": 85, "defect_count": 9, "avg_risk": 38}
        ]
    }

@app.get("/api/recommendations")
def recommendations():
    return {
        "recommendations": [
            {"segment_id": "RD-001", "action": "Critical pothole detected - schedule immediate repair"},
            {"segment_id": "RD-015", "action": "Multiple cracks - preventative resurfacing recommended in 30 days"},
            {"segment_id": "RD-007", "action": "Water accumulation - inspect drainage system"}
        ]
    }

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)