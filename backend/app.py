from fastapi import FastAPI, HTTPException, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import cv2
import numpy as np
import torch
from PIL import Image
import io
import json

app = FastAPI(title="Road Condition API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = None

def load_model():
    global model
    if model is None:
        model = torch.hub.load('ultralytics/yolov5', 'yolov5s', trust_repo=True)
        model.classes = [0, 1, 2, 3]
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
    total = sum(d.get("risk_weight", 1.0) for d in defects)
    return min(round(total / len(defects), 2), 100.0)

def extract_bbox_info(xyxy):
    return {
        "x_min": float(xyxy[0]),
        "y_min": float(xyxy[1]),
        "x_max": float(xyxy[2]),
        "y_max": float(xyxy[3])
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
    
    defects = []
    for det in detections:
        x1, y1, x2, y2, conf, cls_id = det
        class_name = results.names[int(cls_id)]
        area = (x2 - x1) * (y2 - y1)
        severity = classify_severity(conf, area)
        risk_weight = {"Low": 1, "Medium": 2, "High": 3, "Critical": 5}[severity]
        
        defects.append({
            "type": class_name,
            "confidence": round(conf, 3),
            "severity": severity,
            "risk_weight": risk_weight,
            "bbox": extract_bbox_info([x1, y1, x2, y2])
        })
    
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