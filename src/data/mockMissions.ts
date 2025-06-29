import { Mission, MissionTemplate, NoFlyZone } from '../types/mission';

export const mockMissions: Mission[] = [
  {
    id: 'mission-001',
    name: 'Solar Panel Inspection - Sector A',
    type: 'inspection',
    description: 'Routine thermal inspection of solar panels in the eastern sector',
    surveyArea: {
      type: 'rectangle',
      coordinates: [
        { lat: 40.7580, lng: -73.9855 },
        { lat: 40.7590, lng: -73.9855 },
        { lat: 40.7590, lng: -73.9835 },
        { lat: 40.7580, lng: -73.9835 }
      ]
    },
    flightPath: {
      type: 'crosshatch',
      waypoints: [],
      spacing: 50,
      direction: 0
    },
    parameters: {
      altitude: 50,
      speed: 5,
      overlap: 80,
      sideOverlap: 70,
      sensors: ['Thermal Camera', '4K Camera'],
      resolution: 2.5,
      batteryReturnThreshold: 25,
      maxWindSpeed: 8,
      timeOfDay: 'morning'
    },
    assignedDrone: 'drone-001',
    status: 'planned',
    createdAt: new Date('2024-02-01T09:00:00'),
    scheduledAt: new Date('2024-02-02T08:00:00'),
    estimatedDuration: 25,
    estimatedDistance: 2.1,
    priority: 'medium'
  },
  {
    id: 'mission-002',
    name: 'Perimeter Security Patrol',
    type: 'security',
    description: 'Daily security patrol of facility perimeter',
    surveyArea: {
      type: 'perimeter',
      coordinates: [
        { lat: 40.7128, lng: -74.0060 },
        { lat: 40.7138, lng: -74.0060 },
        { lat: 40.7138, lng: -74.0040 },
        { lat: 40.7128, lng: -74.0040 }
      ]
    },
    flightPath: {
      type: 'perimeter',
      waypoints: []
    },
    parameters: {
      altitude: 30,
      speed: 8,
      overlap: 60,
      sideOverlap: 50,
      sensors: ['4K Camera', 'Night Vision'],
      resolution: 5,
      batteryReturnThreshold: 30,
      maxWindSpeed: 12,
      timeOfDay: 'afternoon'
    },
    assignedDrone: 'drone-003',
    status: 'active',
    createdAt: new Date('2024-02-01T14:00:00'),
    scheduledAt: new Date('2024-02-01T15:00:00'),
    estimatedDuration: 18,
    estimatedDistance: 1.8,
    priority: 'high'
  }
];

export const missionTemplates: MissionTemplate[] = [
  {
    id: 'template-001',
    name: 'Solar Panel Inspection',
    type: 'inspection',
    description: 'Comprehensive thermal and visual inspection of solar installations',
    defaultParameters: {
      altitude: 50,
      speed: 5,
      overlap: 80,
      sideOverlap: 70,
      sensors: ['Thermal Camera', '4K Camera'],
      resolution: 2.5,
      batteryReturnThreshold: 25,
      maxWindSpeed: 8,
      timeOfDay: 'morning'
    },
    suggestedDroneTypes: ['DJI Matrice 300 RTK', 'DJI Matrice 30T'],
    estimatedTimePerHectare: 15
  },
  {
    id: 'template-002',
    name: 'Infrastructure Mapping',
    type: 'mapping',
    description: 'High-resolution mapping for construction and planning',
    defaultParameters: {
      altitude: 80,
      speed: 6,
      overlap: 85,
      sideOverlap: 75,
      sensors: ['4K Camera', 'LiDAR'],
      resolution: 1.5,
      batteryReturnThreshold: 20,
      maxWindSpeed: 10,
      timeOfDay: 'morning'
    },
    suggestedDroneTypes: ['DJI Matrice 300 RTK', 'Wingtra WingtraOne GEN II'],
    estimatedTimePerHectare: 20
  },
  {
    id: 'template-003',
    name: 'Security Patrol',
    type: 'security',
    description: 'Perimeter security monitoring and surveillance',
    defaultParameters: {
      altitude: 40,
      speed: 8,
      overlap: 60,
      sideOverlap: 50,
      sensors: ['4K Camera', 'Night Vision', 'Thermal Camera'],
      resolution: 5,
      batteryReturnThreshold: 30,
      maxWindSpeed: 12,
      timeOfDay: 'dusk'
    },
    suggestedDroneTypes: ['Parrot ANAFI USA', 'DJI Mavic 3 Enterprise'],
    estimatedTimePerHectare: 8
  },
  {
    id: 'template-004',
    name: 'Environmental Monitoring',
    type: 'monitoring',
    description: 'Environmental data collection and monitoring',
    defaultParameters: {
      altitude: 60,
      speed: 4,
      overlap: 70,
      sideOverlap: 60,
      sensors: ['Multispectral Camera', '4K Camera', 'Air Quality Sensor'],
      resolution: 3,
      batteryReturnThreshold: 25,
      maxWindSpeed: 6,
      timeOfDay: 'afternoon'
    },
    suggestedDroneTypes: ['DJI Matrice 300 RTK', 'Autel EVO II Pro'],
    estimatedTimePerHectare: 25
  }
];

export const noFlyZones: NoFlyZone[] = [
  {
    id: 'nfz-001',
    name: 'LaGuardia Airport',
    type: 'airport',
    coordinates: [
      { lat: 40.7769, lng: -73.8740 },
      { lat: 40.7800, lng: -73.8740 },
      { lat: 40.7800, lng: -73.8600 },
      { lat: 40.7769, lng: -73.8600 }
    ],
    altitude: 0,
    active: true,
    description: 'Major airport - no drone flights permitted'
  },
  {
    id: 'nfz-002',
    name: 'Military Installation',
    type: 'military',
    coordinates: [
      { lat: 40.7200, lng: -74.0200 },
      { lat: 40.7220, lng: -74.0200 },
      { lat: 40.7220, lng: -74.0150 },
      { lat: 40.7200, lng: -74.0150 }
    ],
    altitude: 0,
    active: true,
    description: 'Restricted military zone'
  },
  {
    id: 'nfz-003',
    name: 'Temporary Event Zone',
    type: 'temporary',
    coordinates: [
      { lat: 40.7580, lng: -73.9780 },
      { lat: 40.7590, lng: -73.9780 },
      { lat: 40.7590, lng: -73.9760 },
      { lat: 40.7580, lng: -73.9760 }
    ],
    altitude: 100,
    active: true,
    description: 'Temporary restriction for public event'
  }
];