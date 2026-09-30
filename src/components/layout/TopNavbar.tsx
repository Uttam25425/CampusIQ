import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Menu,
  Search,
  Bell,
  Sparkles,
  Sun,
  Moon,
  ChevronDown,
  Building,
  CheckCircle2,
  AlertTriangle,
  User,
  Settings,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import { useCampus } from '../../context/CampusContext';
import { CampusName } from '../../types';

interface TopNavbarProps {
  onOpenMobile: () => void;
}

export const TopNavbar: React.FC<TopNavbarProps> = ({ onOpenMobile }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    selectedCampus,
    setSelectedCampus,
    darkMode,
    toggleDarkMode,
    liveSimulation,
    alerts,
    toggleEcoAI,
    setIsSearchOpen,
    resolveAlert,
    setIsHelpSupportOpen,
  } = useCampus();

  const [campusDropdownOpen, setCampusDropdownOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const campusRef = useRef<HTMLDivElement>(null);
  const notifRef = useRef<HTMLDivElement>(null);
  const userRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (campusRef.current && !campusRef.current.contains(e.target as Node)) {
        setCampusDropdownOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotificationsOpen(false);
      }
      if (userRef.current && !userRef.current.contains(e.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getPageInfo = () => {
    const path = location.pathname;
    if (path === '/' || path === '/dashboard') {
      return {
        title: 'Dashboard',
        subtitle: 'Monitor your campus. Understand your impact. Make smarter decisions.',
      };
    }
    if (path === '/campus') {
      return {
        title: 'Campus Overview',
        subtitle: 'Interactive spatial telemetry and facility zoning.',
      };
    }
    if (path === '/energy') {
      return {
        title: 'Energy Analytics',
        subtitle: 'Grid load, solar PV generation, and building power profiles.',
      };
    }
    if (path === '/water') {
      return {
        title: 'Water Management',
        subtitle: 'Hydraulic flow rates, cistern reserves, and active leak detection.',
      };
    }
    if (path === '/waste') {
      return {
        title: 'Waste & Circularity',
        subtitle: 'Stream segregation, composting efficiency, and diversion metrics.',
      };
    }
    if (path === '/air-quality') {
      return {
        title: 'Air Quality Monitoring',
        subtitle: 'Atmospheric particulate indices and indoor air quality standards.',
      };
    }
    if (path === '/assets') {
      return {
        title: 'Asset Utilization',
        subtitle: 'Equipment lifecycle, active schedules, and predictive maintenance.',
      };
    }
    if (path === '/ai-insights') {
      return {
        title: 'AI Insights',
        subtitle: 'CampusIQ AI recommendations and autonomous optimization actions.',
      };
    }
    if (path === '/alerts') {
      return {
        title: 'Alert Center',
        subtitle: 'Incident tracking, critical anomalies, and dispatch resolution.',
      };
    }
    if (path === '/maintenance') {
      return {
        title: 'Maintenance Management',
        subtitle: 'Preventive service orders and predictive equipment wear flags.',
      };
    }
    if (path === '/goals') {
      return {
        title: 'Sustainability Goals',
        subtitle: 'Institutional climate targets, benchmarks, and progress milestones.',
      };
    }
    if (path === '/carbon') {
      return {
        title: 'Carbon Footprint',
        subtitle: 'Scope 1, 2, and 3 greenhouse gas auditing and net-zero path.',
      };
    }
    if (path === '/buildings') {
      return {
        title: 'Building Management',
        subtitle: 'Campus facility registry, occupancy rates, and multi-sensor health.',
      };
    }
    if (path.startsWith('/buildings/')) {
      return {
        title: 'Building Detail Inspection',
        subtitle: 'Deep-dive environmental telemetry and hourly load curves.',
      };
    }
    if (path === '/reports') {
      return {
        title: 'Sustainability Reports',
        subtitle: 'Audit-ready dossiers, verifiable CSV exports, and print sheets.',
      };
    }
    if (path === '/settings') {
      return {
        title: 'Settings',
        subtitle: 'Profile, alert triggers, and CampusIQ AI automation rules.',
      };
    }
    return {
      title: 'CampusIQ',
      subtitle: 'AI-Powered Sustainable Campus Intelligence by ECONEX',
    };
  };

  const pageInfo = getPageInfo();
  const campuses: CampusName[] = ['Main Campus', 'North Campus', 'Hostel Campus', 'Research Campus'];
  const activeAlerts = alerts.filter((a) => a.status === 'Active');

  return (
    <header className="sticky top-0 z-30 h-18 bg-white/80 dark:bg-[#090d16]/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 px-4 sm:px-6 lg:px-8 flex items-center justify-between transition-colors shadow-[0_1px_2px_0_rgba(0,0,0,0.02)]">
      {/* Left: Mobile Toggle + Page Title & Short Description */}
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onOpenMobile}
          className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          <h1 className="text-base sm:text-lg font-bold font-display text-slate-900 dark:text-white tracking-tight truncate">
            {pageInfo.title}
          </h1>
          <p className="hidden sm:block text-xs text-slate-500 dark:text-slate-400 truncate -mt-0.5 font-medium">
            {pageInfo.subtitle}
          </p>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        {/* Campus Selector */}
        <div className="relative" ref={campusRef}>
          <button
            onClick={() => setCampusDropdownOpen((prev) => !prev)}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200/80 dark:hover:bg-slate-700 transition-colors"
          >
            <Building className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" />
            <span>{selectedCampus}</span>
            <ChevronDown className="w-3 h-3 text-slate-400" />
          </button>

          {campusDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-1.5 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                Switch Campus
              </div>
              {campuses.map((camp) => (
                <button
                  key={camp}
                  onClick={() => {
                    setSelectedCampus(camp);
                    setCampusDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs font-semibold flex items-center justify-between transition-colors ${
                    selectedCampus === camp
                      ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300'
                      : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <span>{camp}</span>
                  {selectedCampus === camp && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Global Search Input Affordance */}
        <button
          onClick={() => setIsSearchOpen(true)}
          className="flex items-center gap-2 px-3 py-1.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/80 dark:bg-slate-800/80 text-slate-500 dark:text-slate-400 hover:border-emerald-500/50 hover:bg-white dark:hover:bg-slate-800 transition-all shadow-2xs"
          title="Search buildings, assets, reports... (⌘K)"
        >
          <Search className="w-3.5 h-3.5 text-slate-400" />
          <span className="hidden lg:inline text-slate-500">Search buildings, assets, reports...</span>
          <span className="lg:hidden text-slate-500">Search...</span>
          <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-slate-400 bg-white dark:bg-slate-700 rounded border border-slate-200 dark:border-slate-600">
            ⌘K
          </kbd>
        </button>

        {/* Notification Bell */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setNotificationsOpen((prev) => !prev)}
            className="relative p-2 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {activeAlerts.length > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 ring-2 ring-white dark:ring-slate-900" />
            )}
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700 py-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 pb-2.5 border-b border-slate-100 dark:border-slate-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Campus Alerts
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 font-bold tabular-nums">
                    {activeAlerts.length} active
                  </span>
                </div>
                <button
                  onClick={() => {
                    navigate('/alerts');
                    setNotificationsOpen(false);
                  }}
                  className="text-[11px] text-emerald-600 hover:underline font-semibold"
                >
                  View All
                </button>
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-700/60">
                {activeAlerts.length === 0 ? (
                  <div className="p-6 text-center text-xs text-slate-400">
                    <CheckCircle2 className="w-6 h-6 text-emerald-500 mx-auto mb-2" />
                    All campus subsystems operational.
                  </div>
                ) : (
                  activeAlerts.map((alert) => (
                    <div key={alert.id} className="p-3.5 hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {alert.title}
                        </span>
                        <span className="text-[10px] text-slate-400 flex-shrink-0">{alert.timeAgo}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
                        {alert.building} · {alert.severity} Priority
                      </div>
                      <div className="mt-2 flex items-center justify-end gap-2">
                        <button
                          onClick={() => {
                            resolveAlert(alert.id);
                          }}
                          className="px-2.5 py-1 text-[11px] font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-400"
                        >
                          Resolve
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>

        {/* Dark Mode / White Mode Toggle Switch */}
        <button
          onClick={toggleDarkMode}
          className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border text-xs font-semibold transition-all duration-200 cursor-pointer ${
            darkMode
              ? 'bg-slate-800 hover:bg-slate-700 text-amber-300 border-slate-700 shadow-xs'
              : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200 shadow-2xs'
          }`}
          title={darkMode ? 'Currently Dark Mode. Click for White / Light Mode' : 'Currently White Mode. Click for Dark Mode'}
          aria-label={darkMode ? 'Switch to White Mode' : 'Switch to Dark Mode'}
        >
          {darkMode ? (
            <>
              <Sun className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-bold text-[11px] text-amber-300">Dark</span>
            </>
          ) : (
            <>
              <Moon className="w-3.5 h-3.5 text-slate-700" />
              <span className="font-bold text-[11px] text-slate-700">White</span>
            </>
          )}
        </button>

        {/* CampusIQ AI Assistant Trigger */}
        <button
          onClick={toggleEcoAI}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-600 hover:from-emerald-500 hover:to-teal-500 text-white shadow-xs shadow-emerald-500/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
        >
          <Sparkles className="w-3.5 h-3.5 text-emerald-200" />
          <span className="hidden sm:inline">CampusIQ AI</span>
        </button>

        {/* User Avatar & Dropdown */}
        <div className="relative" ref={userRef}>
          <button
            onClick={() => setUserDropdownOpen((prev) => !prev)}
            className="flex items-center gap-2 p-1 pl-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden ring-1.5 ring-emerald-500/40 shadow-xs flex-shrink-0 bg-emerald-800 text-white text-xs font-bold flex items-center justify-center">
              <img
                src="/src/assets/images/avatar_uttam_sahu_1790754747610.jpg"
                alt="Uttam Sahu"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute inset-0 flex items-center justify-center text-[11px] font-bold text-white bg-emerald-700 -z-10">
                US
              </span>
            </div>
            <span className="hidden xl:inline text-xs font-semibold text-slate-800 dark:text-slate-200">
              Uttam Sahu
            </span>
            <ChevronDown className="w-3 h-3 text-slate-400 hidden xl:inline" />
          </button>

          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full overflow-hidden ring-1 ring-emerald-500/30 flex-shrink-0 bg-emerald-800">
                  <img
                    src="/src/assets/images/avatar_uttam_sahu_1790754747610.jpg"
                    alt="Uttam Sahu"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-900 dark:text-white truncate">Uttam Sahu</p>
                  <p className="text-[11px] text-slate-500 truncate">uttamsahu25425@gmail.com</p>
                </div>
              </div>

              <div className="py-1">
                <button
                  onClick={() => {
                    navigate('/settings');
                    setUserDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-xs text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2"
                >
                  <Settings className="w-3.5 h-3.5 text-slate-400" />
                  <span>Platform Settings</span>
                </button>

                <button
                  onClick={() => {
                    setIsHelpSupportOpen(true);
                    setUserDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-xs text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center gap-2"
                >
                  <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
                  <span>Help & Operations Guide</span>
                </button>

                <button
                  onClick={() => {
                    toggleDarkMode();
                    setUserDropdownOpen(false);
                  }}
                  className="w-full px-4 py-2 text-xs text-left font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800/60 flex items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-slate-500" />}
                    <span>Theme: {darkMode ? 'Dark Mode' : 'White Mode'}</span>
                  </div>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold">
                    Switch
                  </span>
                </button>
              </div>

              <div className="px-4 py-2 border-t border-slate-100 dark:border-slate-800 text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
                CampusIQ Enterprise · ECONEX
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
