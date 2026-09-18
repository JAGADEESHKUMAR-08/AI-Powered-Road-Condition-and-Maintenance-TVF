import React from 'react';

interface RiskGaugeProps {
  score: number;
  size?: number;
  showLabels?: boolean;
  className?: string;
  animate?: boolean;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({
  score = 82,
  size = 240,
  showLabels = true,
  className = '',
}) => {
  // Clamped score 0 to 100
  const normalizedScore = Math.max(0, Math.min(100, score));
  
  // Semicircle geometry
  const strokeWidth = 14;
  const radius = (size - strokeWidth * 2) / 2;
  const centerX = size / 2;
  const centerY = size / 2 + 20;

  // Arc length for semicircle (PI * radius)
  const arcLength = Math.PI * radius;
  const strokeDashoffset = arcLength - (arcLength * normalizedScore) / 100;

  // Color determination
  const getScoreColor = (val: number) => {
    if (val >= 80) return '#ef4444'; // Red (Critical/High)
    if (val >= 60) return '#f97316'; // Orange
    if (val >= 40) return '#eab308'; // Yellow
    return '#22c55e'; // Green (Low)
  };

  const getRiskLabel = (val: number) => {
    if (val >= 80) return 'HIGH RISK';
    if (val >= 60) return 'MEDIUM RISK';
    if (val >= 40) return 'MODERATE';
    return 'LOW RISK';
  };

  const primaryColor = getScoreColor(normalizedScore);

  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg
        width={size}
        height={size * 0.72}
        viewBox={`0 0 ${size} ${size * 0.72}`}
        className="overflow-visible"
      >
        <defs>
          <linearGradient id="gaugeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#22c55e" />
            <stop offset="35%" stopColor="#eab308" />
            <stop offset="70%" stopColor="#f97316" />
            <stop offset="100%" stopColor="#ef4444" />
          </linearGradient>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background track */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="none"
          stroke="#1e293b"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />

        {/* Gradient Progress arc */}
        <path
          d={`M ${centerX - radius} ${centerY} A ${radius} ${radius} 0 0 1 ${centerX + radius} ${centerY}`}
          fill="none"
          stroke="url(#gaugeGradient)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={arcLength}
          strokeDashoffset={strokeDashoffset}
          className="transition-all duration-1000 ease-out"
          style={{ filter: 'drop-shadow(0 0 8px rgba(239, 68, 68, 0.35))' }}
        />

        {/* Needle / Indicator Dot */}
        {(() => {
          const angle = Math.PI - (Math.PI * normalizedScore) / 100;
          const needleX = centerX + radius * Math.cos(angle);
          const needleY = centerY - radius * Math.sin(angle);
          return (
            <circle
              cx={needleX}
              cy={needleY}
              r={7}
              fill="#ffffff"
              stroke={primaryColor}
              strokeWidth={3}
              className="transition-all duration-1000 ease-out drop-shadow-md"
            />
          );
        })()}
      </svg>

      {/* Score readout text */}
      <div className="absolute top-[38%] flex flex-col items-center justify-center text-center">
        <span className="text-4xl font-extrabold tracking-tight text-white font-mono-code drop-shadow-sm">
          {normalizedScore}
        </span>
        <span className="text-[11px] font-bold tracking-widest text-slate-400 uppercase mt-0.5">
          Risk Score
        </span>
      </div>

      {showLabels && (
        <div className="w-full flex justify-between px-6 -mt-2 text-[11px] font-mono-code text-slate-400">
          <span>0 (Safe)</span>
          <span className="text-center font-bold px-2 py-0.5 rounded text-[10px] bg-red-950/60 text-red-400 border border-red-500/30">
            {getRiskLabel(normalizedScore)}
          </span>
          <span>100 (Critical)</span>
        </div>
      )}
    </div>
  );
};
