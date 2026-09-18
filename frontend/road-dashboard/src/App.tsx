import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UploadComponent } from "./components/Upload/Upload";
import { MapComponent } from "./components/Map/MapComponent";
import { PriorityComponent } from "./components/Priority/PriorityComponent";
import { RecommendationsComponent } from "./components/Recommendations/RecommendationsComponent";
import { AnalysisComponent } from "./components/Analysis/AnalysisComponent";
import "./App.css";

const queryClient = new QueryClient();

function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <div className="app-container">
          <header>
            <h1>AI-Powered Road Condition Intelligence</h1>
          </header>
          <main>
            <section className="upload-section">
              <UploadComponent />
            </section>
            <section className="dashboard-section">
              <AnalysisComponent />
              <MapComponent />
              <PriorityComponent />
              <RecommendationsComponent />
            </section>
          </main>
        </div>
      </QueryClientProvider>
    </Router>
  );
}

export default App;