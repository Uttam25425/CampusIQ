import React, { useState } from 'react';
import {
  Layers,
  Plus,
  Filter,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Wrench,
  AlertCircle,
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';
import { AssetCategory, AssetStatus } from '../types';

export const AssetsPage: React.FC = () => {
  const { assets, setIsAddAssetOpen, updateAssetStatus, selectedCampus } = useCampus();

  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const categories: string[] = [
    'All',
    'Classrooms',
    'Laboratories',
    'Computers',
    'Projectors',
    'AC Units',
    'Solar Panels',
    'Water Pumps',
  ];

  const statuses: string[] = ['All', 'Active', 'Idle', 'Maintenance', 'Offline'];

  const filteredAssets = assets.filter((asset) => {
    const matchesSearch =
      asset.name.toLowerCase().includes(search.toLowerCase()) ||
      asset.location.toLowerCase().includes(search.toLowerCase());
    const matchesCat = selectedCategory === 'All' || asset.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || asset.status === selectedStatus;
    return matchesSearch && matchesCat && matchesStatus;
  });

  const getStatusBadge = (status: AssetStatus) => {
    switch (status) {
      case 'Active':
        return 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 border-emerald-500/30';
      case 'Idle':
        return 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300 border-amber-500/30';
      case 'Maintenance':
        return 'bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300 border-sky-500/30';
      case 'Offline':
        return 'bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300 border-rose-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Campus Asset & Space Utilization
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Tracking lifecycle, power consumption, and scheduling efficiency across {selectedCampus}
          </p>
        </div>

        <button
          onClick={() => setIsAddAssetOpen(true)}
          className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs self-start sm:self-center transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Asset</span>
        </button>
      </div>

      {/* Highlighted AI Asset Recommendation */}
      <div className="p-5 rounded-2xl border border-emerald-500/30 bg-emerald-50/60 dark:bg-emerald-950/30 flex items-start gap-3.5 shadow-xs">
        <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center flex-shrink-0 mt-0.5">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="flex-1">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-400">
            AI Space Optimization Alert
          </div>
          <p className="text-xs text-slate-800 dark:text-slate-200 font-semibold mt-1">
            "Computer Lab 2 is underutilized (34%). Consider reallocating the space during low-demand periods."
          </p>
          <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-1">
            Consolidating afternoon open computing slots into Computer Lab 1 will avoid 180 kWh/month of phantom power draw and open 45 hours of weekly room capacity for STEM certifications.
          </p>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by asset name or location..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                Category: {c}
              </option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 focus:outline-none"
          >
            {statuses.map((s) => (
              <option key={s} value={s}>
                Status: {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Asset Table */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 rounded-2xl p-5 shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 text-[11px] uppercase tracking-wider">
                <th className="py-2.5 px-3">Asset</th>
                <th className="py-2.5 px-3">Category</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Status</th>
                <th className="py-2.5 px-3">Utilization</th>
                <th className="py-2.5 px-3">Energy Rating</th>
                <th className="py-2.5 px-3">Last Maint.</th>
                <th className="py-2.5 px-3">Next Maint.</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredAssets.length === 0 ? (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-slate-400">
                    No matching assets found.
                  </td>
                </tr>
              ) : (
                filteredAssets.map((asset) => (
                  <tr key={asset.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="py-3 px-3">
                      <div className="font-bold text-slate-900 dark:text-white">{asset.name}</div>
                      {asset.aiNote && (
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 line-clamp-1 mt-0.5">
                          {asset.aiNote}
                        </div>
                      )}
                    </td>
                    <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-medium">
                      {asset.category}
                    </td>
                    <td className="py-3 px-3 text-slate-500 font-medium">{asset.location}</td>
                    <td className="py-3 px-3">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(
                          asset.status
                        )}`}
                      >
                        {asset.status}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              asset.utilization < 40
                                ? 'bg-amber-500'
                                : asset.utilization >= 75
                                ? 'bg-emerald-500'
                                : 'bg-sky-500'
                            }`}
                            style={{ width: `${asset.utilization}%` }}
                          />
                        </div>
                        <span className="font-mono tabular-nums font-bold">{asset.utilization}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-600 dark:text-slate-300">
                      {asset.energyRating}
                    </td>
                    <td className="py-3 px-3 font-mono text-slate-400">{asset.lastMaintenance}</td>
                    <td className="py-3 px-3 font-mono text-slate-400">{asset.nextMaintenance}</td>
                    <td className="py-3 px-3 text-right">
                      <select
                        value={asset.status}
                        onChange={(e) => updateAssetStatus(asset.id, e.target.value as AssetStatus)}
                        className="text-[11px] px-2 py-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200"
                      >
                        <option value="Active">Active</option>
                        <option value="Idle">Idle</option>
                        <option value="Maintenance">Maintenance</option>
                        <option value="Offline">Offline</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
