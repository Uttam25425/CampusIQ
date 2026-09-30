import React, { useState } from 'react';
import {
  Recycle,
  Sparkles,
  TrendingDown,
  Plus,
  Target,
  ArrowRight,
  Package,
  Layers,
  Leaf,
  CheckCircle2,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { useCampus } from '../context/CampusContext';

export const WastePage: React.FC = () => {
  const { wasteData, logWasteAudit, showToast, selectedCampus } = useCampus();
  const [logModalOpen, setLogModalOpen] = useState(false);
  const [auditWeight, setAuditWeight] = useState(15);
  const [auditCategory, setAuditCategory] = useState<'Recycled' | 'Organic' | 'Plastic' | 'Paper' | 'E-Waste'>('Paper');

  const handleLogSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    logWasteAudit(Number(auditWeight), auditCategory);
    setLogModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Title & Action */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Waste Management & Circularity Index
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Solid waste diversion, segregation audits, and composting metrics for {selectedCampus}
          </p>
        </div>

        <button
          onClick={() => setLogModalOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs self-start sm:self-center transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Log Waste Audit</span>
        </button>
      </div>

      {/* Top 6 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Total Waste</span>
          <div className="mt-1 text-xl font-extrabold text-slate-900 dark:text-white tabular-nums">
            {wasteData.totalWaste} <span className="text-xs font-normal text-slate-400">kg</span>
          </div>
          <div className="mt-1 text-[11px] text-emerald-600 font-semibold">↓ 12.6% vs last mo</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider block">Recycled</span>
          <div className="mt-1 text-xl font-extrabold text-emerald-700 dark:text-emerald-400 tabular-nums">
            {wasteData.recycled} <span className="text-xs font-normal text-slate-400">kg</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">56.2% diverted</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-teal-600 uppercase tracking-wider block">Organic Compost</span>
          <div className="mt-1 text-xl font-extrabold text-teal-700 dark:text-teal-400 tabular-nums">
            {wasteData.organic} <span className="text-xs font-normal text-slate-400">kg</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">Canteen digester</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider block">Plastic</span>
          <div className="mt-1 text-xl font-extrabold text-sky-700 dark:text-sky-400 tabular-nums">
            {wasteData.plastic} <span className="text-xs font-normal text-slate-400">kg</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">Bottle crushers</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-amber-500 uppercase tracking-wider block">Clean Paper</span>
          <div className="mt-1 text-xl font-extrabold text-amber-600 dark:text-amber-400 tabular-nums">
            {wasteData.paper} <span className="text-xs font-normal text-slate-400">kg</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">Offices / Library</div>
        </div>

        <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs">
          <span className="text-[11px] font-bold text-indigo-500 uppercase tracking-wider block">E-Waste</span>
          <div className="mt-1 text-xl font-extrabold text-indigo-600 dark:text-indigo-400 tabular-nums">
            {wasteData.eWaste} <span className="text-xs font-normal text-slate-400">kg</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400 font-medium">Safe recycling bin</div>
        </div>
      </div>

      {/* Recycling Progress & Goal Card */}
      <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold text-slate-900 dark:text-white block">
              Campus Recycling Progress vs Goal
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Institutional Zero-Waste to Landfill Objective
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-bold">
            <span className="text-emerald-700 dark:text-emerald-400">
              Current: <span className="tabular-nums font-extrabold text-base">56.2%</span>
            </span>
            <span className="text-slate-400">|</span>
            <span className="text-slate-600 dark:text-slate-300">
              Target: <span className="tabular-nums font-extrabold text-base">70.0%</span>
            </span>
          </div>
        </div>

        <div className="w-full h-3 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden relative">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-700 ease-out"
            style={{ width: `${wasteData.recyclingRate}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono">
          <span>0%</span>
          <span>50%</span>
          <span className="text-emerald-600 font-bold">Current (56.2%)</span>
          <span>Goal (70%)</span>
          <span>100%</span>
        </div>
      </div>

      {/* AI Recommendation Highlight Card */}
      <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/30 flex items-start gap-3.5 shadow-xs">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            CampusIQ AI Circularity Recommendation
          </div>
          <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold mt-1 leading-relaxed">
            "Increasing paper recycling by 10% could reduce landfill waste by approximately 120 kg per month."
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
            Setting up dedicated paper segregation stations in the Administration Block and Library Commons will divert 1.4 tons of cellulose annually from municipal landfills.
          </p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Waste Daily Trend Chart */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
                Daily Waste Stream & Diversion
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Total weight vs Recycled volume (kg)
              </p>
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
                Recycled (kg)
              </span>
              <span className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300">
                <span className="w-2.5 h-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                Landfill
              </span>
            </div>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={wasteData.trend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.6} />
                <XAxis dataKey="day" tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#94A3B8' }} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F172A',
                    borderRadius: '8px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '11px',
                  }}
                />
                <Bar dataKey="recycled" stackId="a" fill="#059669" radius={[0, 0, 0, 0]} name="Recycled (kg)" />
                <Bar dataKey="landfill" stackId="a" fill="#CBD5E1" radius={[6, 6, 0, 0]} name="Landfill (kg)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Waste Category Donut Chart */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
          <div>
            <h2 className="text-sm lg:text-base font-bold text-slate-900 dark:text-white">
              Waste Stream Classification
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              Material composition by weight percentage
            </p>

            <div className="h-52 w-full flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={wasteData.categories}
                    cx="50%"
                    cy="50%"
                    innerRadius={55}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="percentage"
                    nameKey="category"
                  >
                    {wasteData.categories.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(val: any) => `${val}%`}
                    contentStyle={{
                      backgroundColor: '#0F172A',
                      borderRadius: '8px',
                      border: 'none',
                      color: '#fff',
                      fontSize: '11px',
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
            {wasteData.categories.map((item) => (
              <div key={item.category} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{item.category}</span>
                </div>
                <span className="font-bold text-slate-900 dark:text-white tabular-nums">
                  {item.percentage}% ({item.weight} kg)
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Log Waste Modal */}
      {logModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-in zoom-in-95 duration-200">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Log Campus Waste Audit</h3>
            <p className="text-xs text-slate-500 mb-4">Record weight audit from facility waste bins</p>

            <form onSubmit={handleLogSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Stream Category
                </label>
                <select
                  value={auditCategory}
                  onChange={(e) => setAuditCategory(e.target.value as any)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                >
                  <option value="Recycled">Recycled (General)</option>
                  <option value="Organic">Organic / Food Compost</option>
                  <option value="Plastic">Plastic Bottles & Containers</option>
                  <option value="Paper">Paper & Cardboard</option>
                  <option value="E-Waste">Electronics / Batteries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Weight (kg)
                </label>
                <input
                  type="number"
                  min="1"
                  max="500"
                  value={auditWeight}
                  onChange={(e) => setAuditWeight(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white"
                />
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setLogModalOpen(false)}
                  className="px-4 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Record Audit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
