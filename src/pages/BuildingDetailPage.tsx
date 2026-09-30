import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Zap,
  Droplets,
  Recycle,
  Wind,
  Layers,
  Users,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  Clock,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { useCampus } from '../context/CampusContext';

export const BuildingDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { buildings } = useCampus();

  const building = buildings.find((b) => b.id === id) || buildings[0];

  return (
    <div className="space-y-6">
      {/* Back button & Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/buildings')}
            className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-emerald-600 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {building.name}
              </h1>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  building.health === 'Healthy'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-500/30'
                    : building.health === 'Warning'
                    ? 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-500/30'
                    : 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-500/30'
                }`}
              >
                {building.health}
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              {building.type} · {building.areaSqFt.toLocaleString()} sq. ft · {building.floors} Floors
            </p>
          </div>
        </div>
      </div>

      {/* AI Summary Diagnostic Banner */}
      <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/30 flex items-start gap-3.5 shadow-xs">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            AI Facility Diagnostic Summary
          </span>
          <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold mt-1 leading-relaxed">
            "{building.aiSummary}"
          </p>
        </div>
      </div>

      {/* 6 Metric Readout Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Energy</span>
          <div className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
            {building.energyKwh} <span className="text-xs font-normal text-slate-400">kWh</span>
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">Smart meter live</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Water</span>
          <div className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
            {building.waterLiters.toLocaleString()} <span className="text-xs font-normal text-slate-400">L</span>
          </div>
          <span className="text-[10px] text-sky-600 font-medium">Hydraulic node</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Waste</span>
          <div className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
            {building.wasteKg} <span className="text-xs font-normal text-slate-400">kg</span>
          </div>
          <span className="text-[10px] text-teal-600 font-medium">Weekly audit</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Air Quality</span>
          <div className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
            AQI {building.aqi}
          </div>
          <span className="text-[10px] text-amber-600 font-medium">Indoor IAQ</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Occupancy</span>
          <div className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
            {building.occupancyPercent}%
          </div>
          <span className="text-[10px] text-indigo-600 font-medium">PIR motion grid</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Asset Use</span>
          <div className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
            {building.assetUtilizationPercent}%
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">Space efficiency</span>
        </div>
      </div>

      {/* Charts Grid: Energy trend, Water trend, Occupancy trend */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Energy Trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Energy Trend (kWh)
              </h3>
              <p className="text-[11px] text-slate-400">Current vs Baseline demand</p>
            </div>
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={building.energyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Area type="monotone" dataKey="current" stroke="#059669" fill="#059669" fillOpacity={0.2} name="Current" />
                <Area type="monotone" dataKey="baseline" stroke="#94A3B8" strokeDasharray="3 3" fill="none" name="Baseline" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Water Demand (L)
              </h3>
              <p className="text-[11px] text-slate-400">Flow metering profile</p>
            </div>
            <Droplets className="w-4 h-4 text-sky-600" />
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={building.waterTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Area type="monotone" dataKey="current" stroke="#0284C7" fill="#0284C7" fillOpacity={0.2} name="Current Flow" />
                <Area type="monotone" dataKey="baseline" stroke="#94A3B8" strokeDasharray="3 3" fill="none" name="Baseline" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Occupancy Trend */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Occupancy Index (%)
              </h3>
              <p className="text-[11px] text-slate-400">PIR spatial occupancy tracking</p>
            </div>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>

          <div className="h-52 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={building.occupancyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="time" tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="occupancy" fill="#6366F1" radius={[4, 4, 0, 0]} name="Occupancy (%)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};
