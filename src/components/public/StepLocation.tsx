import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  Crosshair,
  CheckCircle2,
  ArrowRight,
  Info,
} from 'lucide-react';
import { LocationData } from '../../types';

interface StepLocationProps {
  location: LocationData;
  onUpdateLocation: (loc: LocationData) => void;
  onNext: () => void;
  onBack: () => void;
}

export const StepLocation: React.FC<StepLocationProps> = ({
  location,
  onUpdateLocation,
  onNext,
  onBack,
}) => {
  const [pinOffset, setPinOffset] = useState({ x: 50, y: 50 }); // percentage on map
  const [isLocating, setIsLocating] = useState(false);
  const [mapType, setMapType] = useState<'vector' | 'satellite'>('vector');
  const [confirmed, setConfirmed] = useState(true);

  const handleUseCurrentLocation = () => {
    setIsLocating(true);
    setTimeout(() => {
      onUpdateLocation({
        ...location,
        latitude: 28.6139,
        longitude: 77.2090,
        address: 'Main Road, Sector 4, New Delhi, 110001',
        sector: 'Sector 4',
        accuracy: 3.4,
      });
      setPinOffset({ x: 52, y: 48 });
      setIsLocating(false);
    }, 600);
  };

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPinOffset({ x, y });

    // Slight shift in coords for realism
    const latDelta = (y - 50) * 0.0008;
    const lngDelta = (x - 50) * 0.0008;
    onUpdateLocation({
      ...location,
      latitude: parseFloat((28.6139 - latDelta).toFixed(4)),
      longitude: parseFloat((77.2090 + lngDelta).toFixed(4)),
      accuracy: 4.8,
    });
  };

  return (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      
      {/* Header & Breadcrumb */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-400">
            <span>STEP 2 OF 3</span>
            <span>•</span>
            <span className="text-slate-400">Pin Defect Location</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Choose Road Location
          </h1>
          <p className="text-slate-400 text-sm mt-0.5">
            Drag the pin or tap on the road to specify the exact defect location for maintenance crews.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleUseCurrentLocation}
            disabled={isLocating}
            className="px-3.5 py-2 rounded-xl text-xs font-semibold text-blue-300 bg-blue-950/60 hover:bg-blue-900 border border-blue-700/60 flex items-center gap-2 transition-all cursor-pointer shadow-sm"
          >
            <Navigation className={`w-3.5 h-3.5 ${isLocating ? 'animate-spin' : ''}`} />
            {isLocating ? 'Locating...' : 'Use My Current GPS'}
          </button>
        </div>
      </div>

      {/* Main Location Workspace */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Interactive Vector / Dark Map Canvas */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="relative rounded-2xl bg-[#0b101c] border border-slate-800 overflow-hidden h-[420px] sm:h-[480px] shadow-2xl select-none group">
            
            {/* Interactive Vector / Satellite Street Map Background */}
            <div
              className="absolute inset-0 cursor-crosshair"
              onClick={handleMapClick}
            >
              {mapType === 'vector' ? (
                /* Custom high-tech dark vector cartography */
                <div className="w-full h-full bg-[#080d1a] relative overflow-hidden">
                  
                  {/* Grid lines */}
                  <div
                    className="absolute inset-0 opacity-15"
                    style={{
                      backgroundImage: `radial-gradient(#3b82f6 1px, transparent 1px)`,
                      backgroundSize: '24px 24px',
                    }}
                  ></div>

                  {/* SVG Road Network */}
                  <svg className="w-full h-full" viewBox="0 0 600 480">
                    <defs>
                      <linearGradient id="roadGlow" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#1e293b" />
                        <stop offset="100%" stopColor="#334155" />
                      </linearGradient>
                    </defs>

                    {/* Surrounding blocks */}
                    <rect x="30" y="30" width="180" height="120" rx="8" fill="#0d1424" stroke="#172238" />
                    <text x="50" y="80" fill="#475569" fontSize="12" fontWeight="bold">COMMERCIAL SECTOR 4</text>
                    <text x="50" y="100" fill="#334155" fontSize="10">CITY MALL PLAZA</text>

                    <rect x="250" y="30" width="320" height="120" rx="8" fill="#0d1424" stroke="#172238" />
                    <text x="280" y="80" fill="#475569" fontSize="12" fontWeight="bold">RESIDENTIAL COMPLEX A</text>

                    <rect x="30" y="270" width="220" height="170" rx="8" fill="#0d1424" stroke="#172238" />
                    <text x="50" y="320" fill="#475569" fontSize="12" fontWeight="bold">DISTRICT METRO STATION</text>

                    <rect x="290" y="270" width="280" height="170" rx="8" fill="#0d1424" stroke="#172238" />
                    <text x="320" y="320" fill="#475569" fontSize="12" fontWeight="bold">CIVIC HOSPITAL WARD</text>

                    {/* Secondary streets */}
                    <line x1="0" y1="210" x2="600" y2="210" stroke="#1e293b" strokeWidth="26" />
                    <line x1="230" y1="0" x2="230" y2="480" stroke="#1e293b" strokeWidth="22" />
                    
                    {/* Primary Arterial: Main Road */}
                    <line x1="0" y1="210" x2="600" y2="210" stroke="#2563eb" strokeWidth="10" strokeOpacity="0.4" />
                    <line x1="0" y1="210" x2="600" y2="210" stroke="#60a5fa" strokeWidth="1.5" strokeDasharray="8 6" />

                    {/* Road Label */}
                    <text x="80" y="202" fill="#93c5fd" fontSize="11" fontWeight="bold" letterSpacing="1">
                      MAIN ARTERIAL ROAD (SECTOR 4)
                    </text>
                    <text x="420" y="202" fill="#64748b" fontSize="10">
                      SPEED LIMIT 45 KM/H
                    </text>

                    {/* Secondary Cross Street */}
                    <line x1="230" y1="0" x2="230" y2="480" stroke="#3b82f6" strokeWidth="6" strokeOpacity="0.3" />
                    <text x="240" y="440" fill="#94a3b8" fontSize="10" transform="rotate(90 240 440)">
                      SECTOR 4 2ND CROSS
                    </text>
                  </svg>
                </div>
              ) : (
                /* Satellite view representation */
                <div className="w-full h-full relative overflow-hidden bg-slate-900">
                  <img
                    src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1200&q=80"
                    alt="Satellite view"
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-blue-950/30"></div>
                </div>
              )}

              {/* Dynamic Map Pin & Ripple */}
              <div
                className="absolute transition-all duration-300 pointer-events-none transform -translate-x-1/2 -translate-y-full"
                style={{ left: `${pinOffset.x}%`, top: `${pinOffset.y}%` }}
              >
                <div className="relative flex flex-col items-center">
                  {/* Outer pulsating radar ring */}
                  <div className="absolute -bottom-1 w-10 h-10 -ml-1 rounded-full bg-blue-500/20 animate-ping"></div>
                  
                  {/* Tooltip on pin */}
                  <div className="mb-1 px-2.5 py-1 rounded-md bg-slate-900/95 text-white text-[10px] font-bold font-mono-code border border-blue-500/50 shadow-xl whitespace-nowrap flex items-center gap-1.5 backdrop-blur-md">
                    <span className="w-2 h-2 rounded-full bg-red-500"></span>
                    <span>Defect Point</span>
                  </div>

                  {/* Marker Pin */}
                  <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-blue-600 to-sky-400 p-1.5 shadow-2xl flex items-center justify-center text-white ring-4 ring-blue-500/30">
                    <MapPin className="w-5 h-5 fill-white text-blue-900" />
                  </div>
                  <div className="w-1.5 h-2 bg-blue-500 -mt-0.5 rounded-b-sm"></div>
                </div>
              </div>

            </div>

            {/* Map Top Controls Overlay */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <div className="px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-700/80 backdrop-blur-md text-xs text-slate-200 font-medium flex items-center gap-2 pointer-events-auto shadow-md">
                <Crosshair className="w-3.5 h-3.5 text-blue-400" />
                <span>Tap anywhere on the road to pin</span>
              </div>

              <div className="flex items-center gap-1.5 bg-slate-900/90 p-1 rounded-lg border border-slate-700/80 backdrop-blur-md pointer-events-auto">
                <button
                  onClick={() => setMapType('vector')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    mapType === 'vector' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Road Map
                </button>
                <button
                  onClick={() => setMapType('satellite')}
                  className={`px-2.5 py-1 rounded text-[11px] font-medium transition-colors ${
                    mapType === 'satellite' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  Satellite
                </button>
              </div>
            </div>

            {/* Map Bottom Coordinates Readout */}
            <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
              <div className="px-3 py-1.5 rounded-lg bg-black/80 border border-slate-800 text-[11px] font-mono-code text-slate-300 backdrop-blur-md flex items-center gap-2">
                <span className="text-blue-400">GPS:</span>
                <span>{location.latitude.toFixed(4)}° N, {location.longitude.toFixed(4)}° E</span>
                <span className="text-slate-600">|</span>
                <span className="text-emerald-400">±{location.accuracy}m</span>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-between text-xs text-slate-400 px-1">
            <span className="flex items-center gap-1.5">
              <Info className="w-3.5 h-3.5 text-blue-400" />
              Accurate coordinates speed up municipal maintenance dispatch by up to 60%.
            </span>
          </div>

        </div>

        {/* Right Column: Location Details Form */}
        <div className="lg:col-span-5 space-y-6">
          
          <div className="rounded-2xl bg-[#111726] border border-slate-800 p-6 space-y-5 shadow-xl">
            <div>
              <h2 className="text-base font-bold text-white">
                Location Details
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Verify the detected street and provide local landmark context.
              </p>
            </div>

            {/* Coordinates Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">Latitude</div>
                <div className="text-xs font-bold font-mono-code text-slate-200 mt-1">
                  {location.latitude.toFixed(4)}° N
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800">
                <div className="text-[10px] uppercase font-bold text-slate-400">Longitude</div>
                <div className="text-xs font-bold font-mono-code text-slate-200 mt-1">
                  {location.longitude.toFixed(4)}° E
                </div>
              </div>
            </div>

            {/* Address Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Detected Address
              </label>
              <input
                type="text"
                value={location.address}
                onChange={(e) => onUpdateLocation({ ...location, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            {/* Landmark Field */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-1.5">
                Road / Landmark Details
              </label>
              <textarea
                rows={3}
                value={location.landmark}
                onChange={(e) => onUpdateLocation({ ...location, landmark: e.target.value })}
                placeholder="e.g. Near City Mall entrance, opposite bus shelter pillar #14..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900/90 border border-slate-700 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Add a nearby landmark to help our inspection crew find the exact spot.
              </p>
            </div>

            {/* Location Detected Confirmation Banner */}
            <div className="p-4 rounded-xl bg-blue-950/30 border border-blue-800/40 space-y-3">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white">
                    Location Verified & Pinned
                  </div>
                  <div className="text-[11px] text-slate-300 mt-0.5">
                    {location.address}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setConfirmed(true)}
                className="w-full py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors cursor-pointer"
              >
                Confirm Location
              </button>
            </div>

          </div>

        </div>

      </div>

      {/* Bottom Actions Footer */}
      <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
        <button
          onClick={onBack}
          className="px-5 py-2.5 rounded-xl text-xs font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
        >
          ← Back to Upload & AI Scan
        </button>

        <button
          id="btn-next-details"
          onClick={onNext}
          className="px-7 py-3 rounded-xl text-xs sm:text-sm font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30 cursor-pointer border border-blue-400/30"
        >
          <span>Next: Reporter Details & Review</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

    </div>
  );
};
