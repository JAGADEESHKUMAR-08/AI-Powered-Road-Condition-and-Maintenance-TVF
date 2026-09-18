import React, { useState } from 'react';
import {
  Search,
  X,
  Clock,
  CheckCircle2,
  AlertTriangle,
  MapPin,
  Calendar,
  User,
  ShieldCheck,
  Bot,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { Complaint } from '../../types';
import { RiskGauge } from '../common/RiskGauge';

interface TrackComplaintModalProps {
  isOpen: boolean;
  onClose: () => void;
  complaints: Complaint[];
  initialTicketId?: string;
  onSelectForDetail?: (complaint: Complaint) => void;
}

export const TrackComplaintModal: React.FC<TrackComplaintModalProps> = ({
  isOpen,
  onClose,
  complaints,
  initialTicketId = 'RG-2026-001284',
  onSelectForDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState(initialTicketId);
  const [searchedTicket, setSearchedTicket] = useState<Complaint | null>(
    complaints.find((c) => c.id.toLowerCase() === initialTicketId.toLowerCase()) || complaints[0]
  );

  if (!isOpen) return null;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    const found = complaints.find(
      (c) => c.id.toLowerCase().includes(query) || c.location.address.toLowerCase().includes(query)
    );
    setSearchedTicket(found || null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800/50';
      case 'In Progress':
        return 'bg-blue-950 text-blue-300 border-blue-800/50';
      case 'Planned':
        return 'bg-purple-950 text-purple-300 border-purple-800/50';
      case 'Inspection Scheduled':
        return 'bg-amber-950 text-amber-300 border-amber-800/50';
      default:
        return 'bg-sky-950 text-sky-300 border-sky-800/50';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-2xl bg-[#0f1422] border border-slate-700/80 shadow-2xl overflow-hidden my-8">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between p-5 border-b border-slate-800 bg-[#0a0e18]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">
                Track Road Defect Complaint
              </h2>
              <p className="text-xs text-slate-400">
                Check real-time municipal inspection & repair timeline.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar Input */}
        <div className="p-5 border-b border-slate-800/80 bg-slate-900/40">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Ticket ID (e.g. RG-2026-001284) or Road Name..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 font-mono-code"
              />
              <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
            </div>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
            >
              Search Ticket
            </button>
          </form>

          {/* Quick Ticket Suggestions */}
          <div className="flex items-center gap-2 mt-3 text-[11px] text-slate-400 overflow-x-auto">
            <span className="shrink-0 font-medium">Quick Check:</span>
            {complaints.slice(0, 3).map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => {
                  setSearchQuery(c.id);
                  setSearchedTicket(c);
                }}
                className="px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-blue-300 font-mono-code shrink-0 border border-slate-700"
              >
                {c.id} ({c.issueType})
              </button>
            ))}
          </div>
        </div>

        {/* Ticket Details Body */}
        <div className="p-6 space-y-6 max-h-[65vh] overflow-y-auto">
          {searchedTicket ? (
            <div className="space-y-6">
              
              {/* Ticket Top Banner */}
              <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-900/80 border border-slate-800">
                <div>
                  <div className="text-[10px] uppercase font-bold text-slate-400">
                    Complaint Reference
                  </div>
                  <div className="text-lg font-extrabold font-mono-code text-blue-400">
                    {searchedTicket.id}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${getStatusColor(
                      searchedTicket.status
                    )}`}
                  >
                    {searchedTicket.status}
                  </span>
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-red-950 text-red-400 border border-red-800/40">
                    {searchedTicket.priority} Priority
                  </span>
                </div>
              </div>

              {/* Grid with Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Left side: Defect info & photo */}
                <div className="space-y-3">
                  <div className="h-44 rounded-xl overflow-hidden border border-slate-800 relative bg-black">
                    <img
                      src={searchedTicket.evidenceImages[0]}
                      alt="Defect evidence"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono-code text-slate-200 border border-slate-700">
                      {searchedTicket.issueType}
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center gap-1.5 text-slate-400 font-medium">
                      <MapPin className="w-3.5 h-3.5 text-blue-400" />
                      <span>{searchedTicket.location.address}</span>
                    </div>
                    {searchedTicket.location.landmark && (
                      <div className="text-[11px] text-slate-400 pl-5">
                        Landmark: {searchedTicket.location.landmark}
                      </div>
                    )}
                  </div>
                </div>

                {/* Right side: AI Risk & Assignment */}
                <div className="space-y-3">
                  <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold uppercase text-slate-400 flex items-center gap-1.5">
                        <Bot className="w-4 h-4 text-blue-400" />
                        AI Risk Score
                      </span>
                      <span className="text-sm font-bold font-mono-code text-red-400">
                        {searchedTicket.aiAnalysis.riskScore} / 100
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {searchedTicket.aiAnalysis.explanation}
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Assigned Team:</span>
                      <span className="font-semibold text-white">{searchedTicket.assignedTeam}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Target Inspection:</span>
                      <span className="font-mono-code text-blue-300">{searchedTicket.inspectionDate || 'Scheduled'}</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Progress Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-blue-400" />
                  Live Event Timeline
                </h3>

                <div className="space-y-3 pl-2 border-l-2 border-slate-800">
                  {searchedTicket.timeline.map((event, index) => (
                    <div key={event.id || index} className="relative pl-5 text-xs">
                      <div className="absolute -left-[27px] top-1 w-3 h-3 rounded-full bg-blue-500 ring-4 ring-[#0f1422]"></div>
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white">{event.actor}</span>
                        <span className="text-[10px] text-slate-400 font-mono-code">{event.timestamp}</span>
                      </div>
                      <p className="text-slate-400 text-[11px] mt-0.5">{event.notes}</p>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <AlertTriangle className="w-8 h-8 text-amber-400 mx-auto" />
              <div className="text-sm font-semibold text-white">No complaint found</div>
              <p className="text-xs max-w-sm mx-auto">
                Please double check the ticket ID format (e.g. RG-2026-001284) or search by road name.
              </p>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer */}
        <div className="p-4 border-t border-slate-800 bg-[#0a0e18] flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            Close Tracker
          </button>
        </div>

      </div>
    </div>
  );
};
