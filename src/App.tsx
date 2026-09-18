import React, { useState } from 'react';
import { ActiveScreen, Complaint } from './types';
import { INITIAL_COMPLAINTS } from './data/mockData';
import { Navbar } from './components/common/Navbar';
import { LandingView } from './components/public/LandingView';
import { ReportWizard } from './components/public/ReportWizard';
import { TrackComplaintModal } from './components/public/TrackComplaintModal';
import { OfficialLogin } from './components/official/OfficialLogin';
import { OverviewDashboard } from './components/official/OverviewDashboard';
import { ComplaintDetailView } from './components/official/ComplaintDetailView';
import { AnalyticsMapView } from './components/official/AnalyticsMapView';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ActiveScreen>('landing');
  const [complaints, setComplaints] = useState<Complaint[]>(INITIAL_COMPLAINTS);
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint>(INITIAL_COMPLAINTS[0]);
  const [isTrackerOpen, setIsTrackerOpen] = useState<boolean>(false);
  const [trackerInitialId, setTrackerInitialId] = useState<string>('RG-2026-001284');
  const [isOfficialAuthenticated, setIsOfficialAuthenticated] = useState<boolean>(false);

  // Handle complaint creation from public wizard
  const handleComplaintCreated = (newComplaint: Complaint) => {
    setComplaints((prev) => [newComplaint, ...prev]);
    setSelectedComplaint(newComplaint);
  };

  // Handle complaint update from official portal
  const handleComplaintUpdated = (updated: Complaint) => {
    setComplaints((prev) =>
      prev.map((c) => (c.id === updated.id ? updated : c))
    );
    setSelectedComplaint(updated);
  };

  // Open tracking modal with optional ID
  const handleOpenTracker = (ticketId?: string) => {
    if (ticketId) {
      setTrackerInitialId(ticketId);
    }
    setIsTrackerOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      
      {/* Universal Top Navigation & Figma Screen Quick Navigator */}
      <Navbar
        currentScreen={currentScreen}
        onNavigate={setCurrentScreen}
        onOpenTracker={() => handleOpenTracker()}
      />

      {/* Main Screen Renderer */}
      <main className="flex-1 w-full">
        {/* Screen 1: Public Landing */}
        {currentScreen === 'landing' && (
          <LandingView
            complaints={complaints}
            onStartReport={() => setCurrentScreen('report-step-1-evidence')}
            onOpenTracker={() => handleOpenTracker()}
            onSelectComplaint={(complaint) => {
              setSelectedComplaint(complaint);
            }}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* Screens 2, 3, 4, 5, 6: Multi-Step Public Report Flow */}
        {(currentScreen === 'report-step-1-evidence' ||
          currentScreen === 'report-step-2-location' ||
          currentScreen === 'report-step-3-details' ||
          currentScreen === 'report-step-4-analysis' ||
          currentScreen === 'report-step-5-success') && (
          <ReportWizard
            currentScreen={currentScreen}
            onNavigate={setCurrentScreen}
            onComplaintCreated={handleComplaintCreated}
            onOpenTracker={handleOpenTracker}
          />
        )}

        {/* Screen 7: Official Portal Login */}
        {currentScreen === 'official-login' && (
          <OfficialLogin
            onLoginSuccess={() => {
              setIsOfficialAuthenticated(true);
              setCurrentScreen('official-overview');
            }}
            onBackToPublic={() => setCurrentScreen('landing')}
          />
        )}

        {/* Screen 8: Road Condition Overview & Metrics */}
        {currentScreen === 'official-overview' && (
          <OverviewDashboard
            complaints={complaints}
            onSelectComplaint={(complaint) => {
              setSelectedComplaint(complaint);
            }}
            onNavigate={setCurrentScreen}
          />
        )}

        {/* Screen 9: Complaint Detail View */}
        {currentScreen === 'official-detail' && (
          <ComplaintDetailView
            complaint={selectedComplaint}
            onUpdateComplaint={handleComplaintUpdated}
            onBack={() => setCurrentScreen('official-overview')}
          />
        )}

        {/* Screen 10: Road Map & High-Risk Areas (Analytics) */}
        {currentScreen === 'official-analytics' && (
          <AnalyticsMapView
            complaints={complaints}
            onSelectComplaint={(complaint) => {
              setSelectedComplaint(complaint);
            }}
            onNavigate={setCurrentScreen}
          />
        )}
      </main>

      {/* Real-Time Citizen Complaint Tracker Modal */}
      <TrackComplaintModal
        isOpen={isTrackerOpen}
        onClose={() => setIsTrackerOpen(false)}
        complaints={complaints}
        initialTicketId={trackerInitialId}
        onSelectForDetail={(complaint) => {
          setSelectedComplaint(complaint);
          setIsTrackerOpen(false);
          setCurrentScreen('official-detail');
        }}
      />

    </div>
  );
}

export default App;
