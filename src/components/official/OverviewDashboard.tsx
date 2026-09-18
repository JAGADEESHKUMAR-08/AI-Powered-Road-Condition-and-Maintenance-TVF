import React, { useState } from 'react';
import {
  AlertTriangle,
  Clock,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  Filter,
  Search,
  ArrowRight,
  TrendingUp,
  ShieldAlert,
  MapPin,
  Bot,
  Activity,
  Layers,
  ChevronRight,
  SlidersHorizontal,
} from 'lucide-react';
import { Complaint, ActiveScreen } from '../../types';
import { RiskGauge } from '../common/RiskGauge';

interface OverviewDashboardProps {
  complaints: Complaint[];
  onSelectComplaint: (complaint: Complaint) => void;
  onNavigate: (screen: ActiveScreen) => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  complaints,
  onSelectComplaint,
  onNavigate,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'high-risk' | 'pending' | 'in-progress' | 'completed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZone, setSelectedZone] = useState('Central Zone (Sectors 1-12)');

  // Filter complaints
  const filteredComplaints = complaints.filter((item) => {
    const matchesSearch =
      item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.issueType.toLowerCase().includes(searchTerm.toLowerCase());

    if (!matchesSearch) return false;

    if (activeFilter === 'high-risk') {
      return item.priority === 'Critical' || item.priority === 'High';
    }
    if (activeFilter === 'pending') {
      return item.status === 'Inspection Scheduled' || item.status === 'Under Review';
    }
    if (activeFilter === 'in-progress') {
      return item.status === 'In Progress' || item.status === 'Planned';
    }
    if (activeFilter === 'completed') {
      return item.status === 'Completed';
    }
    return true;
  });

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'bg-red-950/80 text-red-400 border border-red-800/60';
      case 'High':
        return 'bg-orange-950/80 text-orange-400 border border-orange-800/60';
      case 'Medium':
        return 'bg-amber-950/80 text-amber-400 border border-amber-800/60';
      default:
        return 'bg-slate-800 text-slate-300 border border-slate-700';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-950 text-emerald-300 border border-emerald-800/50';
      case 'In Progress':
        return 'bg-blue-950 text-blue-300 border border-blue-800/50';
      case 'Planned':
        return 'bg-purple-950 text-purple-300 border border-purple-800/50';
      case 'Inspection Scheduled':
        return 'bg-amber-950 text-amber-300 border border-amber-800/50';
      default:
        return 'bg-sky-950 text-sky-300 border border-sky-800/50';
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#090d16] text-slate-100 p-4 sm:p-6 lg:p-8 space-y-8">
      
