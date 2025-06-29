import React from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  MapPin, 
  Clock, 
  Battery, 
  AlertTriangle,
  CheckCircle,
  Radio,
  Gauge
} from 'lucide-react';
import { Mission } from '../../types/mission';
import { useMissionContext } from '../../context/MissionContext';

interface LiveMissionCardProps {
  mission: Mission;
  progress: number;
  currentWaypoint: number;
  totalWaypoints: number;
  timeRemaining: number;
}

export function LiveMissionCard({ 
  mission, 
  progress, 
  currentWaypoint, 
  totalWaypoints, 
  timeRemaining 
}: LiveMissionCardProps) {
  const { dispatch } = useMissionContext();

  const getStatusIcon = () => {
    switch (mission.status) {
      case 'active':
        return <Play className="w-4 h-4 text-green-500" />;
      case 'planned':
        return <Pause className="w-4 h-4 text-orange-500" />;
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      case 'aborted':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (mission.status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'planned':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'aborted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handlePause = () => {
    const updatedMission = { ...mission, status: 'planned' as const };
    dispatch({ type: 'UPDATE_MISSION', payload: updatedMission });
  };

  const handleResume = () => {
    const updatedMission = { ...mission, status: 'active' as const };
    dispatch({ type: 'UPDATE_MISSION', payload: updatedMission });
  };

  const handleAbort = () => {
    const updatedMission = { ...mission, status: 'aborted' as const };
    dispatch({ type: 'UPDATE_MISSION', payload: updatedMission });
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = Math.floor(minutes % 60);
    return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{mission.name}</h3>
          <p className="text-sm text-gray-500 capitalize">{mission.type} Mission</p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {mission.status.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Mission Progress</span>
          <span className="text-sm font-bold text-blue-600">{Math.round(progress)}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Mission Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center space-x-2">
          <MapPin className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Waypoint</p>
            <p className="text-sm font-medium">{currentWaypoint}/{totalWaypoints}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Time Remaining</p>
            <p className="text-sm font-medium">{formatTime(timeRemaining)}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Gauge className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Altitude</p>
            <p className="text-sm font-medium">{mission.parameters.altitude}m</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Radio className="w-4 h-4 text-gray-400" />
          <div>
            <p className="text-xs text-gray-500">Signal</p>
            <p className="text-sm font-medium text-green-600">Strong</p>
          </div>
        </div>
      </div>

      {/* Assigned Drone */}
      {mission.assignedDrone && (
        <div className="flex items-center space-x-2 mb-4">
          <Battery className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {mission.assignedDrone} • Battery: 78%
          </span>
        </div>
      )}

      {/* Control Actions */}
      <div className="flex space-x-2 pt-4 border-t border-gray-100">
        {mission.status === 'active' && (
          <>
            <button
              onClick={handlePause}
              className="flex items-center space-x-1 px-3 py-2 bg-orange-100 text-orange-700 hover:bg-orange-200 rounded-lg transition-colors text-sm"
            >
              <Pause className="w-3 h-3" />
              <span>Pause</span>
            </button>
            <button
              onClick={handleAbort}
              className="flex items-center space-x-1 px-3 py-2 bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors text-sm"
            >
              <Square className="w-3 h-3" />
              <span>Abort</span>
            </button>
          </>
        )}
        
        {mission.status === 'planned' && (
          <button
            onClick={handleResume}
            className="flex items-center space-x-1 px-3 py-2 bg-green-100 text-green-700 hover:bg-green-200 rounded-lg transition-colors text-sm"
          >
            <Play className="w-3 h-3" />
            <span>Resume</span>
          </button>
        )}
      </div>
    </div>
  );
}