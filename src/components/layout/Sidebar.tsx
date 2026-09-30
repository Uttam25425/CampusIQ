import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Zap,
  Droplets,
  Recycle,
  Wind,
  Layers,
  Sparkles,
  AlertTriangle,
  FileText,
  Building2,
  Wrench,
  Target,
  Leaf,
  Settings,
  HelpCircle,
  X,
  Compass,
  BookOpen,
  Sun,
  Moon,
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const { alerts, insights, setIsHelpSupportOpen, darkMode, toggleDarkMode } = useCampus();
  const activeAlertsCount = alerts.filter((a) => a.status === 'Active').length;
  const newInsightsCount = insights.filter((i) => i.status === 'New').length;

  const mainNav = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Campus Map', path: '/campus', icon: Compass },
    { label: 'Energy', path: '/energy', icon: Zap },
    { label: 'Water', path: '/water', icon: Droplets },
    { label: 'Waste', path: '/waste', icon: Recycle },
    { label: 'Air Quality', path: '/air-quality', icon: Wind },
    { label: 'Assets', path: '/assets', icon: Layers },
  ];

  const intelligenceNav = [
    {
      label: 'AI Insights',
      path: '/ai-insights',
      icon: Sparkles,
      badge: newInsightsCount > 0 ? newInsightsCount : undefined,
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    },
    {
      label: 'Alerts',
      path: '/alerts',
      icon: AlertTriangle,
      badge: activeAlertsCount > 0 ? activeAlertsCount : undefined,
      badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
    },
    { label: 'Sustainability Goals', path: '/goals', icon: Target },
    { label: 'Carbon Footprint', path: '/carbon', icon: Leaf },
  ];

  const managementNav = [
    { label: 'Buildings', path: '/buildings', icon: Building2 },
    { label: 'Maintenance', path: '/maintenance', icon: Wrench },
    { label: 'Reports', path: '/reports', icon: FileText },
    {
      label: 'Job Dossier (PDF)',
      path: '/dossier',
      icon: BookOpen,
      badge: 'PDF',
      badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
    },
  ];

  const handleNavClick = () => {
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-white/95 dark:bg-[#0c1220]/95 backdrop-blur-md border-r border-slate-200/80 dark:border-slate-800/80 flex flex-col transition-transform duration-200 ease-in-out ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Brand Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-teal-600 to-emerald-700 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 ring-1 ring-emerald-400/30">
              <Leaf className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold font-display text-lg tracking-tight text-slate-900 dark:text-white">
                  CampusIQ
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 block -mt-0.5 tracking-wide">
                Smart Campus AI
              </span>
            </div>
          </div>

          {/* Close mobile button */}
          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Navigation */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {/* MAIN */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Main
            </div>
            <nav className="space-y-1">
              {mainNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-150 ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-700 dark:bg-emerald-500 rounded-r-full" />
                      )}
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-slate-400 group-hover:text-emerald-600'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* INTELLIGENCE */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Intelligence
            </div>
            <nav className="space-y-1">
              {intelligenceNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-150 ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-700 dark:bg-emerald-500 rounded-r-full" />
                      )}
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-slate-400 group-hover:text-emerald-600'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span
                          className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full tabular-nums ${item.badgeColor}`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>

          {/* MANAGEMENT */}
          <div>
            <div className="px-3 mb-2 text-[11px] font-bold tracking-wider text-slate-400 uppercase">
              Management
            </div>
            <nav className="space-y-1">
              {managementNav.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={handleNavClick}
                  className={({ isActive }) =>
                    `group relative flex items-center justify-between px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-150 ${
                      isActive
                        ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 shadow-2xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-emerald-700 dark:bg-emerald-500 rounded-r-full" />
                      )}
                      <div className="flex items-center gap-3">
                        <item.icon
                          className={`w-4 h-4 transition-colors ${
                            isActive
                              ? 'text-emerald-700 dark:text-emerald-400'
                              : 'text-slate-400 group-hover:text-emerald-600'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                    </>
                  )}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>

        {/* Footer Area with Settings, Help & Team Tag */}
        <div className="p-3 border-t border-slate-100 dark:border-slate-800 space-y-1">
          <NavLink
            to="/settings"
            onClick={handleNavClick}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl transition-colors ${
                isActive
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`
            }
          >
            <Settings className="w-4 h-4 text-slate-400" />
            <span>Settings</span>
          </NavLink>

          <button
            onClick={() => {
              setIsHelpSupportOpen(true);
              if (onCloseMobile) onCloseMobile();
            }}
            className="w-full flex items-center gap-3 px-3 py-2 text-xs font-semibold rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition-colors text-left"
          >
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Help</span>
          </button>

          {/* Theme Mode Control */}
          <div className="pt-2 px-1 flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Theme</span>
            <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700/80">
              <button
                type="button"
                onClick={() => darkMode && toggleDarkMode()}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  !darkMode
                    ? 'bg-white text-slate-900 shadow-2xs border border-slate-200/80'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
                title="Switch to White / Light Mode"
              >
                <Sun className="w-3 h-3 text-amber-500" />
                <span>White</span>
              </button>
              <button
                type="button"
                onClick={() => !darkMode && toggleDarkMode()}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all cursor-pointer ${
                  darkMode
                    ? 'bg-slate-900 text-amber-300 shadow-2xs border border-slate-700'
                    : 'text-slate-500 hover:text-slate-700'
                }`}
                title="Switch to Dark Mode"
              >
                <Moon className="w-3 h-3 text-indigo-400" />
                <span>Dark</span>
              </button>
            </div>
          </div>

          {/* User profile & by ECONEX lockup */}
          <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800/80 px-2 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1.5 ring-emerald-500/30 flex-shrink-0 bg-emerald-800">
                <img
                  src="/src/assets/images/avatar_uttam_sahu_1790754747610.jpg"
                  alt="Uttam Sahu"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-[10px] font-bold text-white bg-emerald-700 -z-10">
                  US
                </span>
              </div>
              <div className="min-w-0">
                <p className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">Uttam Sahu</p>
                <p className="text-[10px] text-slate-400 truncate">Facility Lead</p>
              </div>
            </div>

            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 dark:bg-emerald-500/15 border border-emerald-500/20 px-2 py-0.5 rounded-full shrink-0">
              ECONEX
            </span>
          </div>
        </div>
      </aside>
    </>
  );
};
