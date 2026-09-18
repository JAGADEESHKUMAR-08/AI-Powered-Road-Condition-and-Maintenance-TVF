import React from 'react';
import {
  Camera,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ArrowRight,
  ShieldAlert,
  Bot,
  Activity,
  ChevronRight,
  Sparkles,
  MapPin,
  Building2,
  Download,
} from 'lucide-react';
import { Complaint, ActiveScreen } from '../../types';

interface LandingViewProps {
  complaints: Complaint[];
  onStartReport: () => void;
  onOpenTracker: () => void;
  onSelectComplaint: (complaint: Complaint) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const LandingView: React.FC<LandingViewProps> = ({
  complaints,
  onStartReport,
  onOpenTracker,
  onSelectComplaint,
  onNavigate,
}) => {
  const featuredComplaint = complaints[0] || null;

  return (
    <div className="w-full min-h-screen bg-[#090d16] text-slate-100 pb-20">
      
      {/* Top Banner / Breadcrumb info */}
      <div className="border-b border-slate-800/60 bg-[#0c101d] px-4 py-2 text-xs text-slate-400 flex items-center justify-between">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-mono-code text-slate-300">Tuesday, June 30, 2026</span>
            <span className="text-slate-600">•</span>
            <span className="text-blue-400 font-medium">Smart City Road Infrastructure Grid v4.2</span>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-[11px] text-slate-400">
            <span>Live Municipal Sensor Feeds: <strong className="text-emerald-400">Active</strong></span>
            <span>Avg Response: <strong className="text-slate-200">24h</strong></span>
          </div>
        </div>
      </div>

      {/* Main Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Hero Text & CTA */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Tagline Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-950/70 border border-blue-800/60 text-blue-300 text-xs font-semibold tracking-wider uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>
              SMART CITY INFRASTRUCTURE • PUBLIC REPORTING
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.12]">
              Report road defects. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-indigo-300">
                Track repairs.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-xl">
              RoadGuard AI helps citizens and municipal public works teams identify,
              prioritize, and fix road hazards faster with automated computer vision risk assessment.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                id="hero-report-button"
                onClick={onStartReport}
                className="px-6 py-3.5 rounded-xl text-sm sm:text-base font-semibold text-white bg-blue-600 hover:bg-blue-500 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/30 flex items-center gap-2.5 cursor-pointer border border-blue-400/30"
              >
                <Camera className="w-5 h-5" />
                Report a Road Issue
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </button>

              <button
                id="hero-track-button"
                onClick={onOpenTracker}
                className="px-6 py-3.5 rounded-xl text-sm sm:text-base font-medium text-slate-200 bg-slate-900/80 hover:bg-slate-800 hover:text-white active:scale-[0.98] transition-all border border-slate-700/80 flex items-center gap-2 cursor-pointer"
              >
                <Search className="w-4 h-4 text-slate-400" />
                Track My Complaint
              </button>
            </div>

            {/* Municipality Coverage */}
            <div className="flex items-center gap-6 pt-4 text-xs text-slate-400 border-t border-slate-800/60">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-blue-400" />
                <span>Available in <strong className="text-slate-200 font-semibold">34 municipalities</strong></span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span><strong className="text-slate-200 font-semibold">1,284+</strong> hazards resolved</span>
              </div>
            </div>

            {/* Recent Notifications Widget matching Screen 1 bottom-right card */}
            <div className="rounded-xl bg-[#0f1422] border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <Activity className="w-4 h-4 text-amber-400" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Live Municipal Activity Feed
                  </span>
                </div>
                <button
                  onClick={() => onNavigate('official-overview')}
                  className="text-[11px] text-blue-400 hover:text-blue-300 font-medium flex items-center"
                >
                  View All <ChevronRight className="w-3 h-3 ml-0.5" />
                </button>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="p-2.5 rounded-lg bg-red-950/30 border border-red-900/40 flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-red-500 mt-1.5 shrink-0"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-red-200">Critical Defect Reported</span>
                      <span className="text-[10px] text-slate-400">10 min ago</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Critical pothole reported on Lake Road, Sector 7 is high-risk and awaiting inspection.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-blue-950/20 border border-blue-900/30 flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-1.5 shrink-0"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200">New Complaint Received</span>
                      <span className="text-[10px] text-slate-400">25 min ago</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Complaint <span className="font-mono-code text-blue-300">RG-2026-001285</span> submitted from Sector 3.
                    </p>
                  </div>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800 flex items-start gap-2.5">
                  <div className="w-2 h-2 rounded-full bg-amber-400 mt-1.5 shrink-0"></div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-slate-200">Inspection Scheduled</span>
                      <span className="text-[10px] text-slate-400">2 hours ago</span>
                    </div>
                    <p className="text-slate-400 text-[11px] mt-0.5">
                      Team A dispatched for site survey at Main Road, Sector 4.
                    </p>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual & Mini Ticket Board (Figma Screen 1 layout) */}
          <div className="lg:col-span-6 space-y-6">
            
            {/* Defect AI Detection Showcase Card */}
            <div className="rounded-2xl bg-[#111726] border border-slate-700/80 overflow-hidden shadow-2xl">
              
              {/* Photo area with Defect Bounding Box HUD */}
              <div className="relative h-64 sm:h-72 w-full overflow-hidden bg-slate-950">
                <img
                  src="https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=1200&q=80"
                  alt="Road defect pothole preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111726] via-transparent to-black/40"></div>

                {/* Simulated Computer Vision Bounding Box */}
                <div className="absolute top-[28%] left-[26%] w-[48%] h-[42%] border-2 border-red-500 rounded-md bg-red-500/10 pointer-events-none animate-pulse flex flex-col justify-between p-1.5">
                  <div className="flex items-center justify-between">
                    <span className="px-1.5 py-0.5 text-[9px] font-mono-code font-bold bg-red-600 text-white rounded">
                      DEFECT #01: POTHOLE (94%)
                    </span>
                    <span className="text-[9px] font-mono-code text-red-300">
                      DEPTH: 8.5cm
                    </span>
                  </div>
                  <div className="text-[9px] font-mono-code text-red-200 self-end">
                    AREA: 18.4%
                  </div>
                </div>

                {/* Top overlay badges */}
                <div className="absolute top-3 left-3 flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-md text-[11px] font-mono-code font-bold bg-black/70 text-slate-200 border border-slate-700 backdrop-blur-md">
                    Sector 4 • Main Road
                  </span>
                  <span className="px-2 py-1 rounded-md text-[11px] font-bold bg-red-600 text-white shadow-md">
                    HIGH RISK
                  </span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="px-2 py-1 rounded-md text-[10px] font-mono-code font-semibold bg-blue-900/80 text-blue-200 border border-blue-500/40 backdrop-blur-md">
                    AI Model RG-Vision v4.2
                  </span>
                </div>
              </div>

              {/* Card Meta Stats Bar */}
              <div className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3 text-center divide-x divide-slate-800 bg-slate-900/80 p-3 rounded-xl border border-slate-800">
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Detected</div>
                    <div className="text-sm sm:text-base font-bold text-white mt-0.5">Pothole</div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Risk Score</div>
                    <div className="text-sm sm:text-base font-bold text-red-400 font-mono-code mt-0.5">
                      82 / 100
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] uppercase font-bold text-slate-400">Severity</div>
                    <div className="text-sm sm:text-base font-bold text-amber-400 mt-0.5">
                      High Priority
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1.5">
                    <Bot className="w-3.5 h-3.5 text-blue-400" />
                    Computer Vision Confidence: <strong className="text-slate-200">94%</strong>
                  </span>
                  <button
                    onClick={() => {
                      if (featuredComplaint) {
                        onSelectComplaint(featuredComplaint);
                        onNavigate('official-detail');
                      }
                    }}
                    className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1 cursor-pointer"
                  >
                    View Official Assessment <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Mini Ticket Board / Status Tracker Ticker (Matching Figma Screen 1) */}
            <div className="rounded-2xl bg-[#0e1320] border border-slate-800 p-4 space-y-3">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <ShieldAlert className="w-4 h-4 text-blue-400" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                    Maintenance Queue Status
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-blue-400"></span> 2 Inspection
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span> 2 Planned
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> 1 Done
                  </span>
                </div>
              </div>

              {/* Ticket Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {complaints.slice(0, 4).map((item) => (
                  <div
                    key={item.id}
                    onClick={() => {
                      onSelectComplaint(item);
                      onNavigate('official-detail');
                    }}
                    className="p-3 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 transition-all cursor-pointer group"
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[10px] font-mono-code font-bold text-blue-400">
                        {item.id}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase ${
                          item.priority === 'Critical'
                            ? 'bg-red-950 text-red-400 border border-red-800/40'
                            : item.priority === 'High'
                            ? 'bg-orange-950 text-orange-400 border border-orange-800/40'
                            : 'bg-slate-800 text-slate-300'
                        }`}
                      >
                        {item.priority}
                      </span>
                    </div>

                    <div className="font-semibold text-xs text-white group-hover:text-blue-300 transition-colors truncate">
                      {item.issueType} • {item.location.sector}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60 text-[10px] text-slate-400">
                      <span>{item.assignedTeam}</span>
                      <span className="font-mono-code text-slate-300">{item.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* "How It Works" 4-Step Process (Matching Figma Screen 1) */}
      <section className="border-t border-slate-800/80 bg-[#0a0e18] py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              How It Works
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              From citizen photo to municipal work order in four automated steps.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Step 01 */}
            <div className="p-6 rounded-2xl bg-[#101524] border border-slate-800 relative hover:border-blue-700/50 transition-all">
              <div className="text-xs font-mono-code font-bold text-blue-400 mb-4 flex items-center justify-between">
                <span>01</span>
                <Camera className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Capture</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Take a quick photo or video of the pothole, fissure, or waterlogged road condition using any device.
              </p>
            </div>

            {/* Step 02 */}
            <div className="p-6 rounded-2xl bg-[#101524] border border-slate-800 relative hover:border-blue-700/50 transition-all">
              <div className="text-xs font-mono-code font-bold text-blue-400 mb-4 flex items-center justify-between">
                <span>02</span>
                <MapPin className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Submit & Geotag</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Our GPS locator pins the exact road segment and coordinates with high accuracy and landmark verification.
              </p>
            </div>

            {/* Step 03 */}
            <div className="p-6 rounded-2xl bg-[#101524] border border-slate-800 relative hover:border-blue-700/50 transition-all">
              <div className="text-xs font-mono-code font-bold text-blue-400 mb-4 flex items-center justify-between">
                <span>03</span>
                <Bot className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">AI Analysis</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                RoadGuard AI measures defect area, computes risk score (0-100), and classifies repair severity in seconds.
              </p>
            </div>

            {/* Step 04 */}
            <div className="p-6 rounded-2xl bg-[#101524] border border-slate-800 relative hover:border-blue-700/50 transition-all">
              <div className="text-xs font-mono-code font-bold text-blue-400 mb-4 flex items-center justify-between">
                <span>04</span>
                <Building2 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">Authority Action</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Municipal PWD teams receive triaged work orders, schedule repairs, and update status in real time.
              </p>
            </div>

          </div>

          {/* Quick Action Badges matching Figma bottom bar */}
          <div className="mt-12 pt-8 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-2">
                Public Insights:
              </span>
              <button
                onClick={() => onNavigate('official-analytics')}
                className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
              >
                Daily Road Condition
              </button>
              <button
                onClick={() => onNavigate('official-analytics')}
                className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
              >
                High-Risk Corridors
              </button>
              <button
                onClick={() => onNavigate('official-overview')}
                className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
              >
                Maintenance Queue
              </button>
              <button
                onClick={() => onNavigate('official-analytics')}
                className="px-3 py-1.5 rounded-lg text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 cursor-pointer"
              >
                Area-wise Statistics
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => onNavigate('report-step-1-evidence')}
                className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white flex items-center gap-1.5 shadow-md"
              >
                <Sparkles className="w-3.5 h-3.5" />
                Submit New Complaint
              </button>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
