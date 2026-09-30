import React, { useState } from 'react';
import {
  Droplets,
  AlertTriangle,
  CheckCircle2,
  TrendingDown,
  CloudRain,
  ShieldAlert,
  ArrowRight,
  Filter,
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
} from 'recharts';
import { useCampus } from '../context/CampusContext';

export const WaterPage: React.FC = () => {
  const { waterData, resolveAlert, showToast, selectedCampus } = useCampus();
  const [leakageResolved, setLeakageResolved] = useState(false);
  const [leakageDismissed, setLeakageDismissed] = useState(false);

  const handleResolveLeak = () => {
    resolveAlert('alt-1');
    setLeakageResolved(true);
    showToast('Plumbing repair team logged resolution on Hostel Block Tank #3.', 'success');
  };

  const handleDismissLeak = () => {
    setLeakageDismissed(true);
    showToast('Water warning suppressed for 4 hours.', 'info');
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Water Resource & Hydraulic Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Flow metering, rainwater harvesting cisterns, and automated leakage detection across {selectedCampus}
          </p>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Water Usage</span>
            <Droplets className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            {waterData.totalUsage.toLocaleString()} <span className="text-xs font-medium text-slate-400">L</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-semibold">↓ 5.2% vs last month</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Water Saved</span>
            <TrendingDown className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
            {waterData.waterSaved.toLocaleString()} <span className="text-xs font-medium text-slate-400">L</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">Through aerator fixtures</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Rainwater Harvested</span>
            <CloudRain className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-teal-700 dark:text-teal-400 tabular-nums">
            {waterData.rainwaterHarvested.toLocaleString()} <span className="text-xs font-medium text-slate-400">L</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">Cistern capacity 94%</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Leakage Alerts</span>
            <AlertTriangle className="w-4 h-4 text-rose-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-rose-600 dark:text-rose-400 tabular-nums">
            {leakageResolved ? 1 : waterData.leakageAlertsCount}
          </div>
          <div className="mt-1 text-[11px] text-rose-600 font-semibold">1 Critical (Hostel Wing B)</div>
        </div>
      </div>

      {/* Leakage Detection Panel */}
      {!leakageDismissed && (
        <div className="p-5 rounded-2xl border border-rose-500/30 bg-rose-50/70 dark:bg-rose-950/30 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
              <ShieldAlert className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-extrabold px-2 py-0.5 rounded-md bg-rose-200 text-rose-900 dark:bg-rose-900 dark:text-rose-200 uppercase tracking-wider">
                  Warning
                </span>
                <span className="text-sm font-bold text-slate-900 dark:text-white">Hostel Block</span>
              </div>
              <p className="text-xs text-rose-800 dark:text-rose-300 font-medium mt-1">
                Usage is <strong>27% above normal baseline</strong>. Possible underground pipeline rupture or flush valve seizure detected.
              </p>
              <div className="mt-2 text-[11px] text-slate-600 dark:text-slate-400 flex items-center gap-4">
                <span>Baseline: 28,600 L/day</span>
                <span>Current: 36,400 L/day</span>
                <span>Leakage Flow: ~8.2 L/min</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end md:self-center">
            {leakageResolved ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-white dark:bg-slate-900 rounded-xl border border-emerald-500/40">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                Resolved & Calibrated
              </span>
            ) : (
              <>
                <button
                  onClick={() => showToast('Dispatched plumbing inspection to Hostel Block Wing B.', 'info')}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  Inspect
                </button>
                <button
                  onClick={handleResolveLeak}
                  className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-rose-600 hover:bg-rose-700 text-white shadow-xs transition-colors"
                >
                  Resolve
                </button>
                <button
                  onClick={handleDismissLeak}
                  className="px-3 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                >
                  Dismiss
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Daily Water Usage & Rainwater Harvested Area Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
                Daily Water Demand & Harvest Trend
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Weekly water throughput with baseline reference
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-600" />
                Usage (L)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                Rainwater Harvested
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={waterData.dailyTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="waterFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0284C7" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#0284C7" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="rainFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} />
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
                <Area
                  type="monotone"
                  dataKey="usage"
                  stroke="#0284C7"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#waterFill)"
                  name="Usage (L)"
                />
                <Area
                  type="monotone"
                  dataKey="harvested"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#rainFill)"
                  name="Rainwater (L)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Water Source Distribution Donut Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
              Water Source Distribution
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Municipal supply vs campus groundwater extraction and rainwater
            </p>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={waterData.sources}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="percentage"
                    nameKey="source"
                  >
                    {waterData.sources.map((entry, index) => (
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
            {waterData.sources.map((item) => (
              <div key={item.source} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item.source}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {item.percentage}% ({item.liters.toLocaleString()} L)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Building-wise Usage Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white mb-1">
          Facility Water Distribution & Telemetric Health
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Sensor readings per building node with anomaly status
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Building</th>
                <th className="py-2.5 px-3">Weekly Draw</th>
                <th className="py-2.5 px-3">Campus Share</th>
                <th className="py-2.5 px-3">Anomaly Status</th>
                <th className="py-2.5 px-3 text-right">Leak Probability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {waterData.buildingData.map((b) => (
                <tr key={b.building} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{b.building}</td>
                  <td className="py-3 px-3 font-mono tabular-nums">{b.usage.toLocaleString()} L</td>
                  <td className="py-3 px-3 font-mono tabular-nums">{b.percentage}%</td>
                  <td className="py-3 px-3">
                    {b.anomalyDetected ? (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 font-bold text-[10px]">
                        <AlertTriangle className="w-3 h-3" />
                        Spike Detected
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-medium text-[10px]">
                        <CheckCircle2 className="w-3 h-3" />
                        Nominal
                      </span>
                    )}
                  </td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums">
                    <span className={b.leakProbability > 50 ? 'font-bold text-rose-600' : 'text-slate-400'}>
                      {b.leakProbability}%
                    </span>
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
