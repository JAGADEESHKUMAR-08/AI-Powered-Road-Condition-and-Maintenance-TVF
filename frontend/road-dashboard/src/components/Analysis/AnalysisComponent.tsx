import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { useRef } from "react";

export const AnalysisComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard?range=30d");
      return res.json();
    },
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);

  if (isLoading) return <p>Loading analysis...</p>;

  const totalDefects = data?.total_defects || 0;
  const sev = data?.severity_distribution || { Low: 0, Medium: 0, High: 0, Critical: 0 };
  const severityLabels = ["Low", "Medium", "High", "Critical"];
  const severityData = severityLow => sev[severityLow as keyof typeof sev] || 0;

  // Simple bar chart using canvas
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;
    
    canvasRef.current.width = 400;
    canvasRef.current.height = 200;
    ctx!.clearRect(0, 0, 400, 200);
    
    const barWidth = 80;
    const barHeight = 100;
    const maxVal = Math.max(...Object.values(sev));
    const barColors = ["#4CAF50", "#8BC34A", "#FFC107", "#F44336"];
    
    severityLabels.forEach((label, i) => {
      const value = severityData(label);
      const height = (value / maxVal) * barHeight;
      ctx!.fillStyle = barColors[i];
      ctx!.fillRect(i * 100 + 10, 200 - height, barWidth - 20, height);
      ctx!.fillStyle = "#000";
      ctx!.font = "16px Arial";
      ctx!.fillText(`${value}`, i * 100 + 20, 200 - height - 10);
    });
  }, [data]);

  return (
    <div>
      <h3>Road Condition Analysis</h3>
      <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <div>
          <strong>Total Defects:</strong> {totalDefects}
        </div>
        <div>
          <strong>Critical:</strong> {sev.Critical || 0}
        </div>
        <div>
          <strong>High:</strong> {sev.High || 0}
        </div>
        <div>
          <strong>Medium:</strong> {sev.Medium || 0}
        </div>
        <div>
          <strong>Low:</strong> {sev.Low || 0}
        </div>
        <div>
          <strong>Risk Trend:</strong> {data?.risk_trend || 0}%
        </div>
      </div>
      <canvas ref={canvasRef} style={{ marginTop: "20px", width: "400px", height: "200px" }} />
    </div>
  );
};