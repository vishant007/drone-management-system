import React, { useState } from 'react';
import { Square, Circle, Hexagon as Polygon, Grid, Route, RotateCcw } from 'lucide-react';
import { GeoPolygon, FlightPattern } from '../../types/mission';

interface MissionMapEditorProps {
  onAreaChange: (area: GeoPolygon) => void;
  onFlightPathChange: (path: FlightPattern) => void;
}

export function MissionMapEditor({ onAreaChange, onFlightPathChange }: MissionMapEditorProps) {
  const [selectedTool, setSelectedTool] = useState<'rectangle' | 'circle' | 'polygon'>('rectangle');
  const [flightPattern, setFlightPattern] = useState<'crosshatch' | 'perimeter' | 'grid'>('crosshatch');
  const [spacing, setSpacing] = useState(50);
  const [direction, setDirection] = useState(0);

  const tools = [
    { id: 'rectangle', name: 'Rectangle', icon: Square },
    { id: 'circle', name: 'Circle', icon: Circle },
    { id: 'polygon', name: 'Polygon', icon: Polygon }
  ];

  const patterns = [
    { id: 'crosshatch', name: 'Crosshatch', icon: Grid },
    { id: 'perimeter', name: 'Perimeter', icon: Route },
    { id: 'grid', name: 'Grid', icon: Grid }
  ];

  const handleToolSelect = (tool: typeof selectedTool) => {
    setSelectedTool(tool);
    
    // Generate sample area based on tool
    const sampleArea: GeoPolygon = {
      type: tool,
      coordinates: [
        { lat: 40.7580, lng: -73.9855 },
        { lat: 40.7590, lng: -73.9855 },
        { lat: 40.7590, lng: -73.9835 },
        { lat: 40.7580, lng: -73.9835 }
      ]
    };
    
    if (tool === 'circle') {
      sampleArea.center = { lat: 40.7585, lng: -73.9845 };
      sampleArea.radius = 200;
    }
    
    onAreaChange(sampleArea);
  };

  const handlePatternChange = (pattern: typeof flightPattern) => {
    setFlightPattern(pattern);
    
    const flightPath: FlightPattern = {
      type: pattern,
      waypoints: [],
      spacing: spacing,
      direction: direction
    };
    
    onFlightPathChange(flightPath);
  };

  return (
    <div className="space-y-6">
      {/* Map Placeholder */}
      <div className="bg-gray-100 rounded-lg h-96 flex items-center justify-center border-2 border-dashed border-gray-300">
        <div className="text-center">
          <div className="text-gray-400 mb-2">
            <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-1.447-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <p className="text-gray-500 font-medium">Interactive Map</p>
          <p className="text-sm text-gray-400">Use tools below to define survey area</p>
        </div>
      </div>

      {/* Drawing Tools */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Survey Area Tools</h4>
        <div className="flex space-x-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => handleToolSelect(tool.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                  selectedTool === tool.id
                    ? 'bg-blue-50 border-blue-300 text-blue-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{tool.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Flight Pattern */}
      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-3">Flight Pattern</h4>
        <div className="flex space-x-2 mb-4">
          {patterns.map((pattern) => {
            const Icon = pattern.icon;
            return (
              <button
                key={pattern.id}
                onClick={() => handlePatternChange(pattern.id as any)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg border transition-colors ${
                  flightPattern === pattern.id
                    ? 'bg-green-50 border-green-300 text-green-700'
                    : 'bg-white border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{pattern.name}</span>
              </button>
            );
          })}
        </div>

        {/* Pattern Parameters */}
        {(flightPattern === 'crosshatch' || flightPattern === 'grid') && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Line Spacing (m)
              </label>
              <input
                type="number"
                value={spacing}
                onChange={(e) => setSpacing(Number(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="10"
                max="200"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Direction (°)
              </label>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  value={direction}
                  onChange={(e) => setDirection(Number(e.target.value))}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  min="0"
                  max="359"
                />
                <button
                  onClick={() => setDirection(0)}
                  className="p-2 text-gray-400 hover:text-gray-600"
                  title="Reset to 0°"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Area Info */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-2">Survey Area Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm text-blue-800">
          <div>
            <span className="font-medium">Area Type:</span> {selectedTool}
          </div>
          <div>
            <span className="font-medium">Flight Pattern:</span> {flightPattern}
          </div>
          <div>
            <span className="font-medium">Estimated Area:</span> 2.4 hectares
          </div>
          <div>
            <span className="font-medium">Flight Lines:</span> 12 lines
          </div>
        </div>
      </div>
    </div>
  );
}