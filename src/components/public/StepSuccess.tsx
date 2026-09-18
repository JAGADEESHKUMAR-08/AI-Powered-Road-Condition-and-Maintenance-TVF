import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Copy,
  Download,
  Search,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  MapPin,
  Calendar,
  Sparkles,
  QrCode,
} from 'lucide-react';
import { Complaint } from '../../types';

interface StepSuccessProps {
  complaint: Complaint;
  onTrack: () => void;
  onNewReport: () => void;
  onGoHome: () => void;
}

export const StepSuccess: React.FC<StepSuccessProps> = ({
  complaint,
  onTrack,
  onNewReport,
  onGoHome,
}) => {
  useEffect(() => {
    try {
      confetti({
        particleCount: 70,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#3b82f6', '#60a5fa', '#10b981', '#f59e0b'],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const handleCopyId = () => {
    navigator.clipboard?.writeText(complaint.id);
    alert(`Complaint ID ${complaint.id} copied to clipboard!`);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 py-10">
      
      {/* Top Breadcrumb & Status */}
      <div className="flex items-center justify-between pb-6 border-b border-slate-800">
        <div className="text-xs font-mono-code font-bold uppercase tracking-wider text-slate-400">
          Complaint Confirmation & Tracking
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold uppercase bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 flex items-center gap-1.5 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
          Confirmed
        </span>
      </div>

      {/* Main Success Container (Matching Figma Screen 6) */}
      <div className="mt-8 rounded-2xl bg-[#111726] border border-slate-800 p-6 sm:p-10 space-y-8 shadow-2xl text-center">
        
        {/* Animated Checkmark Circle */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-4 shadow-lg shadow-emerald-500/10">
            <CheckCircle2 className="w-9 h-9 text-emerald-400" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
            Complaint Submitted Successfully
          </h1>
          <p className="text-slate-400 text-sm mt-1.5 max-w-md mx-auto">
            Your report has been received and is now in the municipal inspection queue.
          </p>
        </div>

        {/* Large Reference Box (RG-2026-001284) */}
        <div className="p-4 rounded-xl bg-slate-900/90 border border-slate-700/80 max-w-md mx-auto flex items-center justify-between">
          <div className="text-left">
            <div className="text-[10px] uppercase font-bold text-slate-400">
              Official Reference Ticket ID
            </div>
            <div className="text-xl sm:text-2xl font-extrabold font-mono-code text-blue-400 tracking-wider">
              {complaint.id}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyId}
              className="p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
              title="Copy Ticket ID"
            >
              <Copy className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Detailed Metadata Grid (Matching Screen 6) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-left">
          
          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5 mb-1">
              <Calendar className="w-3.5 h-3.5 text-blue-400" />
              Date Submitted
            </div>
            <div className="text-xs font-semibold text-white font-mono-code">
              {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })} 09:41 AM IST
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5 mb-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              Issue Type
            </div>
            <div className="text-xs font-semibold text-white">
              {complaint.issueType} <span className="text-slate-400 text-[11px] font-normal">(Road defect)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 flex items-center gap-1.5 mb-1">
              <MapPin className="w-3.5 h-3.5 text-blue-400" />
              Location
            </div>
            <div className="text-xs font-semibold text-white truncate">
              {complaint.location.address}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              AI Risk Score
            </div>
            <div className="text-sm font-bold font-mono-code text-red-400 flex items-center gap-2">
              <span>{complaint.aiAnalysis.riskScore} / 100</span>
              <span className="px-1.5 py-0.2 rounded text-[9px] font-bold bg-red-950 text-red-400 border border-red-800/40 uppercase">
                High
              </span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              Assigned Severity
            </div>
            <div className="text-xs font-semibold text-amber-300">
              High (Requires prompt attention)
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
            <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
              Current Status
            </div>
            <div className="text-xs font-semibold text-blue-300 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse"></span>
              Under Review
            </div>
          </div>

        </div>

        {/* Action Buttons Row */}
        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            id="btn-track-submitted-complaint"
            onClick={onTrack}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
          >
            <Search className="w-4 h-4" />
            Track Complaint in Real-Time
          </button>

          <button
            onClick={onNewReport}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer border border-slate-700"
          >
            <PlusCircle className="w-4 h-4 text-blue-400" />
            Submit Another Report
          </button>

          <button
            onClick={onGoHome}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl text-slate-400 hover:text-white text-xs font-medium transition-colors"
          >
            Return to Home
          </button>
        </div>

      </div>

    </div>
  );
};
