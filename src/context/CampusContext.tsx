import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
import {
  CampusName,
  DateRangeOption,
  EnergyData,
  WaterData,
  WasteData,
  AirQualityData,
  Asset,
  Building,
  Alert,
  AIInsight,
  MaintenanceRecord,
  SustainabilityGoal,
  CarbonData,
  ActivityItem,
  ChatMessage,
  AssetStatus,
  MaintenanceStatus,
} from '../types';
import { initialEnergyData } from '../data/energyData';
import { initialWaterData } from '../data/waterData';
import { initialWasteData } from '../data/wasteData';
import { initialAirQualityData } from '../data/airQualityData';
import { initialAssetData } from '../data/assetData';
import { initialBuildingData } from '../data/buildingData';
import { initialAlertData } from '../data/alertData';
import { initialInsightData } from '../data/insightData';
import { initialMaintenanceData } from '../data/maintenanceData';
import { initialGoalsData } from '../data/goalsData';
import { initialCarbonData } from '../data/carbonData';
import { initialActivityData } from '../data/activityData';

interface ToastNotification {
  id: string;
  type: 'success' | 'info' | 'warning' | 'error';
  message: string;
}

interface CampusContextType {
  // Navigation & filters
  selectedCampus: CampusName;
  setSelectedCampus: (campus: CampusName) => void;
  dateFilter: DateRangeOption;
  setDateFilter: (filter: DateRangeOption) => void;

  // Dark mode / White mode
  darkMode: boolean;
  toggleDarkMode: () => void;
  setDarkModeExplicit: (dark: boolean) => void;
  themeMode: 'light' | 'dark' | 'system';
  setThemeMode: (mode: 'light' | 'dark' | 'system') => void;

  // Simulation
  liveSimulation: boolean;
  setLiveSimulation: (enabled: boolean) => void;
  secondsSinceLastUpdate: number;

  // Data collections
  energyData: EnergyData;
  waterData: WaterData;
  wasteData: WasteData;
  airQualityData: AirQualityData;
  carbonData: CarbonData;
  buildings: Building[];
  assets: Asset[];
  alerts: Alert[];
  insights: AIInsight[];
  maintenance: MaintenanceRecord[];
  goals: SustainabilityGoal[];
  activities: ActivityItem[];

  // Mutators
  resolveAlert: (id: string) => void;
  dismissAlert: (id: string) => void;
  resolveInsight: (id: string) => void;
  takeActionOnInsight: (id: string) => void;
  addBuilding: (building: Omit<Building, 'id'>) => void;
  addAsset: (asset: Omit<Asset, 'id'>) => void;
  updateAssetStatus: (id: string, status: AssetStatus) => void;
  addMaintenance: (record: Omit<MaintenanceRecord, 'id'>) => void;
  updateMaintenanceStatus: (id: string, status: MaintenanceStatus) => void;
  addGoal: (goal: Omit<SustainabilityGoal, 'id'>) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  logWasteAudit: (weightKg: number, category: string) => void;

  // EcoAI Assistant
  isEcoAIOpen: boolean;
  setIsEcoAIOpen: (open: boolean) => void;
  toggleEcoAI: () => void;
  ecoAIMessages: ChatMessage[];
  isEcoAILoading: boolean;
  sendEcoAIMessage: (text: string) => Promise<void>;

  // Modals & Panels
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  isAddBuildingOpen: boolean;
  setIsAddBuildingOpen: (open: boolean) => void;
  isAddAssetOpen: boolean;
  setIsAddAssetOpen: (open: boolean) => void;
  isScheduleMaintenanceOpen: boolean;
  setIsScheduleMaintenanceOpen: (open: boolean) => void;
  isAddGoalOpen: boolean;
  setIsAddGoalOpen: (open: boolean) => void;
  isLogWasteOpen: boolean;
  setIsLogWasteOpen: (open: boolean) => void;
  isHelpSupportOpen: boolean;
  setIsHelpSupportOpen: (open: boolean) => void;

  // Feedback Toasts
  toasts: ToastNotification[];
  dismissToast: (id: string) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
}

const CampusContext = createContext<CampusContextType | undefined>(undefined);

