import React, { useState } from 'react';
import {
  AlertTriangle,
  ShieldAlert,
  CheckCircle2,
  XCircle,
  Filter,
  Clock,
  Building,
  Zap,
  Droplets,
  Wind,
  Layers,
  ArrowRight,
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { Alert, AlertSeverity, AlertType } from '../types';

export const AlertsPage: React.FC = () => {
  const { alerts, resolveAlert, dismissAlert, selectedCampus } = useCampus();
  const [filterSeverity, setFilterSeverity] = useState<string>('All');
  const [selectedAlertModal, setSelectedAlertModal] = useState<Alert | null>(null);

  const filters = ['All', 'Critical', 'High', 'Warning', 'Resolved'];

  const filteredAlerts = alerts.filter((alert) => {
    if (filterSeverity === 'All') return true;
    if (filterSeverity === 'Resolved') return alert.status === 'Resolved';
    return alert.severity === filterSeverity && alert.status !== 'Dismissed';
  });

  const getSeverityBadge = (severity: AlertSeverity) => {
    switch (severity) {
      case 'Critical':
        return 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 border-rose-500/30';
      case 'High':
        return 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 border-amber-500/30';
      case 'Warning':
        return 'bg-orange-100 text-orange-800 dark:bg-orange-950 dark:text-orange-300 border-orange-500/30';
      case 'Medium':
        return 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300 border-sky-500/30';
    }
  };

  const getTypeIcon = (type: AlertType) => {
    switch (type) {
      case 'Water':
        return <Droplets className="w-4 h-4 text-sky-600" />;
      case 'Energy':
        return <Zap className="w-4 h-4 text-emerald-600" />;
      case 'Air Quality':
        return <Wind className="w-4 h-4 text-amber-500" />;
      default:
        return <Layers className="w-4 h-4 text-indigo-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Campus Alert & Anomaly Center
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Realtime automated threshold violations, hardware fault triggers, and sensor alerts for {selectedCampus}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4">
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilterSeverity(f)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors whitespace-nowrap ${
                filterSeverity === f
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        <span className="text-xs text-slate-400 font-mono">
          Showing {filteredAlerts.length} alerts
        </span>
      </div>

      {/* Alerts Table & Cards */}
      <div className="space-y-3.5">
        {filteredAlerts.length === 0 ? (
          <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-slate-400 text-xs">
            <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            No alerts present in this category. All systems operating normally.
          </div>
        ) : (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`p-5 rounded-2xl bg-white dark:bg-slate-900 border transition-all duration-200 shadow-xs ${
                alert.status === 'Resolved'
                  ? 'border-slate-200/60 dark:border-slate-800 opacity-60'
                  : alert.severity === 'Critical'
                  ? 'border-rose-500/40 hover:border-rose-500 hover:shadow-md'
                  : 'border-slate-200/90 dark:border-slate-800 hover:border-emerald-500/50 hover:shadow-md'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md border ${getSeverityBadge(
                      alert.severity
                    )}`}
                  >
                    {alert.severity}
                  </span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                    {getTypeIcon(alert.type)}
                    <span>{alert.type} Alert</span>
                  </div>
                  <span className="text-slate-400">·</span>
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                    {alert.building}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400">
                  <Clock className="w-3 h-3" />
                  <span>{alert.timeAgo}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-300">
                    [{alert.status}]
                  </span>
                </div>
              </div>

              <h3 className="text-sm font-bold text-slate-900 dark:text-white">{alert.title}</h3>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {alert.description}
              </p>

              {alert.estimatedImpact && (
                <div className="mt-2 text-[11px] text-rose-600 dark:text-rose-400 font-semibold">
                  Estimated Risk: {alert.estimatedImpact}
                </div>
              )}

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <div className="text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">Recommended: </span>
                  {alert.recommendedAction}
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => setSelectedAlertModal(alert)}
                    className="px-3 py-1.5 text-xs font-semibold rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    View
                  </button>

                  {alert.status !== 'Resolved' && (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
                    >
                      Resolve
                    </button>
                  )}

                  {alert.status !== 'Dismissed' && (
                    <button
                      onClick={() => dismissAlert(alert.id)}
                      className="px-2.5 py-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                    >
                      Dismiss
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Alert Details Modal */}
      {selectedAlertModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in zoom-in-95 duration-200 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                  {selectedAlertModal.severity} Alert Inspection
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                  {selectedAlertModal.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedAlertModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="font-bold text-slate-500 block mb-1">Building Location</span>
                <p className="text-slate-800 dark:text-slate-200 font-semibold">{selectedAlertModal.building}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="font-bold text-slate-500 block mb-1">Telemetric Audit Log</span>
                <p className="text-slate-800 dark:text-slate-200">{selectedAlertModal.description}</p>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800">
                <span className="font-bold text-slate-500 block mb-1">Action Protocol</span>
                <p className="text-slate-800 dark:text-slate-200">{selectedAlertModal.recommendedAction}</p>
              </div>

              {selectedAlertModal.estimatedImpact && (
                <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-500/20">
                  <span className="font-bold text-rose-800 dark:text-rose-400 block mb-1">Estimated Risk Impact</span>
                  <p className="text-rose-700 dark:text-rose-300 font-semibold">{selectedAlertModal.estimatedImpact}</p>
                </div>
              )}
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <button
                onClick={() => setSelectedAlertModal(null)}
                className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100"
              >
                Close
              </button>
              <button
                onClick={() => {
                  resolveAlert(selectedAlertModal.id);
                  setSelectedAlertModal(null);
                }}
                className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Mark Alert Resolved
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
