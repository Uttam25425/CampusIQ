import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { Clock, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';

export const ActivityFeed: React.FC = () => {
  const { activities } = useCampus();

  const getIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertCircle className="w-3.5 h-3.5 text-rose-500" />;
      case 'warning':
        return <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />;
      case 'success':
        return <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />;
      default:
        return <Info className="w-3.5 h-3.5 text-sky-500" />;
    }
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
            Recent Activity
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Realtime audit log of campus automation & telemetric events
          </p>
        </div>
        <Clock className="w-4 h-4 text-slate-400" />
      </div>

      <div className="space-y-3">
        {activities.slice(0, 5).map((item) => (
          <div
            key={item.id}
            className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
          >
            <div className="mt-0.5 flex-shrink-0">{getIcon(item.badgeType)}</div>
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline justify-between gap-2">
                <span className="text-xs font-semibold text-slate-900 dark:text-slate-100 truncate">
                  {item.title}
                </span>
                <span className="text-[11px] font-mono text-slate-400 flex-shrink-0">
                  {item.time}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
