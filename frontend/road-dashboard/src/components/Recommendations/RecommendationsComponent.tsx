import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export const RecommendationsComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["maintenance-recs"],
    queryFn: async () => {
      const res = await fetch("/api/recommendations");
      return res.json();
    },
  });

  if (isLoading) return <p>Generating recommendations...</p>;

  return (
    <div>
      <h3>AI Maintenance Recommendations</h3>
      {data && data.recommendations ? (
        <ul>
          {data.recommendations.map((rec: any, i: number) => (
            <li key={i}>
              <strong>{rec.segment_id}:</strong> {rec.action}
            </li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available</p>
      )}
    </div>
  );
};