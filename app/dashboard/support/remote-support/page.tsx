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
          <h1 className="text-3xl font-bold text-foreground">Remote Support</h1>
          <p className="text-muted-foreground mt-1">Provide remote assistance to users</p>
        </div>
        <Button className="bg-support hover:bg-support-hover text-support-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Session
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sessions</CardTitle>
            <Monitor className="h-4 w-4 text-support" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-support">3</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Techs</CardTitle>
            <Users className="h-4 w-4 text-support" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-support">8</div>
            <p className="text-xs text-muted-foreground">Ready to assist</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-support" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-support">2.3 min</div>
            <p className="text-xs text-muted-foreground">Today's average</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-support" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-support">96%</div>
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
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search sessions..."
                  className="pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-support bg-background text-foreground"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {remoteSessions.map((session) => (
                <div key={session.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted">
                  <div className="flex items-center space-x-4">
                    <div className={`w-3 h-3 rounded-full ${
                      session.status === 'active' ? 'bg-support' : 
                      session.status === 'completed' ? 'bg-primary' : 'bg-acquisition'
                    }`}></div>
                    <div>
                      <h3 className="font-medium text-foreground">{session.user}</h3>
                      <p className="text-sm text-muted-foreground">{session.device}</p>
                      <p className="text-xs text-muted-foreground">{session.issue}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-1">
                      {session.type === 'screen-share' && <Monitor className="w-4 h-4 text-support" />}
                      {session.type === 'phone' && <Phone className="w-4 h-4 text-support" />}
                      {session.type === 'chat' && <MessageSquare className="w-4 h-4 text-support" />}
                      <span className="text-sm font-medium text-foreground">{session.duration}</span>
                    </div>
                    <p className="text-xs text-muted-foreground">{session.technician}</p>
                    <div className="flex space-x-1 mt-2">
                      <Button variant="outline" size="sm" className="border-support text-support hover:bg-support hover:text-support-foreground">Join</Button>
                      <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">End</Button>
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
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-support hover:bg-support-hover text-support-foreground border-2 border-support">
                <Video className="w-8 h-8" />
                <span className="text-sm font-medium">Screen Share</span>
              </Button>
              
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-support hover:bg-support-hover text-support-foreground border-2 border-support">
                <Phone className="w-8 h-8" />
                <span className="text-sm font-medium">Voice Call</span>
              </Button>
              
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-support hover:bg-support-hover text-support-foreground border-2 border-support">
                <MessageSquare className="w-8 h-8" />
                <span className="text-sm font-medium">Chat Support</span>
              </Button>
              
              <Button className="h-24 flex flex-col items-center justify-center space-y-2 bg-support hover:bg-support-hover text-support-foreground border-2 border-support">
                <Monitor className="w-8 h-8" />
                <span className="text-sm font-medium">Remote Control</span>
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
            <div className="flex items-center justify-between p-4 bg-support-light border border-support rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-support" />
                <div>
                  <p className="font-medium text-support-foreground">Session completed successfully</p>
                  <p className="text-sm text-muted-foreground">Sarah Wilson • Email configuration resolved • 8 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-support font-medium">Resolved</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-primary-light border border-primary rounded-lg">
              <div className="flex items-center space-x-3">
                <Monitor className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-primary-foreground">New remote session started</p>
                  <p className="text-sm text-muted-foreground">John Smith • Software installation • 15 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-primary font-medium">Active</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-acquisition-light border border-acquisition rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="w-5 h-5 text-acquisition" />
                <div>
                  <p className="font-medium text-acquisition-foreground">Support request queued</p>
                  <p className="text-sm text-muted-foreground">David Lee • Network connectivity • 2 minutes ago</p>
                </div>
              </div>
              <span className="text-sm text-acquisition font-medium">Waiting</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 