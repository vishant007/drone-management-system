import React, { useState } from 'react';
import { useMissionContext } from '../../context/MissionContext';
import { MissionStats } from './MissionStats';
import { MissionList } from './MissionList';
import { MissionCreator } from './MissionCreator';
import { MissionDetailModal } from './MissionDetailModal';
import { WeatherWidget } from './WeatherWidget';
import { Plus } from 'lucide-react';

export function MissionPlanningDashboard() {
  const { state, dispatch, calculateMissionStats } = useMissionContext();
  const [activeTab, setActiveTab] = useState<'all' | 'planned' | 'active' | 'completed'>('all');
  const missionStats = calculateMissionStats();

  const handleCreateMission = () => {
    dispatch({ type: 'SET_CREATING_MISSION', payload: true });
  };

  const handleCloseCreator = () => {
    dispatch({ type: 'SET_CREATING_MISSION', payload: false });
    dispatch({ type: 'SET_MISSION_DRAFT', payload: null });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'SELECT_MISSION', payload: null });
  };

  const getFilteredMissions = () => {
    if (activeTab === 'all') return state.missions;
    return state.missions.filter(mission => mission.status === activeTab);
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Mission Planning</h1>
            <p className="text-gray-600">Plan and configure autonomous drone surveys</p>
          </div>
          <div className="flex items-center space-x-4">
            <WeatherWidget weather={state.currentWeather} />
            <button
              onClick={handleCreateMission}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>New Mission</span>
            </button>
          </div>
        </div>

        {/* Mission Statistics */}
        <MissionStats stats={missionStats} />

        {/* Mission Tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { key: 'all', label: 'All Missions', count: missionStats.totalMissions },
                { key: 'planned', label: 'Planned', count: missionStats.plannedMissions },
                { key: 'active', label: 'Active', count: missionStats.activeMissions },
                { key: 'completed', label: 'Completed', count: missionStats.completedMissions }
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`py-4 px-2 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === tab.key
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Mission List */}
        <MissionList missions={getFilteredMissions()} />

        {/* Mission Creator Modal */}
        {state.isCreatingMission && (
          <MissionCreator onClose={handleCloseCreator} />
        )}

        {/* Mission Detail Modal */}
        {state.selectedMission && (
          <MissionDetailModal
            mission={state.selectedMission}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
}