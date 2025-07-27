'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  History, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  XCircle,
  Filter,
  Search,
  Calendar
} from 'lucide-react'

const alertHistory = [
  {
    id: 1,
    title: 'High CPU Usage Detected',
    message: 'Server-01 CPU usage exceeded 90% for 15 minutes',
    type: 'critical',
    timestamp: '2024-01-15 14:30:00',
    device: 'Server-01',
    resolved: true,
    resolvedAt: '2024-01-15 14:45:00',
    technician: 'Mike Johnson'
  },
  {
    id: 2,
    title: 'Backup Job Failed',
    message: 'Scheduled backup for database-02 failed to complete',
    type: 'warning',
    timestamp: '2024-01-15 12:00:00',
    device: 'Database-02',
    resolved: true,
    resolvedAt: '2024-01-15 13:15:00',
    technician: 'Sarah Wilson'
  },
  {
    id: 3,
    title: 'Network Connectivity Issue',
    message: 'Intermittent connectivity issues on Switch-03',
    type: 'warning',
    timestamp: '2024-01-15 10:30:00',
    device: 'Switch-03',
    resolved: false,
    resolvedAt: null,
    technician: null
  },
  {
    id: 4,
    title: 'Security Scan Complete',
    message: 'Weekly security scan completed with no threats',
    type: 'info',
    timestamp: '2024-01-15 09:00:00',
    device: 'Security System',
    resolved: true,
    resolvedAt: '2024-01-15 09:00:00',
    technician: 'System'
  },
  {
    id: 5,
    title: 'New Device Connected',
    message: 'MacBook Pro 16" has been added to the network',
    type: 'info',
    timestamp: '2024-01-15 08:45:00',
    device: 'MacBook Pro 16"',
    resolved: true,
    resolvedAt: '2024-01-15 08:45:00',
    technician: 'System'
  }
]

export default function AlertHistoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Alert History</h1>
          <p className="text-gray-600 mt-1">Historical record of all system alerts</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <History className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolved</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1,189</div>
            <p className="text-xs text-muted-foreground">95% resolution rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <XCircle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">23</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Resolution</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">2.3h</div>
            <p className="text-xs text-muted-foreground">Mean time to resolve</p>
          </CardContent>
        </Card>
      </div>

      {/* Alert History Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>Complete history of system alerts and their resolution</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search alerts..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alertHistory.map((alert) => (
              <div key={alert.id} className={`flex items-start justify-between p-4 border rounded-lg ${
                alert.type === 'critical' ? 'border-red-200 bg-red-50' :
                alert.type === 'warning' ? 'border-orange-200 bg-orange-50' :
                'border-blue-200 bg-blue-50'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    alert.type === 'critical' ? 'bg-red-500' :
                    alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-gray-900">{alert.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        alert.type === 'critical' ? 'bg-red-100 text-red-800' :
                        alert.type === 'warning' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {alert.type}
                      </span>
                      {alert.resolved && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                          Resolved
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>Device: {alert.device}</span>
                      <span>Created: {alert.timestamp}</span>
                      {alert.resolved && (
                        <span>Resolved: {alert.resolvedAt}</span>
                      )}
                      {alert.technician && (
                        <span>Technician: {alert.technician}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 