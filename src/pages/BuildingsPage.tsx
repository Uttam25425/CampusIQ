import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  Plus,
  Zap,
  Droplets,
  Recycle,
  Wind,
  Layers,
  Users,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { Building } from '../types';

export const BuildingsPage: React.FC = () => {
  const navigate = useNavigate();
  const { buildings, setIsAddBuildingOpen, selectedCampus } = useCampus();
  const [filterHealth, setFilterHealth] = useState<string>('All');

  const filteredBuildings = buildings.filter((b) => {
    if (filterHealth === 'All') return true;
    return b.health === filterHealth;
  });

  const getHealthBadge = (health: Building['health']) => {
    switch (health) {
      case 'Healthy':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-500/30';
      case 'Warning':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-500/30';
      case 'Attention Required':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Add Building */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Building Management & Facility Audits
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Realtime multi-sensor telemetry across all facilities in {selectedCampus}
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <select
            value={filterHealth}
            onChange={(e) => setFilterHealth(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            <option value="All">All Health States</option>
            <option value="Healthy">Healthy</option>
            <option value="Warning">Warning</option>
            <option value="Attention Required">Attention Required</option>
          </select>

          <button
            onClick={() => setIsAddBuildingOpen(true)}
            className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add Building</span>
          </button>
        </div>
      </div>

      {/* Buildings Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredBuildings.map((building) => (
          <div
            key={building.id}
            onClick={() => navigate(`/buildings/${building.id}`)}
            className="group cursor-pointer p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              {/* Card Header */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors">
                    {building.name}
                  </h3>
                  <span className="text-xs text-slate-400">{building.type}</span>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getHealthBadge(
                    building.health
                  )}`}
                >
                  {building.health}
                </span>
              </div>

              {/* AI Quick Summary */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-300 line-clamp-2 mb-4">
                <span className="font-bold text-emerald-600 dark:text-emerald-400 mr-1">AI:</span>
                {building.aiSummary}
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px]">
                    <Zap className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Energy</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {building.energyKwh} <span className="text-[10px] font-normal text-slate-400">kWh</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px]">
                    <Droplets className="w-3.5 h-3.5 text-sky-600" />
                    <span>Water</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {building.waterLiters.toLocaleString()} <span className="text-[10px] font-normal text-slate-400">L</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px]">
                    <Recycle className="w-3.5 h-3.5 text-teal-600" />
                    <span>Waste</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {building.wasteKg} <span className="text-[10px] font-normal text-slate-400">kg</span>
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px]">
                    <Wind className="w-3.5 h-3.5 text-amber-500" />
                    <span>Air Quality</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white tabular-nums">
                    AQI {building.aqi}
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px]">
                    <Users className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Occupancy</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {building.occupancyPercent}%
                  </div>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50/80 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800/80">
                  <div className="flex items-center gap-1.5 text-slate-400 mb-1 text-[11px]">
                    <Layers className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Asset Use</span>
                  </div>
                  <div className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {building.assetUtilizationPercent}%
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>View Building Telemetry</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
