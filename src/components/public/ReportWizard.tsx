import React, { useState } from 'react';
import { Complaint, IssueType, LocationData, ReporterDetails, ActiveScreen, AiAnalysisResult, EvidenceMediaItem } from '../../types';
import { StepEvidence } from './StepEvidence';
import { StepLocation } from './StepLocation';
import { StepDetails } from './StepDetails';
import { StepSuccess } from './StepSuccess';
import { SAMPLE_MEDIA_ITEMS } from '../../data/mockData';

interface ReportWizardProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onComplaintCreated: (newComplaint: Complaint) => void;
  onOpenTracker: (ticketId?: string) => void;
}

export const ReportWizard: React.FC<ReportWizardProps> = ({
  currentScreen,
  onNavigate,
  onComplaintCreated,
  onOpenTracker,
}) => {
  // Wizard local states
  const [selectedType, setSelectedType] = useState<IssueType>('Pothole');
  const [mediaItem, setMediaItem] = useState<EvidenceMediaItem>(SAMPLE_MEDIA_ITEMS[0]);
  
  const [location, setLocation] = useState<LocationData>({
    latitude: 28.6139,
    longitude: 77.2090,
    address: 'Main Road, Sector 4, New Delhi, 110001',
    landmark: 'Near City Mall entrance, opposite bus shelter',
    sector: 'Sector 4',
    city: 'New Delhi',
    accuracy: 3.4,
  });

  const [reporter, setReporter] = useState<ReporterDetails>({
    fullName: 'Anjali Sharma',
    mobile: '+91 98765 43210',
    email: 'anjali.sharma@example.com',
    address: '123, Sector 4, New Delhi',
    preferredContact: 'Phone',
  });

  const [aiResult, setAiResult] = useState<AiAnalysisResult>({
    riskScore: 0,
    severity: 'Low',
    confidence: 0,
    detectedDefect: 'Other',
    detectedAreaPercent: 0,
    modelVersion: 'Road Defect YOLO',
    factors: {
      surfaceDamage: 'Low',
      trafficExposure: 'Low',
      waterAccumulation: 'Low',
      visibility: 'Low',
    },
    explanation: 'Upload a road image to begin analysis.',
    recommendedAction: 'No recommendation until an image is analyzed.',
  });

  const [createdTicket, setCreatedTicket] = useState<Complaint | null>(null);

  // Step transitions
  const handleProceedToLocation = () => {
    onNavigate('report-step-2-location');
  };

  const handleProceedToDetails = () => {
    onNavigate('report-step-3-details');
  };

  const handleFinalSubmission = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const trackingToken = `RG-2026-00${randomSuffix}`;
    
    const newComplaint: Complaint = {
      id: trackingToken,
      issueType: selectedType,
      title: `${selectedType} on ${location.address.split(',')[0]}`,
      description: `Reported road defect at ${location.address}. AI Risk Score: ${aiResult.riskScore}/100.`,
      evidenceImages: [mediaItem.poster || mediaItem.url],
      evidenceMedia: [mediaItem],
      mediaType: mediaItem.type,
      location,
      reporter,
      aiAnalysis: aiResult,
      status: 'Under Review',
      priority: aiResult.severity,
      assignedTeam: 'Road Repair Team A',
      inspectionDate: '2026-06-30',
      officialNotes: 'Pending field engineer dispatch review.',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          id: `t-${Date.now()}-1`,
          status: 'Under Review',
          timestamp: 'Just now',
          actor: `Citizen (${reporter.fullName})`,
          notes: `Complaint submitted with ${mediaItem.type} evidence via citizen portal.`,
        },
        {
          id: `t-${Date.now()}-2`,
          status: 'Under Review',
          timestamp: 'Just now',
          actor: 'AI Vision Auto-Triage',
          notes: `Computed Risk Score ${aiResult.riskScore}/100. Detected ${selectedType} (${aiResult.confidence}% confidence).`,
        },
      ],
    };

    setCreatedTicket(newComplaint);
    onComplaintCreated(newComplaint);
    onNavigate('report-step-5-success');
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#090d16] text-slate-100">
      
      {/* Step 1: Upload (Photo/Video) & Instant AI Risk Analysis */}
      {currentScreen === 'report-step-1-evidence' && (
        <StepEvidence
          selectedType={selectedType}
          onSelectType={setSelectedType}
          mediaItem={mediaItem}
          onUpdateMedia={setMediaItem}
          aiAnalysis={aiResult}
          onUpdateAiAnalysis={setAiResult}
          onNext={handleProceedToLocation}
          onCancel={() => onNavigate('landing')}
        />
      )}

      {/* Step 2: Choose Location */}
      {currentScreen === 'report-step-2-location' && (
        <StepLocation
          location={location}
          onUpdateLocation={setLocation}
          onNext={handleProceedToDetails}
          onBack={() => onNavigate('report-step-1-evidence')}
        />
      )}

      {/* Step 3: Details & Final Report Submission */}
      {currentScreen === 'report-step-3-details' && (
        <StepDetails
          selectedType={selectedType}
          location={location}
          mediaItem={mediaItem}
          aiAnalysis={aiResult}
          reporter={reporter}
          onUpdateReporter={setReporter}
          onSubmit={handleFinalSubmission}
          onBack={() => onNavigate('report-step-2-location')}
        />
      )}

      {/* Step 4 / Success: Confirmation with Tracking Token */}
      {currentScreen === 'report-step-5-success' && (
        <StepSuccess
          complaint={
            createdTicket || {
              id: 'RG-2026-004812',
              issueType: selectedType,
              title: `${selectedType} on Main Road`,
              description: 'Reported road defect',
              evidenceImages: [mediaItem.poster || mediaItem.url],
              evidenceMedia: [mediaItem],
              location,
              reporter,
              aiAnalysis: aiResult,
              status: 'Under Review',
              priority: 'High',
              assignedTeam: 'Road Repair Team A',
              inspectionDate: '2026-06-30',
              officialNotes: '',
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
              timeline: [],
            }
          }
          onTrack={() => onOpenTracker(createdTicket?.id || 'RG-2026-004812')}
          onNewReport={() => onNavigate('report-step-1-evidence')}
          onGoHome={() => onNavigate('landing')}
        />
      )}

    </div>
  );
};
