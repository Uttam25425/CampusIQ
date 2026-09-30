import React from 'react';
import { X, HelpCircle, BookOpen, MessageSquare, ShieldCheck, Mail } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const HelpSupportModal: React.FC = () => {
  const { isHelpSupportOpen, setIsHelpSupportOpen, toggleEcoAI } = useCampus();

  if (!isHelpSupportOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <HelpCircle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Help & Documentation</h3>
              <p className="text-[11px] text-slate-500">CampusIQ Smart Campus Facility Operations Guide by ECONEX</p>
            </div>
          </div>
          <button
            onClick={() => setIsHelpSupportOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-4 space-y-3.5 text-xs text-slate-600 dark:text-slate-300">
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-1">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span>Campus Sustainability Score Formula</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              The overall index (0–100) aggregates weighted inputs: Energy Efficiency (30%), Water Conservation (20%), Waste Diversion (20%), Indoor Air Quality (15%), and Asset Utilization (15%).
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-1">
              <MessageSquare className="w-4 h-4 text-emerald-600" />
              <span>Interactive CampusIQ AI Assistant</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              CampusIQ AI analyzes campus IoT sensor telemetry to diagnose root causes behind consumption spikes and auto-generate energy conservation rules.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-700/60">
            <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white mb-1">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>IoT Sensor Simulation Mode</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Toggle the "Live" badge on the top navigation bar to pause or simulate live IoT telemetry stream fluctuations.
            </p>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2 text-[11px] text-slate-500">
            <Mail className="w-3.5 h-3.5" />
            <span>support@campusiq.campus</span>
          </div>

          <button
            onClick={() => {
              setIsHelpSupportOpen(false);
              toggleEcoAI();
            }}
            className="px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-800 hover:bg-emerald-700 text-white shadow-xs"
          >
            Ask CampusIQ AI
          </button>
        </div>
      </div>
    </div>
  );
};
