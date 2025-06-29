import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Clock, 
  Target,
  MapPin,
  Battery,
  AlertTriangle,
  CheckCircle
} from 'lucide-react';

export function ExecutiveSummary() {
  const kpiData = [
    {
      title: 'Total Missions Completed',
      value: '1,247',
      change: '+12.5%',
      trend: 'up',
      icon: CheckCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50'
    },
    {
      title: 'Fleet Utilization Rate',
      value: '87.3%',
      change: '+5.2%',
      trend: 'up',
      icon: Battery,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50'
    },
    {
      title: 'Cost Savings vs Traditional',
      value: '$2.4M',
      change: '+18.7%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50'
    },
    {
      title: 'Average Mission Duration',
      value: '28.5 min',
      change: '-3.1%',
      trend: 'down',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50'
    }
  ];

  const coverageStats = [
    { label: 'Total Area Surveyed', value: '15,420 hectares', icon: MapPin },
    { label: 'Mission Success Rate', value: '98.7%', icon: Target },
    { label: 'Incidents Prevented', value: '47', icon: AlertTriangle },
    { label: 'Data Points Collected', value: '2.8M', icon: TrendingUp }
  ];

  return (
    <div className="space-y-8">
      {/* Key Performance Indicators */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Key Performance Indicators</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpiData.map((kpi, index) => {
            const Icon = kpi.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-3 rounded-lg ${kpi.bgColor}`}>
                    <Icon className={`w-6 h-6 ${kpi.color}`} />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm font-medium ${
                    kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendingUp className={`w-4 h-4 ${kpi.trend === 'down' ? 'rotate-180' : ''}`} />
                    <span>{kpi.change}</span>
                  </div>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 mb-1">{kpi.value}</p>
                  <p className="text-sm text-gray-600">{kpi.title}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Coverage Statistics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Coverage & Impact Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coverageStats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="p-3 bg-gray-100 rounded-full">
                    <Icon className="w-6 h-6 text-gray-600" />
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ROI Analysis */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Return on Investment Analysis</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-green-800">Cost per Traditional Survey</p>
                  <p className="text-2xl font-bold text-green-900">$8,500</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Cost per Drone Survey</p>
                  <p className="text-2xl font-bold text-green-900">$1,200</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-green-800">Savings per Mission</p>
                  <p className="text-2xl font-bold text-green-900">$7,300</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <p className="text-sm font-medium text-blue-800 mb-1">Time Reduction</p>
                  <p className="text-xl font-bold text-blue-900">75%</p>
                  <p className="text-xs text-blue-600">vs traditional methods</p>
                </div>
                <div className="p-4 bg-purple-50 rounded-lg">
                  <p className="text-sm font-medium text-purple-800 mb-1">Safety Improvement</p>
                  <p className="text-xl font-bold text-purple-900">95%</p>
                  <p className="text-xs text-purple-600">reduced risk exposure</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-4">12-Month Projection</h4>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Total Savings</span>
                <span className="font-medium">$9.1M</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">ROI</span>
                <span className="font-medium text-green-600">340%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Payback Period</span>
                <span className="font-medium">3.2 months</span>
              </div>
              <div className="flex justify-between border-t border-gray-200 pt-3">
                <span className="text-sm font-medium text-gray-900">Net Benefit</span>
                <span className="font-bold text-green-600">$6.7M</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}