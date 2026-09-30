import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MapPin,
  Building2,
  Zap,
  Droplets,
  Wind,
  Layers,
  ArrowRight,
  ShieldCheck,
  AlertTriangle,
  Info,
  Clock,
  Sparkles,
  BarChart3,
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { Building } from '../types';

export const CampusMapPage: React.FC = () => {
  const navigate = useNavigate();
  const { buildings, selectedCampus } = useCampus();
  const [selectedBuilding, setSelectedBuilding] = useState<Building>(buildings[0]);
  const [mapViewMode, setMapViewMode] = useState<'aerial' | 'digital-twin' | 'schematic'>('aerial');
  const [showLabels, setShowLabels] = useState(true);

  // Map locations accurately aligned with the college aerial drone photograph
  const mapNodes = [
    {
      id: 'auditorium',
      name: 'Campus Temple & Sacred Courtyard',
      shortName: 'Campus Temple (Mandir)',
      x: 32,
      y: 60,
      type: 'Temple & Culture',
      status: 'Healthy',
      aqi: 48,
      energy: 240,
      description: 'Traditional campus temple (Mandir) with red & white shikhara spire, prayer courtyard, and solar illumination',
    },
    {
      id: 'assembly-pavilion',
      buildingId: 'auditorium',
      name: 'Ceremonial Assembly Pavilion & Canopy',
      shortName: 'Assembly Canopy',
      x: 20,
      y: 68,
      type: 'Events & Gathering',
      status: 'Healthy',
      aqi: 45,
      energy: 310,
      description: 'Grand event pavilion and covered assembly grounds for university convocations and cultural gatherings',
    },
    {
      id: 'hostel',
      name: 'Hostel Block & Student Residence',
      shortName: 'Hostel Block',
      x: 24,
      y: 40,
      type: 'Student Residence',
      status: 'Attention Required',
      aqi: 65,
      energy: 1580,
      description: 'Multi-story student residential housing, mess halls, study rooms, and rooftop solar hot water tanks',
    },
    {
      id: 'library',
      name: 'Central Library & Study Commons',
      shortName: 'Central Library',
      x: 40,
      y: 34,
      type: 'Study & Library',
      status: 'Healthy',
      aqi: 42,
      energy: 1120,
      description: 'Digital archives, quiet research commons, reference halls, and rooftop solar array',
    },
    {
      id: 'administration-block',
      name: 'Main Academic & Administration Block',
      shortName: 'Main Admin Block',
      x: 52,
      y: 48,
      type: 'Academic & Admin',
      status: 'Healthy',
      aqi: 54,
      energy: 750,
      description: 'Central 4-story administrative complex, entrance portico, Chancellor chambers, and dean offices',
    },
    {
      id: 'cafeteria',
      name: 'Central Green Lawns & Courtyard',
      shortName: 'Central Lawns',
      x: 50,
      y: 68,
      type: 'Lawn & Commons',
      status: 'Healthy',
      aqi: 38,
      energy: 140,
      description: 'Central landscaped gardens with underground rainwater harvesting cistern (94% capacity) and solar lawn poles',
    },
    {
      id: 'engineering-block',
      name: 'Engineering & Technology Wing',
      shortName: 'Engineering Wing',
      x: 68,
      y: 44,
      type: 'Engineering Labs',
      status: 'Warning',
      aqi: 68,
      energy: 3850,
      description: 'Department of Electrical, Mechanical & Civil Engineering labs, lecture theatres, and workshops',
    },
    {
      id: 'science-block',
      name: 'Computer Science & Research Complex',
      shortName: 'CS & Research Labs',
      x: 82,
      y: 48,
      type: 'Computer Labs & IT',
      status: 'Healthy',
      aqi: 58,
      energy: 2940,
      description: 'Software innovation incubator, robotics labs, AI server clusters, and electronics research',
    },
    {
      id: 'parking-area',
      name: 'East Courtyard & EV Station',
      shortName: 'East Courtyard',
      x: 72,
      y: 68,
      type: 'Transit & Parking',
      status: 'Warning',
      aqi: 82,
      energy: 320,
      description: 'Open student gathering grounds, sports activities, campus shuttle bus stop, and EV charging stations',
    },
    {
      id: 'main-gate',
      name: 'Main Campus Portal & Security',
      shortName: 'Main Gate',
      x: 82,
      y: 88,
      type: 'Security & Access',
      status: 'Healthy',
      aqi: 84,
      energy: 190,
      description: 'Automated barrier access, perimeter security surveillance, visitor registration, and campus entrance boulevard',
    },
  ];

  const handleNodeClick = (nodeId: string) => {
    const targetId = nodeId === 'assembly-pavilion' ? 'auditorium' : nodeId;
    const found = buildings.find((b) => b.id === targetId);
    if (found) {
      setSelectedBuilding(found);
    } else {
      // Find matching mock node and map to existing building
      const fallback = buildings.find((b) => b.id === 'administration-block') || buildings[0];
      setSelectedBuilding(fallback);
    }
  };

  // Efficiency ranking
  const rankedBuildings = [...buildings].sort((a, b) => {
    const scoreA = (a.assetUtilizationPercent + (100 - a.energyKwh / 40) + (100 - a.aqi)) / 3;
    const scoreB = (b.assetUtilizationPercent + (100 - b.energyKwh / 40) + (100 - b.aqi)) / 3;
    return scoreB - scoreA;
  });

  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Interactive Campus Map & Spatial Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Realtime spatial GIS view of {selectedCampus} facility clusters and subsystem metrics
          </p>
        </div>

        <div className="flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            Healthy
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            Warning
          </span>
          <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            Attention
          </span>
        </div>
      </div>

      {/* Main Grid: Interactive Map (left/top) + Building Quick Inspector (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Interactive Stylized Vector Campus Map */}
        <div className="lg:col-span-8 glow-card bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-emerald-500" />
              <span className="text-xs font-bold font-display uppercase tracking-wider text-slate-800 dark:text-slate-200">
                Spatial Campus Layout
              </span>
            </div>

            {/* View Mode Segmented Control */}
            <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800/80 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
              <button
                onClick={() => setMapViewMode('aerial')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  mapViewMode === 'aerial'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                Aerial Drone View
              </button>
              <button
                onClick={() => setMapViewMode('digital-twin')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  mapViewMode === 'digital-twin'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                3D Digital Twin
              </button>
              <button
                onClick={() => setMapViewMode('schematic')}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  mapViewMode === 'schematic'
                    ? 'bg-white dark:bg-slate-900 text-emerald-700 dark:text-emerald-300 shadow-xs'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                GIS Schematic
              </button>
            </div>
          </div>

          {/* Stylized Canvas Container */}
          <div className="relative w-full h-[520px] sm:h-[580px] rounded-2xl bg-slate-950 border border-slate-200/80 dark:border-slate-800 overflow-hidden flex items-center justify-center p-4 shadow-inner">
            {/* Aerial Drone View Mode (Uploaded College Photo) */}
            {mapViewMode === 'aerial' ? (
              <div className="absolute inset-0 z-0">
                <img
                  src="/college_map_aerial.jpg"
                  alt="College Campus Aerial View"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-100 contrast-[1.02]"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/src/assets/images/college_campus_map_1790756240076.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/75 via-transparent to-slate-950/35 pointer-events-none" />
                <div className="absolute top-3 left-3 px-3 py-1.5 rounded-xl bg-black/65 backdrop-blur-md border border-white/15 text-[11px] font-mono text-emerald-400 flex items-center gap-2 shadow-lg">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>COLLEGE CAMPUS AERIAL GIS · SPATIAL NODES SYNCHRONIZED</span>
                </div>
              </div>
            ) : mapViewMode === 'digital-twin' ? (
              /* 3D Digital Twin Mode Backdrop */
              <div className="absolute inset-0 z-0">
                <img
                  src="/src/assets/images/campus_spatial_digital_twin_1790754727163.jpg"
                  alt="3D Digital Twin Campus"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40 pointer-events-none" />
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-mono text-emerald-400">
                  PHOTOREAL 3D DIGITAL TWIN · 60 FPS TELEMETRY
                </div>
              </div>
            ) : (
              /* Campus Pathways (Vector Lines) */
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern id="campusGrid" width="40" height="40" patternUnits="userSpaceOnUse">
                    <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-slate-200 dark:text-slate-800/80" />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#campusGrid)" />

                {/* Campus arterial boulevards */}
                <line x1="50%" y1="92%" x2="50%" y2="75%" stroke="#CBD5E1" strokeWidth="6" strokeLinecap="round" className="dark:stroke-slate-800" />
                <line x1="50%" y1="75%" x2="52%" y2="50%" stroke="#CBD5E1" strokeWidth="5" strokeLinecap="round" className="dark:stroke-slate-800" />
                <line x1="52%" y1="50%" x2="28%" y2="35%" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" className="dark:stroke-slate-800" />
                <line x1="52%" y1="50%" x2="68%" y2="28%" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" className="dark:stroke-slate-800" />
                <line x1="50%" y1="75%" x2="22%" y2="62%" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" className="dark:stroke-slate-800" />
                <line x1="50%" y1="75%" x2="80%" y2="60%" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" className="dark:stroke-slate-800" />
                <line x1="68%" y1="28%" x2="82%" y2="25%" stroke="#E2E8F0" strokeWidth="3" strokeDasharray="5,5" className="dark:stroke-slate-800" />

                {/* Green landscaping circles */}
                <circle cx="50%" cy="63%" r="28" fill="#10B981" fillOpacity="0.08" />
                <circle cx="38%" cy="42%" r="22" fill="#10B981" fillOpacity="0.08" />
                <circle cx="62%" cy="40%" r="24" fill="#10B981" fillOpacity="0.08" />
              </svg>
            )}

            {/* Interactive Telemetry Pins Aligned With College Features */}
            {mapNodes.map((node) => {
              const isSelected =
                selectedBuilding?.id === node.id ||
                (node.id === 'assembly-pavilion' && selectedBuilding?.id === 'auditorium');
              const statusDotColor =
                node.status === 'Healthy'
                  ? 'bg-emerald-400 shadow-emerald-400/50'
                  : node.status === 'Warning'
                  ? 'bg-amber-400 shadow-amber-400/50'
                  : 'bg-rose-400 shadow-rose-400/50';

              return (
                <button
                  key={node.id}
                  onClick={() => handleNodeClick(node.id)}
                  style={{ left: `${node.x}%`, top: `${node.y}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 group z-20 focus:outline-none transition-all duration-200 ${
                    isSelected ? 'scale-110 z-30' : 'hover:scale-105'
                  }`}
                  title={`${node.name} (${node.type})`}
                >
                  {/* Radar pulse ring around pin */}
                  <div className="relative flex items-center justify-center">
                    <span
                      className={`absolute w-8 h-8 rounded-full opacity-60 animate-ping ${
                        node.status === 'Healthy'
                          ? 'bg-emerald-500'
                          : node.status === 'Warning'
                          ? 'bg-amber-500'
                          : 'bg-rose-500'
                      }`}
                    />
                    <span
                      className={`relative w-4 h-4 rounded-full border-2 border-white shadow-md flex items-center justify-center ${statusDotColor}`}
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    </span>
                  </div>

                  {/* Clean Glassmorphic Metadata Badge */}
                  <div
                    className={`mt-1.5 px-2.5 py-1 rounded-xl backdrop-blur-md border shadow-lg text-left whitespace-nowrap transition-all ${
                      isSelected
                        ? 'bg-emerald-950/90 text-white border-emerald-400 ring-2 ring-emerald-400/40'
                        : 'bg-slate-950/80 hover:bg-slate-950 border-white/20 text-white'
                    }`}
                  >
                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-bold tracking-tight">
                        {node.shortName}
                      </span>
                      <span className="text-[9px] px-1 py-0.2 rounded bg-white/20 text-white font-mono tabular-nums">
                        {node.energy} kWh
                      </span>
                    </div>
                    <div className="text-[9px] text-slate-300 font-medium">
                      {node.type} · AQI {node.aqi}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-emerald-600" />
              Automated spatial sensory sync active
            </span>
            <span>Scale: 1:1200 Metric Survey</span>
          </div>
        </div>

        {/* Selected Building Quick Inspector Card */}
        <div className="lg:col-span-4 glow-card bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Facility Spatial Telemetry
              </span>
              <span
                className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                  selectedBuilding.health === 'Healthy'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-500/20'
                    : selectedBuilding.health === 'Warning'
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-500/20'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-500/20'
                }`}
              >
                {selectedBuilding.health}
              </span>
            </div>

            <h2 className="text-xl font-bold font-display text-slate-900 dark:text-white">
              {selectedBuilding.name}
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {selectedBuilding.type} · {selectedBuilding.areaSqFt.toLocaleString()} sq. ft · {selectedBuilding.floors} Floors
            </p>

            {/* Aerial Perspective Card */}
            <div className="mt-3.5 relative h-28 rounded-xl overflow-hidden border border-slate-200/70 dark:border-slate-800 shadow-inner group">
              <img
                src="/college_map_aerial.jpg"
                alt="College Map Crop"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent flex items-end p-2.5">
                <div className="flex items-center justify-between w-full">
                  <span className="text-[10px] font-mono text-white flex items-center gap-1.5 font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    LIVE SENSOR SYNC
                  </span>
                  <span className="text-[10px] text-emerald-300 font-semibold bg-black/60 px-2 py-0.5 rounded backdrop-blur-xs">
                    Occupancy {selectedBuilding.occupancyPercent}%
                  </span>
                </div>
              </div>
            </div>

            {/* AI Summary Card */}
            <div className="mt-3.5 p-3 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 text-xs">
              <div className="flex items-center gap-1.5 font-bold text-emerald-800 dark:text-emerald-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                <span>AI Diagnostics</span>
              </div>
              <p className="text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                {selectedBuilding.aiSummary}
              </p>
            </div>

            {/* Metrics Grid */}
            <div className="mt-4 grid grid-cols-2 gap-2.5 text-xs">
              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                  <Zap className="w-3.5 h-3.5 text-emerald-500" />
                  <span className="text-[11px] font-medium">Power Load</span>
                </div>
                <div className="text-base font-extrabold font-display text-slate-900 dark:text-white tabular-nums">
                  {selectedBuilding.energyKwh} <span className="text-xs font-normal text-slate-400">kWh</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                  <Droplets className="w-3.5 h-3.5 text-sky-500" />
                  <span className="text-[11px] font-medium">Water Flow</span>
                </div>
                <div className="text-base font-extrabold font-display text-slate-900 dark:text-white tabular-nums">
                  {selectedBuilding.waterLiters.toLocaleString()} <span className="text-xs font-normal text-slate-400">L</span>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                  <Wind className="w-3.5 h-3.5 text-amber-500" />
                  <span className="text-[11px] font-medium">Air Quality</span>
                </div>
                <div className="text-base font-extrabold font-display text-slate-900 dark:text-white tabular-nums">
                  AQI {selectedBuilding.aqi}
                </div>
              </div>

              <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-200/60 dark:border-slate-800/80">
                <div className="flex items-center gap-1.5 text-slate-500 dark:text-slate-400 mb-1">
                  <Layers className="w-3.5 h-3.5 text-indigo-500" />
                  <span className="text-[11px] font-medium">Utilization</span>
                </div>
                <div className="text-base font-extrabold font-display text-slate-900 dark:text-white tabular-nums">
                  {selectedBuilding.assetUtilizationPercent}%
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
            <button
              onClick={() => navigate(`/buildings/${selectedBuilding.id}`)}
              className="w-full py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center justify-center gap-2 shadow-xs transition-all hover:scale-[1.01]"
            >
              <span>Open Detailed Building Telemetry</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Campus Efficiency Ranking Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
              Campus Efficiency Leaderboard
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ranked composite index factoring energy conservation, water preservation, and indoor air quality
            </p>
          </div>
          <BarChart3 className="w-4 h-4 text-emerald-600" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Rank</th>
                <th className="py-2.5 px-3">Facility</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Energy (kWh)</th>
                <th className="py-2.5 px-3">Water (L)</th>
                <th className="py-2.5 px-3">AQI</th>
                <th className="py-2.5 px-3 text-right">Asset Utilization</th>
                <th className="py-2.5 px-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {rankedBuildings.map((bld, idx) => (
                <tr key={bld.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3 font-bold tabular-nums text-slate-500">#{idx + 1}</td>
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    {bld.name}
                  </td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        bld.health === 'Healthy'
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : bld.health === 'Warning'
                          ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {bld.health}
                    </span>
                  </td>
                  <td className="py-3 px-3 tabular-nums font-mono">{bld.energyKwh} kWh</td>
                  <td className="py-3 px-3 tabular-nums font-mono">{bld.waterLiters.toLocaleString()} L</td>
                  <td className="py-3 px-3 tabular-nums font-mono">{bld.aqi}</td>
                  <td className="py-3 px-3 text-right tabular-nums font-mono">{bld.assetUtilizationPercent}%</td>
                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => navigate(`/buildings/${bld.id}`)}
                      className="text-xs font-semibold text-emerald-600 hover:text-emerald-700 dark:text-emerald-400 hover:underline"
                    >
                      Inspect →
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
