import React from 'react';
import { MissionParameters } from '../../types/mission';

interface MissionParametersFormProps {
  parameters: MissionParameters;
  onChange: (parameters: MissionParameters) => void;
}

export function MissionParametersForm({ parameters, onChange }: MissionParametersFormProps) {
  const handleChange = (field: keyof MissionParameters, value: any) => {
    onChange({ ...parameters, [field]: value });
  };

  const handleSensorChange = (sensor: string, checked: boolean) => {
    const newSensors = checked
      ? [...parameters.sensors, sensor]
      : parameters.sensors.filter(s => s !== sensor);
    handleChange('sensors', newSensors);
  };

  const availableSensors = [
    '4K Camera',
    'Thermal Camera',
    'LiDAR',
    'Multispectral Camera',
    'Night Vision',
    'Zoom Camera',
    'Air Quality Sensor'
  ];

  return (
    <div className="space-y-6">
      {/* Flight Parameters */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Altitude (m)
          </label>
          <input
            type="number"
            value={parameters.altitude}
            onChange={(e) => handleChange('altitude', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="10"
            max="400"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Speed (m/s)
          </label>
          <input
            type="number"
            value={parameters.speed}
            onChange={(e) => handleChange('speed', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
            max="20"
            step="0.1"
          />
        </div>
      </div>

      {/* Overlap Parameters */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Forward Overlap (%)
          </label>
          <input
            type="number"
            value={parameters.overlap}
            onChange={(e) => handleChange('overlap', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="50"
            max="95"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Side Overlap (%)
          </label>
          <input
            type="number"
            value={parameters.sideOverlap}
            onChange={(e) => handleChange('sideOverlap', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="30"
            max="85"
          />
        </div>
      </div>

      {/* Resolution and Safety */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resolution (cm/pixel)
          </label>
          <input
            type="number"
            value={parameters.resolution}
            onChange={(e) => handleChange('resolution', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="0.5"
            max="10"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Battery Return Threshold (%)
          </label>
          <input
            type="number"
            value={parameters.batteryReturnThreshold}
            onChange={(e) => handleChange('batteryReturnThreshold', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="15"
            max="50"
          />
        </div>
      </div>

      {/* Weather and Time */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Max Wind Speed (m/s)
          </label>
          <input
            type="number"
            value={parameters.maxWindSpeed}
            onChange={(e) => handleChange('maxWindSpeed', Number(e.target.value))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="3"
            max="15"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Time of Day
          </label>
          <select
            value={parameters.timeOfDay}
            onChange={(e) => handleChange('timeOfDay', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="dawn">Dawn</option>
            <option value="morning">Morning</option>
            <option value="afternoon">Afternoon</option>
            <option value="dusk">Dusk</option>
            <option value="night">Night</option>
          </select>
        </div>
      </div>

      {/* Sensors */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Sensors
        </label>
        <div className="grid grid-cols-2 gap-3">
          {availableSensors.map((sensor) => (
            <label key={sensor} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={parameters.sensors.includes(sensor)}
                onChange={(e) => handleSensorChange(sensor, e.target.checked)}
                className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{sensor}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Parameter Summary */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="font-medium text-gray-900 mb-2">Parameter Summary</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
          <div>
            <span className="font-medium">Flight Altitude:</span> {parameters.altitude}m
          </div>
          <div>
            <span className="font-medium">Flight Speed:</span> {parameters.speed}m/s
          </div>
          <div>
            <span className="font-medium">Image Overlap:</span> {parameters.overlap}% / {parameters.sideOverlap}%
          </div>
          <div>
            <span className="font-medium">Ground Resolution:</span> {parameters.resolution}cm/px
          </div>
          <div>
            <span className="font-medium">Active Sensors:</span> {parameters.sensors.length}
          </div>
          <div>
            <span className="font-medium">Safety Threshold:</span> {parameters.batteryReturnThreshold}% battery
          </div>
        </div>
      </div>
    </div>
  );
}