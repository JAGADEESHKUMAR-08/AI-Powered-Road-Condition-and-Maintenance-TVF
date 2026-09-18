from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import uvicorn

app = FastAPI(title="Road Condition API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Road Condition Intelligence API"}

@app.post("/api/upload")
def upload(file: UploadFile = File(...)):
    return {"filename": file.filename, "status": "uploaded"}

@app.post("/api/analyze")
def analyze():
    return {"defects": [], "risk_score": 0}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)