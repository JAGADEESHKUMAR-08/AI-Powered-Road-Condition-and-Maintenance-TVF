import React, { useState, useEffect } from 'react';
import {
  Upload,
  Image as ImageIcon,
  Video,
  CheckCircle2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bot,
  Layers,
  Play,
  RotateCcw,
  Activity,
  FileVideo,
  AlertTriangle,
} from 'lucide-react';
import { IssueType, MediaType, EvidenceMediaItem, AiAnalysisResult } from '../../types';
import { SAMPLE_MEDIA_ITEMS } from '../../data/mockData';
import { RiskGauge } from '../common/RiskGauge';
import { analyzeRoadMedia } from '../../services/aiService';

interface StepEvidenceProps {
  selectedType: IssueType;
  onSelectType: (type: IssueType) => void;
  mediaItem: EvidenceMediaItem;
  onUpdateMedia: (item: EvidenceMediaItem) => void;
  aiAnalysis: AiAnalysisResult;
  onUpdateAiAnalysis: (res: AiAnalysisResult) => void;
  onNext: () => void;
  onCancel: () => void;
}

export const StepEvidence: React.FC<StepEvidenceProps> = ({
  selectedType,
  onSelectType,
  mediaItem,
  onUpdateMedia,
  aiAnalysis,
  onUpdateAiAnalysis,
  onNext,
  onCancel,
}) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [activeMediaTab, setActiveMediaTab] = useState<MediaType>(mediaItem.type || 'image');
  const [confirmedTruth, setConfirmedTruth] = useState(true);

  // Trigger real-time AI scan whenever media changes
  const runAiTriage = async (item: EvidenceMediaItem, type: IssueType) => {
    setIsAnalyzing(true);
    try {
      const result = await analyzeRoadMedia(item.url, item.type, type);
      onUpdateAiAnalysis(result);
      if (result.detectedDefect && result.detectedDefect !== type) {
        onSelectType(result.detectedDefect);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const isVideo = file.type.startsWith('video');
      const url = URL.createObjectURL(file);
      const newMedia: EvidenceMediaItem = {
        id: `uploaded-${Date.now()}`,
        name: file.name,
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
        type: isVideo ? 'video' : 'image',
        url,
        duration: isVideo ? '0:12' : undefined,
      };
      setActiveMediaTab(isVideo ? 'video' : 'image');
      onUpdateMedia(newMedia);
      runAiTriage(newMedia, selectedType);
    }
  };

  const handleSelectPreset = (preset: EvidenceMediaItem) => {
    setActiveMediaTab(preset.type);
    onUpdateMedia(preset);
    
    // Auto map preset name to probable defect
    let suggested: IssueType = 'Pothole';
    if (preset.name.includes('crack')) suggested = 'Crack';
    else if (preset.name.includes('flood') || preset.name.includes('water')) suggested = 'Water Accumulation';
    else if (preset.name.includes('edge')) suggested = 'Road Edge Damage';
    
    onSelectType(suggested);
    runAiTriage(preset, suggested);
  };

  const issueCategories: { type: IssueType; label: string; desc: string }[] = [
    { type: 'Pothole', label: 'Pothole', desc: 'Asphalt cavity or depression' },
    { type: 'Crack', label: 'Crack', desc: 'Longitudinal or alligator fissures' },
    { type: 'Water Accumulation', label: 'Water Accumulation', desc: 'Drain blockage or standing puddle' },
    { type: 'Damaged Surface', label: 'Damaged Surface', desc: 'Asphalt peeling & loose gravel' },
    { type: 'Road Edge Damage', label: 'Road Edge Damage', desc: 'Shoulder washout & curb fracture' },
    { type: 'Drainage Issue', label: 'Drainage Issue', desc: 'Inlet clogging or culvert overflow' },
  ];

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
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Step Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <span>STEP 1 OF 3</span>
            <span>•</span>
            <span className="text-slate-400">Upload Photo/Video & AI Risk Assessment</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Upload Evidence & AI Scan
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Upload a photo or video. Our computer vision AI immediately analyzes road defect severity and computes the risk score.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1.5 rounded-xl bg-blue-950/60 border border-blue-800/40 text-blue-300 text-xs font-semibold flex items-center gap-1.5">
            <Bot className="w-4 h-4 text-blue-400" />
            Live AI Vision v4.2
          </span>
        </div>
      </div>

      {/* Main Grid: Left Upload & Media Preview, Right Instant AI Risk Score & Factors */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left 6 Columns: Upload & Media Player Canvas */}
        <div className="lg:col-span-6 space-y-5">
          
          <div className="rounded-2xl bg-[#111726] border border-slate-800 p-5 sm:p-6 space-y-5 shadow-xl">
            
            {/* Upload Selector Mode Pills (Photo / Video) */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-700/80">
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('image')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeMediaTab === 'image'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  Photo Evidence
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMediaTab('video')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeMediaTab === 'video'
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Video className="w-3.5 h-3.5" />
                  Video Evidence
                </button>
              </div>

              {/* Upload Button */}
              <label className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 cursor-pointer transition-colors shadow-sm">
                <Upload className="w-3.5 h-3.5 text-blue-400" />
                <span>Upload File</span>
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="hidden"
                />
              </label>
            </div>

            {/* Media Display Viewport (Image or Video Player) with AI Scanning HUD */}
            <div className="relative rounded-xl overflow-hidden bg-black h-72 sm:h-80 border border-slate-700 group flex items-center justify-center">
              
              {mediaItem.type === 'video' ? (
                <video
                  key={mediaItem.url}
                  src={mediaItem.url}
                  poster={mediaItem.poster}
                  controls
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src={mediaItem.url}
                  alt={mediaItem.name}
                  className="w-full h-full object-cover"
                />
              )}

              {/* AI Neural Scan Overlay HUD */}
              <div className="absolute inset-0 pointer-events-none">
                {/* AI Laser Scanline when analyzing */}
                {isAnalyzing && (
                  <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-blue-500 via-sky-300 to-indigo-500 shadow-[0_0_15px_#38bdf8] animate-bounce"></div>
                )}

                {/* AI Bounding Box & Target Matrix */}
                {!isAnalyzing && aiAnalysis.boundingBox && (
                  <div
                    className="absolute border-2 border-red-500 rounded bg-red-500/10 pointer-events-none animate-pulse flex flex-col justify-between p-1.5 shadow-2xl"
                    style={{
                      left: `${aiAnalysis.boundingBox.x}%`,
                      top: `${aiAnalysis.boundingBox.y}%`,
                      width: `${aiAnalysis.boundingBox.width}%`,
                      height: `${aiAnalysis.boundingBox.height}%`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className="px-1.5 py-0.5 text-[9px] font-mono-code font-bold bg-red-600 text-white rounded">
                        AI DETECTED: {aiAnalysis.detectedDefect.toUpperCase()} ({aiAnalysis.confidence}%)
                      </span>
                    </div>
                    <div className="text-[9px] font-mono-code text-red-200 self-end bg-black/60 px-1 rounded">
                      AREA: {aiAnalysis.detectedAreaPercent}%
                    </div>
                  </div>
                )}
              </div>

              {/* Media Bottom Status Overlay */}
              <div className="absolute bottom-3 left-3 right-3 p-2.5 rounded-lg bg-slate-900/90 backdrop-blur-md border border-slate-700/80 flex items-center justify-between text-xs pointer-events-auto">
                <div className="flex items-center gap-2 overflow-hidden truncate">
                  {mediaItem.type === 'video' ? (
                    <FileVideo className="w-4 h-4 text-blue-400 shrink-0" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-blue-400 shrink-0" />
                  )}
                  <span className="text-white font-medium truncate text-xs">{mediaItem.name}</span>
                  <span className="text-slate-400 text-[10px] font-mono-code shrink-0">({mediaItem.size})</span>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono-code font-bold bg-blue-950 text-blue-300 border border-blue-800/40">
                    {mediaItem.type === 'video' ? 'Video Telemetry' : 'High-Res Photo'}
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Presets / Test Samples (Photos & Videos) */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
                <span>Or select a test road defect (Video or Photo):</span>
                <span className="text-[10px] text-blue-400 font-mono-code">Click to instant analyze</span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {SAMPLE_MEDIA_ITEMS.map((sample) => (
                  <button
                    key={sample.id}
                    type="button"
                    onClick={() => handleSelectPreset(sample)}
                    className={`p-2 rounded-xl border text-left text-xs transition-all cursor-pointer relative overflow-hidden ${
                      mediaItem.name === sample.name
                        ? 'border-blue-500 bg-blue-950/40 text-blue-200 ring-1 ring-blue-500'
                        : 'border-slate-800 bg-slate-900 hover:border-slate-700 text-slate-300'
                    }`}
                  >
                    <div className="h-14 w-full rounded-md overflow-hidden mb-1 relative bg-black">
                      <img
                        src={sample.poster || sample.url}
                        alt={sample.name}
                        className="w-full h-full object-cover"
                      />
                      {sample.type === 'video' && (
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="p-1 rounded-full bg-blue-600 text-white">
                            <Play className="w-3 h-3 fill-white" />
                          </div>
                          <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded bg-black/80 text-[8px] font-mono-code text-white">
                            {sample.duration}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="font-bold truncate text-[11px] flex items-center gap-1">
                      {sample.type === 'video' ? '🎬 Video' : '📷 Photo'}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate">{sample.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Citizen Confirmation Checkbox */}
            <label className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/80 border border-slate-800 cursor-pointer hover:bg-slate-900">
              <input
                type="checkbox"
                checked={confirmedTruth}
                onChange={(e) => setConfirmedTruth(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-blue-600 bg-slate-800 border-slate-700 focus:ring-blue-500"
              />
              <span className="text-xs text-slate-300 leading-relaxed select-none">
                I confirm this photo or video was captured at the specified road location.
              </span>
            </label>

          </div>

        </div>

        {/* Right 6 Columns: Instant AI Risk Analysis & Risk Factors (Requested in Step 1) */}
        <div className="lg:col-span-6 space-y-5">
          
          <div className="rounded-2xl bg-[#111726] border border-slate-800 p-6 space-y-6 shadow-xl relative overflow-hidden">
            
            {/* Top AI Result Header */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Bot className="w-5 h-5 text-blue-400" />
                  <h2 className="text-base font-extrabold text-white">
                    Instant AI Risk Assessment
                  </h2>
                </div>
                <p className="text-xs text-slate-400 mt-0.5">
                  Automated computer vision scan of uploaded {mediaItem.type}.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase border ${
                    aiAnalysis.severity === 'Critical'
                      ? 'bg-red-950 text-red-300 border-red-800/60'
                      : 'bg-orange-950 text-orange-300 border-orange-800/60'
                  }`}
                >
                  {aiAnalysis.severity} Risk
                </span>
              </div>
            </div>

            {/* Center: Prominent Speedometer Risk Gauge (0 - 100) */}
            <div className="flex flex-col items-center justify-center py-2 bg-[#0c101d] rounded-2xl border border-slate-800/80 p-5 relative">
              {isAnalyzing ? (
                <div className="py-12 flex flex-col items-center gap-3 text-blue-400">
                  <Activity className="w-8 h-8 animate-spin" />
                  <span className="text-xs font-mono-code font-semibold">Running Neural Network Triage...</span>
                </div>
              ) : (
                <>
                  <RiskGauge score={aiAnalysis.riskScore} size={220} showLabels={true} />

                  <div className="text-center max-w-md mt-1">
                    <div className="text-xs font-bold text-white flex items-center justify-center gap-2">
                      <span>Detected Hazard:</span>
                      <span className="text-blue-400 font-mono-code">{aiAnalysis.detectedDefect}</span>
                      <span className="text-slate-500">•</span>
                      <span className="text-emerald-400 font-mono-code">{aiAnalysis.confidence}% confidence</span>
                    </div>

                    {aiAnalysis.videoFramesAnalyzed && (
                      <div className="mt-1 text-[11px] font-mono-code text-blue-300 bg-blue-950/60 py-1 px-2.5 rounded-md border border-blue-800/40 inline-block">
                        Analyzed {aiAnalysis.videoFramesAnalyzed} video frames • {aiAnalysis.motionImpactSeverity}
                      </div>
                    )}

                    <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                      {aiAnalysis.explanation}
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Detected Risk Factors Breakdown (Surface Damage, Traffic Exposure, Water, Visibility) */}
            <div className="space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <Layers className="w-4 h-4 text-blue-400" />
                Available Risk Factors Breakdown
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                
                {/* Surface Damage */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Surface Damage</span>
                    <span className="font-bold text-orange-400 text-[11px] uppercase">
                      {aiAnalysis.factors.surfaceDamage}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-orange-500 rounded-full transition-all duration-700"
                      style={{ width: getMeterPercent(aiAnalysis.factors.surfaceDamage) }}
                    ></div>
                  </div>
                </div>

                {/* Traffic Exposure */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Traffic Exposure</span>
                    <span className="font-bold text-red-400 text-[11px] uppercase">
                      {aiAnalysis.factors.trafficExposure}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-red-500 rounded-full transition-all duration-700"
                      style={{ width: getMeterPercent(aiAnalysis.factors.trafficExposure) }}
                    ></div>
                  </div>
                </div>

                {/* Water Accumulation */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Water Accumulation</span>
                    <span className="font-bold text-amber-400 text-[11px] uppercase">
                      {aiAnalysis.factors.waterAccumulation}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-amber-500 rounded-full transition-all duration-700"
                      style={{ width: getMeterPercent(aiAnalysis.factors.waterAccumulation) }}
                    ></div>
                  </div>
                </div>

                {/* Visibility Hazard */}
                <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-300 font-medium">Visibility Hazard</span>
                    <span className="font-bold text-emerald-400 text-[11px] uppercase">
                      {aiAnalysis.factors.visibility}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                      style={{ width: getMeterPercent(aiAnalysis.factors.visibility) }}
                    ></div>
                  </div>
                </div>

              </div>
            </div>

            {/* Issue Category Manual Selector (Optional override) */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">
                Defect Category (AI Auto-Classified)
              </label>
              <div className="flex flex-wrap gap-1.5">
                {issueCategories.map((cat) => (
                  <button
                    key={cat.type}
                    type="button"
                    onClick={() => {
                      onSelectType(cat.type);
                      runAiTriage(mediaItem, cat.type);
                    }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      selectedType === cat.type
                        ? 'bg-blue-600 text-white font-semibold shadow-sm'
                        : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Actions Footer */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={onCancel}
          className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          Cancel
        </button>

        <button
          id="btn-next-step-location"
          onClick={onNext}
          disabled={!confirmedTruth || isAnalyzing}
          className="px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
        >
          <span>Next: Choose Location</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
