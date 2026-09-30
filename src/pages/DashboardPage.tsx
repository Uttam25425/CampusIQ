import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Zap,
  Droplets,
  Recycle,
  Wind,
  Building2,
  Plus,
  FileText,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Sun,
  ShieldAlert,
  FileDown,
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
import { KpiCard } from '../components/dashboard/KpiCard';
import { SustainabilityScore } from '../components/dashboard/SustainabilityScore';
import { LiveCampusStatus } from '../components/dashboard/LiveCampusStatus';
import { EnergyAiInsightCard } from '../components/dashboard/EnergyAiInsightCard';
import { CampusIQAiSection } from '../components/dashboard/CampusIQAiSection';
import { ActivityFeed } from '../components/dashboard/ActivityFeed';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    energyData,
    waterData,
    wasteData,
    airQualityData,
    selectedCampus,
    setIsAddBuildingOpen,
    setIsAddAssetOpen,
    toggleEcoAI,
    alerts,
  } = useCampus();

  const todayDate = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  const activeCriticalAlerts = alerts.filter((a) => a.severity === 'Critical' && a.status === 'Active');

  return (
    <div className="space-y-6">
      {/* Executive Command Hero Banner with Cinematic Smart Campus Visual */}
      <div className="relative overflow-hidden rounded-3xl border border-slate-200/80 dark:border-slate-800/80 bg-slate-900 text-white shadow-xl">
        {/* Background Image with Layered Radial & Linear Gradients */}
        <div className="absolute inset-0 z-0">
          <img
            src="/src/assets/images/campusiq_smart_campus_hero_1790754713734.jpg"
            alt="CampusIQ Smart Campus"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center scale-105 transform hover:scale-100 transition-transform duration-700 opacity-40 dark:opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/90 to-slate-900/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
          {/* Subtle Ambient Emerald Flare */}
          <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl pointer-events-none" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 p-6 sm:p-8 lg:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            {/* Live Operational Status Pills */}
            <div className="flex flex-wrap items-center gap-2.5 mb-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                All Subsystems Nominal
              </span>
              <span className="text-xs text-slate-300/80 backdrop-blur-xs font-medium">
                {selectedCampus} · 142 Telemetry Sensors Active
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold font-display tracking-tight text-white leading-tight">
              Campus Sustainability Overview
            </h1>
            <p className="text-sm sm:text-base text-slate-300 mt-2 font-medium leading-relaxed max-w-xl">
              Real-time environmental intelligence, predictive equipment health, and autonomous resource conservation.
            </p>

            {/* Quick telemetry metrics */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-white/10">
              <div>
                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Carbon Intensity</span>
                <span className="text-base sm:text-lg font-bold font-display text-white tabular-nums">184 <span className="text-xs font-normal text-slate-300">gCO₂/kWh</span></span>
              </div>
              <div>
                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Solar Generation</span>
                <span className="text-base sm:text-lg font-bold font-display text-emerald-400 tabular-nums">4.8 <span className="text-xs font-normal text-slate-300">MW peak</span></span>
              </div>
              <div className="hidden sm:block">
                <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">Target 2026</span>
                <span className="text-base sm:text-lg font-bold font-display text-teal-300 tabular-nums">82% <span className="text-xs font-normal text-slate-300">on track</span></span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row lg:flex-col gap-2.5 flex-shrink-0">
            <button
              onClick={toggleEcoAI}
              className="flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 hover:from-emerald-400 hover:to-teal-400 text-white shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Sparkles className="w-4 h-4 text-emerald-100" />
              <span>Ask CampusIQ AI</span>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsAddBuildingOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-emerald-400" />
                <span>Add Building</span>
              </button>

              <button
                onClick={() => setIsAddAssetOpen(true)}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition-colors"
              >
                <Plus className="w-3.5 h-3.5 text-teal-400" />
                <span>Add Asset</span>
              </button>

              <button
                onClick={() => navigate('/reports')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/15 backdrop-blur-md transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-slate-300" />
                <span>Report</span>
              </button>

              <button
                onClick={() => navigate('/dossier')}
                className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-400/30 backdrop-blur-md transition-colors shadow-2xs"
                title="View Full Project Dossier & Job Interview Guide (PDF)"
              >
                <FileDown className="w-3.5 h-3.5 text-emerald-400" />
                <span>Job PDF</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Critical Banner (if any) */}
      {activeCriticalAlerts.length > 0 && (
        <div className="p-4 rounded-2xl border border-rose-500/30 bg-rose-50/70 dark:bg-rose-950/30 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-rose-500 text-white flex items-center justify-center flex-shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-bold text-rose-800 dark:text-rose-300 block">
                Critical Anomaly Detected: {activeCriticalAlerts[0].title}
              </span>
              <p className="text-[11px] text-rose-700 dark:text-rose-400 mt-0.5">
                {activeCriticalAlerts[0].description}
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/alerts')}
            className="whitespace-nowrap px-3 py-1.5 text-xs font-bold text-rose-700 dark:text-rose-300 bg-white dark:bg-slate-900 rounded-lg border border-rose-200 dark:border-rose-800 hover:bg-rose-100 transition-colors"
          >
            Review Alert
          </button>
        </div>
      )}

      {/* Today's AI Summary Banner */}
      <div className="p-4 rounded-2xl border border-emerald-500/25 bg-emerald-50/60 dark:bg-emerald-950/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center flex-shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400 block">
              Today's AI Summary
            </span>
            <p className="text-xs text-slate-800 dark:text-slate-200 font-medium mt-0.5">
              "Campus energy usage is 6% lower than yesterday, while water consumption in Hostel Block requires attention."
            </p>
          </div>
        </div>
        <button
          onClick={() => navigate('/ai-insights')}
          className="text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 self-start sm:self-center"
        >
          <span>View All 5 Insights</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* 5 Premium KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <KpiCard
          label="Energy Consumption"
          value={energyData.totalUsage}
          unit="kWh"
          changeText="↓ 8.4%"
          changeType="positive"
          comparisonLabel="vs last month"
          icon={Zap}
          iconColor="text-emerald-600"
          iconBg="bg-emerald-50 dark:bg-emerald-950/60"
          sparklineData={[42, 38, 45, 39, 36, 32, 28]}
          onClick={() => navigate('/energy')}
        />

        <KpiCard
          label="Water Usage"
          value={waterData.totalUsage}
          unit="L"
          changeText="↓ 5.2%"
          changeType="positive"
          comparisonLabel="vs last month"
          icon={Droplets}
          iconColor="text-sky-600"
          iconBg="bg-sky-50 dark:bg-sky-950/60"
          sparklineData={[92, 88, 85, 90, 84, 82, 80]}
          onClick={() => navigate('/water')}
        />

        <KpiCard
          label="Waste Generated"
          value={wasteData.totalWaste}
          unit="kg"
          changeText="↓ 12.1%"
          changeType="positive"
          comparisonLabel="vs last month"
          icon={Recycle}
          iconColor="text-teal-600"
          iconBg="bg-teal-50 dark:bg-teal-950/60"
          sparklineData={[380, 365, 350, 340, 335, 325, 320]}
          onClick={() => navigate('/waste')}
        />

        <KpiCard
          label="Air Quality"
          value={`AQI ${airQualityData.overallAQI}`}
          unit="Moderate"
          changeText="PM2.5 28"
          changeType="neutral"
          comparisonLabel="µg/m³ nominal"
          icon={Wind}
          iconColor="text-amber-600"
          iconBg="bg-amber-50 dark:bg-amber-950/60"
          sparklineData={[68, 70, 75, 74, 71, 73, 72]}
          onClick={() => navigate('/air-quality')}
        />

        <KpiCard
          label="Asset Utilization"
          value="78%"
          unit="Nominal"
          changeText="↑ 6.8%"
          changeType="positive"
          comparisonLabel="vs last month"
          icon={Building2}
          iconColor="text-indigo-600"
          iconBg="bg-indigo-50 dark:bg-indigo-950/60"
          sparklineData={[71, 72, 74, 73, 76, 77, 78]}
          onClick={() => navigate('/assets')}
        />
      </div>

      {/* Sustainability Score & Live Campus Status Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-7">
          <SustainabilityScore />
        </div>
        <div className="lg:col-span-5 flex flex-col justify-between">
          <LiveCampusStatus />
          {/* Quick Metrics Capsule */}
          <div className="mt-4 p-5 rounded-2xl glow-card bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 flex items-center justify-around text-center shadow-xs">
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Solar Generation</span>
              <span className="text-base sm:text-lg font-bold font-display text-emerald-600 dark:text-emerald-400 tabular-nums">
                3,240 <span className="text-xs font-normal text-slate-400">kWh</span>
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200/70 dark:bg-slate-800" />
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Rainwater Stored</span>
              <span className="text-base sm:text-lg font-bold font-display text-sky-600 dark:text-sky-400 tabular-nums">
                8,200 <span className="text-xs font-normal text-slate-400">L</span>
              </span>
            </div>
            <div className="h-8 w-px bg-slate-200/70 dark:bg-slate-800" />
            <div>
              <span className="text-[11px] font-bold text-slate-400 block uppercase tracking-wider">Recycled Ratio</span>
              <span className="text-base sm:text-lg font-bold font-display text-teal-600 dark:text-teal-400 tabular-nums">
                56.2%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* CampusIQ AI Section with Actionable Recommendations */}
      <CampusIQAiSection />

      {/* Energy Analytics & AI Insight Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Energy Chart Container */}
        <div className="lg:col-span-7 glow-card bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                Energy Consumption Over Time
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Real-time vs Baseline campus grid demand (24h)
              </p>
            </div>

            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5 font-medium text-slate-600 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Actual (kWh)
              </span>
              <span className="flex items-center gap-1.5 font-medium text-slate-400">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                Baseline
              </span>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 p-3.5 rounded-xl bg-slate-50/80 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800/80 text-xs">
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Total Demand</span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">12,450 kWh</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Estimated Cost</span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">₹1,24,500</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Solar Yield</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">3,240 kWh</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Renewable</span>
              <span className="font-bold text-teal-600 dark:text-teal-400 tabular-nums">26.0%</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider block">Carbon Load</span>
              <span className="font-bold text-slate-900 dark:text-white tabular-nums">5.2 tons</span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={energyData.hourlyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="energyFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94A3B8" opacity={0.15} />
                <XAxis dataKey="time" tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#090D16',
                    borderRadius: '12px',
                    border: '1px solid rgba(255,255,255,0.1)',
                    color: '#fff',
                    fontSize: '11px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#10B981"
                  strokeWidth={2.4}
                  fillOpacity={1}
                  fill="url(#energyFill)"
                  name="Usage (kWh)"
                />
                <Area
                  type="monotone"
                  dataKey="baseline"
                  stroke="#64748B"
                  strokeWidth={1.5}
                  strokeDasharray="4 4"
                  fill="none"
                  name="Baseline (kWh)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* AI Insight Card + Recent Activity Column */}
        <div className="lg:col-span-5 space-y-6">
          <EnergyAiInsightCard />
          <ActivityFeed />
        </div>
      </div>

      {/* Buildings at a glance bar */}
      <div className="glow-card bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
              Building Consumption Comparison
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Comparative weekly energy demand across campus facilities
            </p>
          </div>
          <button
            onClick={() => navigate('/buildings')}
            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1"
          >
            <span>View All Buildings</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-56 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={energyData.buildingData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94A3B8" opacity={0.15} />
              <XAxis dataKey="building" tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#090D16',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.1)',
                  color: '#fff',
                  fontSize: '11px',
                  boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                }}
              />
              <Bar dataKey="usage" fill="#10B981" radius={[8, 8, 0, 0]} name="Usage (kWh)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
