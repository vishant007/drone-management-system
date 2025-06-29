import React, { useState } from 'react';
import { 
  Battery, 
  Clock, 
  Wrench, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Gauge,
  Calendar
} from 'lucide-react';

export function FleetAnalytics() {
  const [selectedDrone, setSelectedDrone] = useState('all');

  const fleetOverview = {
    totalDrones: 12,
    activeToday: 8,
    maintenanceRequired: 2,
    avgUtilization: 87.3,
    totalFlightHours: 2847.5,
    avgBatteryHealth: 94.2
  };

  const dronePerformance = [
    { 
      id: 'drone-001', 
      name: 'Falcon Alpha', 
      model: 'DJI Matrice 300 RTK',
      utilization: 92.5, 
      flightHours: 245.5, 
      batteryHealth: 96.8,
      lastMaintenance: '2024-01-15',
      efficiency: 'Excellent',
      status: 'Active'
    },
    { 
      id: 'drone-002', 
      name: 'Eagle Beta', 
      model: 'Autel EVO II Pro',
      utilization: 78.3, 
      flightHours: 189.2, 
      batteryHealth: 89.4,
      lastMaintenance: '2024-01-20',
      efficiency: 'Good',
      status: 'In Mission'
    },
    { 
      id: 'drone-003', 
      name: 'Hawk Gamma', 
      model: 'Skydio 2+',
      utilization: 95.1, 
      flightHours: 156.8, 
      batteryHealth: 97.2,
      lastMaintenance: '2024-01-10',
      efficiency: 'Excellent',
      status: 'Available'
    },
    { 
      id: 'drone-004', 
      name: 'Phoenix Delta', 
      model: 'DJI Phantom 4 RTK',
      utilization: 65.7, 
      flightHours: 312.1, 
      batteryHealth: 82.1,
      lastMaintenance: '2023-12-28',
      efficiency: 'Fair',
      status: 'Maintenance'
    }
  ];

  const maintenanceSchedule = [
    { drone: 'Phoenix Delta', type: 'Battery Replacement', due: '2024-02-05', priority: 'High' },
    { drone: 'Vulture Theta', type: 'Propeller Inspection', due: '2024-02-08', priority: 'Medium' },
    { drone: 'Condor Eta', type: 'Camera Calibration', due: '2024-02-12', priority: 'Low' },
    { drone: 'Falcon Alpha', type: 'Routine Service', due: '2024-02-15', priority: 'Medium' }
  ];

  const costAnalysis = {
    operationalCost: 1250,
    maintenanceCost: 340,
    fuelSavings: 8900,
    laborSavings: 12400,
    totalSavings: 21300
  };

  const getEfficiencyColor = (efficiency: string) => {
    switch (efficiency) {
      case 'Excellent': return 'text-green-600 bg-green-100';
      case 'Good': return 'text-blue-600 bg-blue-100';
      case 'Fair': return 'text-orange-600 bg-orange-100';
      case 'Poor': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active': return 'text-green-600 bg-green-100';
      case 'Available': return 'text-blue-600 bg-blue-100';
      case 'In Mission': return 'text-purple-600 bg-purple-100';
      case 'Maintenance': return 'text-orange-600 bg-orange-100';
      case 'Offline': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-100';
      case 'Medium': return 'text-orange-600 bg-orange-100';
      case 'Low': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="space-y-8">
      {/* Fleet Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Gauge className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-500">Fleet</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{fleetOverview.totalDrones}</p>
          <p className="text-sm text-gray-600">Total Drones</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-xs text-gray-500">Active</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{fleetOverview.activeToday}</p>
          <p className="text-sm text-gray-600">Active Today</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Wrench className="w-5 h-5 text-orange-500" />
            <span className="text-xs text-gray-500">Maintenance</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{fleetOverview.maintenanceRequired}</p>
          <p className="text-sm text-gray-600">Need Service</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <span className="text-xs text-gray-500">Utilization</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{fleetOverview.avgUtilization}%</p>
          <p className="text-sm text-gray-600">Average</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-indigo-500" />
            <span className="text-xs text-gray-500">Flight Time</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{fleetOverview.totalFlightHours.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Total Hours</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Battery className="w-5 h-5 text-green-500" />
            <span className="text-xs text-gray-500">Battery</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{fleetOverview.avgBatteryHealth}%</p>
          <p className="text-sm text-gray-600">Avg Health</p>
        </div>
      </div>

      {/* Drone Performance Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Individual Drone Performance</h3>
          <div className="flex items-center space-x-4">
            <select
              value={selectedDrone}
              onChange={(e) => setSelectedDrone(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Drones</option>
              {dronePerformance.map((drone) => (
                <option key={drone.id} value={drone.id}>{drone.name}</option>
              ))}
            </select>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm">
              Export Data
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Drone</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Model</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Utilization</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Flight Hours</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Battery Health</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Efficiency</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Last Service</th>
              </tr>
            </thead>
            <tbody>
              {dronePerformance.map((drone) => (
                <tr key={drone.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{drone.name}</td>
                  <td className="py-3 px-4 text-gray-600">{drone.model}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: `${drone.utilization}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-gray-900">{drone.utilization}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{drone.flightHours}h</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-2">
                      <Battery className={`w-4 h-4 ${
                        drone.batteryHealth > 90 ? 'text-green-500' : 
                        drone.batteryHealth > 80 ? 'text-orange-500' : 'text-red-500'
                      }`} />
                      <span className="text-sm font-medium text-gray-900">{drone.batteryHealth}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getEfficiencyColor(drone.efficiency)}`}>
                      {drone.efficiency}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(drone.status)}`}>
                      {drone.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{drone.lastMaintenance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Maintenance & Cost Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Maintenance Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Upcoming Maintenance</h3>
            <Calendar className="w-5 h-5 text-gray-400" />
          </div>
          
          <div className="space-y-4">
            {maintenanceSchedule.map((item, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.drone}</p>
                  <p className="text-sm text-gray-600">{item.type}</p>
                  <p className="text-xs text-gray-500 mt-1">Due: {item.due}</p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}>
                  {item.priority}
                </span>
              </div>
            ))}
          </div>
          
          <button className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium">
            View Full Schedule
          </button>
        </div>

        {/* Cost Analysis */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Cost Analysis</h3>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
              <span className="text-sm font-medium text-red-800">Operational Costs</span>
              <span className="font-bold text-red-900">${costAnalysis.operationalCost.toLocaleString()}</span>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
              <span className="text-sm font-medium text-orange-800">Maintenance Costs</span>
              <span className="font-bold text-orange-900">${costAnalysis.maintenanceCost.toLocaleString()}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg mb-2">
                <span className="text-sm font-medium text-green-800">Fuel Savings</span>
                <span className="font-bold text-green-900">+${costAnalysis.fuelSavings.toLocaleString()}</span>
              </div>
              
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-sm font-medium text-green-800">Labor Savings</span>
                <span className="font-bold text-green-900">+${costAnalysis.laborSavings.toLocaleString()}</span>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center p-4 bg-blue-50 rounded-lg">
                <span className="font-medium text-blue-800">Net Monthly Savings</span>
                <span className="text-xl font-bold text-blue-900">${costAnalysis.totalSavings.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Predictive Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Predictive Maintenance Insights</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <div className="flex items-center space-x-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-yellow-600" />
              <span className="font-medium text-yellow-800">Battery Degradation Alert</span>
            </div>
            <p className="text-sm text-yellow-700">
              Phoenix Delta's battery showing 18% degradation. Replacement recommended within 2 weeks.
            </p>
          </div>
          
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <div className="flex items-center space-x-2 mb-2">
              <TrendingUp className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-blue-800">Performance Optimization</span>
            </div>
            <p className="text-sm text-blue-700">
              Falcon Alpha showing optimal performance. Consider increasing mission load by 15%.
            </p>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <div className="flex items-center space-x-2 mb-2">
              <CheckCircle className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">Fleet Health</span>
            </div>
            <p className="text-sm text-green-700">
              Overall fleet health excellent. 94.2% average battery health across all units.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}