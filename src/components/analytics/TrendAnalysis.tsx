import React from 'react';
import { TrendingUp, Calendar, BarChart3 } from 'lucide-react';

export function TrendAnalysis() {
  const trendData = [
    { month: 'Aug', missions: 89, efficiency: 85.2, cost: 112000 },
    { month: 'Sep', missions: 102, efficiency: 87.1, cost: 118000 },
    { month: 'Oct', missions: 124, efficiency: 89.3, cost: 125000 },
    { month: 'Nov', missions: 145, efficiency: 91.7, cost: 132000 },
    { month: 'Dec', missions: 167, efficiency: 93.2, cost: 138000 },
    { month: 'Jan', missions: 189, efficiency: 94.8, cost: 145000 }
  ];

  const insights = [
    {
      title: 'Mission Volume Growth',
      description: 'Steady 15% month-over-month increase in mission volume',
      trend: 'positive',
      icon: TrendingUp
    },
    {
      title: 'Efficiency Improvement',
      description: 'Operational efficiency improved by 9.6% over 6 months',
      trend: 'positive',
      icon: BarChart3
    },
    {
      title: 'Seasonal Patterns',
      description: 'Higher activity during Q4 due to infrastructure inspections',
      trend: 'neutral',
      icon: Calendar
    }
  ];

  const maxMissions = Math.max(...trendData.map(d => d.missions));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">6-Month Trend Analysis</h3>
      
      {/* Chart */}
      <div className="mb-8">
        <div className="flex items-end justify-between h-40 mb-4">
          {trendData.map((data, index) => (
            <div key={index} className="flex flex-col items-center space-y-2">
              <div className="flex flex-col items-center space-y-1">
                {/* Missions Bar */}
                <div
                  className="bg-blue-500 rounded-t w-8 transition-all duration-300"
                  style={{ height: `${(data.missions / maxMissions) * 120}px` }}
                ></div>
                
                {/* Efficiency Line Point */}
                <div 
                  className="w-2 h-2 bg-green-500 rounded-full"
                  style={{ marginTop: `${120 - (data.efficiency / 100) * 120}px` }}
                ></div>
              </div>
              
              <div className="text-center">
                <p className="text-xs font-medium text-gray-900">{data.month}</p>
                <p className="text-xs text-gray-500">{data.missions}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Legend */}
        <div className="flex items-center justify-center space-x-6 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded"></div>
            <span className="text-gray-600">Missions</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Efficiency %</span>
          </div>
        </div>
      </div>

      {/* Key Insights */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Key Insights</h4>
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="flex items-start space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className={`p-2 rounded-lg ${
                insight.trend === 'positive' ? 'bg-green-100' : 'bg-blue-100'
              }`}>
                <Icon className={`w-4 h-4 ${
                  insight.trend === 'positive' ? 'text-green-600' : 'text-blue-600'
                }`} />
              </div>
              <div>
                <h5 className="font-medium text-gray-900 mb-1">{insight.title}</h5>
                <p className="text-sm text-gray-600">{insight.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}