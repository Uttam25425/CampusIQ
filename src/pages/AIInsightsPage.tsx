import React, { useState } from 'react';
import {
  Sparkles,
  Filter,
  CheckCircle2,
  ArrowRight,
  Zap,
  Droplets,
  Recycle,
  Wind,
  Layers,
  Clock,
  Check,
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { AIInsight, InsightCategory, InsightSeverity } from '../types';

export const AIInsightsPage: React.FC = () => {
  const { insights, resolveInsight, takeActionOnInsight, selectedCampus } = useCampus();

  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [severityFilter, setSeverityFilter] = useState<string>('All');
  const [selectedInsightModal, setSelectedInsightModal] = useState<AIInsight | null>(null);

  const categories = ['All', 'Energy', 'Water', 'Waste', 'Air Quality', 'Assets'];
  const severities = ['All', 'Critical', 'High', 'Medium', 'Low'];

  const filteredInsights = insights.filter((ins) => {
    const matchesCat = categoryFilter === 'All' || ins.category === categoryFilter;
    const matchesSev = severityFilter === 'All' || ins.severity === severityFilter;
    return matchesCat && matchesSev;
  });

  const getCategoryIcon = (category: InsightCategory) => {
    switch (category) {
      case 'Energy':
        return <Zap className="w-4 h-4 text-emerald-600" />;
      case 'Water':
        return <Droplets className="w-4 h-4 text-sky-600" />;
      case 'Waste':
        return <Recycle className="w-4 h-4 text-teal-600" />;
      case 'Air Quality':
        return <Wind className="w-4 h-4 text-amber-500" />;
      case 'Assets':
        return <Layers className="w-4 h-4 text-indigo-600" />;
    }
  };

  const getSeverityBadge = (severity: InsightSeverity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-500/30';
      case 'High':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-500/30';
      case 'Medium':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border-sky-500/30';
      case 'Low':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 border-slate-300/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              AI-Powered Campus Intelligence
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            "Turn campus data into actionable decisions." Realtime anomaly detection for {selectedCampus}
          </p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Category Segmented Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoryFilter(cat)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                categoryFilter === cat
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Severity Selector */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-slate-400 font-medium">Severity:</span>
          <select
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value)}
            className="px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            {severities.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Insights Cards List */}
      <div className="space-y-4">
        {filteredInsights.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            No active insights matching selected filters. All systems within nominal limits.
          </div>
        ) : (
          filteredInsights.map((insight) => (
            <div
              key={insight.id}
              className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 shadow-xs ${
                insight.status === 'Resolved'
                  ? 'border-slate-200/60 dark:border-slate-800 opacity-60'
                  : 'border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-md'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-800">
                    {getCategoryIcon(insight.category)}
                  </div>
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-200">
                    {insight.category} · {insight.building}
                  </span>
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${getSeverityBadge(
                      insight.severity
                    )}`}
                  >
                    {insight.severity} Priority
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{insight.timestamp}</span>
                  {insight.status !== 'New' && (
                    <span className="text-emerald-600 font-bold px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 rounded-md">
                      {insight.status}
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Detected Issue */}
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                {insight.title}
              </h3>
              <p className="mt-1 text-xs text-slate-700 dark:text-slate-300 font-medium">
                "{insight.detectedIssue}"
              </p>

              {/* Why it Matters & Recommendation */}
              <div className="mt-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Why It Matters
                  </span>
                  <p className="mt-1 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                    {insight.whyItMatters}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Actionable Recommendation
                  </span>
                  <p className="mt-1 text-slate-700 dark:text-slate-300 text-[11px] leading-relaxed">
                    {insight.recommendation}
                  </p>
                </div>
              </div>

              {/* Footer: Potential Savings & Action Buttons */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500">Estimated Impact:</span>
                  <span className="text-xs font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
                    {insight.potentialSavings}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedInsightModal(insight)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => takeActionOnInsight(insight.id)}
                    disabled={insight.status === 'Action Scheduled'}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
                      insight.status === 'Action Scheduled'
                        ? 'bg-slate-100 dark:bg-slate-800 text-slate-400 cursor-not-allowed'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs'
                    }`}
                  >
                    {insight.status === 'Action Scheduled' ? 'Action Dispatched' : 'Take Action'}
                  </button>

                  {insight.status !== 'Resolved' && (
                    <button
                      onClick={() => resolveInsight(insight.id)}
                      className="px-2.5 py-1.5 text-xs font-semibold text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
                    >
                      Mark Resolved
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Detailed Modal if clicked View Details */}
      {selectedInsightModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                  {selectedInsightModal.category} Diagnostic
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {selectedInsightModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedInsightModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="font-bold text-slate-500 block mb-1">Detected Root Issue</span>
                <p className="text-slate-800 dark:text-slate-200">{selectedInsightModal.detectedIssue}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="font-bold text-slate-500 block mb-1">Why It Matters</span>
                <p className="text-slate-800 dark:text-slate-200">{selectedInsightModal.whyItMatters}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="font-bold text-slate-500 block mb-1">Recommended Facility Procedure</span>
                <p className="text-slate-800 dark:text-slate-200">{selectedInsightModal.recommendation}</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-500/20">
                <span className="font-bold text-emerald-800 dark:text-emerald-400 block mb-1">
                  Projected Environmental & Fiscal Benefit
                </span>
                <p className="text-emerald-700 dark:text-emerald-300 font-semibold">
                  {selectedInsightModal.potentialSavings} ({selectedInsightModal.estimatedImpact})
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedInsightModal(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  takeActionOnInsight(selectedInsightModal.id);
                  setSelectedInsightModal(null);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Dispatch Work Order
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
