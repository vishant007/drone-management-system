import React from 'react';
import { 
  X, 
  Battery, 
  MapPin, 
  Clock, 
  Wrench, 
  Gauge,
  Weight,
  Ruler,
  Calendar
} from 'lucide-react';
import { Drone } from '../../types/drone';

interface DroneDetailModalProps {
  drone: Drone | null;
  isOpen: boolean;
  onClose: () => void;
}

export function DroneDetailModal({ drone, isOpen, onClose }: DroneDetailModalProps) {
  if (!isOpen || !drone) return null;

  const getBatteryColor = () => {
    if (drone.batteryLevel > 60) return 'text-green-600';
    if (drone.batteryLevel > 30) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getBatteryBgColor = () => {
    if (drone.batteryLevel > 60) return 'bg-green-500';
    if (drone.batteryLevel > 30) return 'bg-yellow-500';
    return 'bg-red-500';
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

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{drone.name}</h2>
            <p className="text-gray-600">{drone.model}</p>
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
          {/* Status and Battery */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Status</h3>
              <span className={`inline-flex px-3 py-1 rounded-full text-sm font-medium ${getStatusColor()}`}>
                {drone.status.replace('-', ' ').toUpperCase()}
              </span>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Battery Level</h3>
              <div className="flex items-center space-x-3">
                <Battery className={`w-5 h-5 ${getBatteryColor()}`} />
                <div className="flex-1">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium text-gray-700">Battery</span>
                    <span className={`text-sm font-bold ${getBatteryColor()}`}>
                      {drone.batteryLevel}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${getBatteryBgColor()}`}
                      style={{ width: `${drone.batteryLevel}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Location and Flight Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Location</h3>
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{drone.location.name}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {drone.location.lat.toFixed(4)}, {drone.location.lng.toFixed(4)}
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Flight Hours</h3>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-700">{drone.flightHours} hours</span>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Specifications</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Max Flight Time</p>
                  <p className="font-medium">{drone.maxFlightTime} min</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Ruler className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Max Range</p>
                  <p className="font-medium">{drone.maxRange} km</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <Weight className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-500">Payload</p>
                  <p className="font-medium">{drone.payloadCapacity} kg</p>
                </div>
              </div>
            </div>
          </div>

          {/* Maintenance */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Maintenance</h3>
            <div className="flex items-center space-x-2">
              <Wrench className="w-4 h-4 text-gray-400" />
              <div>
                <p className="text-sm text-gray-500">Last Maintenance</p>
                <p className="font-medium">{drone.lastMaintenance.toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Capabilities */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Capabilities</h3>
            <div className="flex flex-wrap gap-2">
              {drone.capabilities.map((capability, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full font-medium"
                >
                  {capability}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            Close
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors">
            Assign Mission
          </button>
        </div>
      </div>
    </div>
  );
}