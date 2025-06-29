import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Mission, MissionTemplate, NoFlyZone, WeatherCondition } from '../types/mission';
import { mockMissions, missionTemplates, noFlyZones } from '../data/mockMissions';

interface MissionState {
  missions: Mission[];
  templates: MissionTemplate[];
  noFlyZones: NoFlyZone[];
  selectedMission: Mission | null;
  currentWeather: WeatherCondition;
  isCreatingMission: boolean;
  missionDraft: Partial<Mission> | null;
}

type MissionAction =
  | { type: 'SET_MISSIONS'; payload: Mission[] }
  | { type: 'ADD_MISSION'; payload: Mission }
  | { type: 'UPDATE_MISSION'; payload: Mission }
  | { type: 'DELETE_MISSION'; payload: string }
  | { type: 'SELECT_MISSION'; payload: Mission | null }
  | { type: 'SET_CREATING_MISSION'; payload: boolean }
  | { type: 'SET_MISSION_DRAFT'; payload: Partial<Mission> | null }
  | { type: 'UPDATE_WEATHER'; payload: WeatherCondition };

const initialWeather: WeatherCondition = {
  temperature: 22,
  windSpeed: 3.2,
  windDirection: 180,
  humidity: 65,
  visibility: 15,
  conditions: 'clear',
  suitable: true
};

const initialState: MissionState = {
  missions: mockMissions,
  templates: missionTemplates,
  noFlyZones: noFlyZones,
  selectedMission: null,
  currentWeather: initialWeather,
  isCreatingMission: false,
  missionDraft: null
};

function missionReducer(state: MissionState, action: MissionAction): MissionState {
  switch (action.type) {
    case 'SET_MISSIONS':
      return { ...state, missions: action.payload };
    case 'ADD_MISSION':
      return { ...state, missions: [...state.missions, action.payload] };
    case 'UPDATE_MISSION':
      return {
        ...state,
        missions: state.missions.map(mission =>
          mission.id === action.payload.id ? action.payload : mission
        ),
      };
    case 'DELETE_MISSION':
      return {
        ...state,
        missions: state.missions.filter(mission => mission.id !== action.payload),
      };
    case 'SELECT_MISSION':
      return { ...state, selectedMission: action.payload };
    case 'SET_CREATING_MISSION':
      return { ...state, isCreatingMission: action.payload };
    case 'SET_MISSION_DRAFT':
      return { ...state, missionDraft: action.payload };
    case 'UPDATE_WEATHER':
      return { ...state, currentWeather: action.payload };
    default:
      return state;
  }
}

interface MissionContextType {
  state: MissionState;
  dispatch: React.Dispatch<MissionAction>;
  getMissionsByStatus: (status: Mission['status']) => Mission[];
  getMissionsByType: (type: Mission['type']) => Mission[];
  getAvailableDrones: () => string[];
  calculateMissionStats: () => {
    totalMissions: number;
    activeMissions: number;
    completedMissions: number;
    plannedMissions: number;
  };
}

const MissionContext = createContext<MissionContextType | undefined>(undefined);

export function MissionProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(missionReducer, initialState);

  const getMissionsByStatus = (status: Mission['status']): Mission[] => {
    return state.missions.filter(mission => mission.status === status);
  };

  const getMissionsByType = (type: Mission['type']): Mission[] => {
    return state.missions.filter(mission => mission.type === type);
  };

  const getAvailableDrones = (): string[] => {
    // This would typically come from the drone context
    return ['drone-001', 'drone-003', 'drone-005', 'drone-007', 'drone-009', 'drone-012'];
  };

  const calculateMissionStats = () => {
    const totalMissions = state.missions.length;
    const activeMissions = getMissionsByStatus('active').length;
    const completedMissions = getMissionsByStatus('completed').length;
    const plannedMissions = getMissionsByStatus('planned').length;

    return {
      totalMissions,
      activeMissions,
      completedMissions,
      plannedMissions
    };
  };

  return (
    <MissionContext.Provider value={{
      state,
      dispatch,
      getMissionsByStatus,
      getMissionsByType,
      getAvailableDrones,
      calculateMissionStats
    }}>
      {children}
    </MissionContext.Provider>
  );
}

export function useMissionContext() {
  const context = useContext(MissionContext);
  if (context === undefined) {
    throw new Error('useMissionContext must be used within a MissionProvider');
  }
  return context;
}