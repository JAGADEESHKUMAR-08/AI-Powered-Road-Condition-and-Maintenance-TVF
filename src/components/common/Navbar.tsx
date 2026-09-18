import React, { useState } from 'react';
import {
  ShieldAlert,
  Menu,
  X,
  FilePlus,
  Search,
  LayoutDashboard,
  MapPin,
  Lock,
  Sparkles,
} from 'lucide-react';
import { ActiveScreen } from '../../types';

interface NavbarProps {
  currentScreen: ActiveScreen;
  onNavigate: (screen: ActiveScreen) => void;
  onOpenTracker: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentScreen,
  onNavigate,
  onOpenTracker,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isOfficial = currentScreen.startsWith('official-');

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-800/80 bg-[#090d16]/90 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Left: Brand Logo */}
        <div className="flex items-center gap-6">
          <button
            id="nav-brand-logo-btn"
            onClick={() => onNavigate('landing')}
            className="flex items-center gap-3 group text-left cursor-pointer focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400 group-hover:bg-blue-600/30 group-hover:border-blue-400 transition-all shadow-sm">
              <ShieldAlert className="w-5 h-5 text-blue-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-base tracking-tight text-white group-hover:text-blue-200 transition-colors">
                  RoadGuard <span className="text-blue-400">AI</span>
                </span>
                {isOfficial && (
                  <span className="px-2 py-0.5 text-[10px] font-mono-code font-bold uppercase rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                    PWD Staff
                  </span>
                )}
              </div>
              <p className="text-[10px] text-slate-400 font-medium hidden sm:block">
                Smart City Road Hazard & Maintenance AI
              </p>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium text-slate-300">
            <button
              id="nav-link-home"
              onClick={() => onNavigate('landing')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer ${
                currentScreen === 'landing'
                  ? 'text-white bg-slate-800/80'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Home
            </button>
            <button
              id="nav-link-report-start"
              onClick={() => onNavigate('report-step-1-evidence')}
              className={`px-3 py-1.5 rounded-md transition-colors cursor-pointer flex items-center gap-1.5 ${
                currentScreen.startsWith('report-')
                  ? 'text-blue-300 bg-blue-950/40 border border-blue-800/40'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              <FilePlus className="w-3.5 h-3.5 text-blue-400" />
              Report Defect
            </button>
            <button
              id="nav-link-track-complaint"
              onClick={onOpenTracker}
              className="px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5 text-slate-400" />
              Track Status
            </button>
            <button
              id="nav-link-heatmap"
              onClick={() => onNavigate('official-analytics')}
              className="px-3 py-1.5 rounded-md text-slate-300 hover:text-white hover:bg-slate-800/40 transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              City Road Map
            </button>
          </nav>
        </div>

        {/* Right Action buttons */}
        <div className="flex items-center gap-3">
          
          {/* Official Login or Dashboard Button */}
          {isOfficial ? (
            <div className="flex items-center gap-2">
              <button
                id="nav-official-overview-btn"
                onClick={() => onNavigate('official-overview')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 cursor-pointer"
              >
                <LayoutDashboard className="w-3.5 h-3.5 text-blue-400" />
                Dashboard
              </button>
              <button
                id="nav-official-analytics-btn"
                onClick={() => onNavigate('official-analytics')}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Live Map
              </button>
              <button
                id="nav-exit-official-btn"
                onClick={() => onNavigate('landing')}
                className="px-3 py-1.5 rounded-lg text-xs font-medium text-red-300 bg-red-950/40 hover:bg-red-900/50 border border-red-800/40 cursor-pointer"
              >
                Exit Portal
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <button
                id="nav-report-cta-btn"
                onClick={() => onNavigate('report-step-1-evidence')}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all shadow-md shadow-blue-600/30 cursor-pointer border border-blue-400/30"
              >
                <Sparkles className="w-3.5 h-3.5 text-blue-200" />
                <span>Upload & AI Scan</span>
              </button>

              <button
                id="nav-official-login-btn"
                onClick={() => onNavigate('official-login')}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-300 bg-slate-900 hover:bg-slate-800 hover:text-white border border-slate-700/80 transition-all cursor-pointer"
              >
                <Lock className="w-3.5 h-3.5 text-slate-400" />
                <span>Staff Portal</span>
              </button>
            </div>
          )}

          {/* Mobile menu toggle */}
          <button
            id="nav-mobile-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-[#0c101a] px-4 py-4 space-y-2">
          <button
            onClick={() => {
              onNavigate('landing');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('report-step-1-evidence');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-blue-400 bg-blue-950/40 font-medium"
          >
            + Report a Road Defect (Photo/Video)
          </button>
          <button
            onClick={() => {
              onOpenTracker();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-slate-200 hover:bg-slate-800"
          >
            Track My Complaint
          </button>
          <button
            onClick={() => {
              onNavigate('official-analytics');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-emerald-400 hover:bg-slate-800"
          >
            City Road Condition Map
          </button>
          <button
            onClick={() => {
              onNavigate('official-login');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2 rounded-lg text-sm text-amber-300 bg-amber-950/30 border border-amber-800/40"
          >
            Official PWD Staff Login
          </button>
        </div>
      )}
    </header>
  );
};
