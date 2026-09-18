import React, { useEffect, useState } from 'react';
import {
  Sparkles,
  Bot,
  CheckCircle2,
  AlertTriangle,
  Download,
  Share2,
  ArrowRight,
  ShieldAlert,
  Layers,
  Activity,
} from 'lucide-react';
import { AiAnalysisResult, IssueType } from '../../types';
import { RiskGauge } from '../common/RiskGauge';

interface StepAiAnalysisProps {
  selectedType: IssueType;
  aiAnalysis: AiAnalysisResult;
  onFinish: () => void;
  onBack: () => void;
}

export const StepAiAnalysis: React.FC<StepAiAnalysisProps> = ({
  selectedType,
  aiAnalysis,
  onFinish,
  onBack,
}) => {
  const [analysisStep, setAnalysisStep] = useState<number>(5); // 1 to 5
  const [analyzing, setAnalyzing] = useState<boolean>(true);

  // Simulated progressive calculation on load
  useEffect(() => {
    setAnalyzing(true);
    let current = 1;
    const interval = setInterval(() => {
      current += 1;
      setAnalysisStep(current);
      if (current >= 5) {
        clearInterval(interval);
        setAnalyzing(false);
      }
    }, 350);

    return () => clearInterval(interval);
  }, []);

  const pipelineSteps = [
    'Uploading',
    'Detecting',
    'Assessing',
    'Calculating Risk',
    'Generating Recommendation',
  ];

  const getMeterColor = (level: string) => {
    switch (level) {
      case 'Critical':
        return 'bg-red-500 text-red-300';
      case 'High':
        return 'bg-orange-500 text-orange-300';
      case 'Medium':
        return 'bg-amber-500 text-amber-300';
      default:
        return 'bg-emerald-500 text-emerald-300';
    }
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
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 py-8">
      
      {/* Top Header matching Screen 5 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono-code font-bold uppercase tracking-wider text-blue-400">
            <span>Complaint #RG-2026-001284</span>
            <span>•</span>
            <span className="text-slate-400">Sector 4 / Main Road</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 flex items-center gap-2.5">
            <Bot className="w-7 h-7 text-blue-400" />
            AI Analysis & Result
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => alert('Official AI triage brief exported as PDF')}
            className="px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            Download report
          </button>
          <button
            onClick={() => alert('Link copied to clipboard')}
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            Share verdict
          </button>
        </div>
      </div>

      {/* Progress Timeline matching Figma Screen 5 */}
      <div className="my-6 p-4 rounded-2xl bg-[#111726] border border-slate-800">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-300 mb-3">
          <span className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-blue-400" />
            Analyzing Road Condition
          </span>
          <span className="text-[11px] font-mono-code text-blue-400">
            Step {Math.min(analysisStep, 5)} of 5 • {analyzing ? pipelineSteps[analysisStep - 1] : 'Analysis Complete'}
          </span>
        </div>

        {/* Progress pills bar */}
        <div className="grid grid-cols-5 gap-2">
          {pipelineSteps.map((stepName, idx) => {
            const stepNum = idx + 1;
            const isCompleted = stepNum <= analysisStep;
            const isCurrent = stepNum === analysisStep;
            return (
              <div
                key={stepName}
                className={`p-2 rounded-lg border text-center transition-all ${
                  isCompleted
                    ? 'bg-blue-950/60 border-blue-600/50 text-blue-300 font-semibold'
                    : 'bg-slate-900 border-slate-800 text-slate-500 font-normal'
                }`}
              >
                <div className="flex items-center justify-center gap-1 text-[11px] truncate">
                  {isCompleted && !isCurrent && <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />}
                  {isCurrent && analyzing && <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>}
                  <span className="truncate">{stepName}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* AI Analysis Main Result Card (Prominent Speedometer & Factor breakdown) */}
      <div className="rounded-2xl bg-[#111726] border border-slate-800 p-6 sm:p-8 space-y-8 shadow-2xl">
        
        {/* Top Result Banner */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-5">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-extrabold text-white">
                AI Analysis Complete
              </h2>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold uppercase bg-red-950 text-red-400 border border-red-800/40">
                HIGH RISK
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Evaluated with RoadGuard Vision Model <strong className="text-slate-200 font-mono-code">{aiAnalysis.modelVersion}</strong>
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 font-mono-code">
              Confidence: <strong className="text-emerald-400">{aiAnalysis.confidence}%</strong>
            </span>
            <span className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700/80 text-slate-300 font-mono-code">
              Detected Area: <strong className="text-blue-400">{aiAnalysis.detectedAreaPercent}%</strong>
            </span>
          </div>
        </div>

        {/* Center: Radial Speedometer Gauge (matching Figma Screen 5) */}
        <div className="flex flex-col items-center justify-center py-4 bg-[#0c101d] rounded-2xl border border-slate-800/80 p-6">
          <RiskGauge score={aiAnalysis.riskScore} size={280} showLabels={true} />

          <div className="mt-4 text-center max-w-lg">
            <div className="text-sm font-bold text-white flex items-center justify-center gap-2">
              <span>Detected defect:</span>
              <span className="text-blue-400 underline decoration-blue-500/50 underline-offset-4">
                {aiAnalysis.detectedDefect}
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
              {aiAnalysis.explanation}
            </p>
          </div>
        </div>

        {/* Detected Risk Factors Breakdown Meters (Screen 5 format) */}
        <div className="space-y-4">
          <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
            <Layers className="w-4 h-4 text-blue-400" />
            Detected Risk Factors Breakdown
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            {/* Factor 1: Surface Damage */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Surface Damage</span>
                <span className="font-bold text-orange-400 text-[11px] uppercase">
                  {aiAnalysis.factors.surfaceDamage}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-orange-500 rounded-full transition-all duration-1000"
                  style={{ width: getMeterPercent(aiAnalysis.factors.surfaceDamage) }}
                ></div>
              </div>
            </div>

            {/* Factor 2: Traffic Exposure */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Traffic Exposure</span>
                <span className="font-bold text-red-400 text-[11px] uppercase">
                  {aiAnalysis.factors.trafficExposure}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500 rounded-full transition-all duration-1000"
                  style={{ width: getMeterPercent(aiAnalysis.factors.trafficExposure) }}
                ></div>
              </div>
            </div>

            {/* Factor 3: Water Accumulation */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Water Accumulation</span>
                <span className="font-bold text-amber-400 text-[11px] uppercase">
                  {aiAnalysis.factors.waterAccumulation}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-1000"
                  style={{ width: getMeterPercent(aiAnalysis.factors.waterAccumulation) }}
                ></div>
              </div>
            </div>

            {/* Factor 4: Visibility Hazard */}
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-300">Visibility Hazard</span>
                <span className="font-bold text-emerald-400 text-[11px] uppercase">
                  {aiAnalysis.factors.visibility}
                </span>
              </div>
              <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                  style={{ width: getMeterPercent(aiAnalysis.factors.visibility) }}
                ></div>
              </div>
            </div>

          </div>
        </div>

        {/* AI Actionable Municipal Recommendation */}
        <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 flex items-start gap-3">
          <Sparkles className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <span className="font-bold text-white uppercase tracking-wider text-[11px]">
              Automated Dispatch Recommendation
            </span>
            <p className="text-slate-300 leading-relaxed">
              {aiAnalysis.recommendedAction}
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Action Footer */}
      <div className="mt-8 pt-6 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          Back
        </button>

        <button
          id="btn-confirm-submission"
          onClick={onFinish}
          className="px-6 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
        >
          Confirm & Submit Complaint
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
