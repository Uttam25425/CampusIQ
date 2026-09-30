import React, { useState } from 'react';
import {
  Settings,
  User,
  Building,
  Bell,
  Sparkles,
  Palette,
  Database,
  Save,
  CheckCircle2,
  Sun,
  Moon,
  Laptop,
} from 'lucide-react';
import { useCampus } from '../context/CampusContext';

export const SettingsPage: React.FC = () => {
  const {
    darkMode,
    toggleDarkMode,
    themeMode,
    setThemeMode,
    liveSimulation,
    setLiveSimulation,
    showToast,
    selectedCampus,
  } = useCampus();

  const [name, setName] = useState('Uttam Sahu');
  const [email, setEmail] = useState('uttamsahu25425@gmail.com');
  const [role, setRole] = useState('Facility Director');
  const [defaultCampus, setDefaultCampus] = useState(selectedCampus);

  // Notification toggles
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [criticalAlerts, setCriticalAlerts] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState(true);
  const [maintenanceReminders, setMaintenanceReminders] = useState(true);

  // AI settings
  const [autoSetback, setAutoSetback] = useState(true);
  const [anomalySensitivity, setAnomalySensitivity] = useState('Standard (15% threshold)');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Platform preferences saved successfully.', 'success');
  };

  return (
    <div className="space-y-6 max-w-4xl">
      {/* Title */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Platform Settings & Facility Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Configure administrative profiles, notification triggers, and automated AI rule thresholds
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        {/* Profile Card */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <User className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Admin Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Role / Title
              </label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Notifications & Alert Preferences */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Bell className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">Alert Dispatch Triggers</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Email Dispatch</span>
                <span className="text-[11px] text-slate-500">Send daily digest to administrative inbox</span>
              </div>
              <input
                type="checkbox"
                checked={emailAlerts}
                onChange={(e) => setEmailAlerts(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Critical Anomalies</span>
                <span className="text-[11px] text-slate-500">Instant alerts for water leaks & HVAC spikes</span>
              </div>
              <input
                type="checkbox"
                checked={criticalAlerts}
                onChange={(e) => setCriticalAlerts(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">AI Recommendations</span>
                <span className="text-[11px] text-slate-500">Suggest energy setback schedule updates</span>
              </div>
              <input
                type="checkbox"
                checked={aiRecommendations}
                onChange={(e) => setAiRecommendations(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
            </label>

            <label className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 cursor-pointer">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Maintenance Reminders</span>
                <span className="text-[11px] text-slate-500">Notice for filter changes and calibration</span>
              </div>
              <input
                type="checkbox"
                checked={maintenanceReminders}
                onChange={(e) => setMaintenanceReminders(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
            </label>
          </div>
        </div>

        {/* AI & Automation Engine */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100 dark:border-slate-800">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <h2 className="text-sm font-bold text-slate-900 dark:text-white">CampusIQ AI Engine Settings</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Anomaly Detection Sensitivity
              </label>
              <select
                value={anomalySensitivity}
                onChange={(e) => setAnomalySensitivity(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="High (10% threshold)">High (10% baseline deviation)</option>
                <option value="Standard (15% threshold)">Standard (15% baseline deviation)</option>
                <option value="Conservative (25% threshold)">Conservative (25% baseline deviation)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 mt-2 sm:mt-0">
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  Autonomous BAS Action
                </span>
                <span className="text-[11px] text-slate-500">Allow AI to queue low-occupancy setbacks</span>
              </div>
              <input
                type="checkbox"
                checked={autoSetback}
                onChange={(e) => setAutoSetback(e.target.checked)}
                className="w-4 h-4 text-emerald-600 rounded"
              />
            </div>
          </div>
        </div>

        {/* Appearance & Theme Preferences */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Palette className="w-4 h-4 text-emerald-600" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Theme & Display Appearance</h2>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              Active: {darkMode ? 'Dark Mode' : 'White / Light Mode'}
            </span>
          </div>

          {/* 3 Visual Theme Mode Selector Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* White / Light Mode */}
            <div
              onClick={() => setThemeMode('light')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                themeMode === 'light' || (!darkMode && themeMode !== 'dark')
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center">
                  <Sun className="w-4 h-4" />
                </div>
                {(themeMode === 'light' || (!darkMode && themeMode !== 'dark')) && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">White / Light Mode</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Crisp daylight theme with slate surfaces, high-contrast text, and natural lighting readability.
              </p>
            </div>

            {/* Dark Mode */}
            <div
              onClick={() => setThemeMode('dark')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                themeMode === 'dark' || (darkMode && themeMode !== 'light')
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-500 flex items-center justify-center">
                  <Moon className="w-4 h-4" />
                </div>
                {(themeMode === 'dark' || (darkMode && themeMode !== 'light')) && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">Dark Mode</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Obsidian dark theme with neon emerald accents, perfect for 24/7 control rooms and reduced eye strain.
              </p>
            </div>

            {/* System Auto */}
            <div
              onClick={() => setThemeMode('system')}
              className={`p-4 rounded-2xl border-2 transition-all cursor-pointer relative ${
                themeMode === 'system'
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center">
                  <Laptop className="w-4 h-4" />
                </div>
                {themeMode === 'system' && (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                )}
              </div>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">System Preference</h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                Automatically switches between White and Dark mode according to your operating system schedule.
              </p>
            </div>
          </div>

          {/* Quick Controls Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">One-Click Theme Toggle</span>
                <span className="text-[11px] text-slate-500">Instant toggle between White and Dark</span>
              </div>
              <button
                type="button"
                onClick={toggleDarkMode}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-slate-800 dark:text-slate-100 shadow-2xs hover:border-emerald-500 transition-colors"
              >
                {darkMode ? <Sun className="w-3.5 h-3.5 text-amber-400" /> : <Moon className="w-3.5 h-3.5 text-indigo-600" />}
                <span>{darkMode ? 'Switch to White' : 'Switch to Dark'}</span>
              </button>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Live Sensor Ticker</span>
                <span className="text-[11px] text-slate-500">Simulate continuous IoT sensor feeds</span>
              </div>
              <button
                type="button"
                onClick={() => setLiveSimulation(!liveSimulation)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg border transition-colors ${
                  liveSimulation
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                    : 'bg-white dark:bg-slate-700 border-slate-200 dark:border-slate-600 text-slate-500'
                }`}
              >
                {liveSimulation ? 'Simulation On' : 'Simulation Paused'}
              </button>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="flex items-center gap-2 px-5 py-2.5 text-xs font-bold rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>Save Preferences</span>
          </button>
        </div>
      </form>
    </div>
  );
};
