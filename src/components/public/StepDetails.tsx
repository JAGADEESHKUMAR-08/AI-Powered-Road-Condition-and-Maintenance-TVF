import React from 'react';
import {
  User,
  Phone,
  Mail,
  Home,
  Shield,
  ArrowRight,
  Sparkles,
  MapPin,
  CheckCircle2,
  FileText,
  FileVideo,
  Image as ImageIcon,
  Send,
} from 'lucide-react';
import { IssueType, LocationData, ReporterDetails, EvidenceMediaItem, AiAnalysisResult } from '../../types';

interface StepDetailsProps {
  selectedType: IssueType;
  location: LocationData;
  mediaItem: EvidenceMediaItem;
  aiAnalysis: AiAnalysisResult;
  reporter: ReporterDetails;
  onUpdateReporter: (reporter: ReporterDetails) => void;
  onSubmit: () => void;
  onBack: () => void;
}

export const StepDetails: React.FC<StepDetailsProps> = ({
  selectedType,
  location,
  mediaItem,
  aiAnalysis,
  reporter,
  onUpdateReporter,
  onSubmit,
  onBack,
}) => {
  const contactOptions: ('Phone' | 'SMS' | 'Email')[] = ['Phone', 'SMS', 'Email'];

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <span>STEP 3 OF 3</span>
            <span>•</span>
            <span className="text-slate-400">Reporter Info & Submission</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Details & Final Submission
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Confirm your contact details to receive repair status alerts and generate your tracking token.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-950/60 text-blue-300 border border-blue-800/40 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            AI Risk Score: {aiAnalysis.riskScore}/100
          </span>
        </div>
      </div>

      {/* Main Form Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Reporter Contact Form */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="rounded-2xl bg-[#111726] border border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h2 className="text-base font-bold text-white flex items-center gap-2">
                  <User className="w-4 h-4 text-blue-400" />
                  Citizen Contact Details
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  We send SMS/Email notifications as municipal engineers update your ticket status.
                </p>
              </div>
            </div>

            {/* Name & Mobile Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Full Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={reporter.fullName}
                    onChange={(e) => onUpdateReporter({ ...reporter, fullName: e.target.value })}
                    placeholder="e.g. Anjali Sharma"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                  />
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                  Mobile Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={reporter.mobile}
                    onChange={(e) => onUpdateReporter({ ...reporter, mobile: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
                  />
                  <Phone className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
                </div>
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={reporter.email}
                  onChange={(e) => onUpdateReporter({ ...reporter, email: e.target.value })}
                  placeholder="anjali.sharma@example.com"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Residential Address / Sector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Residential Address / Sector
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={reporter.address}
                  onChange={(e) => onUpdateReporter({ ...reporter, address: e.target.value })}
                  placeholder="123, Sector 4, New Delhi"
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
                />
                <Home className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
              </div>
            </div>

            {/* Preferred Contact Method */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                Preferred Notification Channel
              </label>
              <div className="flex items-center gap-3">
                {contactOptions.map((method) => (
                  <button
                    key={method}
                    type="button"
                    onClick={() => onUpdateReporter({ ...reporter, preferredContact: method })}
                    className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      reporter.preferredContact === method
                        ? 'bg-blue-600 text-white shadow-sm ring-1 ring-blue-400'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {method}
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy notice banner */}
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
              <Shield className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-400 leading-relaxed">
                Your personal details are encrypted and will only be used for official complaint processing, contractor site dispatch, and SMS/Email progress updates.
              </p>
            </div>

          </div>

        </div>

        {/* Right Column: Review Complaint Summary */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="rounded-2xl bg-[#111726] border border-slate-800 p-6 space-y-5 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-400" />
                Report Summary
              </h2>
              <span className="text-[11px] font-mono-code text-blue-400 font-bold bg-blue-950/60 px-2.5 py-0.5 rounded-lg border border-blue-800/40">
                Ready for Dispatch
              </span>
            </div>

            {/* Evidence Media Preview (Video or Image) */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Uploaded Evidence
                </span>
                <span className="text-[11px] text-slate-400 flex items-center gap-1">
                  {mediaItem.type === 'video' ? <FileVideo className="w-3.5 h-3.5 text-blue-400" /> : <ImageIcon className="w-3.5 h-3.5 text-blue-400" />}
                  {mediaItem.type === 'video' ? 'Video Evidence' : 'Photo Evidence'}
                </span>
              </div>

              <div className="h-32 rounded-xl overflow-hidden border border-slate-700 bg-black relative">
                {mediaItem.type === 'video' ? (
                  <video
                    src={mediaItem.url}
                    poster={mediaItem.poster}
                    muted
                    autoPlay
                    loop
                    playsInline
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img src={mediaItem.url} alt={mediaItem.name} className="w-full h-full object-cover" />
                )}
                
                <div className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 backdrop-blur-sm text-[10px] font-mono-code text-slate-200">
                  {mediaItem.name} ({mediaItem.size})
                </div>
              </div>
            </div>

            {/* AI Risk & Defect Card */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase font-bold text-slate-400">Defect & AI Severity</div>
                <span className="text-[10px] font-mono-code font-bold text-blue-400 bg-blue-950 px-2 py-0.5 rounded">
                  Score: {aiAnalysis.riskScore}/100
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">{aiAnalysis.detectedDefect}</span>
                <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-red-950 text-red-400 border border-red-800/40">
                  {aiAnalysis.severity} Priority
                </span>
              </div>
              <p className="text-[11px] text-slate-400 leading-snug">
                {aiAnalysis.explanation}
              </p>
            </div>

            {/* Pinned Location Summary */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-slate-400">
                <MapPin className="w-3 h-3 text-blue-400" />
                Pinned Location
              </div>
              <div className="text-xs font-semibold text-slate-200">
                {location.address}
              </div>
              <div className="text-[10px] font-mono-code text-slate-400">
                {location.latitude.toFixed(4)}° N, {location.longitude.toFixed(4)}° E • {location.sector}
              </div>
            </div>

            {/* Submit CTA Button */}
            <button
              id="btn-submit-report-final"
              onClick={onSubmit}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
            >
              <Send className="w-4 h-4 text-blue-200" />
              Submit Report & Get Tracking Token
            </button>

          </div>

        </div>

      </div>

      {/* Bottom Actions Footer */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          ← Back to Location Pin
        </button>

        <button
          onClick={onSubmit}
          className="px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
        >
          <span>Submit Report</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
