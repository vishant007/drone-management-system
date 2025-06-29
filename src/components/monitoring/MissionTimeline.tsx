import React from 'react';
import { 
  Clock, 
  Play, 
  Pause, 
  CheckCircle, 
  AlertTriangle,
  MapPin,
  Battery
} from 'lucide-react';
import { Mission } from '../../types/mission';

interface TimelineEvent {
  id: string;
  missionId: string;
  type: 'start' | 'waypoint' | 'pause' | 'resume' | 'complete' | 'abort' | 'alert';
  title: string;
  description: string;
  timestamp: Date;
  status?: 'success' | 'warning' | 'error';
}

interface MissionTimelineProps {
  missions: Mission[];
  events: TimelineEvent[];
}

export function MissionTimeline({ missions, events }: MissionTimelineProps) {
  const getEventIcon = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'start':
        return <Play className="w-4 h-4 text-green-500" />;
      case 'pause':
        return <Pause className="w-4 h-4 text-orange-500" />;
      case 'resume':
        return <Play className="w-4 h-4 text-blue-500" />;
      case 'complete':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'abort':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'waypoint':
        return <MapPin className="w-4 h-4 text-blue-500" />;
      case 'alert':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      default:
        return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  const getEventColor = (type: TimelineEvent['type']) => {
    switch (type) {
      case 'start':
      case 'complete':
        return 'border-green-200 bg-green-50';
      case 'pause':
      case 'alert':
        return 'border-orange-200 bg-orange-50';
      case 'abort':
        return 'border-red-200 bg-red-50';
      case 'resume':
      case 'waypoint':
        return 'border-blue-200 bg-blue-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  const getMissionName = (missionId: string) => {
    const mission = missions.find(m => m.id === missionId);
    return mission ? mission.name : 'Unknown Mission';
  };

  const sortedEvents = [...events].sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Mission Timeline</h3>
        <div className="text-sm text-gray-500">
          Last 24 hours
        </div>
      </div>

      <div className="space-y-4 max-h-80 overflow-y-auto">
        {sortedEvents.map((event, index) => (
          <div key={event.id} className="flex items-start space-x-4">
            {/* Timeline Line */}
            <div className="flex flex-col items-center">
              <div className={`p-2 rounded-full border-2 ${getEventColor(event.type)}`}>
                {getEventIcon(event.type)}
              </div>
              {index < sortedEvents.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-200 mt-2"></div>
              )}
            </div>

            {/* Event Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-900">{event.title}</h4>
                <span className="text-xs text-gray-500">
                  {event.timestamp.toLocaleTimeString()}
                </span>
              </div>
              <p className="text-sm text-gray-600 mt-1">{event.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs text-gray-500">
                  {getMissionName(event.missionId)}
                </span>
                {event.status && (
                  <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                    event.status === 'success' ? 'bg-green-100 text-green-800' :
                    event.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {event.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Empty State */}
        {sortedEvents.length === 0 && (
          <div className="text-center py-8">
            <Clock className="mx-auto h-8 w-8 text-gray-400 mb-2" />
            <h4 className="text-sm font-medium text-gray-900 mb-1">No Recent Activity</h4>
            <p className="text-sm text-gray-500">Mission events will appear here</p>
          </div>
        )}
      </div>
    </div>
  );
}