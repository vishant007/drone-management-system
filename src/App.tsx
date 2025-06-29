import React, { useState } from 'react';
import { DroneProvider } from './context/DroneContext';
import { MissionProvider } from './context/MissionContext';
import { Header } from './components/layout/Header';
import { FleetDashboard } from './components/fleet/FleetDashboard';
import { MissionPlanningDashboard } from './components/mission/MissionPlanningDashboard';
import { LiveMonitoringDashboard } from './components/monitoring/LiveMonitoringDashboard';
import { ComingSoon } from './components/common/ComingSoon';

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
        return (
          <ComingSoon
            title="Analytics & Reporting Portal"
            description="Comprehensive reporting and analytics system with detailed mission reports, fleet utilization metrics, and executive dashboards."
          />
        );
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