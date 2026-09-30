import React, { useState } from 'react';
import {
  Zap,
  Sun,
  TrendingDown,
  Clock,
  DollarSign,
  CloudRain,
  Sparkles,
  BarChart2,
  PieChart as PieChartIcon,
  Flame,
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
import { EnergyAiInsightCard } from '../components/dashboard/EnergyAiInsightCard';
import { EnergyHourlyData } from '../types';

export const EnergyPage: React.FC = () => {
  const { energyData, selectedCampus } = useCampus();
  const [timeFilter, setTimeFilter] = useState<'24 Hours' | '7 Days' | '30 Days' | '6 Months' | '1 Year'>('24 Hours');

  // Multi-tier mock data according to timeFilter
  const hourlyData = energyData.hourlyData;

  const weeklyTrend: EnergyHourlyData[] = [
    { time: 'Mon', usage: 1820, solar: 510, grid: 1310, baseline: 1900 },
    { time: 'Tue', usage: 1890, solar: 540, grid: 1350, baseline: 1950 },
    { time: 'Wed', usage: 1940, solar: 560, grid: 1380, baseline: 1920 },
    { time: 'Thu', usage: 1850, solar: 530, grid: 1320, baseline: 1900 },
    { time: 'Fri', usage: 1780, solar: 510, grid: 1270, baseline: 1850 },
    { time: 'Sat', usage: 1220, solar: 420, grid: 800, baseline: 1300 },
    { time: 'Sun', usage: 950, solar: 380, grid: 570, baseline: 1050 },
  ];

  const peakHoursData = [
    { hour: '08:00', load: 780, level: 'Normal' },
    { hour: '10:00', load: 1140, level: 'High' },
    { hour: '12:00', load: 1420, level: 'Peak' },
    { hour: '14:00', load: 1380, level: 'Peak' },
    { hour: '16:00', load: 1210, level: 'High' },
    { hour: '18:00', load: 890, level: 'Normal' },
  ];

  const timeFilterOptions: ('24 Hours' | '7 Days' | '30 Days' | '6 Months' | '1 Year')[] = [
    '24 Hours',
    '7 Days',
    '30 Days',
    '6 Months',
    '1 Year',
  ];

  return (
    <div className="space-y-6">
      {/* Page Title & Filter */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Energy Analytics & Power Management
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Realtime grid draw, microgrid solar generation, and smart tariff metrics for {selectedCampus}
          </p>
        </div>

        {/* Time filters */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {timeFilterOptions.map((opt) => (
            <button
              key={opt}
              onClick={() => setTimeFilter(opt)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                timeFilter === opt
                  ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Top 5 Primary Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Total Demand</span>
            <Zap className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            12,450 <span className="text-xs font-medium text-slate-400">kWh</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-semibold">↓ 8.4% vs last month</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Estimated Cost</span>
            <DollarSign className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            ₹1,24,500
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">₹10.00 / kWh tariff</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Solar Generated</span>
            <Sun className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
            3,240 <span className="text-xs font-medium text-slate-400">kWh</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-semibold">+14.2% vs sunny avg</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Renewable Share</span>
            <Sparkles className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
            26%
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">Target: 40% by 2027</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">CO2 Emissions</span>
            <CloudRain className="w-4 h-4 text-indigo-500" />
          </div>
          <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            5.2 <span className="text-xs font-medium text-slate-400">tons</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-semibold">↓ 1.4 tons avoided</div>
        </div>
      </div>

      {/* AI Energy Insight Card */}
      <EnergyAiInsightCard />

      {/* Primary Chart: Energy consumption over time */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
              Energy Consumption Profile ({timeFilter})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Solar PV offset vs grid intake across time intervals
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium">
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
              Total Load (kWh)
            </span>
            <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
              Solar PV (kWh)
            </span>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={timeFilter === '7 Days' ? weeklyTrend : hourlyData}
              margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
            >
              <defs>
                <linearGradient id="loadFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#059669" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="solarFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
              <XAxis
                dataKey="time"
                tick={{ fontSize: 11, fill: '#94A3B8' }}
                tickLine={false}
              />
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
                stroke="#059669"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#loadFill)"
                name="Total Load (kWh)"
              />
              <Area
                type="monotone"
                dataKey="solar"
                stroke="#F59E0B"
                strokeWidth={2}
                fillOpacity={1}
                fill="url(#solarFill)"
                name="Solar PV (kWh)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 2-Column Section: Energy by Building + Energy Sources Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Energy by Building Bar Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
                Energy by Campus Building
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Weekly energy draw (Engineering Block highest at 3,850 kWh)
              </p>
            </div>
            <BarChart2 className="w-4 h-4 text-emerald-600" />
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={energyData.buildingData}
                layout="vertical"
                margin={{ top: 5, right: 20, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis type="number" tick={{ fontSize: 10, fill: '#94A3B8' }} tickLine={false} />
                <YAxis
                  type="category"
                  dataKey="building"
                  tick={{ fontSize: 10, fill: '#64748B' }}
                  tickLine={false}
                  width={110}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="usage" fill="#059669" radius={[0, 6, 6, 0]} name="Consumption (kWh)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Renewable vs Non-Renewable Sources Donut Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
                Energy Source Distribution
              </h2>
              <PieChartIcon className="w-4 h-4 text-emerald-600" />
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Microgrid generation vs external utility feed
            </p>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={energyData.sources}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="percentage"
                    nameKey="name"
                  >
                    {energyData.sources.map((entry, index) => (
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
            {energyData.sources.map((item) => (
              <div key={item.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {item.percentage}% ({item.kwh} kWh)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Building Energy Audit Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white mb-1">
          Building Power Audit & Tariff Ledger
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Detailed breakdown of electrical utility cost and solar integration per facility
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Facility</th>
                <th className="py-2.5 px-3">Weekly Draw</th>
                <th className="py-2.5 px-3">Cost (₹)</th>
                <th className="py-2.5 px-3">Solar Contribution</th>
                <th className="py-2.5 px-3">Efficiency Score</th>
                <th className="py-2.5 px-3 text-right">Peak Load Window</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {energyData.buildingData.map((b) => (
                <tr key={b.building} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{b.building}</td>
                  <td className="py-3 px-3 font-mono tabular-nums">{b.usage.toLocaleString()} kWh</td>
                  <td className="py-3 px-3 font-mono tabular-nums font-semibold">₹{b.cost.toLocaleString()}</td>
                  <td className="py-3 px-3">
                    <span className="inline-flex items-center gap-1 font-semibold text-emerald-600 dark:text-emerald-400 tabular-nums">
                      <Sun className="w-3 h-3" />
                      {b.solarContribution}%
                    </span>
                  </td>
                  <td className="py-3 px-3">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            b.efficiencyScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'
                          }`}
                          style={{ width: `${b.efficiencyScore}%` }}
                        />
                      </div>
                      <span className="font-mono tabular-nums">{b.efficiencyScore}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-500">{b.peakUsageHour}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
