import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Zap,
  Droplets,
  Recycle,
  ArrowRight,
  CheckCircle2,
  Clock,
  ChevronRight,
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const CampusIQAiSection: React.FC = () => {
  const navigate = useNavigate();
  const { takeActionOnInsight, showToast } = useCampus();

  const [actionsTaken, setActionsTaken] = useState<Record<string, boolean>>({});

  const handleAction = (id: string, message: string) => {
    takeActionOnInsight(id);
    setActionsTaken((prev) => ({ ...prev, [id]: true }));
    showToast(message, 'success');
  };

  const insightsList = [
    {
      id: 'ins-1',
      title: '⚡ Energy Optimization',
      issue: 'Engineering Block is consuming 18% more energy than its baseline.',
      recommendation: 'Review HVAC and lighting usage between 2 PM and 5 PM.',
      potentialSaving: '420 kWh/month (~₹4,200)',
      severity: 'High',
      severityBadge: 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300',
      actionLabel: 'Apply HVAC Setback',
      toastMessage: 'Automated 24°C setback schedule queued for Engineering Block.',
    },
    {
      id: 'ins-2',
      title: '💧 Water Alert',
      issue: 'Water consumption in Hostel Block increased by 14% with night baseline draw.',
      recommendation: 'Possible cause: Potential leakage or stuck cistern float valve in Wing B.',
      potentialSaving: '1,240 L/day conserved',
      severity: 'Critical',
      severityBadge: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
      actionLabel: 'Dispatch Plumbers',
      toastMessage: 'Plumbing technician dispatched to Hostel Wing B.',
    },
    {
      id: 'ins-3',
      title: '🌱 Waste Optimization',
      issue: 'Recycling efficiency can be improved by 11% across campus food sectors.',
      recommendation: 'Increase recycling collection points near cafeterias & central lawn.',
      potentialSaving: '120 kg/month diverted',
      severity: 'Optimization',
      severityBadge: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
      actionLabel: 'Schedule Bins',
      toastMessage: 'Additional dual-stream recycling stations scheduled for placement.',
    },
  ];

  return (
    <div className="glow-card bg-white dark:bg-[#0c1220] border border-emerald-500/25 dark:border-emerald-500/20 rounded-2xl p-6 shadow-xs space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white flex items-center justify-center shadow-xs shadow-emerald-500/25">
            <Sparkles className="w-4 h-4 text-emerald-100" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold font-display text-slate-900 dark:text-white">
                CampusIQ AI Optimization Hub
              </h2>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                Live Inference
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Autonomous telemetry anomalies & proactive carbon-saving recommendations
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate('/ai-insights')}
          className="text-xs font-bold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-1 self-start sm:self-center transition-colors"
        >
          <span>Explore All 5 Insights</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-1">
        {insightsList.map((card) => {
          const isDone = actionsTaken[card.id];

          return (
            <div
              key={card.id}
              className="p-4.5 rounded-2xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-900/60 hover:border-emerald-500/40 hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-xs font-bold font-display text-slate-900 dark:text-white">
                    {card.title}
                  </h3>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${card.severityBadge}`}>
                    {card.severity}
                  </span>
                </div>

                <p className="text-xs text-slate-800 dark:text-slate-200 font-medium leading-relaxed">
                  {card.issue}
                </p>

                <div className="mt-3 p-3 rounded-xl bg-white dark:bg-[#080d1a] border border-slate-200/60 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed shadow-2xs">
                  <span className="font-bold text-emerald-700 dark:text-emerald-400 block text-[10px] uppercase tracking-wider mb-0.5">
                    Recommended Action
                  </span>
                  {card.recommendation}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-slate-800/80 flex items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] text-slate-400 block font-semibold uppercase tracking-wider">Estimated Impact</span>
                  <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 tabular-nums">
                    {card.potentialSaving}
                  </span>
                </div>

                <button
                  onClick={() => handleAction(card.id, card.toastMessage)}
                  disabled={isDone}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-all ${
                    isDone
                      ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                      : 'bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white shadow-xs shadow-emerald-600/20'
                  }`}
                >
                  {isDone ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      <span>Applied</span>
                    </>
                  ) : (
                    <>
                      <span>{card.actionLabel}</span>
                      <ArrowRight className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
