import React from 'react';
import { 
  Battery, 
  MapPin, 
  Clock, 
  Wrench, 
  Wifi, 
  WifiOff,
  AlertTriangle,
  CheckCircle,
  Pause
} from 'lucide-react';
import { Drone } from '../../types/drone';

interface DroneCardProps {
  drone: Drone;
  onClick: () => void;
}

export function DroneCard({ drone, onClick }: DroneCardProps) {
  const getStatusIcon = () => {
    switch (drone.status) {
      case 'available':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'in-mission':
        return <Wifi className="w-4 h-4 text-blue-500" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-orange-500" />;
      case 'offline':
        return <WifiOff className="w-4 h-4 text-red-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = () => {
    switch (drone.status) {
      case 'available':
        return 'bg-green-100 text-green-800';
      case 'in-mission':
        return 'bg-blue-100 text-blue-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      case 'offline':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getBatteryColor = () => {
    if (drone.batteryLevel > 60) return 'bg-green-500';
    if (drone.batteryLevel > 30) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getBatteryTextColor = () => {
    if (drone.batteryLevel > 60) return 'text-green-600';
    if (drone.batteryLevel > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const daysSinceMaintenace = Math.floor(
    (new Date().getTime() - drone.lastMaintenance.getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200 cursor-pointer hover:border-blue-300"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{drone.name}</h3>
          <p className="text-sm text-gray-500">{drone.model}</p>
        </div>
        <div className="flex items-center space-x-2">
          {getStatusIcon()}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor()}`}>
            {drone.status.replace('-', ' ').toUpperCase()}
          </span>
        </div>
      </div>

      {/* Battery Level */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Battery className={`w-4 h-4 ${getBatteryTextColor()}`} />
            <span className="text-sm font-medium text-gray-700">Battery</span>
          </div>
          <span className={`text-sm font-bold ${getBatteryTextColor()}`}>
            {drone.batteryLevel}%
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${getBatteryColor()}`}
            style={{ width: `${drone.batteryLevel}%` }}
          ></div>
        </div>
      </div>

      {/* Location */}
      <div className="flex items-center space-x-2 mb-3">
        <MapPin className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">{drone.location.name}</span>
      </div>

      {/* Flight Hours */}
      <div className="flex items-center space-x-2 mb-3">
        <Clock className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">{drone.flightHours}h flight time</span>
      </div>

      {/* Last Maintenance */}
      <div className="flex items-center space-x-2 mb-4">
        <Wrench className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-600">
          Maintenance {daysSinceMaintenace} days ago
        </span>
      </div>

      {/* Capabilities */}
      <div className="border-t border-gray-100 pt-4">
        <p className="text-xs font-medium text-gray-500 mb-2">CAPABILITIES</p>
        <div className="flex flex-wrap gap-1">
          {drone.capabilities.slice(0, 3).map((capability, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md"
            >
              {capability}
            </span>
          ))}
          {drone.capabilities.length > 3 && (
            <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-md">
              +{drone.capabilities.length - 3} more
            </span>
          )}
        </div>
      </div>
    </div>
  );
}