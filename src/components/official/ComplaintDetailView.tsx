import React, { useState } from 'react';
import {
  ArrowLeft,
  Bot,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
  Clock,
  ShieldCheck,
  Send,
  Layers,
  Wrench,
  Building,
  Eye,
  Crosshair,
} from 'lucide-react';
import { Complaint, ActiveScreen } from '../../types';
import { RiskGauge } from '../common/RiskGauge';

interface ComplaintDetailViewProps {
  complaint: Complaint;
  onUpdateComplaint: (updated: Complaint) => void;
  onBack: () => void;
}

export const ComplaintDetailView: React.FC<ComplaintDetailViewProps> = ({
  complaint,
  onUpdateComplaint,
  onBack,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [showAiOverlay, setShowAiOverlay] = useState(true);
  const [currentStatus, setCurrentStatus] = useState(complaint.status);
  const [currentPriority, setCurrentPriority] = useState(complaint.priority);
  const [assignedTeam, setAssignedTeam] = useState(complaint.assignedTeam || 'Road Repair Team A');
  const [inspectionDate, setInspectionDate] = useState(complaint.inspectionDate || '2026-06-30');
  const [officialNotes, setOfficialNotes] = useState(
    complaint.officialNotes || 'Defect verified via computer vision telemetry. Contractor dispatched for hot-mix leveling.'
  );
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveChanges = () => {
    const updated: Complaint = {
      ...complaint,
      status: currentStatus,
      priority: currentPriority,
      assignedTeam,
      inspectionDate,
      officialNotes,
      updatedAt: new Date().toISOString(),
      timeline: [
        {
          id: `t-${Date.now()}`,
          status: currentStatus,
          timestamp: 'Just now',
          actor: 'PWD Officer (Rajesh Kumar)',
          notes: `Updated status to "${currentStatus}". Assigned to ${assignedTeam}. Notes: ${officialNotes}`,
        },
        ...complaint.timeline,
      ],
    };

    onUpdateComplaint(updated);
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  const getMeterPercent = (level: string) => {
    switch (level) {
      case 'Critical':
        return '92%';
      case 'High':
        return '78%';
      case 'Medium':
        return '54%';
      default:
        return '25%';
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#090d16] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Top Breadcrumb & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors cursor-pointer"
            title="Back to Queue"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-blue-400">
              <span>WORK ORDER TRIAGE</span>
              <span>•</span>
              <span className="text-slate-400">{complaint.id}</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white mt-0.5">
              Complaint Detail: {complaint.issueType} on {complaint.location.sector}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            onClick={() => alert(`Work order brief for ${complaint.id} exported.`)}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export Work Order
          </button>

          <span
            className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase border ${
              complaint.priority === 'Critical'
                ? 'bg-red-950 text-red-300 border-red-800/50'
                : 'bg-orange-950 text-orange-300 border-orange-800/50'
            }`}
          >
            {complaint.priority} Priority
          </span>
        </div>
      </div>

      {/* Main Detail Grid (Matching Figma Screen 9) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Defect Photo Viewer, Location, Reporter Info, Timeline */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Photo & Computer Vision HUD */}
          <div className="rounded-2xl bg-[#111726] border border-slate-800 overflow-hidden space-y-4 p-5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Eye className="w-4 h-4 text-blue-400" />
                Citizen Evidence & AI Defect Overlay
              </span>

              <button
                onClick={() => setShowAiOverlay(!showAiOverlay)}
                className={`px-2.5 py-1 rounded-lg text-xs font-mono-code font-semibold transition-colors cursor-pointer border ${
                  showAiOverlay
                    ? 'bg-blue-600/30 text-blue-300 border-blue-500'
                    : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}
              >
                {showAiOverlay ? 'AI Bounding Box: ON' : 'AI Bounding Box: OFF'}
              </button>
            </div>

            {/* Photo Canvas Container */}
            <div className="relative rounded-xl overflow-hidden bg-black h-72 sm:h-96 border border-slate-700 select-none">
              <img
                src={complaint.evidenceImages[activeImageIndex] || complaint.evidenceImages[0]}
                alt="Defect evidence"
                className="w-full h-full object-cover"
              />

              {/* AI Bounding Box HUD */}
              {showAiOverlay && complaint.aiAnalysis.boundingBox && (
                <div
                  className="absolute border-2 border-red-500 rounded bg-red-500/15 pointer-events-none animate-pulse flex flex-col justify-between p-1.5 shadow-2xl"
                  style={{
                    left: `${complaint.aiAnalysis.boundingBox.x}%`,
                    top: `${complaint.aiAnalysis.boundingBox.y}%`,
                    width: `${complaint.aiAnalysis.boundingBox.width}%`,
                    height: `${complaint.aiAnalysis.boundingBox.height}%`,
                  }}
                >
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 text-[9px] font-mono-code font-bold bg-red-600 text-white rounded shadow">
                      {complaint.aiAnalysis.detectedDefect.toUpperCase()} ({complaint.aiAnalysis.confidence}%)
                    </span>
                    <span className="text-[9px] font-mono-code text-red-200 bg-black/60 px-1 rounded">
                      SEV: {complaint.aiAnalysis.severity}
                    </span>
                  </div>

                  <div className="text-[9px] font-mono-code text-red-100 self-end bg-black/60 px-1 rounded">
                    AREA: {complaint.aiAnalysis.detectedAreaPercent}%
                  </div>
                </div>
              )}

              {/* Bottom photo metadata strip */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 font-mono-code text-slate-300 text-[11px]">
                  <span>LAT: {complaint.location.latitude.toFixed(4)}° N</span>
                  <span>|</span>
                  <span>LNG: {complaint.location.longitude.toFixed(4)}° E</span>
                </div>
                <span className="text-emerald-400 text-[11px] font-medium">GPS Geotag Verified</span>
              </div>
            </div>

            {/* Thumbnail switcher if multiple photos */}
            {complaint.evidenceImages.length > 1 && (
              <div className="flex items-center gap-2 pt-1">
                {complaint.evidenceImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-12 rounded-lg overflow-hidden border cursor-pointer ${
                      activeImageIndex === idx ? 'border-blue-500 ring-2 ring-blue-500/50' : 'border-slate-700 opacity-60'
                    }`}
                  >
                    <img src={img} alt="Thumb" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Location & Reporter Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Pinned Location */}
            <div className="p-4 rounded-2xl bg-[#111726] border border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-blue-400" />
                Defect Coordinates
              </div>
              <div className="text-xs font-bold text-white leading-relaxed">
                {complaint.location.address}
              </div>
              {complaint.location.landmark && (
                <div className="text-[11px] text-slate-400">
                  Landmark: {complaint.location.landmark}
                </div>
              )}
              <div className="pt-2 text-[10px] font-mono-code text-blue-300">
                Sector: {complaint.location.sector} • City: {complaint.location.city}
              </div>
            </div>

            {/* Citizen Reporter */}
            <div className="p-4 rounded-2xl bg-[#111726] border border-slate-800 space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                <User className="w-4 h-4 text-blue-400" />
                Citizen Reporter
              </div>
              <div className="text-xs font-bold text-white">
                {complaint.reporter.fullName}
              </div>
              <div className="text-[11px] text-slate-300 font-mono-code flex items-center gap-1.5">
                <Phone className="w-3 h-3 text-slate-400" />
                {complaint.reporter.mobile}
              </div>
              <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
                <Mail className="w-3 h-3 text-slate-400" />
                {complaint.reporter.email || 'Email not provided'}
              </div>
            </div>

          </div>

          {/* Timeline & Audit Log */}
          <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-400" />
              Event Timeline & Audit Log
            </h3>

            <div className="space-y-3.5 pl-3 border-l-2 border-slate-800">
              {complaint.timeline.map((event) => (
                <div key={event.id} className="relative pl-5 text-xs">
                  <div className="absolute -left-[29px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[#111726]"></div>
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-white">{event.actor}</span>
                    <span className="text-[10px] text-slate-400 font-mono-code">{event.timestamp}</span>
                  </div>
                  <div className="text-[11px] text-blue-300 font-medium mt-0.5">
                    Status: {event.status}
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5 leading-relaxed">
                    {event.notes}
                  </p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Column: AI Risk Gauge & Official Assessment Form (Matching Screen 9) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* AI Speedometer Card */}
          <div className="p-6 rounded-2xl bg-[#111726] border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Bot className="w-4 h-4 text-blue-400" />
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  AI Computer Vision Score
                </h3>
              </div>
              <span className="text-[10px] font-mono-code text-blue-400">
                Model {complaint.aiAnalysis.modelVersion}
              </span>
            </div>

            {/* Semicircular Gauge */}
            <div className="flex flex-col items-center justify-center bg-[#0c101d] rounded-xl p-4 border border-slate-800">
              <RiskGauge score={complaint.aiAnalysis.riskScore} size={220} showLabels={true} />
              
              <div className="mt-2 text-center text-xs">
                <span className="text-slate-400">Confidence Rating: </span>
                <strong className="text-emerald-400 font-mono-code">{complaint.aiAnalysis.confidence}%</strong>
              </div>
            </div>

            {/* Risk Factor Meters */}
            <div className="space-y-2.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                Risk Metric Breakdown
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Surface Damage</span>
                    <span className="font-bold text-orange-400">{complaint.aiAnalysis.factors.surfaceDamage}</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-orange-500 rounded-full" style={{ width: getMeterPercent(complaint.aiAnalysis.factors.surfaceDamage) }}></div>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-300">Traffic Density Exposure</span>
                    <span className="font-bold text-red-400">{complaint.aiAnalysis.factors.trafficExposure}</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: getMeterPercent(complaint.aiAnalysis.factors.trafficExposure) }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Official Assessment & Dispatch Form (Matching Figma Screen 9) */}
          <div className="p-6 rounded-2xl bg-[#111726] border border-slate-800 space-y-5">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Wrench className="w-4 h-4 text-blue-400" />
                Official Work Order & Dispatch
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Update triage status and dispatch municipal field repair contractor.
              </p>
            </div>

            {/* Status Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Municipal Status
              </label>
              <select
                value={currentStatus}
                onChange={(e) => setCurrentStatus(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
              >
                <option value="Under Review">Under Review (Initial Triage)</option>
                <option value="Inspection Scheduled">Inspection Scheduled</option>
                <option value="Planned">Planned (Work Order Queued)</option>
                <option value="In Progress">In Progress (Crews On Site)</option>
                <option value="Completed">Completed (Repairs Verified)</option>
              </select>
            </div>

            {/* Priority Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Priority Classification
              </label>
              <select
                value={currentPriority}
                onChange={(e) => setCurrentPriority(e.target.value as any)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
              >
                <option value="Critical">Critical (Immediate Emergency Patch)</option>
                <option value="High">High Priority (Within 24-48 Hours)</option>
                <option value="Medium">Medium Priority (Standard Schedule)</option>
                <option value="Low">Low Priority (Routine Resurfacing)</option>
              </select>
            </div>

            {/* Contractor Team */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Assigned Repair Unit
              </label>
              <select
                value={assignedTeam}
                onChange={(e) => setAssignedTeam(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 font-medium"
              >
                <option value="Road Repair Team A">Road Repair Team A (Central Sector)</option>
                <option value="Road Repair Team B">Road Repair Team B (South Zone)</option>
                <option value="Road Repair Team C">Road Repair Team C (Heavy Asphalt Machinery)</option>
                <option value="Rapid Response Pothole Unit">Rapid Response Pothole Unit (Cold Mix)</option>
              </select>
            </div>

            {/* Target Inspection Date */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Target Repair Date
              </label>
              <input
                type="date"
                value={inspectionDate}
                onChange={(e) => setInspectionDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
              />
            </div>

            {/* Officer Notes */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Official Work Order Directives
              </label>
              <textarea
                rows={3}
                value={officialNotes}
                onChange={(e) => setOfficialNotes(e.target.value)}
                placeholder="Enter contractor directives, material specifications, or site safety notes..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Save Button */}
            <button
              id="btn-dispatch-crew"
              onClick={handleSaveChanges}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
            >
              <Send className="w-4 h-4" />
              Update Work Order & Dispatch Crew
            </button>

            {isSaved && (
              <div className="p-3 rounded-xl bg-emerald-950/80 border border-emerald-800/60 text-emerald-300 text-xs flex items-center gap-2 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Work order saved and dispatched to {assignedTeam}.
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
};
