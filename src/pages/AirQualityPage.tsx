import React from 'react';
import {
  Wind,
  Thermometer,
  Droplets,
  CloudSun,
  ShieldCheck,
  AlertTriangle,
  Info,
  Clock,
  Sparkles,
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

export const AirQualityPage: React.FC = () => {
  const { airQualityData, selectedCampus } = useCampus();

  const getAqiColor = (aqi: number) => {
    if (aqi <= 50) return 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 dark:text-emerald-400 border-emerald-500/30';
    if (aqi <= 100) return 'text-amber-600 bg-amber-50 dark:bg-amber-950/60 dark:text-amber-400 border-amber-500/30';
    if (aqi <= 150) return 'text-orange-600 bg-orange-50 dark:bg-orange-950/60 dark:text-orange-400 border-orange-500/30';
    return 'text-rose-600 bg-rose-50 dark:bg-rose-950/60 dark:text-rose-400 border-rose-500/30';
  };

  const getAqiBadge = (status: string) => {
    switch (status) {
      case 'Good':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300';
      case 'Moderate':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300';
      default:
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Air Quality & Atmospheric Telemetry
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Realtime ambient PM2.5, PM10, CO2, temperature and relative humidity across {selectedCampus}
          </p>
        </div>
      </div>

      {/* Large Featured AQI Card */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Main AQI Dial Display */}
          <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 border-b lg:border-b-0 lg:border-r border-slate-100 dark:border-slate-800">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Campus Air Quality Index
            </span>
            <div className="mt-3 text-6xl font-extrabold text-amber-500 dark:text-amber-400 tracking-tight tabular-nums">
              {airQualityData.overallAQI}
            </div>
            <div className="mt-2 inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400 border border-amber-500/20">
              Moderate
            </div>
            <span className="text-[11px] text-slate-400 mt-2">WHO clean air advisory compliant</span>
          </div>

          {/* Core Telemetry Readouts */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-semibold block">PM2.5</span>
              <div className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                28 <span className="text-xs font-normal text-slate-400">µg/m³</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">Healthy Range</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-semibold block">PM10</span>
              <div className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                46 <span className="text-xs font-normal text-slate-400">µg/m³</span>
              </div>
              <span className="text-[10px] text-emerald-600 font-semibold">Nominal</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <span className="text-[11px] text-slate-400 font-semibold block">CO2</span>
              <div className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                620 <span className="text-xs font-normal text-slate-400">ppm</span>
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Ventilated</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-semibold">
                <Thermometer className="w-3 h-3" />
                <span>Temp</span>
              </div>
              <div className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                28°C
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Ambient</span>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-center">
              <div className="flex items-center justify-center gap-1 text-[11px] text-slate-400 font-semibold">
                <Droplets className="w-3 h-3" />
                <span>Humidity</span>
              </div>
              <div className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white tabular-nums">
                64%
              </div>
              <span className="text-[10px] text-slate-400 font-semibold">Comfort Zone</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hourly AQI Trend & WHO Status Guide */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Hourly AQI Trend Chart */}
        <div className="lg:col-span-8 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
                Hourly AQI & Particulate Inflow
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Noticeable afternoon peak corresponding with vehicle traffic (16:00 - 18:00)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                AQI
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-sky-500" />
                PM2.5 (µg/m³)
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={airQualityData.hourlyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="aqiFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#F59E0B" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="hour" tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} />
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
                  dataKey="aqi"
                  stroke="#F59E0B"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#aqiFill)"
                  name="AQI Index"
                />
                <Area
                  type="monotone"
                  dataKey="pm25"
                  stroke="#0284C7"
                  strokeWidth={2}
                  fill="none"
                  name="PM2.5 (µg/m³)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Status Levels Guide */}
        <div className="lg:col-span-4 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
              AQI Standard Scales
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Air Quality Index thresholds & health advisories
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 rounded-xl border border-emerald-500/20 bg-emerald-50/50 dark:bg-emerald-950/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-emerald-800 dark:text-emerald-300 block">0 – 50: Good</span>
                  <span className="text-[11px] text-slate-500">Air quality is satisfactory</span>
                </div>
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
              </div>

              <div className="p-2.5 rounded-xl border border-amber-500/20 bg-amber-50/50 dark:bg-amber-950/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-amber-800 dark:text-amber-300 block">51 – 100: Moderate</span>
                  <span className="text-[11px] text-slate-500">Acceptable; sensitive individuals take note</span>
                </div>
                <span className="w-3 h-3 rounded-full bg-amber-500" />
              </div>

              <div className="p-2.5 rounded-xl border border-orange-500/20 bg-orange-50/50 dark:bg-orange-950/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-orange-800 dark:text-orange-300 block">101 – 150: Sensitive Warning</span>
                  <span className="text-[11px] text-slate-500">Respiratory risk for sensitive persons</span>
                </div>
                <span className="w-3 h-3 rounded-full bg-orange-500" />
              </div>

              <div className="p-2.5 rounded-xl border border-rose-500/20 bg-rose-50/50 dark:bg-rose-950/30 flex items-center justify-between">
                <div>
                  <span className="font-bold text-rose-800 dark:text-rose-300 block">151+: Poor / Unhealthy</span>
                  <span className="text-[11px] text-slate-500">Everyone may begin to experience effects</span>
                </div>
                <span className="w-3 h-3 rounded-full bg-rose-500" />
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-400">
            Sensors: Laser scattering particulate counter + Non-dispersive infrared (NDIR) CO2.
          </div>
        </div>
      </div>

      {/* Locations Comparison Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white mb-1">
          Campus Monitoring Station Telemetry
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
          Station readings across 5 key outdoor and indoor campus sectors
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">AQI</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">PM2.5</th>
                <th className="py-2.5 px-3">PM10</th>
                <th className="py-2.5 px-3">CO2</th>
                <th className="py-2.5 px-3">Temperature</th>
                <th className="py-2.5 px-3 text-right">Humidity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {airQualityData.locations.map((loc) => (
                <tr key={loc.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">{loc.name}</td>
                  <td className="py-3 px-3 font-mono font-bold tabular-nums text-sm">{loc.aqi}</td>
                  <td className="py-3 px-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getAqiBadge(loc.status)}`}>
                      {loc.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono tabular-nums">{loc.pm25} µg/m³</td>
                  <td className="py-3 px-3 font-mono tabular-nums">{loc.pm10} µg/m³</td>
                  <td className="py-3 px-3 font-mono tabular-nums">{loc.co2} ppm</td>
                  <td className="py-3 px-3 font-mono tabular-nums">{loc.temperature}°C</td>
                  <td className="py-3 px-3 text-right font-mono tabular-nums">{loc.humidity}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
