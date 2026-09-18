import React, { useState } from "react";

export const UploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");
  const [progress, setProgress] = useState<number>(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setStatus("Selecting file...");
      setProgress(0);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("Uploading...");
    setProgress(10);
    
    const formData = new FormData();
    formData.append("file", file);
    
    setProgress(30);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    setProgress(60);
    const data = await res.json();
    setStatus(data.status || "Upload complete");
    setProgress(100);
  };

  return (
    <div className="upload-box">
      <input type="file" onChange={handleChange} hidden />
      <button onClick={handleUpload} className="btn-upload" disabled={progress > 0}>
        {file ? `Uploading: ${file.name} ${progress}%` : "Select Road Image"}
      </button>
      <p>{status}</p>
      {progress > 0 && progress < 100 && (
        <div>
          <progress value={progress} max={100} style={{width: '100%'}} />
          <p>Processing: {progress}%</p>
        </div>
      )}
    </div>
  );
};