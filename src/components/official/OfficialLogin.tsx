import React, { useState } from 'react';
import {
  Lock,
  Mail,
  ShieldCheck,
  ShieldAlert,
  ArrowRight,
  Sparkles,
  Building2,
  KeyRound,
} from 'lucide-react';
import { ActiveScreen } from '../../types';

interface OfficialLoginProps {
  onLoginSuccess: () => void;
  onBackToPublic: () => void;
}

export const OfficialLogin: React.FC<OfficialLoginProps> = ({
  onLoginSuccess,
  onBackToPublic,
}) => {
  const [email, setEmail] = useState('rajesh.kumar@pwd.gov.in');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 600);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] w-full bg-[#080c16] flex items-center justify-center p-4 sm:p-6 lg:p-10">
      
      {/* Split container matching Screen 7 */}
      <div className="w-full max-w-5xl rounded-3xl bg-[#0f1422] border border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
        
        {/* Left Form Pane */}
        <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between space-y-8">
          
          {/* Top Brand Header */}
          <div>
            <div className="flex items-center gap-2.5 mb-6">
              <div className="w-9 h-9 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
                <ShieldAlert className="w-5 h-5" />
              </div>
              <span className="text-base font-extrabold text-white tracking-tight">
                RoadGuard <span className="text-blue-400">AI</span>
              </span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-amber-950/60 text-amber-300 border border-amber-800/40 text-[10px] font-mono-code font-bold uppercase tracking-wider mb-2">
              <Lock className="w-3 h-3" />
              SECURE ACCESS
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Official Portal
            </h1>
            <p className="text-slate-400 text-xs sm:text-sm mt-1">
              Road Condition Monitoring & Maintenance Management
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Official ID / Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. name@department.gov"
                  className="w-full pl-9 pr-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
                />
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-9 pr-3.5 py-3 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500 font-mono-code"
                />
                <KeyRound className="w-4 h-4 text-slate-500 absolute left-3 top-3.5" />
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500"
                />
                <span>Remember me</span>
              </label>

              <button
                type="button"
                onClick={() => alert('Password reset link sent to registered municipal address.')}
                className="text-blue-400 hover:text-blue-300 transition-colors"
              >
                Forgot Password?
              </button>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
            >
              {isLoading ? (
                <span>Authenticating Credentials...</span>
              ) : (
                <>
                  <span>Sign In to Infrastructure Suite</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            {/* Quick Demo Fill Pill */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setEmail('rajesh.kumar@pwd.gov.in');
                  onLoginSuccess();
                }}
                className="text-[11px] text-slate-400 hover:text-blue-400 underline decoration-slate-600 underline-offset-4 cursor-pointer"
              >
                Demo Shortcut: Instant 1-Click PWD Staff Sign In
              </button>
            </div>
          </form>

          {/* Bottom Security Notice & Badges */}
          <div className="space-y-4 pt-4 border-t border-slate-800/80">
            <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0" />
              <span>Authorized personnel only. All access & triage sessions are logged.</span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] font-mono-code text-slate-400">
              <div className="flex gap-2">
                <span>SSO READY</span>
                <span>•</span>
                <span>TLS 1.3</span>
                <span>•</span>
                <span>BUILD 4.12.0</span>
              </div>
              <button
                type="button"
                onClick={onBackToPublic}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                ← Return to Public Citizen Portal
              </button>
            </div>
          </div>

        </div>

        {/* Right Visual Pane: High Resolution Road Surface Imagery (Matching Screen 7) */}
        <div className="hidden lg:block lg:col-span-6 relative bg-slate-950 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=1200&q=80"
            alt="Road surface perspective"
            className="w-full h-full object-cover opacity-80 filter contrast-125"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1422] via-blue-950/20 to-black/60"></div>

          <div className="absolute bottom-8 left-8 right-8 p-6 rounded-2xl bg-[#090d16]/90 backdrop-blur-md border border-slate-700/80 space-y-3">
            <div className="flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-400" />
              <span className="text-xs font-bold text-white uppercase tracking-wider">
                Municipal Road Network Control
              </span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Serving 42 smart cities with real-time computer vision defect classification, work order routing, and contractor accountability.
            </p>
            <div className="text-[10px] font-mono-code text-slate-400 pt-1 border-t border-slate-800 flex justify-between">
              <span>ACTIVE WARD: CENTRAL DELHI</span>
              <span className="text-emerald-400">SERVER STATUS: 100% ONLINE</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
