'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Monitor, 
  Users, 
  Clock, 
  CheckCircle, 
  XCircle,
  Video,
  Phone,
  MessageSquare,
  Plus,
  Search
} from 'lucide-react'

const remoteSessions = [
  {
    id: 1,
    user: 'John Smith',
    device: 'MacBook Pro 16"',
    issue: 'Software installation problem',
    status: 'active',
    duration: '15 min',
    technician: 'Mike Johnson',
    type: 'screen-share'
  },
  {
    id: 2,
    user: 'Sarah Wilson',
    device: 'iPhone 15 Pro',
    issue: 'Email configuration',
    status: 'completed',
    duration: '8 min',
    technician: 'Lisa Brown',
    type: 'phone'
  },
  {
    id: 3,
    user: 'David Lee',
    device: 'iMac 27"',
    issue: 'Network connectivity',
    status: 'waiting',
    duration: '0 min',
    technician: 'Alex Chen',
    type: 'chat'
  }
]

export default function RemoteSupportPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Remote Support</h1>
          <p className="text-gray-600 mt-1">Provide remote assistance to users</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Session
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Monitor className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">3</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Techs</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-muted-foreground">Ready to assist</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">2.3 min</div>
            <p className="text-xs text-muted-foreground">Today's average</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">96%</div>
            <p className="text-xs text-muted-foreground">Issues resolved</p>
          </CardContent>
        </Card>
      </div>

      {/* Support Sessions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Active Sessions */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Active Sessions</CardTitle>
                <CardDescription>Currently ongoing support sessions</CardDescription>
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
              {remoteSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      session.status === 'active' ? 'bg-green-500' : 
                      session.status === 'completed' ? 'bg-blue-500' : 'bg-orange-500'
                    }`}></div>
                    <div>
                      <h3 className="font-medium text-gray-900">{session.user}</h3>
                      <p className="text-sm text-gray-500">{session.device}</p>
                      <p className="text-xs text-gray-400">{session.issue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      {session.type === 'screen-share' && <Monitor className="w-4 h-4 text-blue-500" />}
                      {session.type === 'phone' && <Phone className="w-4 h-4 text-green-500" />}
                      {session.type === 'chat' && <MessageSquare className="w-4 h-4 text-purple-500" />}
                      <span className="text-sm font-medium text-gray-900">{session.duration}</span>
                    </div>
                    <p className="text-xs text-gray-500">{session.technician}</p>
                    <div className="flex space-x-1 mt-2">
                      <Button variant="outline" size="sm">Join</Button>
                      <Button variant="outline" size="sm">End</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support Tools */}
        <Card>
          <CardHeader>
            <CardTitle>Support Tools</CardTitle>
            <CardDescription>Quick access to support utilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200">
                <Video className="w-8 h-8 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Screen Share</span>
              </Button>
              
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-green-50 hover:bg-green-100 border-2 border-green-200">
                <Phone className="w-8 h-8 text-green-600" />
                <span className="text-sm font-medium text-green-900">Voice Call</span>
              </Button>
              
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200">
                <MessageSquare className="w-8 h-8 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">Chat Support</span>
              </Button>
              
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-orange-50 hover:bg-orange-100 border-2 border-orange-200">
                <Monitor className="w-8 h-8 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Remote Control</span>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Support Activity</CardTitle>
          <CardDescription>Latest support sessions and resolutions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <div>
                  <p className="font-medium text-green-900">Session completed successfully</p>
                  <p className="text-sm text-green-700">Sarah Wilson • Email configuration resolved • 8 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">Resolved</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Monitor className="w-5 h-5 text-blue-500" />
                <div>
                  <p className="font-medium text-blue-900">New remote session started</p>
                  <p className="text-sm text-blue-700">John Smith • Software installation • 15 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-blue-600 font-medium">Active</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-orange-900">Support request queued</p>
                  <p className="text-sm text-orange-700">David Lee • Network connectivity • 2 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-orange-600 font-medium">Waiting</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 