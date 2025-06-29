export interface Mission {
  id: string;
  name: string;
  type: 'inspection' | 'mapping' | 'security' | 'monitoring';
  description?: string;
  surveyArea: GeoPolygon;
  flightPath: FlightPattern;
  parameters: MissionParameters;
  assignedDrone: string | null;
  status: 'planned' | 'active' | 'completed' | 'aborted';
  createdAt: Date;
  scheduledAt: Date;
  estimatedDuration: number; // in minutes
  estimatedDistance: number; // in kilometers
  priority: 'low' | 'medium' | 'high' | 'critical';
  weather?: WeatherCondition;
}

export interface GeoPolygon {
  type: 'polygon' | 'rectangle' | 'circle';
  coordinates: LatLng[];
  center?: LatLng;
  radius?: number; // for circle type
}

export interface LatLng {
  lat: number;
  lng: number;
}

export interface FlightPattern {
  type: 'crosshatch' | 'perimeter' | 'custom' | 'grid';
  waypoints: Waypoint[];
  spacing?: number; // meters between lines for crosshatch/grid
  direction?: number; // degrees for crosshatch pattern
}

export interface Waypoint {
  lat: number;
  lng: number;
  altitude: number;
  speed?: number;
  action?: 'photo' | 'video' | 'hover' | 'scan';
  duration?: number; // seconds to hover
}

export interface MissionParameters {
  altitude: number; // meters
  speed: number; // m/s
  overlap: number; // percentage
  sideOverlap: number; // percentage
  sensors: string[];
  resolution: number; // cm/pixel
  batteryReturnThreshold: number; // percentage
  maxWindSpeed: number; // m/s
  timeOfDay: 'dawn' | 'morning' | 'afternoon' | 'dusk' | 'night';
}

export interface WeatherCondition {
  temperature: number; // Celsius
  windSpeed: number; // m/s
  windDirection: number; // degrees
  humidity: number; // percentage
  visibility: number; // km
  conditions: 'clear' | 'cloudy' | 'rain' | 'fog' | 'snow';
  suitable: boolean;
}

export interface MissionTemplate {
  id: string;
  name: string;
  type: Mission['type'];
  description: string;
  defaultParameters: MissionParameters;
  suggestedDroneTypes: string[];
  estimatedTimePerHectare: number; // minutes
}

export interface NoFlyZone {
  id: string;
  name: string;
  type: 'airport' | 'military' | 'restricted' | 'temporary';
  coordinates: LatLng[];
  altitude: number; // max altitude in meters
  active: boolean;
  description?: string;
}