export type IssueType =
  | 'Pothole'
  | 'Crack'
  | 'Damaged Surface'
  | 'Water Accumulation'
  | 'Road Edge Damage'
  | 'Drainage Issue'
  | 'Other';

export type MediaType = 'image' | 'video';

export interface EvidenceMediaItem {
  id: string;
  url: string;
  type: MediaType;
  name: string;
  size: string;
  duration?: string;
  poster?: string;
}

export type ComplaintStatus =
  | 'Under Review'
  | 'Inspection Scheduled'
  | 'Planned'
  | 'In Progress'
  | 'Completed'
  | 'Rejected';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface LocationData {
  latitude: number;
  longitude: number;
  address: string;
  landmark: string;
  sector: string;
  city: string;
  accuracy: number;
}

export interface ReporterDetails {
  fullName: string;
  mobile: string;
  email: string;
  address: string;
  preferredContact: 'Phone' | 'SMS' | 'Email';
}

export interface RiskFactors {
  surfaceDamage: 'Critical' | 'High' | 'Medium' | 'Low';
  trafficExposure: 'Critical' | 'High' | 'Medium' | 'Low';
  waterAccumulation: 'Critical' | 'High' | 'Medium' | 'Low';
  visibility: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface AiAnalysisResult {
  riskScore: number;
  severity: PriorityLevel;
  confidence: number;
  detectedDefect: IssueType;
  detectedAreaPercent: number;
  modelVersion: string;
  factors: RiskFactors;
  explanation: string;
  recommendedAction: string;
  boundingBox?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  videoFramesAnalyzed?: number;
  motionImpactSeverity?: string;
}

export interface ComplaintTimelineEvent {
  id: string;
  status: ComplaintStatus;
  timestamp: string;
  actor: string;
  notes: string;
}

export interface Complaint {
  id: string; // e.g. RG-2026-001284 (Tracking Token)
  issueType: IssueType;
  title: string;
  description: string;
  evidenceImages: string[];
  evidenceMedia?: EvidenceMediaItem[];
  mediaType?: MediaType;
  location: LocationData;
  reporter: ReporterDetails;
  aiAnalysis: AiAnalysisResult;
  status: ComplaintStatus;
  priority: PriorityLevel;
  assignedTeam: string;
  inspectionDate: string;
  officialNotes: string;
  createdAt: string;
  updatedAt: string;
  timeline: ComplaintTimelineEvent[];
}

export interface RoadSegment {
  id: string;
  name: string;
  sector: string;
  complaintsCount: number;
  avgRisk: number;
  criticalCount: number;
  trend: 'increasing' | 'stable' | 'decreasing';
  lat: number;
  lng: number;
  status: 'critical' | 'warning' | 'normal';
}

export interface MunicipalKPIs {
  totalComplaints: number;
  urgentNew: number;
  criticalCount: number;
  pendingInspection: number;
  resolvedCount: number;
  avgResolutionDays: number;
  resolutionTimeDelta: number;
  riskDistribution: {
    low: number;
    medium: number;
    high: number;
    critical: number;
  };
}

export type ActiveScreen =
  | 'landing'
  | 'report-step-1-evidence' // Step 1: Upload (Photo/Video) & Instant AI Analysis
  | 'report-step-2-location' // Step 2: Choose Location
  | 'report-step-3-details'  // Step 3: Details & Submit
  | 'report-step-4-analysis' // Direct view of AI score if visited
  | 'report-step-5-success'  // Step 4: Success & Tracking Token
  | 'track-complaint'
  | 'official-login'
  | 'official-overview'
  | 'official-detail'
  | 'official-analytics';
