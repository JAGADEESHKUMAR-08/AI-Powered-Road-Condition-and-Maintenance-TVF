import React, { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const RecommendationsComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["maintenance-recs"],
    queryFn: async () => {
      const res = await fetch("/api/recommendations");
      return res.json();
    },
  });

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          body: new FormData(),
        });
        const analysis = await res.json();
        // Generate AI recommendations based on detected defects
        if (analysis.defects && analysis.defects.length > 0) {
          const critical = analysis.defects.filter((d: any) => d.severity === "Critical");
          const high = analysis.defects.filter((d: any) => d.severity === "High");
          
          if (critical.length > 0) {
            console.log(`Critical defects found: ${critical.length} - immediate action required`);
          }
          if (high.length > 0) {
            console.log(`High severity defects: ${high.length} - schedule within 30 days`);
          }
        }
      } catch (e) {
        console.error("Recommendations fetch failed", e);
      }
    };
    fetchRecommendations();
  }, []);

  if (isLoading) return <p>Generating recommendations...</p>;

  return (
    <div>
      <h3>AI Maintenance Recommendations</h3>
      {data && data.recommendations ? (
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <ul style={{ listStyle: "none", padding: "0" }}>
            {data.recommendations.map((rec: any, i: number) => {
              const urgency =
                rec.action.includes("Critical") ? "critical" :
                rec.action.includes("High") ? "high" : "normal";
              return (
                <li key={i} style={{ padding: "8px 12px", margin: "4px 0", background: "#f5f5f5", borderRadius: "4px", borderLeft: `4px solid ${urgency === "critical" ? "red" : urgency === "high" ? "orange" : "green"}` }}>
                  <strong>{rec.segment_id}:</strong> {rec.action}
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <p>No recommendations available</p>
      )}
    </div>
  );
};