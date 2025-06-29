import React, { useState } from 'react';
import { Bone as Drone, Settings, Bell, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const navigationItems = [
  { id: 'dashboard', label: 'Fleet Dashboard' },
  { id: 'planning', label: 'Mission Planning' },
  { id: 'monitoring', label: 'Live Monitoring' },
  { id: 'analytics', label: 'Analytics' },
];

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleUserMenuClick = (page: string) => {
    onTabChange(page);
    setShowUserMenu(false);
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Title */}
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-lg">
              <Drone className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">SkyCommand</h1>
              <p className="text-sm text-gray-500">Autonomous Fleet Control</p>
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onTabChange(item.id)}
                className={`font-medium pb-4 border-b-2 transition-colors ${
                  activeTab === item.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-500 hover:text-gray-700 border-transparent hover:border-gray-300'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <select
              value={activeTab}
              onChange={(e) => onTabChange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {navigationItems.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => onTabChange('notifications')}
              className={`p-2 relative transition-colors ${
                activeTab === 'notifications' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-400 hover:text-gray-600'
              } rounded-lg`}
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
            </button>
            
            <button 
              onClick={() => onTabChange('settings')}
              className={`p-2 transition-colors ${
                activeTab === 'settings' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-400 hover:text-gray-600'
              } rounded-lg`}
            >
              <Settings className="w-5 h-5" />
            </button>
            
            <div className="relative">
              <button 
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center space-x-2 p-2 transition-colors rounded-lg ${
                  activeTab === 'profile' || showUserMenu
                    ? 'text-blue-600 bg-blue-50' 
                    : 'text-gray-700 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                  TC
                </div>
                <span className="hidden sm:block text-sm font-medium">Tom Cruise</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
                  <button
                    onClick={() => handleUserMenuClick('profile')}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </button>
                  <button
                    onClick={() => handleUserMenuClick('settings')}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </button>
                  <button
                    onClick={() => handleUserMenuClick('notifications')}
                    className="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <Bell className="w-4 h-4" />
                    <span>Notifications</span>
                  </button>
                  <hr className="my-1" />
                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}