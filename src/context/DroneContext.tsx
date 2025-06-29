import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Drone, FleetStats } from '../types/drone';
import { mockDrones } from '../data/mockDrones';

interface DroneState {
  drones: Drone[];
  selectedDrone: Drone | null;
  filterStatus: string;
  searchQuery: string;
  isLoading: boolean;
}

type DroneAction =
  | { type: 'SET_DRONES'; payload: Drone[] }
  | { type: 'UPDATE_DRONE'; payload: Drone }
  | { type: 'SELECT_DRONE'; payload: Drone | null }
  | { type: 'SET_FILTER'; payload: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'UPDATE_BATTERY'; payload: { id: string; batteryLevel: number } };

const initialState: DroneState = {
  drones: mockDrones,
  selectedDrone: null,
  filterStatus: 'all',
  searchQuery: '',
  isLoading: false,
};

function droneReducer(state: DroneState, action: DroneAction): DroneState {
  switch (action.type) {
    case 'SET_DRONES':
      return { ...state, drones: action.payload };
    case 'UPDATE_DRONE':
      return {
        ...state,
        drones: state.drones.map(drone =>
          drone.id === action.payload.id ? action.payload : drone
        ),
      };
    case 'SELECT_DRONE':
      return { ...state, selectedDrone: action.payload };
    case 'SET_FILTER':
      return { ...state, filterStatus: action.payload };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.payload };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'UPDATE_BATTERY':
      return {
        ...state,
        drones: state.drones.map(drone =>
          drone.id === action.payload.id
            ? { ...drone, batteryLevel: action.payload.batteryLevel }
            : drone
        ),
      };
    default:
      return state;
  }
}

interface DroneContextType {
  state: DroneState;
  dispatch: React.Dispatch<DroneAction>;
  getFleetStats: () => FleetStats;
  getFilteredDrones: () => Drone[];
}

const DroneContext = createContext<DroneContextType | undefined>(undefined);

export function DroneProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(droneReducer, initialState);

  const getFleetStats = (): FleetStats => {
    const { drones } = state;
    const totalDrones = drones.length;
    const availableDrones = drones.filter(d => d.status === 'available').length;
    const activeMissions = drones.filter(d => d.status === 'in-mission').length;
    const maintenanceRequired = drones.filter(d => d.status === 'maintenance').length;
    const totalFlightHours = drones.reduce((sum, d) => sum + d.flightHours, 0);
    const averageBatteryLevel = drones.reduce((sum, d) => sum + d.batteryLevel, 0) / totalDrones;

    return {
      totalDrones,
      availableDrones,
      activeMissions,
      maintenanceRequired,
      totalFlightHours,
      averageBatteryLevel,
    };
  };

  const getFilteredDrones = (): Drone[] => {
    let filtered = state.drones;

    // Filter by status
    if (state.filterStatus !== 'all') {
      filtered = filtered.filter(drone => drone.status === state.filterStatus);
    }

    // Filter by search query
    if (state.searchQuery) {
      const query = state.searchQuery.toLowerCase();
      filtered = filtered.filter(drone =>
        drone.name.toLowerCase().includes(query) ||
        drone.model.toLowerCase().includes(query) ||
        drone.location.name.toLowerCase().includes(query)
      );
    }

    return filtered;
  };

  return (
    <DroneContext.Provider value={{ state, dispatch, getFleetStats, getFilteredDrones }}>
      {children}
    </DroneContext.Provider>
  );
}

export function useDroneContext() {
  const context = useContext(DroneContext);
  if (context === undefined) {
    throw new Error('useDroneContext must be used within a DroneProvider');
  }
  return context;
}