import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight, CheckCircle2, Clock, Zap } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const EnergyAiInsightCard: React.FC = () => {
  const navigate = useNavigate();
  const { takeActionOnInsight, showToast } = useCampus();
  const [actionTaken, setActionTaken] = useState(false);

  const handleTakeAction = () => {
    takeActionOnInsight('ins-1');
    setActionTaken(true);
    showToast('HVAC auto-setback rule dispatched to Engineering Block BAS controller.', 'success');
  };

  return (
    <div className="relative overflow-hidden rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-950/10 via-white to-emerald-50/30 dark:from-emerald-950/40 dark:via-slate-900 dark:to-emerald-950/20 p-5 lg:p-6 shadow-xs">
      {/* Decorative subtle ambient circle */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-600 text-white flex items-center justify-center shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            AI Energy Insight
          </span>
        </div>

        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1">
          <Clock className="w-3 h-3" />
          Detected today · Engineering Block
        </span>
      </div>

      <h3 className="text-base lg:text-lg font-bold text-slate-900 dark:text-white leading-snug">
        "Engineering Block consumed 18% more energy than its normal baseline this week."
      </h3>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
        <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <span className="font-bold text-slate-500 dark:text-slate-400 block text-[11px] uppercase tracking-wider">
            Possible Cause
          </span>
          <p className="mt-1 text-slate-800 dark:text-slate-200 font-medium">
            High HVAC chillers active at peak CFM during low-occupancy hours (2 PM – 5 PM).
          </p>
        </div>

        <div className="p-3 rounded-xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
          <span className="font-bold text-slate-500 dark:text-slate-400 block text-[11px] uppercase tracking-wider">
            Recommendation
          </span>
          <p className="mt-1 text-slate-800 dark:text-slate-200 font-medium">
            "Review HVAC schedules and enable 24°C setback between 2 PM and 5 PM."
          </p>
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-200/60 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
            <Zap className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[11px] text-slate-500 dark:text-slate-400 block">Potential Savings</span>
            <span className="text-sm font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
              420 kWh/month (~₹4,200)
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/energy')}
            className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            View Analysis
          </button>

          <button
            onClick={handleTakeAction}
            disabled={actionTaken}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg flex items-center gap-1.5 transition-all ${
              actionTaken
                ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs shadow-emerald-600/30'
            }`}
          >
            {actionTaken ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                <span>Action Dispatched</span>
              </>
            ) : (
              <>
                <span>Take Action</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
