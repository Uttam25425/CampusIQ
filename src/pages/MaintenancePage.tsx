import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Calendar,
  User,
  ShieldCheck,
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { MaintenanceStatus } from '../types';

export const MaintenancePage: React.FC = () => {
  const { maintenance, setIsScheduleMaintenanceOpen, updateMaintenanceStatus, selectedCampus } =
    useCampus();
  const [filterStatus, setFilterStatus] = useState<string>('All');

  const filteredTasks = maintenance.filter((m) => {
    if (filterStatus === 'All') return true;
    return m.status === filterStatus;
  });

  const getStatusBadge = (status: MaintenanceStatus) => {
    switch (status) {
      case 'Scheduled':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border-sky-500/30';
      case 'In Progress':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-500/30';
      case 'Completed':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-500/30';
      case 'Overdue':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-500/30';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Critical':
        return 'text-rose-600 font-bold';
      case 'High':
        return 'text-amber-600 font-bold';
      case 'Medium':
        return 'text-sky-600 font-semibold';
      default:
        return 'text-slate-500';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Schedule Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Preventive & Predictive Maintenance
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tracking facility work orders, technician scheduling, and predictive AI wear flags for {selectedCampus}
          </p>
        </div>

        <button
          onClick={() => setIsScheduleMaintenanceOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs self-start sm:self-center transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Schedule Maintenance</span>
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">Scheduled</span>
          <div className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            12
          </div>
          <span className="text-[11px] text-slate-400">Upcoming this fortnight</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider block">In Progress</span>
          <div className="mt-1 text-2xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
            4
          </div>
          <span className="text-[11px] text-slate-400">Technicians dispatched</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Completed</span>
          <div className="mt-1 text-2xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
            38
          </div>
          <span className="text-[11px] text-slate-400">This quarter to date</span>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-rose-600 uppercase tracking-wider block">Overdue</span>
          <div className="mt-1 text-2xl font-extrabold text-rose-600 dark:text-rose-400 tabular-nums">
            2
          </div>
          <span className="text-[11px] text-rose-500 font-semibold">Immediate attention</span>
        </div>
      </div>

      {/* AI Predictive Maintenance Alert Highlight */}
      <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/30 flex items-start gap-3.5 shadow-xs">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            AI Predictive Failure Warning
          </div>
          <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold mt-1">
            "Centrifugal Fume Exhaust Fan #2 (Lab Complex) vibration amplitude increased 34% over 7 days."
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
            Predictive acoustic model estimates bearing failure risk in ~96 operating hours. Servicing now will prevent a ₹45,000 emergency motor replacement.
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-fit">
        {['All', 'Scheduled', 'In Progress', 'Completed', 'Overdue'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors ${
              filterStatus === s
                ? 'bg-white dark:bg-slate-700 text-emerald-700 dark:text-emerald-300 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            {s}
          </button>
        ))}
      </div>

      {/* Maintenance Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Asset</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Issue Diagnosis</th>
                <th className="py-2.5 px-3">Priority</th>
                <th className="py-2.5 px-3">Assigned Lead</th>
                <th className="py-2.5 px-3">Scheduled Date</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3 text-right">Update</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredTasks.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="py-3 px-3 font-semibold text-slate-900 dark:text-white">
                    <div className="flex items-center gap-1.5">
                      {task.predictiveFlag && (
                        <span title="Flagged by AI Predictive Analytics">
                          <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
                        </span>
                      )}
                      <span>{task.asset}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-slate-500">{task.location}</td>
                  <td className="py-3 px-3 text-slate-700 dark:text-slate-300 max-w-xs">{task.issue}</td>
                  <td className={`py-3 px-3 ${getPriorityBadge(task.priority)}`}>{task.priority}</td>
                  <td className="py-3 px-3 text-slate-600 dark:text-slate-300">{task.assignedTo}</td>
                  <td className="py-3 px-3 font-mono text-slate-500">{task.scheduledDate}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(
                        task.status
                      )}`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right">
                    <select
                      value={task.status}
                      onChange={(e) => updateMaintenanceStatus(task.id, e.target.value as MaintenanceStatus)}
                      className="text-[11px] px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Completed">Completed</option>
                      <option value="Overdue">Overdue</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
