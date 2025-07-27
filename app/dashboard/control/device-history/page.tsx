'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  History, 
  Smartphone, 
  Monitor, 
  Laptop, 
  Tablet,
  Filter,
  Search,
  Calendar,
  Activity
} from 'lucide-react'

const deviceHistory = [
  {
    id: 1,
    device: 'MacBook Pro 16"',
    user: 'John Smith',
    action: 'Login',
    timestamp: '2024-01-15 14:30:00',
    ip: '192.168.1.101',
    location: 'Office - Floor 2',
    status: 'success'
  },
  {
    id: 2,
    device: 'iPhone 15 Pro',
    user: 'Sarah Johnson',
    action: 'Software Update',
    timestamp: '2024-01-15 13:45:00',
    ip: '192.168.1.102',
    location: 'Office - Floor 1',
    status: 'success'
  },
  {
    id: 3,
    device: 'iMac 27"',
    user: 'Mike Wilson',
    action: 'Restart',
    timestamp: '2024-01-15 12:15:00',
    ip: '192.168.1.103',
    location: 'Office - Floor 3',
    status: 'success'
  },
  {
    id: 4,
    device: 'iPad Pro 12.9"',
    user: 'Lisa Brown',
    action: 'Failed Login Attempt',
    timestamp: '2024-01-15 11:30:00',
    ip: '192.168.1.104',
    location: 'Office - Floor 2',
    status: 'warning'
  },
  {
    id: 5,
    device: 'MacBook Air 13"',
    user: 'David Lee',
    action: 'Virus Scan',
    timestamp: '2024-01-15 10:00:00',
    ip: '192.168.1.105',
    location: 'Office - Floor 1',
    status: 'success'
  }
]

export default function DeviceHistoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Device History</h1>
          <p className="text-gray-600 mt-1">Activity history for all managed devices</p>
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
            <CardTitle className="text-sm font-medium">Total Activities</CardTitle>
            <Activity className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">3,847</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
            <Smartphone className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">189</div>
            <p className="text-xs text-muted-foreground">Currently online</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Events</CardTitle>
            <Monitor className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">12</div>
            <p className="text-xs text-muted-foreground">Today</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Updates</CardTitle>
            <Laptop className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">45</div>
            <p className="text-xs text-muted-foreground">Pending</p>
          </CardContent>
        </Card>
      </div>

      {/* Device History Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Device Activity History</CardTitle>
              <CardDescription>Recent activity and events for all managed devices</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search devices or users..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {deviceHistory.map((event) => (
              <div key={event.id} className={`flex items-center justify-between p-4 border rounded-lg ${
                event.status === 'success' ? 'border-green-200 bg-green-50' :
                event.status === 'warning' ? 'border-orange-200 bg-orange-50' :
                'border-red-200 bg-red-50'
              }`}>
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    event.status === 'success' ? 'bg-green-500' :
                    event.status === 'warning' ? 'bg-orange-500' : 'bg-red-500'
                  }`}></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{event.device}</h3>
                    <p className="text-sm text-gray-500">{event.user} • {event.action}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>{event.timestamp}</span>
                      <span>IP: {event.ip}</span>
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    event.status === 'success' ? 'bg-green-100 text-green-800' :
                    event.status === 'warning' ? 'bg-orange-100 text-orange-800' :
                    'bg-red-100 text-red-800'
                  }`}>
                    {event.status}
                  </span>
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