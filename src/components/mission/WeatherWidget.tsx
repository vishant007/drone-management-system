import React from 'react';
import { Cloud, Sun, CloudRain, Wind, Thermometer, Eye } from 'lucide-react';
import { WeatherCondition } from '../../types/mission';

interface WeatherWidgetProps {
  weather: WeatherCondition;
}

export function WeatherWidget({ weather }: WeatherWidgetProps) {
  const getWeatherIcon = () => {
    switch (weather.conditions) {
      case 'clear':
        return <Sun className="w-5 h-5 text-yellow-500" />;
      case 'cloudy':
        return <Cloud className="w-5 h-5 text-gray-500" />;
      case 'rain':
        return <CloudRain className="w-5 h-5 text-blue-500" />;
      default:
        return <Sun className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getSuitabilityColor = () => {
    return weather.suitable ? 'text-green-600' : 'text-red-600';
  };

  const getSuitabilityBg = () => {
    return weather.suitable ? 'bg-green-50' : 'bg-red-50';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 min-w-[280px]">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {getWeatherIcon()}
          <span className="font-medium text-gray-900 capitalize">{weather.conditions}</span>
        </div>
        <div className={`px-2 py-1 rounded-full text-xs font-medium ${getSuitabilityColor()} ${getSuitabilityBg()}`}>
          {weather.suitable ? 'SUITABLE' : 'UNSUITABLE'}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <Thermometer className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{weather.temperature}°C</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Wind className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{weather.windSpeed} m/s</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Eye className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{weather.visibility} km</span>
        </div>
        
        <div className="flex items-center space-x-2">
          <Cloud className="w-4 h-4 text-gray-400" />
          <span className="text-gray-600">{weather.humidity}% RH</span>
        </div>
      </div>
    </div>
  );
}