import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const PriorityComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["priority-segments"],
    queryFn: async () => {
      const res = await fetch("/api/segments/prioritize");
      return res.json();
    },
  });

  useEffect(() => {
    // Also fetch fresh analysis data to update priorities
    const fetchAnalysis = async () => {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          body: new FormData(),
        });
        const data = await res.json();
        // Recalculate priorities based on latest defects
        console.log("Latest defects:", data.defects?.length || 0);
      } catch (e) {
        console.error("Analysis fetch failed", e);
      }
    };
    fetchAnalysis();
  }, []);

  if (isLoading) return <p>Loading priority segments...</p>;

  return (
    <div>
      <h3>Maintenance Priority</h3>
      <p style={{ marginBottom: "10px", fontSize: "14px", color: "#666" }}>
        Segments prioritized by defect severity, frequency, and risk score
      </p>
      {data && data.top_priority_segments ? (
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {data.top_priority_segments.map((seg: any, i: number) => {
              const priorityColor =
                seg.priority_score >= 90 ? "red" :
                seg.priority_score >= 75 ? "orange" :
                seg.priority_score >= 50 ? "yellow" : "green";
              return (
                <li key={i} style={{ padding: "8px 12px", margin: "4px 0", background: "#f5f5f5", borderRadius: "4px" }}>
                  <span style={{ fontWeight: "bold", color: priorityColor }}>
                    Segment {seg.segment_id}
                  </span> - 
                  Priority: <span style={{ color: priorityColor, fontWeight: "bold" }}>{seg.priority_score}</span> - 
                  Defects: {seg.defect_count} - 
                  Avg Risk: {seg.avg_risk}%
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>No priority data available</p>
      )}
    </div>
  );
};