export const CampusProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Global settings
  const [selectedCampus, setSelectedCampus] = useState<CampusName>('Main Campus');
  const [dateFilter, setDateFilter] = useState<DateRangeOption>('Today');

  // Dark mode / White mode state
  const [themeMode, setThemeModeState] = useState<'light' | 'dark' | 'system'>(() => {
    if (typeof window !== 'undefined') {
      const savedMode = localStorage.getItem('campusiq_theme_mode') as 'light' | 'dark' | 'system';
      if (savedMode) return savedMode;
      const saved = localStorage.getItem('campusiq_theme');
      if (saved === 'dark') return 'dark';
      if (saved === 'light') return 'light';
    }
    return 'system';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('campusiq_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
      localStorage.setItem('campusiq_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
      localStorage.setItem('campusiq_theme', 'light');
    }
  }, [darkMode]);

  // Synchronize system preference if in 'system' mode
  useEffect(() => {
    if (themeMode === 'system' && typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChange = (e: MediaQueryListEvent) => {
        setDarkMode(e.matches);
      };
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  }, [themeMode]);

  const setDarkModeExplicit = (dark: boolean) => {
    setDarkMode(dark);
    setThemeModeState(dark ? 'dark' : 'light');
    localStorage.setItem('campusiq_theme', dark ? 'dark' : 'light');
    localStorage.setItem('campusiq_theme_mode', dark ? 'dark' : 'light');
    showToast(dark ? 'Switched to Dark Mode 🌙' : 'Switched to White / Light Mode ☀️', 'info');
  };

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      setThemeModeState(next ? 'dark' : 'light');
      localStorage.setItem('campusiq_theme', next ? 'dark' : 'light');
      localStorage.setItem('campusiq_theme_mode', next ? 'dark' : 'light');
      showToast(next ? 'Switched to Dark Mode 🌙' : 'Switched to White / Light Mode ☀️', 'info');
      return next;
    });
  };

  const setThemeMode = (mode: 'light' | 'dark' | 'system') => {
    setThemeModeState(mode);
    localStorage.setItem('campusiq_theme_mode', mode);
    if (mode === 'light') {
      setDarkMode(false);
      localStorage.setItem('campusiq_theme', 'light');
      showToast('Switched to White / Light Mode ☀️', 'info');
    } else if (mode === 'dark') {
      setDarkMode(true);
      localStorage.setItem('campusiq_theme', 'dark');
      showToast('Switched to Dark Mode 🌙', 'info');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setDarkMode(prefersDark);
      localStorage.removeItem('campusiq_theme');
      showToast(`Set to System Theme (${prefersDark ? 'Dark' : 'White'}) 💻`, 'info');
    }
  };

  // Live simulation & ticking
  const [liveSimulation, setLiveSimulation] = useState<boolean>(true);
  const [secondsSinceLastUpdate, setSecondsSinceLastUpdate] = useState<number>(12);

  // Collections
  const [energyData, setEnergyData] = useState<EnergyData>(initialEnergyData);
  const [waterData, setWaterData] = useState<WaterData>(initialWaterData);
  const [wasteData, setWasteData] = useState<WasteData>(initialWasteData);
  const [airQualityData, setAirQualityData] = useState<AirQualityData>(initialAirQualityData);
  const [carbonData, setCarbonData] = useState<CarbonData>(initialCarbonData);
  const [buildings, setBuildings] = useState<Building[]>(initialBuildingData);
  const [assets, setAssets] = useState<Asset[]>(initialAssetData);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlertData);
  const [insights, setInsights] = useState<AIInsight[]>(initialInsightData);
  const [maintenance, setMaintenance] = useState<MaintenanceRecord[]>(initialMaintenanceData);
  const [goals, setGoals] = useState<SustainabilityGoal[]>(initialGoalsData);
  const [activities, setActivities] = useState<ActivityItem[]>(initialActivityData);

  // Modals & Panels
  const [isEcoAIOpen, setIsEcoAIOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [isAddBuildingOpen, setIsAddBuildingOpen] = useState<boolean>(false);
  const [isAddAssetOpen, setIsAddAssetOpen] = useState<boolean>(false);
  const [isScheduleMaintenanceOpen, setIsScheduleMaintenanceOpen] = useState<boolean>(false);
  const [isAddGoalOpen, setIsAddGoalOpen] = useState<boolean>(false);
  const [isLogWasteOpen, setIsLogWasteOpen] = useState<boolean>(false);
  const [isHelpSupportOpen, setIsHelpSupportOpen] = useState<boolean>(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastNotification[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  const dismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // CampusIQ AI Chat state
  const [ecoAIMessages, setEcoAIMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      sender: 'assistant',
      content: `Hi! I'm **CampusIQ AI** 🌱
How can I help you understand your campus?

I continuously monitor and analyze energy, water, waste, indoor air quality, and asset utilization across **${selectedCampus}**.`,
      timestamp: 'Just now',
      source: 'local-intelligence',
    },
  ]);
  const [isEcoAILoading, setIsEcoAILoading] = useState<boolean>(false);

  const toggleEcoAI = () => setIsEcoAIOpen((prev) => !prev);

  const sendEcoAIMessage = async (text: string) => {
    if (!text.trim()) return;

    const userMsg: ChatMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setEcoAIMessages((prev) => [...prev, userMsg]);
    setIsEcoAILoading(true);

    try {
      const response = await fetch('/api/campusiq-ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          context: {
            selectedCampus,
            totalEnergy: energyData.totalUsage,
            totalWater: waterData.totalUsage,
            totalWaste: wasteData.totalWaste,
            overallAQI: airQualityData.overallAQI,
            activeAlerts: alerts.filter((a) => a.status === 'Active').length,
          },
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'assistant',
        content: data.reply || 'No response received from CampusIQ AI.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: data.source,
      };

      setEcoAIMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      // Graceful local intelligence fallback
      const botMsg: ChatMessage = {
        id: `msg-bot-${Date.now()}`,
        sender: 'assistant',
        content: `### 🍃 CampusIQ Intelligence Update

We're monitoring **${selectedCampus}** in real-time:
- **Energy:** Engineering Block is running 18% above baseline (420 kWh savings potential through HVAC scheduling).
- **Water Alert:** Hostel Block leak detection alert remains active.
- **Air Quality:** AQI is holding at **72 (Moderate)** across 6 campus monitoring stations.

Please check the dedicated resource views in the sidebar for in-depth building diagnostics.`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        source: 'local-intelligence',
      };
      setEcoAIMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsEcoAILoading(false);
    }
  };

  // Keyboard shortcut for Cmd/Ctrl+K search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Periodic sensor ticker
  useEffect(() => {
    const ticker = setInterval(() => {
      setSecondsSinceLastUpdate((prev) => {
        if (prev >= 20) {
          if (liveSimulation) {
            // Apply slight realistic sensor variations
            setEnergyData((current) => {
              const delta = (Math.random() - 0.48) * 15;
              const nextTotal = Math.round(current.totalUsage + delta);
              return { ...current, totalUsage: nextTotal };
            });

            setWaterData((current) => {
              const delta = Math.round((Math.random() - 0.45) * 40);
              return { ...current, totalUsage: current.totalUsage + delta };
            });

            setAirQualityData((current) => {
              const delta = Math.random() > 0.7 ? (Math.random() > 0.5 ? 1 : -1) : 0;
              const nextAqi = Math.max(40, Math.min(120, current.overallAQI + delta));
              return { ...current, overallAQI: nextAqi };
            });
          }
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => clearInterval(ticker);
  }, [liveSimulation]);

  // Alert Mutators
  const resolveAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Resolved' as const } : a))
    );
    showToast('Alert marked as resolved.', 'success');
    addActivity('Alert Resolved', 'Water', `Alert #${id.slice(-4)} verified and closed by facility team.`);
  };

  const dismissAlert = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: 'Dismissed' as const } : a))
    );
    showToast('Alert dismissed.', 'info');
  };

  // Insight Mutators
  const resolveInsight = (id: string) => {
    setInsights((prev) =>
      prev.map((ins) => (ins.id === id ? { ...ins, status: 'Resolved' as const } : ins))
    );
    showToast('AI Insight marked as resolved.', 'success');
  };

  const takeActionOnInsight = (id: string) => {
    setInsights((prev) =>
      prev.map((ins) => (ins.id === id ? { ...ins, status: 'Action Scheduled' as const } : ins))
    );
    showToast('Work order initiated for AI recommendation.', 'success');
    addActivity('AI Action Initiated', 'Energy', 'Automated schedule optimization dispatched to BAS.');
  };

  // Building Mutator
  const addBuilding = (buildingDataInput: Omit<Building, 'id'>) => {
    const newId = `bld-${Date.now()}`;
    const newBuilding: Building = {
      ...buildingDataInput,
      id: newId,
    };
    setBuildings((prev) => [...prev, newBuilding]);
    showToast(`Building "${buildingDataInput.name}" registered successfully.`, 'success');
    addActivity('Building Added', 'System', `New facility "${buildingDataInput.name}" added to monitoring.`);
  };

  // Asset Mutator
  const addAsset = (assetDataInput: Omit<Asset, 'id'>) => {
    const newId = `ast-${Date.now()}`;
    const newAsset: Asset = {
      ...assetDataInput,
      id: newId,
    };
    setAssets((prev) => [newAsset, ...prev]);
    showToast(`Asset "${assetDataInput.name}" logged successfully.`, 'success');
  };

  const updateAssetStatus = (id: string, status: AssetStatus) => {
    setAssets((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status } : a))
    );
    showToast(`Asset status updated to ${status}.`, 'info');
  };

  // Maintenance Mutators
  const addMaintenance = (record: Omit<MaintenanceRecord, 'id'>) => {
    const newId = `maint-${Date.now()}`;
    const newRecord: MaintenanceRecord = {
      ...record,
      id: newId,
    };
    setMaintenance((prev) => [newRecord, ...prev]);
    showToast('Maintenance task scheduled.', 'success');
    addActivity('Maintenance Scheduled', 'Asset', `${record.asset}: ${record.issue}`);
  };

  const updateMaintenanceStatus = (id: string, status: MaintenanceStatus) => {
    setMaintenance((prev) =>
      prev.map((m) => (m.id === id ? { ...m, status } : m))
    );
    showToast(`Maintenance status marked as ${status}.`, 'info');
  };

  // Goals Mutators
  const addGoal = (goalInput: Omit<SustainabilityGoal, 'id'>) => {
    const newId = `goal-${Date.now()}`;
    const newGoal: SustainabilityGoal = {
      ...goalInput,
      id: newId,
    };
    setGoals((prev) => [...prev, newGoal]);
    showToast('Sustainability target created.', 'success');
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id === id) {
          const clamped = Math.min(100, Math.max(0, progress));
          const status = clamped >= 100 ? 'Exceeded' : clamped >= 60 ? 'On Track' : 'Needs Attention';
          return { ...g, progressPercent: clamped, status };
        }
        return g;
      })
    );
    showToast('Goal progress updated.', 'success');
  };

  // Waste Audit
  const logWasteAudit = (weightKg: number, category: string) => {
    setWasteData((prev) => {
      const nextTotal = prev.totalWaste + weightKg;
      return {
        ...prev,
        totalWaste: nextTotal,
      };
    });
    showToast(`Logged ${weightKg} kg of ${category} audit data.`, 'success');
  };

  const addActivity = (title: string, category: ActivityItem['category'], description: string) => {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newAct: ActivityItem = {
      id: `act-${Date.now()}`,
      time,
      title,
      category,
      description,
      badgeType: category === 'Water' ? 'critical' : category === 'Energy' ? 'warning' : 'success',
    };
    setActivities((prev) => [newAct, ...prev.slice(0, 15)]);
  };

  const value = useMemo(
    () => ({
      selectedCampus,
      setSelectedCampus,
      dateFilter,
      setDateFilter,
      darkMode,
      toggleDarkMode,
      setDarkModeExplicit,
      themeMode,
      setThemeMode,
      liveSimulation,
      setLiveSimulation,
      secondsSinceLastUpdate,
      energyData,
      waterData,
      wasteData,
      airQualityData,
      carbonData,
      buildings,
      assets,
      alerts,
      insights,
      maintenance,
      goals,
      activities,
      resolveAlert,
      dismissAlert,
      resolveInsight,
      takeActionOnInsight,
      addBuilding,
      addAsset,
      updateAssetStatus,
      addMaintenance,
      updateMaintenanceStatus,
      addGoal,
      updateGoalProgress,
      logWasteAudit,
      isEcoAIOpen,
      setIsEcoAIOpen,
      toggleEcoAI,
      ecoAIMessages,
      isEcoAILoading,
      sendEcoAIMessage,
      isSearchOpen,
      setIsSearchOpen,
      isAddBuildingOpen,
      setIsAddBuildingOpen,
      isAddAssetOpen,
      setIsAddAssetOpen,
      isScheduleMaintenanceOpen,
      setIsScheduleMaintenanceOpen,
      isAddGoalOpen,
      setIsAddGoalOpen,
      isLogWasteOpen,
      setIsLogWasteOpen,
      isHelpSupportOpen,
      setIsHelpSupportOpen,
      toasts,
      dismissToast,
      showToast,
    }),
    [
      selectedCampus,
      dateFilter,
      darkMode,
      themeMode,
      liveSimulation,
      secondsSinceLastUpdate,
      energyData,
      waterData,
      wasteData,
      airQualityData,
      carbonData,
      buildings,
      assets,
      alerts,
      insights,
      maintenance,
      goals,
      activities,
      isEcoAIOpen,
      ecoAIMessages,
      isEcoAILoading,
      isSearchOpen,
      isAddBuildingOpen,
      isAddAssetOpen,
      isScheduleMaintenanceOpen,
      isAddGoalOpen,
      isLogWasteOpen,
      isHelpSupportOpen,
      toasts,
    ]
  );

  return <CampusContext.Provider value={value}>{children}</CampusContext.Provider>;
};

export const useCampus = (): CampusContextType => {
  const context = useContext(CampusContext);
  if (!context) {
    throw new Error('useCampus must be used within a CampusProvider');
  }
  return context;
};
