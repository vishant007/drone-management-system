import React from 'react';
import { 
  MapPin, 
  Clock, 
  Battery, 
  AlertTriangle,
  CheckCircle,
  Play,
  Calendar,
  Gauge
} from 'lucide-react';
import { Mission } from '../../types/mission';
import { useMissionContext } from '../../context/MissionContext';

interface MissionCardProps {
  mission: Mission;
}

export function MissionCard({ mission }: MissionCardProps) {
  const { dispatch } = useMissionContext();

  const getStatusIcon = () => {
    switch (mission.status) {
      case 'planned':
        return <Calendar className="w-4 h-4 text-orange-500" />;
      case 'active':
        return <Play className="w-4 h-4 text-green-500" />;
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

  const handleCardClick = () => {
    dispatch({ type: 'SELECT_MISSION', payload: mission });
  };

  return (
    <div 
      onClick={handleCardClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
    >
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

      {/* Priority and Type */}
      <div className="flex items-center space-x-2 mb-4">
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor()}`}>
          {mission.priority.toUpperCase()} PRIORITY
        </span>
        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
          {mission.flightPath.type.toUpperCase()} PATTERN
        </span>
      </div>

      {/* Mission Details */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {mission.estimatedDuration} min • {mission.estimatedDistance} km
          </span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Gauge className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            {mission.parameters.altitude}m altitude • {mission.parameters.speed}m/s
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <Calendar className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Scheduled: {mission.scheduledAt.toLocaleDateString()} at {mission.scheduledAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </span>
        </div>
      </div>

      {/* Assigned Drone */}
      {mission.assignedDrone && (
        <div className="flex items-center space-x-2 mb-4">
          <Battery className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-600">
            Assigned to {mission.assignedDrone}
          </span>
        </div>
      )}

      {/* Sensors */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-medium text-gray-500 mb-2">SENSORS</p>
        <div className="flex flex-wrap gap-1">
          {mission.parameters.sensors.slice(0, 2).map((sensor, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-md font-medium"
            >
              {sensor}
            </span>
          ))}
          {mission.parameters.sensors.length > 2 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              +{mission.parameters.sensors.length - 2} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}