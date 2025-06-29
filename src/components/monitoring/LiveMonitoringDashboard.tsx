import React, { useState, useEffect } from 'react';
import { useMissionContext } from '../../context/MissionContext';
import { LiveMissionCard } from './LiveMissionCard';
import { MissionMap } from './MissionMap';
import { AlertsPanel } from './AlertsPanel';
import { MissionTimeline } from './MissionTimeline';
import { Mission } from '../../types/mission';

interface MissionProgress {
  missionId: string;
  progress: number;
  currentWaypoint: number;
  totalWaypoints: number;
  timeRemaining: number;
}

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  missionId?: string;
  droneId?: string;
  acknowledged: boolean;
}

interface TimelineEvent {
  id: string;
  missionId: string;
  type: 'start' | 'waypoint' | 'pause' | 'resume' | 'complete' | 'abort' | 'alert';
  title: string;
  description: string;
  timestamp: Date;
  status?: 'success' | 'warning' | 'error';
}

export function LiveMonitoringDashboard() {
  const { state } = useMissionContext();
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);
  const [missionProgress, setMissionProgress] = useState<MissionProgress[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [timelineEvents, setTimelineEvents] = useState<TimelineEvent[]>([]);

  // Initialize mission progress for active missions
  useEffect(() => {
    const activeMissions = state.missions.filter(m => m.status === 'active');
    const initialProgress = activeMissions.map(mission => ({
      missionId: mission.id,
      progress: Math.random() * 60 + 20, // 20-80% progress
      currentWaypoint: Math.floor(Math.random() * 8) + 3,
      totalWaypoints: Math.floor(Math.random() * 5) + 10,
      timeRemaining: Math.random() * 30 + 10 // 10-40 minutes
    }));
    setMissionProgress(initialProgress);
  }, [state.missions]);

  // Simulate real-time progress updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMissionProgress(prev => 
        prev.map(progress => ({
          ...progress,
          progress: Math.min(100, progress.progress + Math.random() * 2),
          timeRemaining: Math.max(0, progress.timeRemaining - 0.5),
          currentWaypoint: progress.progress > 90 ? progress.totalWaypoints : 
            Math.min(progress.totalWaypoints, progress.currentWaypoint + (Math.random() > 0.8 ? 1 : 0))
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Generate sample alerts
  useEffect(() => {
    const sampleAlerts: Alert[] = [
      {
        id: 'alert-1',
        type: 'warning',
        title: 'Low Battery Warning',
        message: 'Drone battery level below 30%. Consider returning to base.',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        missionId: 'mission-001',
        droneId: 'drone-002',
        acknowledged: false
      },
      {
        id: 'alert-2',
        type: 'info',
        title: 'Waypoint Reached',
        message: 'Successfully reached waypoint 8 of 12.',
        timestamp: new Date(Date.now() - 10 * 60 * 1000),
        missionId: 'mission-002',
        droneId: 'drone-003',
        acknowledged: false
      },
      {
        id: 'alert-3',
        type: 'warning',
        title: 'Weather Alert',
        message: 'Wind speed increasing to 12 m/s. Monitor conditions.',
        timestamp: new Date(Date.now() - 15 * 60 * 1000),
        acknowledged: true
      }
    ];
    setAlerts(sampleAlerts);
  }, []);

  // Generate sample timeline events
  useEffect(() => {
    const sampleEvents: TimelineEvent[] = [
      {
        id: 'event-1',
        missionId: 'mission-001',
        type: 'start',
        title: 'Mission Started',
        description: 'Solar Panel Inspection mission commenced',
        timestamp: new Date(Date.now() - 25 * 60 * 1000),
        status: 'success'
      },
      {
        id: 'event-2',
        missionId: 'mission-002',
        type: 'waypoint',
        title: 'Waypoint Reached',
        description: 'Reached waypoint 5 of 10 in security patrol',
        timestamp: new Date(Date.now() - 8 * 60 * 1000),
        status: 'success'
      },
      {
        id: 'event-3',
        missionId: 'mission-001',
        type: 'alert',
        title: 'Battery Alert',
        description: 'Low battery warning triggered',
        timestamp: new Date(Date.now() - 5 * 60 * 1000),
        status: 'warning'
      }
    ];
    setTimelineEvents(sampleEvents);
  }, []);

  const handleAcknowledgeAlert = (alertId: string) => {
    setAlerts(prev => 
      prev.map(alert => 
        alert.id === alertId ? { ...alert, acknowledged: true } : alert
      )
    );
  };

  const handleDismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId));
  };

  const getMissionProgress = (missionId: string) => {
    return missionProgress.find(p => p.missionId === missionId) || {
      missionId,
      progress: 0,
      currentWaypoint: 0,
      totalWaypoints: 10,
      timeRemaining: 0
    };
  };

  const activeMissions = state.missions.filter(m => m.status === 'active' || m.status === 'planned');

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Live Mission Monitoring</h1>
          <p className="text-gray-600">Monitor active missions in real-time with live drone tracking and mission control</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Missions</p>
                <p className="text-3xl font-bold text-green-600">
                  {state.missions.filter(m => m.status === 'active').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <div className="w-6 h-6 bg-green-500 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Drones in Flight</p>
                <p className="text-3xl font-bold text-blue-600">
                  {state.missions.filter(m => m.status === 'active').length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-blue-50">
                <div className="w-6 h-6 bg-blue-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Active Alerts</p>
                <p className="text-3xl font-bold text-orange-600">
                  {alerts.filter(a => !a.acknowledged).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50">
                <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">Avg Progress</p>
                <p className="text-3xl font-bold text-purple-600">
                  {Math.round(missionProgress.reduce((sum, p) => sum + p.progress, 0) / Math.max(missionProgress.length, 1))}%
                </p>
              </div>
              <div className="p-3 rounded-lg bg-purple-50">
                <div className="w-6 h-6 bg-purple-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Mission Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Active Missions</h2>
              <div className="space-y-4">
                {activeMissions.map((mission) => (
                  <LiveMissionCard
                    key={mission.id}
                    mission={mission}
                    {...getMissionProgress(mission.id)}
                  />
                ))}
                {activeMissions.length === 0 && (
                  <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 text-center">
                    <div className="text-gray-400 mb-2">
                      <svg className="mx-auto h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
                      </svg>
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 mb-1">No Active Missions</h3>
                    <p className="text-sm text-gray-500">Start a mission to see live monitoring</p>
                  </div>
                )}
              </div>
            </div>

            {/* Alerts Panel */}
            <AlertsPanel
              alerts={alerts}
              onAcknowledge={handleAcknowledgeAlert}
              onDismiss={handleDismissAlert}
            />
          </div>

          {/* Right Column - Map and Timeline */}
          <div className="lg:col-span-2 space-y-6">
            {/* Mission Map */}
            <MissionMap
              missions={state.missions}
              selectedMission={selectedMission}
              onMissionSelect={setSelectedMission}
            />

            {/* Mission Timeline */}
            <MissionTimeline
              missions={state.missions}
              events={timelineEvents}
            />
          </div>
        </div>
      </div>
    </div>
  );
}