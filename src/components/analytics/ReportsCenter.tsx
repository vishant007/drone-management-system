import React, { useState } from 'react';
import { 
  Download, 
  FileText, 
  Calendar, 
  Filter,
  Mail,
  Clock,
  CheckCircle,
  BarChart3
} from 'lucide-react';

export function ReportsCenter() {
  const [selectedReport, setSelectedReport] = useState('');
  const [dateRange, setDateRange] = useState('30d');
  const [reportFormat, setReportFormat] = useState('pdf');

  const reportTemplates = [
    {
      id: 'executive-summary',
      name: 'Executive Summary',
      description: 'High-level overview of fleet performance and key metrics',
      category: 'Executive',
      estimatedTime: '2 min',
      icon: BarChart3
    },
    {
      id: 'mission-detailed',
      name: 'Detailed Mission Report',
      description: 'Comprehensive analysis of individual mission performance',
      category: 'Operations',
      estimatedTime: '5 min',
      icon: FileText
    },
    {
      id: 'fleet-utilization',
      name: 'Fleet Utilization Report',
      description: 'Drone usage patterns and efficiency metrics',
      category: 'Fleet',
      estimatedTime: '3 min',
      icon: BarChart3
    },
    {
      id: 'maintenance-schedule',
      name: 'Maintenance Schedule',
      description: 'Upcoming maintenance requirements and cost projections',
      category: 'Maintenance',
      estimatedTime: '2 min',
      icon: Calendar
    },
    {
      id: 'cost-analysis',
      name: 'Cost Analysis Report',
      description: 'Financial analysis including ROI and cost savings',
      category: 'Financial',
      estimatedTime: '4 min',
      icon: BarChart3
    },
    {
      id: 'safety-compliance',
      name: 'Safety & Compliance Report',
      description: 'Safety incidents, compliance status, and risk assessment',
      category: 'Safety',
      estimatedTime: '3 min',
      icon: CheckCircle
    }
  ];

  const recentReports = [
    {
      name: 'Monthly Executive Summary - January 2024',
      type: 'Executive Summary',
      generated: '2024-02-01 09:00',
      size: '2.4 MB',
      format: 'PDF',
      status: 'Ready'
    },
    {
      name: 'Fleet Utilization Q4 2023',
      type: 'Fleet Utilization',
      generated: '2024-01-15 14:30',
      size: '1.8 MB',
      format: 'Excel',
      status: 'Ready'
    },
    {
      name: 'Mission Performance Analysis',
      type: 'Mission Report',
      generated: '2024-01-10 11:15',
      size: '3.2 MB',
      format: 'PDF',
      status: 'Ready'
    },
    {
      name: 'Cost Analysis December 2023',
      type: 'Cost Analysis',
      generated: '2024-01-05 16:45',
      size: '1.5 MB',
      format: 'PDF',
      status: 'Ready'
    }
  ];

  const scheduledReports = [
    {
      name: 'Weekly Operations Summary',
      frequency: 'Weekly',
      nextRun: '2024-02-05 08:00',
      recipients: 3,
      format: 'PDF'
    },
    {
      name: 'Monthly Executive Dashboard',
      frequency: 'Monthly',
      nextRun: '2024-03-01 09:00',
      recipients: 5,
      format: 'PDF'
    },
    {
      name: 'Quarterly Fleet Analysis',
      frequency: 'Quarterly',
      nextRun: '2024-04-01 10:00',
      recipients: 8,
      format: 'Excel'
    }
  ];

  const handleGenerateReport = () => {
    if (!selectedReport) return;
    
    // Simulate report generation
    alert(`Generating ${reportTemplates.find(r => r.id === selectedReport)?.name} report...`);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Executive': return 'bg-purple-100 text-purple-800';
      case 'Operations': return 'bg-blue-100 text-blue-800';
      case 'Fleet': return 'bg-green-100 text-green-800';
      case 'Maintenance': return 'bg-orange-100 text-orange-800';
      case 'Financial': return 'bg-indigo-100 text-indigo-800';
      case 'Safety': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-8">
      {/* Report Generator */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-6">Generate New Report</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Report Selection */}
          <div className="lg:col-span-2">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Select Report Type</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {reportTemplates.map((template) => {
                const Icon = template.icon;
                return (
                  <div
                    key={template.id}
                    onClick={() => setSelectedReport(template.id)}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedReport === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <Icon className={`w-5 h-5 mt-1 ${
                        selectedReport === template.id ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-1">{template.name}</h4>
                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                        <div className="flex items-center justify-between">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(template.category)}`}>
                            {template.category}
                          </span>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <Clock className="w-3 h-3" />
                            <span>{template.estimatedTime}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Configuration Panel */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Report Configuration</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                <select
                  value={dateRange}
                  onChange={(e) => setDateRange(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="7d">Last 7 days</option>
                  <option value="30d">Last 30 days</option>
                  <option value="90d">Last 90 days</option>
                  <option value="1y">Last year</option>
                  <option value="custom">Custom range</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Format</label>
                <select
                  value={reportFormat}
                  onChange={(e) => setReportFormat(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="pdf">PDF</option>
                  <option value="excel">Excel</option>
                  <option value="csv">CSV</option>
                  <option value="json">JSON</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <input type="checkbox" className="mr-2" />
                  Include raw data
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <input type="checkbox" className="mr-2" />
                  Email when ready
                </label>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <input type="checkbox" className="mr-2" />
                  Schedule recurring
                </label>
              </div>

              <button
                onClick={handleGenerateReport}
                disabled={!selectedReport}
                className="w-full flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Download className="w-4 h-4" />
                <span>Generate Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Reports & Scheduled Reports */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Recent Reports</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              View All
            </button>
          </div>

          <div className="space-y-4">
            {recentReports.map((report, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex-1">
                  <h4 className="font-medium text-gray-900 mb-1">{report.name}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600">
                    <span>{report.type}</span>
                    <span>{report.generated}</span>
                    <span>{report.size}</span>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
                    {report.status}
                  </span>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scheduled Reports */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Scheduled Reports</h3>
            <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
              Add Schedule
            </button>
          </div>

          <div className="space-y-4">
            {scheduledReports.map((report, index) => (
              <div key={index} className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-gray-900">{report.name}</h4>
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {report.frequency}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-3 h-3" />
                    <span>Next: {report.nextRun}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Mail className="w-3 h-3" />
                    <span>{report.recipients} recipients</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Report Analytics */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">Report Usage Analytics</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 mb-1">247</div>
            <div className="text-sm text-gray-600">Reports Generated</div>
            <div className="text-xs text-green-600 mt-1">+12% this month</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 mb-1">18</div>
            <div className="text-sm text-gray-600">Scheduled Reports</div>
            <div className="text-xs text-blue-600 mt-1">3 new this week</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 mb-1">1.2TB</div>
            <div className="text-sm text-gray-600">Data Processed</div>
            <div className="text-xs text-orange-600 mt-1">+8% vs last month</div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-orange-600 mb-1">94%</div>
            <div className="text-sm text-gray-600">User Satisfaction</div>
            <div className="text-xs text-green-600 mt-1">Based on feedback</div>
          </div>
        </div>
      </div>
    </div>
  );
}