      {/* Top Header & Controls */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-blue-400">
            <span>OFFICIAL MUNICIPAL SUITE</span>
            <span>•</span>
            <span className="text-slate-400">PWD Central Command</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Road Condition Overview & Metrics
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-0.5">
            Real-time municipal road inspection, severity triage, and contractor repair pipeline.
          </p>
        </div>

        {/* Action controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={selectedZone}
            onChange={(e) => setSelectedZone(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-slate-200 focus:outline-none focus:border-blue-500"
          >
            <option>Central Zone (Sectors 1-12)</option>
            <option>North Zone (Sectors 13-24)</option>
            <option>South Zone (Sectors 25-36)</option>
            <option>East Express Corridor</option>
          </select>

          <button
            onClick={() => alert('Road Condition Executive PDF exported')}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Export PDF
          </button>

          <button
            onClick={() => alert('CSV Work Orders exported')}
            className="px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Export CSV
          </button>

          <button
            onClick={() => onNavigate('official-analytics')}
            className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold flex items-center gap-1.5 shadow-md shadow-blue-600/30 cursor-pointer"
          >
            <Layers className="w-3.5 h-3.5" />
            View Road Map & GIS
          </button>
        </div>
      </div>

      {/* 4 Main KPI Cards (Matching Figma Screen 8) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* KPI 1: Total Complaints */}
        <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 hover:border-slate-700 transition-all space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Total Complaints</span>
            <div className="p-2 rounded-lg bg-blue-600/10 text-blue-400 border border-blue-500/20">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono-code text-white">1,284</div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-emerald-400">
              <span>↑ 12% vs last month</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">84% citizen reported</span>
            </div>
          </div>
        </div>

        {/* KPI 2: High-Risk Roads */}
        <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 hover:border-slate-700 transition-all space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">High-Risk Corridors</span>
            <div className="p-2 rounded-lg bg-red-600/10 text-red-400 border border-red-500/20">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono-code text-red-400">47</div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-red-300">
              <span>Critical triage required</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">Sector 4, 7 leading</span>
            </div>
          </div>
        </div>

        {/* KPI 3: Pending Inspections */}
        <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 hover:border-slate-700 transition-all space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Pending Inspections</span>
            <div className="p-2 rounded-lg bg-amber-600/10 text-amber-400 border border-amber-500/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono-code text-amber-400">18</div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-amber-300">
              <span>Avg response: 1.8 days</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">6 due tomorrow</span>
            </div>
          </div>
        </div>

        {/* KPI 4: Repairs in Progress */}
        <div className="p-5 rounded-2xl bg-[#111726] border border-slate-800 hover:border-slate-700 transition-all space-y-3">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Work Orders</span>
            <div className="p-2 rounded-lg bg-emerald-600/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-3xl font-extrabold font-mono-code text-emerald-400">32</div>
            <div className="flex items-center gap-2 mt-1 text-[11px] text-emerald-300">
              <span>8 completed this week</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400">On schedule</span>
            </div>
          </div>
        </div>

      </div>

      {/* Critical Alert Banner */}
      <div className="p-4 rounded-2xl bg-red-950/30 border border-red-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-start sm:items-center gap-3">
          <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5 sm:mt-0" />
          <div className="text-xs">
            <span className="font-bold text-red-200 uppercase tracking-wider">
              Urgent Priority Alert:
            </span>
            <span className="text-slate-300 ml-1.5">
              Sector 4 Main Arterial Road has <strong className="text-white">6 deep potholes</strong> detected near City Mall within a 500-meter segment.
            </span>
          </div>
        </div>

        <button
          onClick={() => {
            const highRiskOne = complaints.find((c) => c.priority === 'Critical' || c.priority === 'High');
            if (highRiskOne) {
              onSelectComplaint(highRiskOne);
              onNavigate('official-detail');
            }
          }}
          className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shrink-0 cursor-pointer shadow-sm"
        >
          Review Triage Brief →
        </button>
      </div>

      {/* Main Complaint Management Table (Screen 8 Table layout) */}
      <div className="rounded-2xl bg-[#111726] border border-slate-800 overflow-hidden shadow-xl space-y-4 p-5 sm:p-6">
        
        {/* Table Top Controls */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-400" />
              Priority Defect Triage Queue
            </h2>
            <p className="text-xs text-slate-400">
              Showing {filteredComplaints.length} municipal road defects requiring verification & contractor dispatch.
            </p>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-900/90 p-1 rounded-xl border border-slate-800 text-xs">
            <button
              onClick={() => setActiveFilter('all')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeFilter === 'all' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              All ({complaints.length})
            </button>
            <button
              onClick={() => setActiveFilter('high-risk')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeFilter === 'high-risk' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              High Risk
            </button>
            <button
              onClick={() => setActiveFilter('pending')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeFilter === 'pending' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setActiveFilter('in-progress')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeFilter === 'in-progress' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              In Progress
            </button>
            <button
              onClick={() => setActiveFilter('completed')}
              className={`px-3 py-1.5 rounded-lg font-medium transition-colors ${
                activeFilter === 'completed' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              Resolved
            </button>
          </div>
        </div>

        {/* Search & Subfilters */}
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by Ticket ID, street address, or defect type..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
            <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-800 text-[11px] font-bold uppercase tracking-wider text-slate-400 bg-slate-900/40">
                <th className="py-3 px-4">Ticket ID</th>
                <th className="py-3 px-4">Issue & Evidence</th>
                <th className="py-3 px-4">Location</th>
                <th className="py-3 px-4 text-center">AI Risk</th>
                <th className="py-3 px-4">Assigned Team</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredComplaints.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-slate-900/70 transition-colors group cursor-pointer"
                  onClick={() => {
                    onSelectComplaint(item);
                    onNavigate('official-detail');
                  }}
                >
                  {/* Ticket ID */}
                  <td className="py-3.5 px-4 font-mono-code font-bold text-blue-400 whitespace-nowrap">
                    {item.id}
                  </td>

                  {/* Defect Preview */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-slate-950 shrink-0 border border-slate-800">
                        <img
                          src={item.evidenceImages[0]}
                          alt={item.issueType}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <div className="font-bold text-white group-hover:text-blue-300 transition-colors">
                          {item.issueType}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          Confidence: {item.aiAnalysis.confidence}%
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Location */}
                  <td className="py-3.5 px-4 max-w-xs">
                    <div className="text-slate-200 truncate font-medium">{item.location.address}</div>
                    <div className="text-[10px] text-slate-400">{item.location.sector}</div>
                  </td>

                  {/* AI Risk Score */}
                  <td className="py-3.5 px-4 text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <span className="font-mono-code font-bold text-white text-xs">
                        {item.aiAnalysis.riskScore}
                      </span>
                      <span className={`px-1.5 py-0.2 rounded text-[9px] font-bold uppercase ${getPriorityBadge(item.priority)}`}>
                        {item.priority}
                      </span>
                    </div>
                  </td>

                  {/* Team */}
                  <td className="py-3.5 px-4 text-slate-300 whitespace-nowrap">
                    <div>{item.assignedTeam}</div>
                    <div className="text-[10px] text-slate-500 font-mono-code">Target: {item.inspectionDate}</div>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectComplaint(item);
                        onNavigate('official-detail');
                      }}
                      className="px-3 py-1.5 rounded-lg bg-slate-800 group-hover:bg-blue-600 text-slate-300 group-hover:text-white text-xs font-medium transition-colors flex items-center gap-1 ml-auto cursor-pointer"
                    >
                      <span>Triage</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
};
