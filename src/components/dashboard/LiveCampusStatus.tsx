import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { Zap, Droplets, Recycle, Wind, Layers } from 'lucide-react';

export const LiveCampusStatus: React.FC = () => {
  const { secondsSinceLastUpdate } = useCampus();

  const statuses = [
    {
      label: 'Energy Grid',
      state: 'Normal',
      dotColor: 'bg-emerald-500',
      badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
      icon: Zap,
      updated: `${secondsSinceLastUpdate}s ago`,
    },
    {
      label: 'Water Networks',
      state: 'Normal',
      dotColor: 'bg-emerald-500',
      badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
      icon: Droplets,
      updated: `${secondsSinceLastUpdate + 2}s ago`,
    },
    {
      label: 'Waste Processing',
      state: 'Good',
      dotColor: 'bg-emerald-500',
      badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
      icon: Recycle,
      updated: '1m ago',
    },
    {
      label: 'Air Quality Sensor',
      state: 'Moderate',
      dotColor: 'bg-amber-500',
      badgeBg: 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400',
      icon: Wind,
      updated: `${secondsSinceLastUpdate}s ago`,
    },
    {
      label: 'Campus Assets',
      state: 'Healthy',
      dotColor: 'bg-emerald-500',
      badgeBg: 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400',
      icon: Layers,
      updated: '3m ago',
    },
  ];

  return (
    <div className="glow-card bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm lg:text-base font-bold font-display text-slate-900 dark:text-white">
            Live Campus Telemetry Feeds
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Active subsystem telemetry status & health across campus
          </p>
        </div>
        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 border border-emerald-500/20 px-2.5 py-1 rounded-full">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          Synchronized Live
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {statuses.map((item) => (
          <div
            key={item.label}
            className="p-3.5 rounded-xl border border-slate-200/60 dark:border-slate-800/80 bg-slate-50/60 dark:bg-slate-900/50 hover:border-emerald-500/30 transition-all hover:-translate-y-0.5"
          >
            <div className="flex items-center justify-between mb-2">
              <item.icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md ${item.badgeBg}`}>
                {item.state}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              <span className={`w-2 h-2 rounded-full ${item.dotColor}`} />
              <span className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                {item.label}
              </span>
            </div>

            <div className="mt-2 text-[10px] text-slate-400 font-mono tabular-nums">
              Updated {item.updated}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
