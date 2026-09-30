import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { CampusProvider } from './context/CampusContext';
import { Sidebar } from './components/layout/Sidebar';
import { TopNavbar } from './components/layout/TopNavbar';
import { EcoAIChat } from './components/ai/EcoAIChat';
import { SearchModal } from './components/common/SearchModal';
import { ToastContainer } from './components/common/ToastContainer';
import { AddBuildingModal } from './components/modals/AddBuildingModal';
import { AddAssetModal } from './components/modals/AddAssetModal';
import { ScheduleMaintenanceModal } from './components/modals/ScheduleMaintenanceModal';
import { AddGoalModal } from './components/modals/AddGoalModal';
import { HelpSupportModal } from './components/modals/HelpSupportModal';

// Pages
import { DashboardPage } from './pages/DashboardPage';
import { CampusMapPage } from './pages/CampusMapPage';
import { EnergyPage } from './pages/EnergyPage';
import { WaterPage } from './pages/WaterPage';
import { WastePage } from './pages/WastePage';
import { AirQualityPage } from './pages/AirQualityPage';
import { AssetsPage } from './pages/AssetsPage';
import { BuildingsPage } from './pages/BuildingsPage';
import { BuildingDetailPage } from './pages/BuildingDetailPage';
import { AIInsightsPage } from './pages/AIInsightsPage';
import { AlertsPage } from './pages/AlertsPage';
import { MaintenancePage } from './pages/MaintenancePage';
import { GoalsPage } from './pages/GoalsPage';
import { CarbonPage } from './pages/CarbonPage';
import { ReportsPage } from './pages/ReportsPage';
import { SettingsPage } from './pages/SettingsPage';
import { ProjectDossierPage } from './pages/ProjectDossierPage';

function AppLayout() {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex transition-colors duration-150">
      {/* Sidebar */}
      <Sidebar
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        <TopNavbar onOpenMobile={() => setMobileSidebarOpen(true)} />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/campus" element={<CampusMapPage />} />
            <Route path="/energy" element={<EnergyPage />} />
            <Route path="/water" element={<WaterPage />} />
            <Route path="/waste" element={<WastePage />} />
            <Route path="/air-quality" element={<AirQualityPage />} />
            <Route path="/assets" element={<AssetsPage />} />
            <Route path="/buildings" element={<BuildingsPage />} />
            <Route path="/buildings/:id" element={<BuildingDetailPage />} />
            <Route path="/ai-insights" element={<AIInsightsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/maintenance" element={<MaintenancePage />} />
            <Route path="/goals" element={<GoalsPage />} />
            <Route path="/carbon" element={<CarbonPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/dossier" element={<ProjectDossierPage />} />
            <Route path="/project-pdf" element={<ProjectDossierPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>

      {/* Interactive global overlays */}
      <EcoAIChat />
      <SearchModal />
      <ToastContainer />

      {/* Action Modals */}
      <AddBuildingModal />
      <AddAssetModal />
      <ScheduleMaintenanceModal />
      <AddGoalModal />
      <HelpSupportModal />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <CampusProvider>
        <AppLayout />
      </CampusProvider>
    </BrowserRouter>
  );
}
