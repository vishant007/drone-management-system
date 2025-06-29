import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

export function PerformanceMetrics() {
  const metrics = [
    {
      name: 'Mission Success Rate',
      current: 98.7,
      previous: 97.2,
      unit: '%',
      trend: 'up'
    },
    {
      name: 'Average Flight Time',
      current: 28.5,
      previous: 29.8,
      unit: 'min',
      trend: 'down'
    },
    {
      name: 'Fleet Utilization',
      current: 87.3,
      previous: 84.1,
      unit: '%',
      trend: 'up'
    },
    {
      name: 'Cost per Mission',
      current: 1250,
      previous: 1340,
      unit: '$',
      trend: 'down'
    },
    {
      name: 'Data Collection Rate',
      current: 2.4,
      previous: 2.1,
      unit: 'GB/mission',
      trend: 'up'
    },
    {
      name: 'Maintenance Frequency',
      current: 12.5,
      previous: 14.2,
      unit: 'days',
      trend: 'down'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  const getTrendColor = (trend: string, isPositive: boolean) => {
    if (trend === 'up') {
      return isPositive ? 'text-green-600' : 'text-red-600';
    } else if (trend === 'down') {
      return isPositive ? 'text-red-600' : 'text-green-600';
    }
    return 'text-gray-600';
  };

  const calculateChange = (current: number, previous: number) => {
    const change = ((current - previous) / previous) * 100;
    return Math.abs(change).toFixed(1);
  };

  const isPositiveMetric = (name: string) => {
    return !name.toLowerCase().includes('cost') && !name.toLowerCase().includes('frequency');
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Metrics</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {metrics.map((metric, index) => {
          const change = calculateChange(metric.current, metric.previous);
          const isPositive = isPositiveMetric(metric.name);
          
          return (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium text-gray-700">{metric.name}</h4>
                {getTrendIcon(metric.trend)}
              </div>
              
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-2xl font-bold text-gray-900">
                    {metric.unit === '$' ? '$' : ''}{metric.current.toLocaleString()}{metric.unit !== '$' ? metric.unit : ''}
                  </p>
                  <p className="text-xs text-gray-500">
                    Previous: {metric.unit === '$' ? '$' : ''}{metric.previous.toLocaleString()}{metric.unit !== '$' ? metric.unit : ''}
                  </p>
                </div>
                
                <div className={`text-sm font-medium ${getTrendColor(metric.trend, isPositive)}`}>
                  {metric.trend === 'up' ? '+' : '-'}{change}%
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}