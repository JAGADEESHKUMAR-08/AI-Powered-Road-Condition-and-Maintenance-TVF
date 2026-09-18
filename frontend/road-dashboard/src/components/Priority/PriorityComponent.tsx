import React from "react";
import { useQuery } from "@tanstack/react-query";

export const PriorityComponent = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["priority-segments"],
    queryFn: async () => {
      const res = await fetch("/api/segments/prioritize");
      return res.json();
    },
  });

  if (isLoading) return <p>Loading priority segments...</p>;

  return (
    <div>
      <h3>Maintenance Priority</h3>
      {data && data.top_priority_segments ? (
        <ul>
          {data.top_priority_segments.map((seg: any, i: number) => (
            <li key={i}>
              <strong>Segment {seg.segment_id}</strong> - 
              Priority: {seg.priority_score} - 
              Defects: {seg.defect_count}
            </li>
          ))}
        </ul>
      ) : (
        <p>No priority data available</p>
      )}
    </div>
  );
};