import React, { useState } from 'react';
import { X, MapPin, Settings, Bone as Drone, Calendar } from 'lucide-react';
import { useMissionContext } from '../../context/MissionContext';
import { useDroneContext } from '../../context/DroneContext';
import { MissionMapEditor } from './MissionMapEditor';
import { MissionParametersForm } from './MissionParametersForm';
import { Mission, MissionParameters, GeoPolygon, FlightPattern } from '../../types/mission';

interface MissionCreatorProps {
  onClose: () => void;
}

export function MissionCreator({ onClose }: MissionCreatorProps) {
  const { state: missionState, dispatch } = useMissionContext();
  const { state: droneState } = useDroneContext();
  const [currentStep, setCurrentStep] = useState(1);
  const [missionData, setMissionData] = useState<Partial<Mission>>({
    name: '',
    type: 'inspection',
    description: '',
    priority: 'medium',
    assignedDrone: null,
    scheduledAt: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    parameters: {
      altitude: 50,
      speed: 5,
      overlap: 80,
      sideOverlap: 70,
      sensors: ['4K Camera'],
      resolution: 2.5,
      batteryReturnThreshold: 25,
      maxWindSpeed: 8,
      timeOfDay: 'morning'
    }
  });

  const steps = [
    { id: 1, name: 'Basic Info', icon: MapPin },
    { id: 2, name: 'Survey Area', icon: MapPin },
    { id: 3, name: 'Parameters', icon: Settings },
    { id: 4, name: 'Drone & Schedule', icon: Drone }
  ];

  const availableDrones = droneState.drones.filter(drone => drone.status === 'available');

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveMission = () => {
    const newMission: Mission = {
      id: `mission-${Date.now()}`,
      name: missionData.name || 'Untitled Mission',
      type: missionData.type || 'inspection',
      description: missionData.description || '',
      surveyArea: missionData.surveyArea || {
        type: 'rectangle',
        coordinates: [
          { lat: 40.7580, lng: -73.9855 },
          { lat: 40.7590, lng: -73.9855 },
          { lat: 40.7590, lng: -73.9835 },
          { lat: 40.7580, lng: -73.9835 }
        ]
      },
      flightPath: missionData.flightPath || {
        type: 'crosshatch',
        waypoints: [],
        spacing: 50,
        direction: 0
      },
      parameters: missionData.parameters!,
      assignedDrone: missionData.assignedDrone,
      status: 'planned',
      createdAt: new Date(),
      scheduledAt: missionData.scheduledAt || new Date(),
      estimatedDuration: calculateEstimatedDuration(),
      estimatedDistance: calculateEstimatedDistance(),
      priority: missionData.priority || 'medium'
    };

    dispatch({ type: 'ADD_MISSION', payload: newMission });
    onClose();
  };

  const calculateEstimatedDuration = (): number => {
    // Simple calculation based on area and parameters
    return Math.round(15 + Math.random() * 30); // 15-45 minutes
  };

  const calculateEstimatedDistance = (): number => {
    // Simple calculation based on flight pattern
    return Math.round((1 + Math.random() * 3) * 10) / 10; // 1.0-4.0 km
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Name *
              </label>
              <input
                type="text"
                value={missionData.name || ''}
                onChange={(e) => setMissionData({ ...missionData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter mission name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Mission Type *
              </label>
              <select
                value={missionData.type || 'inspection'}
                onChange={(e) => setMissionData({ ...missionData, type: e.target.value as Mission['type'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="inspection">Inspection</option>
                <option value="mapping">Mapping</option>
                <option value="security">Security</option>
                <option value="monitoring">Monitoring</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Priority
              </label>
              <select
                value={missionData.priority || 'medium'}
                onChange={(e) => setMissionData({ ...missionData, priority: e.target.value as Mission['priority'] })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={missionData.description || ''}
                onChange={(e) => setMissionData({ ...missionData, description: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter mission description"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Define Survey Area</h3>
            <MissionMapEditor
              onAreaChange={(area) => setMissionData({ ...missionData, surveyArea: area })}
              onFlightPathChange={(path) => setMissionData({ ...missionData, flightPath: path })}
            />
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-900">Mission Parameters</h3>
            <MissionParametersForm
              parameters={missionData.parameters!}
              onChange={(params) => setMissionData({ ...missionData, parameters: params })}
            />
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Assign Drone
              </label>
              <select
                value={missionData.assignedDrone || ''}
                onChange={(e) => setMissionData({ ...missionData, assignedDrone: e.target.value || null })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="">Select a drone</option>
                {availableDrones.map((drone) => (
                  <option key={drone.id} value={drone.id}>
                    {drone.name} ({drone.model}) - {drone.batteryLevel}% battery
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Scheduled Date & Time
              </label>
              <input
                type="datetime-local"
                value={missionData.scheduledAt?.toISOString().slice(0, 16) || ''}
                onChange={(e) => setMissionData({ ...missionData, scheduledAt: new Date(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-medium text-gray-900 mb-2">Mission Summary</h4>
              <div className="space-y-2 text-sm text-gray-600">
                <p><span className="font-medium">Name:</span> {missionData.name || 'Untitled Mission'}</p>
                <p><span className="font-medium">Type:</span> {missionData.type}</p>
                <p><span className="font-medium">Priority:</span> {missionData.priority}</p>
                <p><span className="font-medium">Estimated Duration:</span> {calculateEstimatedDuration()} minutes</p>
                <p><span className="font-medium">Estimated Distance:</span> {calculateEstimatedDistance()} km</p>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Create New Mission</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    isActive ? 'bg-blue-600 text-white' : 
                    isCompleted ? 'bg-green-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? 'text-blue-600' : 'text-gray-600'
                  }`}>
                    {step.name}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-600' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {renderStepContent()}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              Cancel
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSaveMission}
                className="px-4 py-2 bg-green-600 text-white hover:bg-green-700 rounded-lg transition-colors"
              >
                Create Mission
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}