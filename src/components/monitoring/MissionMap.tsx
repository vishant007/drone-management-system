import React, { useEffect, useState } from 'react';
import { MapPin, Zap, AlertTriangle, Navigation } from 'lucide-react';
import { Mission } from '../../types/mission';

interface MissionMapProps {
  missions: Mission[];
  selectedMission: Mission | null;
  onMissionSelect: (mission: Mission) => void;
}

interface DronePosition {
  missionId: string;
  lat: number;
  lng: number;
  heading: number;
  altitude: number;
}

export function MissionMap({ missions, selectedMission, onMissionSelect }: MissionMapProps) {
  const [dronePositions, setDronePositions] = useState<DronePosition[]>([]);

  // Simulate real-time drone position updates
  useEffect(() => {
    const activeMissions = missions.filter(m => m.status === 'active');
    
    // Initialize positions
    const initialPositions = activeMissions.map(mission => ({
      missionId: mission.id,
      lat: mission.surveyArea.coordinates[0].lat + (Math.random() - 0.5) * 0.001,
      lng: mission.surveyArea.coordinates[0].lng + (Math.random() - 0.5) * 0.001,
      heading: Math.random() * 360,
      altitude: mission.parameters.altitude
    }));
    
    setDronePositions(initialPositions);

    // Update positions every 2 seconds
    const interval = setInterval(() => {
      setDronePositions(prev => 
        prev.map(pos => ({
          ...pos,
          lat: pos.lat + (Math.random() - 0.5) * 0.0001,
          lng: pos.lng + (Math.random() - 0.5) * 0.0001,
          heading: (pos.heading + (Math.random() - 0.5) * 10) % 360
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, [missions]);

  const getStatusColor = (status: Mission['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'planned': return 'bg-orange-500';
      case 'completed': return 'bg-blue-500';
      case 'aborted': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Mission Map</h3>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Active</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
            <span className="text-gray-600">Planned</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
            <span className="text-gray-600">Completed</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-gray-100 rounded-lg h-96 relative overflow-hidden border-2 border-dashed border-gray-300">
        {/* Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="grid grid-cols-12 grid-rows-8 h-full">
              {Array.from({ length: 96 }).map((_, i) => (
                <div key={i} className="border border-gray-300"></div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Areas */}
        {missions.map((mission, index) => (
          <div
            key={mission.id}
            className={`absolute border-2 rounded-lg cursor-pointer transition-all duration-200 ${
              selectedMission?.id === mission.id 
                ? 'border-blue-500 bg-blue-100 bg-opacity-50' 
                : 'border-gray-400 bg-white bg-opacity-30 hover:bg-opacity-50'
            }`}
            style={{
              left: `${20 + (index % 3) * 25}%`,
              top: `${20 + Math.floor(index / 3) * 30}%`,
              width: '20%',
              height: '25%'
            }}
            onClick={() => onMissionSelect(mission)}
          >
            <div className="p-2">
              <div className="flex items-center space-x-1 mb-1">
                <div className={`w-2 h-2 rounded-full ${getStatusColor(mission.status)}`}></div>
                <span className="text-xs font-medium text-gray-700 truncate">
                  {mission.name}
                </span>
              </div>
              <div className="text-xs text-gray-500">
                {mission.type}
              </div>
            </div>
          </div>
        ))}

        {/* Live Drone Positions */}
        {dronePositions.map((pos) => {
          const mission = missions.find(m => m.id === pos.missionId);
          if (!mission) return null;
          
          return (
            <div
              key={pos.missionId}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000"
              style={{
                left: `${25 + (missions.findIndex(m => m.id === pos.missionId) % 3) * 25}%`,
                top: `${32 + Math.floor(missions.findIndex(m => m.id === pos.missionId) / 3) * 30}%`,
                transform: `translate(-50%, -50%) rotate(${pos.heading}deg)`
              }}
            >
              <div className="relative">
                <Navigation className="w-4 h-4 text-blue-600" />
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          );
        })}

        {/* Map Center Info */}
        <div className="absolute bottom-4 left-4 bg-white bg-opacity-90 rounded-lg p-3 text-sm">
          <div className="flex items-center space-x-2 mb-1">
            <MapPin className="w-4 h-4 text-gray-500" />
            <span className="font-medium text-gray-700">Live Tracking</span>
          </div>
          <div className="text-xs text-gray-500">
            {missions.filter(m => m.status === 'active').length} active missions
          </div>
        </div>

        {/* Weather Alert */}
        <div className="absolute top-4 right-4 bg-yellow-100 border border-yellow-300 rounded-lg p-2">
          <div className="flex items-center space-x-1">
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
            <span className="text-xs font-medium text-yellow-800">Wind: 5 m/s</span>
          </div>
        </div>
      </div>

      {/* Map Controls */}
      <div className="flex justify-between items-center mt-4">
        <div className="text-sm text-gray-500">
          Last updated: {new Date().toLocaleTimeString()}
        </div>
        <div className="flex space-x-2">
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors">
            Zoom In
          </button>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors">
            Center
          </button>
          <button className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded text-sm transition-colors">
            Layers
          </button>
        </div>
      </div>
    </div>
  );
}