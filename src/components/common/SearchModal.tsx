import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  X,
  Building,
  Layers,
  AlertTriangle,
  Sparkles,
  FileText,
  ArrowRight,
  ChevronRight,
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

export const SearchModal: React.FC = () => {
  const navigate = useNavigate();
  const { isSearchOpen, setIsSearchOpen, buildings, assets, alerts, insights } = useCampus();
  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isSearchOpen) {
      setQuery('');
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const q = query.toLowerCase().trim();

  const filteredBuildings = buildings.filter(
    (b) => b.name.toLowerCase().includes(q) || b.type.toLowerCase().includes(q)
  );

  const filteredAssets = assets.filter(
    (a) =>
      a.name.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.location.toLowerCase().includes(q)
  );

  const filteredAlerts = alerts.filter(
    (al) =>
      al.title.toLowerCase().includes(q) ||
      al.building.toLowerCase().includes(q) ||
      al.type.toLowerCase().includes(q)
  );

  const filteredInsights = insights.filter(
    (ins) =>
      ins.title.toLowerCase().includes(q) ||
      ins.building.toLowerCase().includes(q) ||
      ins.category.toLowerCase().includes(q)
  );

  const reportsList = [
    { name: 'Monthly Sustainability Report', path: '/reports', type: 'Consolidated' },
    { name: 'Energy Performance Audit', path: '/reports', type: 'Energy' },
    { name: 'Water Usage & Cistern Report', path: '/reports', type: 'Water' },
    { name: 'Waste Stream Diversion Audit', path: '/reports', type: 'Waste' },
    { name: 'Carbon Emission Scorecard', path: '/reports', type: 'Carbon' },
  ].filter((r) => r.name.toLowerCase().includes(q) || r.type.toLowerCase().includes(q));

  const handleSelect = (path: string) => {
    setIsSearchOpen(false);
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:pt-20 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[82vh]">
        {/* Search Input bar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center gap-3">
          <Search className="w-5 h-5 text-emerald-700 dark:text-emerald-400 flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search buildings, assets, reports..."
            className="flex-1 text-sm bg-transparent text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
          />
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Quick Suggestions when empty */}
          {!q && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2.5">
                Quick Shortcuts
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {[
                  { label: 'Campus Map', path: '/campus', icon: Building },
                  { label: 'Energy Analytics', path: '/energy', icon: Sparkles },
                  { label: 'Water Monitor', path: '/water', icon: Layers },
                  { label: 'Sustainability Reports', path: '/reports', icon: FileText },
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => handleSelect(item.path)}
                    className="p-3 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 hover:border-emerald-500/50 flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors text-left"
                  >
                    <item.icon className="w-4 h-4 text-emerald-700 dark:text-emerald-400" />
                    <span>{item.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 1: Buildings */}
          {filteredBuildings.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Buildings
              </div>
              <div className="space-y-1">
                {filteredBuildings.slice(0, 4).map((b) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelect(`/buildings/${b.id}`)}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 flex items-center justify-between transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <Building className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {b.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{b.type} · AQI {b.aqi}</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 2: Assets */}
          {filteredAssets.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Assets
              </div>
              <div className="space-y-1">
                {filteredAssets.slice(0, 4).map((a) => (
                  <button
                    key={a.id}
                    onClick={() => handleSelect('/assets')}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 flex items-center justify-between transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <Layers className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {a.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {a.location} · {a.utilization}% utilization
                        </div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                      {a.status}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 3: Alerts */}
          {filteredAlerts.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Alerts
              </div>
              <div className="space-y-1">
                {filteredAlerts.slice(0, 3).map((al) => (
                  <button
                    key={al.id}
                    onClick={() => handleSelect('/alerts')}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 flex items-center justify-between transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <AlertTriangle className="w-4 h-4 text-amber-500" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {al.title}
                        </div>
                        <div className="text-[11px] text-slate-500">{al.building} · {al.timeAgo}</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                      {al.severity}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 4: Reports */}
          {reportsList.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                Reports
              </div>
              <div className="space-y-1">
                {reportsList.map((rep) => (
                  <button
                    key={rep.name}
                    onClick={() => handleSelect(rep.path)}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 flex items-center justify-between transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-slate-400 group-hover:text-emerald-700" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {rep.name}
                        </div>
                        <div className="text-[11px] text-slate-500">{rep.type} audit report</div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-all" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Group 5: Insights */}
          {filteredInsights.length > 0 && (
            <div>
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                AI Insights
              </div>
              <div className="space-y-1">
                {filteredInsights.slice(0, 3).map((ins) => (
                  <button
                    key={ins.id}
                    onClick={() => handleSelect('/ai-insights')}
                    className="w-full p-2.5 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/70 flex items-center justify-between transition-colors text-left group"
                  >
                    <div className="flex items-center gap-3">
                      <Sparkles className="w-4 h-4 text-emerald-600" />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white">
                          {ins.title}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {ins.building} · Save {ins.potentialSavings}
                        </div>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 transition-colors" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {q &&
            filteredBuildings.length === 0 &&
            filteredAssets.length === 0 &&
            filteredAlerts.length === 0 &&
            reportsList.length === 0 &&
            filteredInsights.length === 0 && (
              <div className="py-12 text-center text-xs text-slate-400">
                No matching results found for "{query}".
              </div>
            )}
        </div>
      </div>
    </div>
  );
};
