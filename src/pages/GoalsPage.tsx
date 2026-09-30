import React from 'react';
import {
  Target,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Droplets,
  Recycle,
  Leaf,
  Sun,
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export const GoalsPage: React.FC = () => {
  const { goals, setIsAddGoalOpen, updateGoalProgress, selectedCampus } = useCampus();

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Energy':
        return <Zap className="w-4 h-4 text-emerald-600" />;
      case 'Water':
        return <Droplets className="w-4 h-4 text-sky-600" />;
      case 'Waste':
        return <Recycle className="w-4 h-4 text-teal-600" />;
      case 'Carbon':
        return <Leaf className="w-4 h-4 text-indigo-600" />;
      default:
        return <Sun className="w-4 h-4 text-amber-500" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Exceeded':
        return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300';
      case 'On Track':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400';
      default:
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950/60 dark:text-amber-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Set Target */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Sustainability Goals & Climate Targets
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Institutional commitments, performance benchmarks, and statutory deadlines for {selectedCampus}
          </p>
        </div>

        <button
          onClick={() => setIsAddGoalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs self-start sm:self-center transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Set Target</span>
        </button>
      </div>

      {/* Goals Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {goals.map((goal) => (
          <div
            key={goal.id}
            className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4 hover:border-emerald-500/40 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800">
                  {getCategoryIcon(goal.category)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">{goal.title}</h3>
                  <span className="text-xs text-slate-500 font-medium">
                    {goal.reductionTargetLabel}
                  </span>
                </div>
              </div>

              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${getStatusBadge(goal.status)}`}>
                {goal.status}
              </span>
            </div>

            {/* Target vs Current Numbers */}
            <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Current</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {goal.currentValue}{goal.unit.includes('%') ? '%' : ` ${goal.unit}`}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Target</span>
                <span className="text-base font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
                  {goal.targetValue}{goal.unit.includes('%') ? '%' : ` ${goal.unit}`}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Progress</span>
                <span className="text-base font-extrabold text-slate-900 dark:text-white tabular-nums">
                  {goal.progressPercent}%
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5">
              <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ease-out ${
                    goal.progressPercent >= 100
                      ? 'bg-emerald-500'
                      : goal.progressPercent >= 60
                      ? 'bg-emerald-600'
                      : 'bg-amber-500'
                  }`}
                  style={{ width: `${Math.min(100, goal.progressPercent)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  Deadline: {goal.deadline}
                </span>
                <div className="flex items-center gap-1">
                  <span>Adjust:</span>
                  <button
                    onClick={() => updateGoalProgress(goal.id, goal.progressPercent + 5)}
                    className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] hover:bg-slate-200"
                  >
                    +5%
                  </button>
                  <button
                    onClick={() => updateGoalProgress(goal.id, goal.progressPercent - 5)}
                    className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px] hover:bg-slate-200"
                  >
                    -5%
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
