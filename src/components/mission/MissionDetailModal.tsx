import React from 'react';
import { 
  X, 
  MapPin, 
  Clock, 
  Battery, 
  Gauge,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Play,
  Pause,
  Square,
  Settings
} from 'lucide-react';
import { Mission } from '../../types/mission';
import { useMissionContext } from '../../context/MissionContext';

interface MissionDetailModalProps {
  mission: Mission;
  onClose: () => void;
}

export function MissionDetailModal({ mission, onClose }: MissionDetailModalProps) {
  const { dispatch } = useMissionContext();

  const getStatusIcon = () => {
    switch (mission.status) {
      case 'planned':
        return <Calendar className="w-5 h-5 text-orange-500" />;
      case 'active':
        return <Play className="w-5 h-5 text-green-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'aborted':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (mission.status) {
      case 'planned':
        return 'bg-orange-100 text-orange-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'aborted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = () => {
    switch (mission.priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleStartMission = () => {
    const updatedMission = { ...mission, status: 'active' as const };
    dispatch({ type: 'UPDATE_MISSION', payload: updatedMission });
  };

  const handlePauseMission = () => {
    const updatedMission = { ...mission, status: 'planned' as const };
    dispatch({ type: 'UPDATE_MISSION', payload: updatedMission });
  };

  const handleAbortMission = () => {
    const updatedMission = { ...mission, status: 'aborted' as const };
    dispatch({ type: 'UPDATE_MISSION', payload: updatedMission });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            {getStatusIcon()}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{mission.name}</h2>
              <p className="text-gray-600 capitalize">{mission.type} Mission</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Status and Priority */}
          <div className="flex items-center space-x-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
              {mission.status.toUpperCase()}
            </span>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getPriorityColor()}`}>
              {mission.priority.toUpperCase()} PRIORITY
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
              {mission.flightPath.type.toUpperCase()} PATTERN
            </span>
          </div>

          {/* Description */}
          {mission.description && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{mission.description}</p>
            </div>
          )}

          {/* Mission Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Schedule and Duration */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Schedule & Duration</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Scheduled</p>
                    <p className="font-medium">{mission.scheduledAt.toLocaleDateString()} at {mission.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Estimated Duration</p>
                    <p className="font-medium">{mission.estimatedDuration} minutes</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="text-sm text-gray-500">Estimated Distance</p>
                    <p className="font-medium">{mission.estimatedDistance} km</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Assigned Drone */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Assigned Drone</h3>
              {mission.assignedDrone ? (
                <div className="flex items-center space-x-2">
                  <Battery className="w-4 h-4 text-gray-400" />
                  <div>
                    <p className="font-medium">{mission.assignedDrone}</p>
                    <p className="text-sm text-gray-500">Ready for deployment</p>
                  </div>
                </div>
              ) : (
                <p className="text-gray-500 italic">No drone assigned</p>
              )}
            </div>
          </div>

          {/* Flight Parameters */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Flight Parameters</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center space-x-2">
                <Gauge className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Altitude</p>
                  <p className="font-medium">{mission.parameters.altitude}m</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Gauge className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Speed</p>
                  <p className="font-medium">{mission.parameters.speed}m/s</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Overlap</p>
                  <p className="font-medium">{mission.parameters.overlap}%</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Settings className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Resolution</p>
                  <p className="font-medium">{mission.parameters.resolution}cm/px</p>
                </div>
              </div>
            </div>
          </div>

          {/* Sensors */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Active Sensors</h3>
            <div className="flex flex-wrap gap-2">
              {mission.parameters.sensors.map((sensor, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                >
                  {sensor}
                </span>
              ))}
            </div>
          </div>

          {/* Survey Area Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Survey Area</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Area Type:</span>
                  <span className="ml-2 text-gray-600 capitalize">{mission.surveyArea.type}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Flight Pattern:</span>
                  <span className="ml-2 text-gray-600 capitalize">{mission.flightPath.type}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Coordinates:</span>
                  <span className="ml-2 text-gray-600">{mission.surveyArea.coordinates.length} points</span>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Time of Day:</span>
                  <span className="ml-2 text-gray-600 capitalize">{mission.parameters.timeOfDay}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
          
          <div className="flex space-x-3">
            {mission.status === 'planned' && (
              <button
                onClick={handleStartMission}
                className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
              >
                <Play className="w-4 h-4" />
                <span>Start Mission</span>
              </button>
            )}
            
            {mission.status === 'active' && (
              <>
                <button
                  onClick={handlePauseMission}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-600 text-white hover:bg-orange-700 rounded-lg transition-colors"
                >
                  <Pause className="w-4 h-4" />
                  <span>Pause</span>
                </button>
                <button
                  onClick={handleAbortMission}
                  className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white hover:bg-red-700 rounded-lg transition-colors"
                >
                  <Square className="w-4 h-4" />
                  <span>Abort</span>
                </button>
              </>
            )}
            
            <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
              Edit Mission
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}