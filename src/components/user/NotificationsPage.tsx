import React, { useState } from 'react';
import { 
  Bell, 
  BellOff, 
  Check, 
  X, 
  AlertTriangle, 
  Info, 
  CheckCircle,
  Clock,
  Settings,
  Filter,
  MoreVertical,
  Archive,
  Trash2
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'alert' | 'info' | 'success' | 'warning';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  category: 'mission' | 'fleet' | 'system' | 'maintenance';
  priority: 'low' | 'medium' | 'high' | 'critical';
  actionRequired?: boolean;
}

export function NotificationsPage() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: 'notif-1',
      type: 'alert',
      title: 'Low Battery Alert',
      message: 'Drone Eagle Beta battery level has dropped to 15%. Return to base recommended.',
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
      read: false,
      category: 'fleet',
      priority: 'high',
      actionRequired: true
    },
    {
      id: 'notif-2',
      type: 'success',
      title: 'Mission Completed',
      message: 'Solar Panel Inspection - Sector A has been completed successfully. 247 images captured.',
      timestamp: new Date(Date.now() - 15 * 60 * 1000),
      read: false,
      category: 'mission',
      priority: 'medium'
    },
    {
      id: 'notif-3',
      type: 'warning',
      title: 'Weather Alert',
      message: 'High wind speeds (12 m/s) detected. Consider postponing outdoor missions.',
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
      read: true,
      category: 'system',
      priority: 'medium'
    },
    {
      id: 'notif-4',
      type: 'info',
      title: 'Maintenance Reminder',
      message: 'Phoenix Delta is due for scheduled maintenance in 3 days.',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      read: true,
      category: 'maintenance',
      priority: 'low'
    },
    {
      id: 'notif-5',
      type: 'alert',
      title: 'No-Fly Zone Violation',
      message: 'Mission path intersects with temporary no-fly zone. Route adjustment required.',
      timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000),
      read: false,
      category: 'mission',
      priority: 'critical',
      actionRequired: true
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'alerts' | 'missions'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return <AlertTriangle className="w-5 h-5 text-red-500" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'info':
        return <Info className="w-5 h-5 text-blue-500" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" />;
    }
  };

  const getNotificationColor = (type: Notification['type']) => {
    switch (type) {
      case 'alert':
        return 'border-l-red-500 bg-red-50';
      case 'warning':
        return 'border-l-orange-500 bg-orange-50';
      case 'success':
        return 'border-l-green-500 bg-green-50';
      case 'info':
        return 'border-l-blue-500 bg-blue-50';
      default:
        return 'border-l-gray-500 bg-gray-50';
    }
  };

  const getPriorityColor = (priority: Notification['priority']) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-100 text-red-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const getFilteredNotifications = () => {
    let filtered = notifications;

    if (filter === 'unread') {
      filtered = filtered.filter(n => !n.read);
    } else if (filter === 'alerts') {
      filtered = filtered.filter(n => n.type === 'alert' || n.type === 'warning');
    } else if (filter === 'missions') {
      filtered = filtered.filter(n => n.category === 'mission');
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(n => n.category === selectedCategory);
    }

    return filtered.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  };

  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = getFilteredNotifications();

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Notifications</h1>
            <p className="text-gray-600">Stay updated with system alerts and mission updates</p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {unreadCount} unread
            </span>
            <button
              onClick={markAllAsRead}
              className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
            >
              <Check className="w-4 h-4" />
              <span>Mark All Read</span>
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-gray-400" />
                <span className="text-sm font-medium text-gray-700">Filter:</span>
              </div>
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'All' },
                  { key: 'unread', label: 'Unread' },
                  { key: 'alerts', label: 'Alerts' },
                  { key: 'missions', label: 'Missions' }
                ].map((filterOption) => (
                  <button
                    key={filterOption.key}
                    onClick={() => setFilter(filterOption.key as any)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
                      filter === filterOption.key
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {filterOption.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-700">Category:</span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-1 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Categories</option>
                <option value="mission">Mission</option>
                <option value="fleet">Fleet</option>
                <option value="system">System</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.map((notification) => (
            <div
              key={notification.id}
              className={`bg-white rounded-xl shadow-sm border border-gray-200 border-l-4 ${getNotificationColor(notification.type)} ${
                !notification.read ? 'ring-2 ring-blue-100' : ''
              }`}
            >
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className="flex-shrink-0 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className={`text-lg font-semibold ${!notification.read ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        {!notification.read && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(notification.priority)}`}>
                          {notification.priority.toUpperCase()}
                        </span>
                        {notification.actionRequired && (
                          <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
                            ACTION REQUIRED
                          </span>
                        )}
                      </div>
                      
                      <p className="text-gray-600 mb-3">{notification.message}</p>
                      
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-3 h-3" />
                          <span>{notification.timestamp.toLocaleString()}</span>
                        </div>
                        <span className="capitalize">{notification.category}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 ml-4">
                    {!notification.read && (
                      <button
                        onClick={() => markAsRead(notification.id)}
                        className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        title="Mark as read"
                      >
                        <Check className="w-4 h-4" />
                      </button>
                    )}
                    
                    <button
                      onClick={() => deleteNotification(notification.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete notification"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                    
                    <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {notification.actionRequired && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-colors text-sm font-medium">
                        Take Action
                      </button>
                      <button className="px-4 py-2 bg-gray-100 text-gray-700 hover:bg-gray-200 rounded-lg transition-colors text-sm font-medium">
                        View Details
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}

          {filteredNotifications.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-12 text-center">
              <BellOff className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications found</h3>
              <p className="text-gray-500">
                {filter === 'unread' 
                  ? "You're all caught up! No unread notifications."
                  : "No notifications match your current filters."
                }
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}