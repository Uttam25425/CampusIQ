import React from 'react';
import { ArrowUpRight, CheckCircle, Sparkles } from 'lucide-react';

interface MetricBreakdown {
  label: string;
  score: number;
  color: string;
}

export const SustainabilityScore: React.FC = () => {
  const score = 78;
  const maxScore = 100;
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / maxScore) * circumference;

  const breakdown: MetricBreakdown[] = [
    { label: 'Energy', score: 82, color: 'bg-emerald-700' },
    { label: 'Water', score: 74, color: 'bg-sky-600' },
    { label: 'Waste', score: 81, color: 'bg-teal-600' },
    { label: 'Air Quality', score: 76, color: 'bg-amber-500' },
    { label: 'Assets', score: 79, color: 'bg-indigo-600' },
  ];

  return (
    <div className="glow-card bg-white dark:bg-[#0c1220] border border-slate-200/80 dark:border-slate-800/80 rounded-2xl p-6 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
              Sustainability Score
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Composite index from real-time environmental sensors
            </p>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold rounded-full bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-700 dark:text-emerald-300 border border-emerald-500/30 shadow-2xs">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
            Good Progress
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          {/* Circular Progress Gauge */}
          <div className="md:col-span-5 flex flex-col items-center justify-center py-2">
            <div className="relative w-44 h-44 flex items-center justify-center">
              {/* Subtle ambient score glow */}
              <div className="absolute inset-4 rounded-full bg-emerald-500/10 dark:bg-emerald-500/15 blur-xl -z-10" />

              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                <defs>
                  <linearGradient id="scoreGaugeGrad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#10B981" />
                    <stop offset="100%" stopColor="#0D9488" />
                  </linearGradient>
                </defs>
                {/* Background ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  className="text-slate-100 dark:text-slate-800/70"
                  strokeWidth="11"
                  stroke="currentColor"
                  fill="transparent"
                />
                {/* Active ring */}
                <circle
                  cx="80"
                  cy="80"
                  r={radius}
                  stroke="url(#scoreGaugeGrad)"
                  strokeWidth="11"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>

              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-4xl font-extrabold font-display text-slate-900 dark:text-white tracking-tight tabular-nums">
                  {score}
                </span>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-0.5">
                  out of {maxScore}
                </span>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/20 px-3 py-1 rounded-full border border-emerald-500/20">
              <ArrowUpRight className="w-3.5 h-3.5" />
              <span>↑ 6 points from last month</span>
            </div>
          </div>

          {/* Breakdown Bars */}
          <div className="md:col-span-7 space-y-3.5">
            {breakdown.map((item) => (
              <div key={item.label}>
                <div className="flex items-center justify-between text-xs mb-1 font-medium">
                  <span className="text-slate-700 dark:text-slate-300 font-semibold">{item.label}</span>
                  <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                    {item.score}%
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-100 dark:bg-slate-800/80 overflow-hidden p-0.5">
                  <div
                    className={`h-full rounded-full transition-all duration-700 ease-out ${item.color} shadow-xs`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Small AI explanation */}
      <div className="mt-5 p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-500/20 flex items-start gap-2.5 text-xs">
        <Sparkles className="w-4 h-4 text-emerald-700 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
        <p className="text-emerald-900 dark:text-emerald-200 leading-relaxed font-medium">
          "Your campus sustainability performance improved mainly due to lower energy and waste consumption."
        </p>
      </div>
    </div>
  );
};
