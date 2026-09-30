import React from 'react';
import {
  Leaf,
  Sparkles,
  TrendingDown,
  CloudRain,
  Zap,
  Car,
  Recycle,
  Droplets,
  ArrowRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useCampus } from '../context/CampusContext';

export const CarbonPage: React.FC = () => {
  const { carbonData, selectedCampus } = useCampus();

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Carbon Footprint & Net-Zero Trajectory
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Scope 1, Scope 2, and localized Scope 3 greenhouse gas emissions auditing for {selectedCampus}
          </p>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total CO2</span>
            <CloudRain className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            {carbonData.totalEmissionsTons} <span className="text-xs font-normal text-slate-400">tons/mo</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-semibold">↓ 14.2% vs baseline</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Monthly Target</span>
            <TrendingDown className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            {carbonData.monthlyTargetTons} <span className="text-xs font-normal text-slate-400">tons</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">92% to milestone</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Annual Savings</span>
            <Leaf className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-teal-700 dark:text-teal-400 tabular-nums">
            {carbonData.annualProjectedSavingsTons} <span className="text-xs font-normal text-slate-400">tons</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-semibold">Cumulative avoided</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Solar Offsets</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
            2.1 <span className="text-xs font-normal text-slate-400">tons/mo</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">3,240 kWh green power</div>
        </div>
      </div>

      {/* AI Recommendation Highlight */}
      <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/30 flex items-start gap-3.5 shadow-xs">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            Decarbonization Recommendation
          </div>
          <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold mt-1">
            "Switching additional campus electricity demand to renewable rooftop solar could reduce annual emissions by 18.5 tons."
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
            Phase 3 solar expansion across Computer Science Block and Engineering Block wings will push renewable coverage to 38%, yielding carbon neutrality for daytime academic operations.
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Monthly Carbon Footprint Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
                Monthly Emission Trajectory (tons CO2)
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Gross campus emissions vs Institutional Net-Zero target line
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                Actual
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                Target
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={carbonData.monthlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="carbonFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Area type="monotone" dataKey="actual" stroke="#059669" strokeWidth={2} fill="url(#carbonFill)" name="Actual (tons)" />
                <Area type="monotone" dataKey="target" stroke="#0284C7" strokeWidth={2} strokeDasharray="3 3" fill="none" name="Target (tons)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Carbon Breakdown by Emission Stream */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
              Emissions by Stream Source
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Energy emissions account for 60% of total campus footprint
            </p>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={carbonData.breakdown}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="percentage"
                    nameKey="category"
                  >
                    {carbonData.breakdown.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => `${val}%`}
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            {carbonData.breakdown.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">
                    {item.category} Emissions
                  </span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {item.percentage}% ({item.emissionsTons} tons)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
