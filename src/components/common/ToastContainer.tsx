import React from 'react';
import { useCampus } from '../../context/CampusContext';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, dismissToast } = useCampus();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let colorClass = 'bg-white dark:bg-slate-900 border-emerald-500/40 text-emerald-800 dark:text-emerald-300';
        let iconColor = 'text-emerald-500';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          colorClass = 'bg-white dark:bg-slate-900 border-rose-500/40 text-rose-800 dark:text-rose-300';
          iconColor = 'text-rose-500';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          colorClass = 'bg-white dark:bg-slate-900 border-amber-500/40 text-amber-800 dark:text-amber-300';
          iconColor = 'text-amber-500';
        } else if (toast.type === 'info') {
          Icon = Info;
          colorClass = 'bg-white dark:bg-slate-900 border-sky-500/40 text-sky-800 dark:text-sky-300';
          iconColor = 'text-sky-500';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-3.5 rounded-xl border shadow-lg text-xs font-medium animate-in slide-in-from-left duration-200 ${colorClass}`}
          >
            <div className="flex items-center gap-2.5">
              <Icon className={`w-4 h-4 flex-shrink-0 ${iconColor}`} />
              <span className="text-slate-800 dark:text-slate-100">{toast.message}</span>
            </div>
            <button
              onClick={() => dismissToast(toast.id)}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
