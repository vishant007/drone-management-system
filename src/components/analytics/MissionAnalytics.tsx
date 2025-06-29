import React, { useState } from 'react';
import { 
  BarChart3, 
  PieChart, 
  TrendingUp, 
  MapPin, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Calendar
} from 'lucide-react';

export function MissionAnalytics() {
  const [timeRange, setTimeRange] = useState('30d');
  const [missionType, setMissionType] = useState('all');

  const missionStats = {
    total: 1247,
    completed: 1230,
    aborted: 17,
    successRate: 98.7,
    avgDuration: 28.5,
    totalDistance: 15420
  };

  const missionTypeData = [
    { type: 'Inspection', count: 542, percentage: 43.5, color: 'bg-blue-500' },
    { type: 'Mapping', count: 387, percentage: 31.0, color: 'bg-green-500' },
    { type: 'Security', count: 201, percentage: 16.1, color: 'bg-orange-500' },
    { type: 'Monitoring', count: 117, percentage: 9.4, color: 'bg-purple-500' }
  ];

  const performanceMetrics = [
    { label: 'Average Flight Time', value: '28.5 min', trend: '+2.3%', positive: true },
    { label: 'Data Collection Rate', value: '2.4 GB/mission', trend: '+15.7%', positive: true },
    { label: 'Battery Efficiency', value: '87.3%', trend: '+5.1%', positive: true },
    { label: 'Weather Delays', value: '3.2%', trend: '-1.8%', positive: true }
  ];

  const monthlyTrends = [
    { month: 'Jan', missions: 98, success: 96.9 },
    { month: 'Feb', missions: 112, success: 97.3 },
    { month: 'Mar', missions: 134, success: 98.1 },
    { month: 'Apr', missions: 156, success: 98.7 },
    { month: 'May', missions: 178, success: 99.1 },
    { month: 'Jun', missions: 189, success: 98.9 }
  ];

  return (
    <div className="space-y-8">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center space-x-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Time Range</label>
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Mission Type</label>
            <select
              value={missionType}
              onChange={(e) => setMissionType(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="inspection">Inspection</option>
              <option value="mapping">Mapping</option>
              <option value="security">Security</option>
              <option value="monitoring">Monitoring</option>
            </select>
          </div>
        </div>
        
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          Export Report
        </button>
      </div>

      {/* Mission Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <BarChart3 className="w-5 h-5 text-blue-500" />
            <span className="text-xs text-gray-500">Total</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{missionStats.total.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Missions</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span className="text-xs text-gray-500">Completed</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{missionStats.completed.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Successful</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="w-5 h-5 text-red-500" />
            <span className="text-xs text-gray-500">Aborted</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{missionStats.aborted}</p>
          <p className="text-sm text-gray-600">Failed</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="w-5 h-5 text-purple-500" />
            <span className="text-xs text-gray-500">Success Rate</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{missionStats.successRate}%</p>
          <p className="text-sm text-gray-600">Reliability</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <Clock className="w-5 h-5 text-orange-500" />
            <span className="text-xs text-gray-500">Avg Duration</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{missionStats.avgDuration}</p>
          <p className="text-sm text-gray-600">Minutes</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <MapPin className="w-5 h-5 text-indigo-500" />
            <span className="text-xs text-gray-500">Distance</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{missionStats.totalDistance.toLocaleString()}</p>
          <p className="text-sm text-gray-600">Kilometers</p>
        </div>
      </div>

      {/* Mission Type Distribution & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Mission Type Distribution */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Mission Type Distribution</h3>
          <div className="space-y-4">
            {missionTypeData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded ${item.color}`}></div>
                  <span className="font-medium text-gray-900">{item.type}</span>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="w-32 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${item.color}`}
                      style={{ width: `${item.percentage}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-600 w-12 text-right">
                    {item.count}
                  </span>
                  <span className="text-sm text-gray-500 w-12 text-right">
                    {item.percentage}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Performance Metrics */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
          <div className="space-y-6">
            {performanceMetrics.map((metric, index) => (
              <div key={index} className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">{metric.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{metric.value}</p>
                </div>
                <div className={`flex items-center space-x-1 text-sm font-medium ${
                  metric.positive ? 'text-green-600' : 'text-red-600'
                }`}>
                  <TrendingUp className={`w-4 h-4 ${!metric.positive ? 'rotate-180' : ''}`} />
                  <span>{metric.trend}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Monthly Trends */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Monthly Mission Trends</h3>
        <div className="grid grid-cols-6 gap-4">
          {monthlyTrends.map((month, index) => (
            <div key={index} className="text-center">
              <div className="mb-4">
                <div 
                  className="bg-blue-500 rounded-t mx-auto"
                  style={{ 
                    width: '40px', 
                    height: `${(month.missions / 200) * 120}px`,
                    minHeight: '20px'
                  }}
                ></div>
                <div className="bg-gray-200 h-2 w-10 mx-auto"></div>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-900">{month.month}</p>
                <p className="text-xs text-gray-600">{month.missions} missions</p>
                <p className="text-xs text-green-600">{month.success}% success</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Mission List */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">Recent Mission Details</h3>
          <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
            View All Missions
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900">Mission</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Type</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Duration</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Distance</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900">Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Solar Panel Inspection A1', type: 'Inspection', duration: '32 min', distance: '2.4 km', status: 'Completed', date: '2024-02-01' },
                { name: 'Perimeter Security Patrol', type: 'Security', duration: '18 min', distance: '1.8 km', status: 'Completed', date: '2024-02-01' },
                { name: 'Infrastructure Mapping B2', type: 'Mapping', duration: '45 min', distance: '3.7 km', status: 'Completed', date: '2024-01-31' },
                { name: 'Environmental Monitoring', type: 'Monitoring', duration: '28 min', distance: '2.1 km', status: 'Aborted', date: '2024-01-31' },
                { name: 'Wind Farm Inspection', type: 'Inspection', duration: '41 min', distance: '4.2 km', status: 'Completed', date: '2024-01-30' }
              ].map((mission, index) => (
                <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{mission.name}</td>
                  <td className="py-3 px-4 text-gray-600">{mission.type}</td>
                  <td className="py-3 px-4 text-gray-600">{mission.duration}</td>
                  <td className="py-3 px-4 text-gray-600">{mission.distance}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      mission.status === 'Completed' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {mission.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-gray-600">{mission.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}