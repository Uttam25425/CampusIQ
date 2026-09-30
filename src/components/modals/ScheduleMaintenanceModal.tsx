import React, { useState } from 'react';
import { X, Wrench } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { MaintenancePriority } from '../../types';

export const ScheduleMaintenanceModal: React.FC = () => {
  const { isScheduleMaintenanceOpen, setIsScheduleMaintenanceOpen, addMaintenance, assets } =
    useCampus();

  const [assetName, setAssetName] = useState(assets[0]?.name || 'Engineering Block Chiller Unit 1');
  const [location, setLocation] = useState('Engineering Block');
  const [issue, setIssue] = useState('');
  const [priority, setPriority] = useState<MaintenancePriority>('Medium');
  const [assignedTo, setAssignedTo] = useState('Suresh Patil (Electro-Mech Tech)');
  const [scheduledDate, setScheduledDate] = useState(
    new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );

  if (!isScheduleMaintenanceOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!issue.trim()) return;

    addMaintenance({
      asset: assetName,
      location,
      issue: issue.trim(),
      priority,
      assignedTo,
      scheduledDate,
      status: 'Scheduled',
      predictiveFlag: priority === 'High' || priority === 'Critical',
    });

    setIsScheduleMaintenanceOpen(false);
    setIssue('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-400 flex items-center justify-center">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Schedule Maintenance Task</h3>
              <p className="text-[11px] text-slate-500">Dispatch preventive or predictive servicing order</p>
            </div>
          </div>
          <button
            onClick={() => setIsScheduleMaintenanceOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Target Asset / Equipment
            </label>
            <select
              value={assetName}
              onChange={(e) => {
                setAssetName(e.target.value);
                const match = assets.find((a) => a.name === e.target.value);
                if (match) setLocation(match.location);
              }}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {assets.map((a) => (
                <option key={a.id} value={a.name}>
                  {a.name} ({a.location})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Service Description / Diagnosis
            </label>
            <textarea
              required
              rows={3}
              value={issue}
              onChange={(e) => setIssue(e.target.value)}
              placeholder="e.g. Inspect vibration sensor alerts, clean condenser coils and check refrigerant pressure..."
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500 resize-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as MaintenancePriority)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Low">Low - Routine</option>
                <option value="Medium">Medium - Regular Servicing</option>
                <option value="High">High - Impending Failure</option>
                <option value="Critical">Critical - Safety/Operational Emergency</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Assigned Lead
              </label>
              <input
                type="text"
                value={assignedTo}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Scheduled Date
            </label>
            <input
              type="date"
              value={scheduledDate}
              onChange={(e) => setScheduledDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsScheduleMaintenanceOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
            >
              Dispatch Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
