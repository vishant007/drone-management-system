import React, { useState } from 'react';
import { DroneProvider } from './context/DroneContext';
import { MissionProvider } from './context/MissionContext';
import { Header } from './components/layout/Header';
import { FleetDashboard } from './components/fleet/FleetDashboard';
import { MissionPlanningDashboard } from './components/mission/MissionPlanningDashboard';
import { LiveMonitoringDashboard } from './components/monitoring/LiveMonitoringDashboard';
import { AnalyticsDashboard } from './components/analytics/AnalyticsDashboard';
import { NotificationsPage } from './components/user/NotificationsPage';
import { SettingsPage } from './components/user/SettingsPage';
import { ProfilePage } from './components/user/ProfilePage';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <FleetDashboard />;
      case 'planning':
        return <MissionPlanningDashboard />;
      case 'monitoring':
        return <LiveMonitoringDashboard />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'notifications':
        return <NotificationsPage />;
      case 'settings':
        return <SettingsPage />;
      case 'profile':
        return <ProfilePage />;
      default:
        return <FleetDashboard />;
    }
  };

  return (
    <DroneProvider>
      <MissionProvider>
        <div className="min-h-screen bg-gray-50">
          <Header activeTab={activeTab} onTabChange={setActiveTab} />
          <main className="w-full">
            {renderContent()}
          </main>
        </div>
      </MissionProvider>
    </DroneProvider>
  );
}

export default App;