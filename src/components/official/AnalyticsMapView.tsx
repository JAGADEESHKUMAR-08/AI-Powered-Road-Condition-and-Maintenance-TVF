import React, { useState } from 'react';
import {
  MapPin,
  Layers,
  AlertTriangle,
  Bot,
  Activity,
  Filter,
  BarChart3,
  Sparkles,
  TrendingUp,
  Download,
  Eye,
  ShieldAlert,
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Complaint, RoadSegment, ActiveScreen } from '../../types';
import { HIGH_RISK_SEGMENTS, DEFECT_TYPE_BREAKDOWN, SECTOR_COMPLAINTS_RANKING } from '../../data/mockData';

interface AnalyticsMapViewProps {
  complaints: Complaint[];
  onSelectComplaint: (complaint: Complaint) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const AnalyticsMapView: React.FC<AnalyticsMapViewProps> = ({
  complaints,
  onSelectComplaint,
  onNavigate,
}) => {
  const [selectedSegment, setSelectedSegment] = useState<RoadSegment>(HIGH_RISK_SEGMENTS[0]);
  const [viewMode, setViewMode] = useState<'corridors' | 'heatmap'>('corridors');

  const COLORS = ['#ef4444', '#f97316', '#3b82f6', '#06b6d4', '#8b5cf6'];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#090d16] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-blue-400">
            <span>MUNICIPAL GIS & AI ANALYTICS</span>
            <span>•</span>
            <span className="text-slate-400">Spatial Intelligence</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Road Map & High-Risk Areas
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Defect density heatmaps, corridor risk scores, and predictive road degradation insights.
          </p>
        </div>

        {/* Layer Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center bg-slate-900 p-1 rounded-xl border border-slate-700 text-xs">
            <button
              onClick={() => setViewMode('corridors')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                viewMode === 'corridors' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Risk Corridors
            </button>
            <button
              onClick={() => setViewMode('heatmap')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                viewMode === 'heatmap' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Defect Heatmap
            </button>
          </div>

          <button
            onClick={() => alert('GIS Spatial Analytics Layer exported as GeoJSON')}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export GeoJSON
          </button>
        </div>
      </div>

      {/* Main Map & Corridor Explorer Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive GIS Map Canvas */}
        <div className="lg:col-span-8 space-y-4">
          
          <div className="relative rounded-2xl bg-[#0b101c] border border-slate-800 overflow-hidden h-[460px] sm:h-[540px] shadow-2xl">
            
            {/* Custom SVG High-Tech Road GIS Canvas */}
            <div className="w-full h-full relative overflow-hidden bg-[#070b14]">
              
              {/* Dot Grid matrix */}
              <div
                className="absolute inset-0 opacity-15"
                style={{
                  backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
                  backgroundSize: '20px 20px',
                }}
              ></div>

              <svg className="w-full h-full" viewBox="0 0 700 500">
                {/* Sector Background Enclosures */}
                <rect x="40" y="30" width="280" height="180" rx="12" fill="#0d1424" stroke="#172238" strokeWidth="1.5" />
                <text x="60" y="65" fill="#64748b" fontSize="12" fontWeight="bold" letterSpacing="1">SECTOR 4 • CENTRAL ARTERIAL</text>
                
                <rect x="360" y="30" width="300" height="180" rx="12" fill="#0d1424" stroke="#172238" strokeWidth="1.5" />
                <text x="380" y="65" fill="#64748b" fontSize="12" fontWeight="bold" letterSpacing="1">SECTOR 7 • INDUSTRIAL BELT</text>

                <rect x="40" y="250" width="280" height="210" rx="12" fill="#0d1424" stroke="#172238" strokeWidth="1.5" />
                <text x="60" y="285" fill="#64748b" fontSize="12" fontWeight="bold" letterSpacing="1">SECTOR 3 • RESIDENTIAL NORTH</text>

                <rect x="360" y="250" width="300" height="210" rx="12" fill="#0d1424" stroke="#172238" strokeWidth="1.5" />
                <text x="380" y="285" fill="#64748b" fontSize="12" fontWeight="bold" letterSpacing="1">SECTOR 12 • CIVIC CENTER</text>

                {/* Road Corridor Lines */}
                {/* Segment 1: Main Road (Red - High Risk) */}
                <line
                  x1="20"
                  y1="130"
                  x2="340"
                  y2="130"
                  stroke="#ef4444"
                  strokeWidth="8"
                  className="cursor-pointer hover:stroke-red-300 transition-colors"
                  onClick={() => setSelectedSegment(HIGH_RISK_SEGMENTS[0])}
                />
                <line x1="20" y1="130" x2="340" y2="130" stroke="#fca5a5" strokeWidth="2" strokeDasharray="6 4" />

                {/* Segment 2: Lake Road (Red - Critical) */}
                <line
                  x1="360"
                  y1="130"
                  x2="680"
                  y2="130"
                  stroke="#dc2626"
                  strokeWidth="10"
                  className="cursor-pointer hover:stroke-red-300 transition-colors"
                  onClick={() => setSelectedSegment(HIGH_RISK_SEGMENTS[1])}
                />
                <line x1="360" y1="130" x2="680" y2="130" stroke="#fecaca" strokeWidth="2" strokeDasharray="6 4" />

                {/* Segment 3: Outer Ring Road (Amber - Medium) */}
                <line
                  x1="20"
                  y1="360"
                  x2="340"
                  y2="360"
                  stroke="#f59e0b"
                  strokeWidth="7"
                  className="cursor-pointer hover:stroke-amber-300 transition-colors"
                  onClick={() => setSelectedSegment(HIGH_RISK_SEGMENTS[3])}
                />

                {/* Segment 4: MG Road West (Green - Low) */}
                <line
                  x1="360"
                  y1="360"
                  x2="680"
                  y2="360"
                  stroke="#10b981"
                  strokeWidth="8"
                  className="cursor-pointer hover:stroke-emerald-300 transition-colors"
                  onClick={() => setSelectedSegment(HIGH_RISK_SEGMENTS[4])}
                />

                {/* North-South Connecting Avenue */}
                <line x1="350" y1="20" x2="350" y2="480" stroke="#3b82f6" strokeWidth="6" strokeDasharray="8 6" opacity="0.4" />

                {/* Heatmap Pulsing Rings on High Risk Zones */}
                {viewMode === 'heatmap' && (
                  <>
                    <circle cx="180" cy="130" r="45" fill="#ef4444" fillOpacity="0.25" className="animate-pulse" />
                    <circle cx="180" cy="130" r="25" fill="#ef4444" fillOpacity="0.45" />

                    <circle cx="520" cy="130" r="55" fill="#dc2626" fillOpacity="0.3" className="animate-pulse" />
                    <circle cx="520" cy="130" r="30" fill="#dc2626" fillOpacity="0.5" />
                  </>
                )}

                {/* Interactive Pins on the Map */}
                {complaints.map((c, i) => {
                  const x = 90 + i * 110;
                  const y = (i % 2 === 0 ? 130 : 360) + (i % 3 === 0 ? -12 : 12);
                  return (
                    <g
                      key={c.id}
                      transform={`translate(${x}, ${y})`}
                      className="cursor-pointer transition-transform hover:scale-125"
                      onClick={() => {
                        onSelectComplaint(c);
                        onNavigate('official-detail');
                      }}
                    >
                      <circle r="12" fill="#090d16" stroke="#3b82f6" strokeWidth="2" />
                      <circle
                        r="6"
                        fill={
                          c.priority === 'Critical'
                            ? '#ef4444'
                            : c.priority === 'High'
                            ? '#f97316'
                            : '#3b82f6'
                        }
                      />
                    </g>
                  );
                })}
              </svg>

              {/* Map Legend Overlay */}
              <div className="absolute bottom-4 left-4 p-3 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-xs space-y-1.5 shadow-lg">
                <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Corridor Risk Legend
                </div>
                <div className="flex items-center gap-4 text-[11px]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> High (70-100)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Medium (40-69)
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Low (0-39)
                  </span>
                </div>
              </div>

              {/* Active Segment Floating Badge */}
              <div className="absolute top-4 right-4 p-3.5 rounded-xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 max-w-xs text-xs space-y-1 shadow-lg">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{selectedSegment.name}</span>
                  <span className="text-[10px] font-mono-code font-bold text-red-400">
                    Risk: {selectedSegment.avgRisk}/100
                  </span>
                </div>
                <p className="text-[11px] text-slate-400">
                  {selectedSegment.complaintsCount} active defects • {selectedSegment.criticalCount} critical issues
                </p>
              </div>

            </div>

          </div>

          {/* Quick Segment Selector Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {HIGH_RISK_SEGMENTS.map((seg: RoadSegment) => (
              <button
                key={seg.id}
                onClick={() => setSelectedSegment(seg)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  selectedSegment.id === seg.id
                    ? 'bg-blue-950/50 border-blue-500 text-white ring-1 ring-blue-500'
                    : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:bg-slate-800/60'
                }`}
              >
                <div className="text-xs font-bold truncate">{seg.name}</div>
                <div className="flex items-center justify-between mt-1 text-[10px]">
                  <span className="text-slate-400">{seg.sector}</span>
                  <span className="font-mono-code font-bold text-red-400">{seg.avgRisk}/100</span>
                </div>
              </button>
            ))}
          </div>

        </div>

        {/* Right Column: AI Analytics & Defect Breakdown Charts */}
        <div className="lg:col-span-4 space-y-6">
          
          {/* AI Predictive Insight Card */}
          <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>AI Predictive Maintenance Alert</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <strong className="text-white">Sector 4 Main Corridor</strong> is projected to experience a <span className="text-red-400 font-bold">24% acceleration</span> in asphalt cracking due to upcoming monsoon drainage runoff. Immediate sealing recommended.
            </p>
            <div className="pt-2 text-[10px] font-mono-code text-slate-500 border-t border-slate-800 flex justify-between">
              <span>CONFIDENCE: 91%</span>
              <span className="text-blue-400">MODEL: RG-PREDICT v3</span>
            </div>
          </div>

          {/* Defect Categories Distribution Chart */}
          <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
                Defect Types Breakdown
              </h3>
              <span className="text-[10px] font-mono-code text-slate-400">1,284 Total</span>
            </div>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={DEFECT_TYPE_BREAKDOWN}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={68}
                    paddingAngle={3}
                    dataKey="count"
                  >
                    {DEFECT_TYPE_BREAKDOWN.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f1422', borderColor: '#334155', fontSize: '11px', borderRadius: '8px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              {DEFECT_TYPE_BREAKDOWN.map((item, idx) => (
                <div key={item.name} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-sm shrink-0"
                    style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                  ></span>
                  <span className="text-slate-300 truncate">{item.name}</span>
                  <span className="text-slate-400 font-mono-code ml-auto">{item.count}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Sector Defect Volume Bar Chart */}
          <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300">
              Defects per Sector
            </h3>

            <div className="h-44 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={SECTOR_COMPLAINTS_RANKING}>
                  <XAxis dataKey="sector" stroke="#64748b" fontSize={10} />
                  <YAxis stroke="#64748b" fontSize={10} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0f1422', borderColor: '#334155', fontSize: '11px', borderRadius: '8px' }}
                  />
                  <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
