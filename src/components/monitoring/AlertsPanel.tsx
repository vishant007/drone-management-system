import React from 'react';
import { 
  AlertTriangle, 
  Battery, 
  Wifi, 
  Wind, 
  Clock,
  X,
  CheckCircle
} from 'lucide-react';

interface Alert {
  id: string;
  type: 'warning' | 'error' | 'info';
  title: string;
  message: string;
  timestamp: Date;
  missionId?: string;
  droneId?: string;
  acknowledged: boolean;
}

interface AlertsPanelProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
  onDismiss: (alertId: string) => void;
}

export function AlertsPanel({ alerts, onAcknowledge, onDismiss }: AlertsPanelProps) {
  const getAlertIcon = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return <AlertTriangle className="w-4 h-4 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-4 h-4 text-orange-500" />;
      case 'info':
        return <CheckCircle className="w-4 h-4 text-blue-500" />;
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getAlertColor = (type: Alert['type']) => {
    switch (type) {
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-orange-50 border-orange-200';
      case 'info':
        return 'bg-blue-50 border-blue-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  const unacknowledgedAlerts = alerts.filter(alert => !alert.acknowledged);
  const acknowledgedAlerts = alerts.filter(alert => alert.acknowledged);

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">System Alerts</h3>
        <div className="flex items-center space-x-2">
          {unacknowledgedAlerts.length > 0 && (
            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
              {unacknowledgedAlerts.length} new
            </span>
          )}
        </div>
      </div>

      <div className="space-y-3 max-h-80 overflow-y-auto">
        {/* Unacknowledged Alerts */}
        {unacknowledgedAlerts.map((alert) => (
          <div
            key={alert.id}
            className={`border rounded-lg p-4 ${getAlertColor(alert.type)}`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                {getAlertIcon(alert.type)}
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{alert.title}</h4>
                  <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span>{alert.timestamp.toLocaleTimeString()}</span>
                    {alert.missionId && (
                      <span>Mission: {alert.missionId}</span>
                    )}
                    {alert.droneId && (
                      <span>Drone: {alert.droneId}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2 ml-4">
                <button
                  onClick={() => onAcknowledge(alert.id)}
                  className="px-2 py-1 bg-white hover:bg-gray-50 border border-gray-300 rounded text-xs transition-colors"
                >
                  Acknowledge
                </button>
                <button
                  onClick={() => onDismiss(alert.id)}
                  className="p-1 hover:bg-white rounded transition-colors"
                >
                  <X className="w-3 h-3 text-gray-400" />
                </button>
              </div>
            </div>
          </div>
        ))}

        {/* Acknowledged Alerts */}
        {acknowledgedAlerts.length > 0 && (
          <>
            <div className="border-t border-gray-200 pt-3 mt-4">
              <h4 className="text-sm font-medium text-gray-500 mb-3">Acknowledged</h4>
            </div>
            {acknowledgedAlerts.slice(0, 3).map((alert) => (
              <div
                key={alert.id}
                className="border border-gray-200 rounded-lg p-3 bg-gray-50 opacity-75"
              >
                <div className="flex items-start space-x-3">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-700 text-sm">{alert.title}</h4>
                    <p className="text-xs text-gray-500 mt-1">{alert.message}</p>
                    <div className="text-xs text-gray-400 mt-1">
                      {alert.timestamp.toLocaleTimeString()} • Acknowledged
                    </div>
                  </div>
                  <button
                    onClick={() => onDismiss(alert.id)}
                    className="p-1 hover:bg-gray-200 rounded transition-colors"
                  >
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </>
        )}

        {/* Empty State */}
        {alerts.length === 0 && (
          <div className="text-center py-8">
            <CheckCircle className="mx-auto h-8 w-8 text-green-500 mb-2" />
            <h4 className="text-sm font-medium text-gray-900 mb-1">All Clear</h4>
            <p className="text-sm text-gray-500">No active alerts at this time</p>
          </div>
        )}
      </div>
    </div>
  );
}