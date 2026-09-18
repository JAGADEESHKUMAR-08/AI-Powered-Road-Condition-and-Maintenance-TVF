import React, { useState } from "react";

export const UploadComponent = () => {
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFile(file);
      setStatus("Selecting file...");
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("Uploading...");
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    setStatus(data.status || "Upload complete");
  };

  return (
    <div className="upload-box">
      <input type="file" onChange={handleChange} hidden />
      <button onClick={handleUpload} className="btn-upload">
        {file ? `Uploading: ${file.name}` : "Select Road Image"}
      </button>
      <p>{status}</p>
    </div>
  );
};