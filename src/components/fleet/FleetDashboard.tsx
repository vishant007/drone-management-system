import React, { useEffect } from 'react';
import { useDroneContext } from '../../context/DroneContext';
import { FleetStats } from './FleetStats';
import { DroneFilters } from './DroneFilters';
import { DroneCard } from './DroneCard';
import { DroneDetailModal } from './DroneDetailModal';

export function FleetDashboard() {
  const { state, dispatch, getFleetStats, getFilteredDrones } = useDroneContext();
  const fleetStats = getFleetStats();
  const filteredDrones = getFilteredDrones();

  // Simulate real-time battery updates
  useEffect(() => {
    const interval = setInterval(() => {
      const activeDrones = state.drones.filter(d => d.status === 'in-mission');
      if (activeDrones.length > 0) {
        const randomDrone = activeDrones[Math.floor(Math.random() * activeDrones.length)];
        const batteryChange = Math.random() * 2 - 1; // -1 to +1
        const newBatteryLevel = Math.max(0, Math.min(100, randomDrone.batteryLevel + batteryChange));
        
        dispatch({
          type: 'UPDATE_BATTERY',
          payload: { id: randomDrone.id, batteryLevel: Math.round(newBatteryLevel) }
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [state.drones, dispatch]);

  const handleDroneClick = (drone: any) => {
    dispatch({ type: 'SELECT_DRONE', payload: drone });
  };

  const handleCloseModal = () => {
    dispatch({ type: 'SELECT_DRONE', payload: null });
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Fleet Dashboard</h1>
          <p className="text-gray-600">Monitor and manage your drone fleet in real-time</p>
        </div>

        {/* Fleet Statistics */}
        <FleetStats stats={fleetStats} />

        {/* Filters */}
        <DroneFilters
          searchQuery={state.searchQuery}
          onSearchChange={(query) => dispatch({ type: 'SET_SEARCH', payload: query })}
          filterStatus={state.filterStatus}
          onFilterChange={(status) => dispatch({ type: 'SET_FILTER', payload: status })}
          droneCount={filteredDrones.length}
        />

        {/* Drone Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredDrones.map((drone) => (
            <DroneCard
              key={drone.id}
              drone={drone}
              onClick={() => handleDroneClick(drone)}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredDrones.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.47-.881-6.08-2.33" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No drones found</h3>
            <p className="text-gray-500">Try adjusting your search or filter criteria</p>
          </div>
        )}

        {/* Drone Detail Modal */}
        <DroneDetailModal
          drone={state.selectedDrone}
          isOpen={!!state.selectedDrone}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
}