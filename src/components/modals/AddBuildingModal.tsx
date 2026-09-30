import React, { useState } from 'react';
import { X, Building2 } from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const AddBuildingModal: React.FC = () => {
  const { isAddBuildingOpen, setIsAddBuildingOpen, addBuilding } = useCampus();

  const [name, setName] = useState('');
  const [type, setType] = useState('Academic Block');
  const [areaSqFt, setAreaSqFt] = useState(45000);
  const [floors, setFloors] = useState(4);
  const [energyKwh, setEnergyKwh] = useState(1500);
  const [waterLiters, setWaterLiters] = useState(6500);

  if (!isAddBuildingOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    addBuilding({
      name: name.trim(),
      type,
      areaSqFt: Number(areaSqFt),
      floors: Number(floors),
      health: 'Healthy',
      energyKwh: Number(energyKwh),
      waterLiters: Number(waterLiters),
      wasteKg: 35,
      aqi: 55,
      occupancyPercent: 70,
      assetUtilizationPercent: 80,
      coordinates: { x: Math.floor(Math.random() * 400 + 200), y: Math.floor(Math.random() * 300 + 150) },
      aiSummary: 'Facility enrolled in real-time IoT energy and indoor environmental quality surveillance.',
      energyTrend: [
        { time: '08:00', current: 150, baseline: 160 },
        { time: '12:00', current: 280, baseline: 290 },
        { time: '16:00', current: 240, baseline: 250 },
      ],
      waterTrend: [
        { time: '08:00', current: 900, baseline: 950 },
        { time: '12:00', current: 1800, baseline: 1750 },
        { time: '16:00', current: 1400, baseline: 1420 },
      ],
      occupancyTrend: [
        { time: '08:00', occupancy: 40 },
        { time: '12:00', occupancy: 85 },
        { time: '16:00', occupancy: 60 },
      ],
    });

    setIsAddBuildingOpen(false);
    setName('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 flex items-center justify-center">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Add Campus Facility</h3>
              <p className="text-[11px] text-slate-500">Register new building for IoT telemetry</p>
            </div>
          </div>
          <button
            onClick={() => setIsAddBuildingOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              Building Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Science & Innovation Tower"
              className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Facility Classification
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              >
                <option value="Academic & Lecture Halls">Academic & Lecture Halls</option>
                <option value="Research & Lab Facility">Research & Lab Facility</option>
                <option value="Student Housing / Hostel">Student Housing / Hostel</option>
                <option value="Administration / Offices">Administration / Offices</option>
                <option value="Athletics & Sports Pavilion">Athletics & Sports Pavilion</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Floors
              </label>
              <input
                type="number"
                min="1"
                max="20"
                value={floors}
                onChange={(e) => setFloors(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Gross Floor Area (Sq. Ft.)
              </label>
              <input
                type="number"
                value={areaSqFt}
                onChange={(e) => setAreaSqFt(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Base Energy Rating (kWh/wk)
              </label>
              <input
                type="number"
                value={energyKwh}
                onChange={(e) => setEnergyKwh(Number(e.target.value))}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setIsAddBuildingOpen(false)}
              className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs"
            >
              Register Building
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
