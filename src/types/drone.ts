export interface Drone {
  id: string;
  name: string;
  model: string;
  batteryLevel: number;
  status: 'available' | 'in-mission' | 'maintenance' | 'offline';
  location: {
    lat: number;
    lng: number;
    name: string;
  };
  flightHours: number;
  lastMaintenance: Date;
  capabilities: string[];
  maxFlightTime: number;
  maxRange: number;
  payloadCapacity: number;
}

export interface FleetStats {
  totalDrones: number;
  availableDrones: number;
  activeMissions: number;
  maintenanceRequired: number;
  totalFlightHours: number;
  averageBatteryLevel: number;
}