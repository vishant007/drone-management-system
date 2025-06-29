import React from 'react';
import { Bone as Drone, Battery, Clock, AlertTriangle } from 'lucide-react';
import { FleetStats as FleetStatsType } from '../../types/drone';

interface FleetStatsProps {
  stats: FleetStatsType;
}

export function FleetStats({ stats }: FleetStatsProps) {
  const statCards = [
    {
      title: 'Total Drones',
      value: stats.totalDrones,
      icon: Drone,
      color: 'bg-blue-500',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'Available',
      value: stats.availableDrones,
      icon: Battery,
      color: 'bg-green-500',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      title: 'Active Missions',
      value: stats.activeMissions,
      icon: Clock,
      color: 'bg-orange-500',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
    {
      title: 'Maintenance',
      value: stats.maintenanceRequired,
      icon: AlertTriangle,
      color: 'bg-red-500',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{card.title}</p>
                <p className="text-3xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${card.bgColor}`}>
                <Icon className={`w-6 h-6 ${card.textColor}`} />
              </div>
            </div>
          </div>
        );
      })}
      
      {/* Additional Stats */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 md:col-span-2 lg:col-span-2">
        <div className="grid grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Total Flight Hours</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalFlightHours.toFixed(1)}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">Avg Battery Level</p>
            <div className="flex items-center space-x-2">
              <p className="text-2xl font-bold text-gray-900">{stats.averageBatteryLevel.toFixed(0)}%</p>
              <div className="flex-1 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${stats.averageBatteryLevel}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}