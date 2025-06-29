import { Drone } from '../types/drone';

export const mockDrones: Drone[] = [
  {
    id: 'drone-001',
    name: 'Falcon Alpha',
    model: 'DJI Matrice 300 RTK',
    batteryLevel: 87,
    status: 'available',
    location: {
      lat: 40.7128,
      lng: -74.0060,
      name: 'New York HQ'
    },
    flightHours: 245.5,
    lastMaintenance: new Date('2024-01-15'),
    capabilities: ['4K Camera', 'LiDAR', 'Thermal Imaging', 'RTK GPS'],
    maxFlightTime: 55,
    maxRange: 15,
    payloadCapacity: 2.7
  },
  {
    id: 'drone-002',
    name: 'Eagle Beta',
    model: 'Autel EVO II Pro',
    batteryLevel: 23,
    status: 'in-mission',
    location: {
      lat: 34.0522,
      lng: -118.2437,
      name: 'Los Angeles Facility'
    },
    flightHours: 189.2,
    lastMaintenance: new Date('2024-01-20'),
    capabilities: ['6K Camera', 'Obstacle Avoidance', 'Night Vision'],
    maxFlightTime: 40,
    maxRange: 9,
    payloadCapacity: 1.8
  },
  {
    id: 'drone-003',
    name: 'Hawk Gamma',
    model: 'Skydio 2+',
    batteryLevel: 95,
    status: 'available',
    location: {
      lat: 41.8781,
      lng: -87.6298,
      name: 'Chicago Distribution Center'
    },
    flightHours: 156.8,
    lastMaintenance: new Date('2024-01-10'),
    capabilities: ['AI Tracking', '4K HDR', 'Autonomous Flight'],
    maxFlightTime: 27,
    maxRange: 3.5,
    payloadCapacity: 0.5
  },
  {
    id: 'drone-004',
    name: 'Phoenix Delta',
    model: 'DJI Phantom 4 RTK',
    batteryLevel: 67,
    status: 'maintenance',
    location: {
      lat: 29.7604,
      lng: -95.3698,
      name: 'Houston Refinery'
    },
    flightHours: 312.1,
    lastMaintenance: new Date('2023-12-28'),
    capabilities: ['RTK GPS', 'Photogrammetry', 'Survey Grade'],
    maxFlightTime: 30,
    maxRange: 7,
    payloadCapacity: 1.4
  },
  {
    id: 'drone-005',
    name: 'Raven Epsilon',
    model: 'Parrot ANAFI USA',
    batteryLevel: 78,
    status: 'available',
    location: {
      lat: 47.6062,
      lng: -122.3321,
      name: 'Seattle Tech Campus'
    },
    flightHours: 98.7,
    lastMaintenance: new Date('2024-01-25'),
    capabilities: ['Zoom Camera', 'Thermal', 'Secure Communications'],
    maxFlightTime: 32,
    maxRange: 4,
    payloadCapacity: 0.7
  },
  {
    id: 'drone-006',
    name: 'Osprey Zeta',
    model: 'DJI Mavic 3 Enterprise',
    batteryLevel: 45,
    status: 'in-mission',
    location: {
      lat: 25.7617,
      lng: -80.1918,
      name: 'Miami Port Authority'
    },
    flightHours: 203.4,
    lastMaintenance: new Date('2024-01-18'),
    capabilities: ['Hasselblad Camera', 'RTK', 'Spotlight', 'Speaker'],
    maxFlightTime: 45,
    maxRange: 15,
    payloadCapacity: 0.9
  },
  {
    id: 'drone-007',
    name: 'Condor Eta',
    model: 'Yuneec H520E',
    batteryLevel: 91,
    status: 'available',
    location: {
      lat: 39.7392,
      lng: -104.9903,
      name: 'Denver Operations'
    },
    flightHours: 167.9,
    lastMaintenance: new Date('2024-01-22'),
    capabilities: ['E90 Camera', 'Infrared', 'Long Range'],
    maxFlightTime: 28,
    maxRange: 2,
    payloadCapacity: 1.2
  },
  {
    id: 'drone-008',
    name: 'Vulture Theta',
    model: 'Freefly Alta X',
    batteryLevel: 12,
    status: 'offline',
    location: {
      lat: 33.4484,
      lng: -112.0740,
      name: 'Phoenix Solar Farm'
    },
    flightHours: 445.6,
    lastMaintenance: new Date('2023-12-15'),
    capabilities: ['Heavy Lift', 'Custom Payloads', 'Professional Cinema'],
    maxFlightTime: 35,
    maxRange: 8,
    payloadCapacity: 15.0
  },
  {
    id: 'drone-009',
    name: 'Kestrel Iota',
    model: 'DJI Mini 3 Pro',
    batteryLevel: 83,
    status: 'available',
    location: {
      lat: 36.1627,
      lng: -86.7816,
      name: 'Nashville Logistics Hub'
    },
    flightHours: 87.3,
    lastMaintenance: new Date('2024-01-28'),
    capabilities: ['4K/60fps', 'Obstacle Sensing', 'ActiveTrack'],
    maxFlightTime: 34,
    maxRange: 12,
    payloadCapacity: 0.2
  },
  {
    id: 'drone-010',
    name: 'Sparrow Kappa',
    model: 'Autel Robotics X-Star',
    batteryLevel: 56,
    status: 'available',
    location: {
      lat: 32.7767,
      lng: -96.7970,
      name: 'Dallas Manufacturing'
    },
    flightHours: 134.2,
    lastMaintenance: new Date('2024-01-12'),
    capabilities: ['Starpoint GPS', '4K UHD', 'Beginner Mode'],
    maxFlightTime: 25,
    maxRange: 2,
    payloadCapacity: 0.6
  },
  {
    id: 'drone-011',
    name: 'Peregrine Lambda',
    model: 'DJI Matrice 30T',
    batteryLevel: 72,
    status: 'maintenance',
    location: {
      lat: 42.3601,
      lng: -71.0589,
      name: 'Boston Research Lab'
    },
    flightHours: 278.9,
    lastMaintenance: new Date('2024-01-05'),
    capabilities: ['Thermal Camera', 'Zoom Camera', 'Wide Camera', 'Laser Rangefinder'],
    maxFlightTime: 41,
    maxRange: 15,
    payloadCapacity: 0.9
  },
  {
    id: 'drone-012',
    name: 'Albatross Mu',
    model: 'Wingtra WingtraOne GEN II',
    batteryLevel: 88,
    status: 'available',
    location: {
      lat: 37.7749,
      lng: -122.4194,
      name: 'San Francisco Innovation Center'
    },
    flightHours: 201.7,
    lastMaintenance: new Date('2024-01-30'),
    capabilities: ['VTOL', 'Survey Grade', 'PPK/RTK', 'Long Range'],
    maxFlightTime: 59,
    maxRange: 20,
    payloadCapacity: 1.5
  }
];