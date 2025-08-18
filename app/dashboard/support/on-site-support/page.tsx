'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Settings, 
  Users, 
  Clock, 
  MapPin, 
  Phone,
  Calendar,
  Plus,
  Search
} from 'lucide-react'

const onSiteSessions = [
  {
    id: 1,
    technician: 'Mike Johnson',
    client: 'TechCorp Inc.',
    location: 'Canberra CBD',
    issue: 'Network infrastructure upgrade',
    status: 'in-progress',
    scheduled: '2024-01-15 09:00',
    estimated: '4 hours',
    priority: 'high'
  },
  {
    id: 2,
    technician: 'Sarah Wilson',
    client: 'Global Solutions',
    location: 'Belconnen',
    issue: 'Server installation and configuration',
    status: 'scheduled',
    scheduled: '2024-01-16 10:00',
    estimated: '6 hours',
    priority: 'medium'
  },
  {
    id: 3,
    technician: 'David Lee',
    client: 'StartupXYZ',
    location: 'Woden',
    issue: 'Security system audit',
    status: 'completed',
    scheduled: '2024-01-14 14:00',
    estimated: '3 hours',
    priority: 'low'
  }
]

export default function OnSiteSupportPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">On-Site Support</h1>
          <p className="text-gray-600 mt-1">Manage on-site technical support sessions</p>
        </div>
        <Button className="bg-support hover:bg-support-hover text-support-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Visit
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Settings className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-xs text-muted-foreground">Currently on-site</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Techs</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-muted-foreground">Ready for dispatch</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2.1h</div>
            <p className="text-xs text-muted-foreground">Time to arrival</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coverage Area</CardTitle>
            <MapPin className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">50km</div>
            <p className="text-xs text-muted-foreground">Canberra region</p>
          </CardContent>
        </Card>
      </div>

      {/* On-Site Sessions */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>On-Site Support Sessions</CardTitle>
              <CardDescription>Current and scheduled on-site support visits</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search sessions..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {onSiteSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    session.status === 'in-progress' ? 'bg-green-500' :
                    session.status === 'scheduled' ? 'bg-blue-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{session.client}</h3>
                    <p className="text-sm text-gray-500">{session.issue}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {session.location}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {session.scheduled}
                      </span>
                      <span>Est: {session.estimated}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{session.technician}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      session.priority === 'high' ? 'bg-red-100 text-red-800' :
                      session.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {session.priority}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 