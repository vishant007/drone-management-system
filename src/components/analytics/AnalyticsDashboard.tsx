import React, { useState } from 'react';
import { ExecutiveSummary } from './ExecutiveSummary';
import { MissionAnalytics } from './MissionAnalytics';
import { FleetAnalytics } from './FleetAnalytics';
import { ReportsCenter } from './ReportsCenter';
import { PerformanceMetrics } from './PerformanceMetrics';
import { TrendAnalysis } from './TrendAnalysis';

export function AnalyticsDashboard() {
  const [activeView, setActiveView] = useState<'overview' | 'missions' | 'fleet' | 'reports'>('overview');

  const views = [
    { id: 'overview', label: 'Executive Overview' },
    { id: 'missions', label: 'Mission Analytics' },
    { id: 'fleet', label: 'Fleet Performance' },
    { id: 'reports', label: 'Reports Center' }
  ];

  const renderContent = () => {
    switch (activeView) {
      case 'overview':
        return (
          <div className="space-y-8">
            <ExecutiveSummary />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <PerformanceMetrics />
              <TrendAnalysis />
            </div>
          </div>
        );
      case 'missions':
        return <MissionAnalytics />;
      case 'fleet':
        return <FleetAnalytics />;
      case 'reports':
        return <ReportsCenter />;
      default:
        return <ExecutiveSummary />;
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analytics & Reporting</h1>
          <p className="text-gray-600">Comprehensive insights into fleet performance and mission analytics</p>
        </div>

        {/* View Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {views.map((view) => (
                <button
                  key={view.id}
                  onClick={() => setActiveView(view.id as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeView === view.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {view.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        {renderContent()}
      </div>
    </div>
  );
}