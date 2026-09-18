import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const AnalysisComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["dashboard"],
    queryFn: async () => {
      const res = await fetch("/api/dashboard?range=30d");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading analysis...</p>;

  return (
    <div>
      <h3>Road Condition Analysis</h3>
      <div style={{ display: "grid", gap: "15px", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))" }}>
        <div>
          <strong>Total Defects:</strong> {data?.total_defects || 0}
        </div>
        <div>
          <strong>Critical:</strong> {data?.severity_distribution?.Critical || 0}
        </div>
        <div>
          <strong>High:</strong> {data?.severity_distribution?.High || 0}
        </div>
        <div>
          <strong>Risk Trend:</strong> {data?.risk_trend || 0}%
        </div>
      </div>
    </div>
  );
};