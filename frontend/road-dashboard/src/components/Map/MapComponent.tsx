import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.markercluster/dist/Leaflet.markerCluster.css";
import "leaflet.markercluster/dist/leaflet.markercluster.js";

export const MapComponent = () => {
  const [map, setMap] = useState<L.Map | null>(null);
  const [defects, setDefects] = useState<any[]>([]);
  const [markers, setMarkers] = useState<L.Marker[]>([]);

  useEffect(() => {
    const mapDiv = document.createElement("div");
    mapDiv.style.height = "400px";
    mapDiv.style.width = "100%";
    
    const m = L.map(mapDiv, {
      center: [28.6139, 77.2090],
      zoom: 12
    });

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors"
    }).addTo(m);

    // Add marker cluster group
    const markerCluster = L.markerClusterGroup();
    m.addLayer(markerCluster);

    // Add sample defect markers if available
    if (defects.length > 0) {
      defects.forEach((defect: any) => {
        const lat = defect.gps_lat || 28.6139 + (Math.random() - 0.5) * 0.5;
        const lng = defect.gps_lng || 77.2090 + (Math.random() - 0.5) * 0.5;
        
        const color = defect.severity === "Critical" ? "red" :
                      defect.severity === "High" ? "orange" :
                      defect.severity === "Medium" ? "yellow" : "green";
        
        const marker = L.marker([lat, lng], { icon: L.icon({
          iconUrl: `data:image/svg+xml;charset=UTF-8,<svg width="32" height="32" fill="%23fff" viewBox="0 0 32 32"><path d="M16 1l7.3 15.3L20 10l-7.6 13.7 1.9 15.6L11.5 25l7.1-5.6L4.6 18.5 1.8 8.8 7.5 3.5 16 1z" fill-rule="evenodd"/></svg>`,
          markerColor: color,
          shadowSize: [50, 50]
        })});
        
        marker.bindPopup(`
          <b>${defect.type}</b><br/>
          Severity: ${defect.severity}<br/>
          Risk: ${defect.risk_score}%<br/>
          Confidence: ${(defect.confidence * 100).toFixed(1)}%
        `);
        markerCluster.addLayer(marker);
      });
      setMarkers(markerCluster.getAllLayers());
    }

    setMap(m);
  }, [defects]);

  useEffect(() => {
    // Fetch defects from API after mount
    const fetchDefects = async () => {
      try {
        const res = await fetch("/api/analyze", {
          method: "POST",
          body: new FormData(),
        });
        const data = await res.json();
        setDefects(data.defects || []);
      } catch (e) {
        console.error("Failed to fetch defects", e);
      }
    };
    fetchDefects();
  }, []);

  return (
    <div className="map-container">
      <div>{map ? (
        <div id="map" style={{ height: "100%", width: "100%" }} />
      ) : (
        <p style={{ padding: "20px" }}>Loading map...</p>
      )}</div>
      <div style={{ marginTop: "10px" }}>
        <button className="btn-secondary" onClick={() => window.location.reload()}>
          Refresh Map
        </button>
      </div>
    </div>
  );
};