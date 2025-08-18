'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  XCircle,
  Filter,
  Search,
  Settings
} from 'lucide-react'

const alerts = [
  {
    id: 1,
    title: 'High CPU Usage Detected',
    message: 'Server-01 CPU usage has exceeded 90% for the past 10 minutes',
    type: 'critical',
    timestamp: '2 minutes ago',
    device: 'Server-01',
    acknowledged: false
  },
  {
    id: 2,
    title: 'Backup Job Failed',
    message: 'Scheduled backup for database-02 failed to complete',
    type: 'warning',
    timestamp: '15 minutes ago',
    device: 'Database-02',
    acknowledged: true
  },
  {
    id: 3,
    title: 'New Device Connected',
    message: 'MacBook Pro 16" has been successfully added to the network',
    type: 'info',
    timestamp: '1 hour ago',
    device: 'MacBook Pro 16"',
    acknowledged: false
  },
  {
    id: 4,
    title: 'Security Scan Complete',
    message: 'Weekly security scan completed with no threats detected',
    type: 'success',
    timestamp: '2 hours ago',
    device: 'Security System',
    acknowledged: false
  },
  {
    id: 5,
    title: 'Network Connectivity Issue',
    message: 'Intermittent connectivity issues detected on Switch-03',
    type: 'warning',
    timestamp: '3 hours ago',
    device: 'Switch-03',
    acknowledged: true
  }
]

export default function AlertsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Alerts & Notifications</h1>
          <p className="text-muted-foreground mt-1">System alerts and important notifications</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-alerts text-alerts hover:bg-alerts hover:text-alerts-foreground">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
          <Button variant="outline" size="sm" className="border-alerts text-alerts hover:bg-alerts hover:text-alerts-foreground">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Alert Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Alerts</CardTitle>
            <Bell className="h-4 w-4 text-alerts" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
            <p className="text-xs text-muted-foreground">Last 24 hours</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-alerts" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-alerts">3</div>
            <p className="text-xs text-muted-foreground">Require immediate attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Acknowledged</CardTitle>
            <CheckCircle className="h-4 w-4 text-support" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-support">18</div>
            <p className="text-xs text-muted-foreground">Being addressed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending</CardTitle>
            <Clock className="h-4 w-4 text-acquisition" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-acquisition">3</div>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>
      </div>

      {/* Alerts List */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Latest system alerts and notifications</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search alerts..."
                className="pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-alerts bg-background text-foreground"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className={`flex items-start justify-between p-4 border rounded-lg ${
                alert.type === 'critical' ? 'border-alerts bg-alerts-light' :
                alert.type === 'warning' ? 'border-acquisition bg-acquisition-light' :
                alert.type === 'success' ? 'border-support bg-support-light' :
                'border-primary bg-primary-light'
              }`}>
                <div className="flex items-start space-x-3">
                  <div className={`w-3 h-3 rounded-full mt-2 ${
                    alert.type === 'critical' ? 'bg-alerts' :
                    alert.type === 'warning' ? 'bg-acquisition' :
                    alert.type === 'success' ? 'bg-support' : 'bg-primary'
                  }`}></div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-medium text-foreground">{alert.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        alert.type === 'critical' ? 'bg-alerts text-alerts-foreground' :
                        alert.type === 'warning' ? 'bg-acquisition text-acquisition-foreground' :
                        alert.type === 'success' ? 'bg-support text-support-foreground' :
                        'bg-primary text-primary-foreground'
                      }`}>
                        {alert.type}
                      </span>
                      {alert.acknowledged && (
                        <span className="px-2 py-1 text-xs font-medium bg-support text-support-foreground rounded-full">
                          Acknowledged
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{alert.message}</p>
                    <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                      <span>{alert.device}</span>
                      <span>•</span>
                      <span>{alert.timestamp}</span>
                    </div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  {!alert.acknowledged && (
                    <Button variant="outline" size="sm" className="border-support text-support hover:bg-support hover:text-support-foreground">
                      Acknowledge
                    </Button>
                  )}
                  <Button variant="outline" size="sm" className="border-muted text-muted-foreground hover:bg-muted">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alert Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Alert Preferences</CardTitle>
          <CardDescription>Configure your alert notification settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Notification Channels</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Email Notifications</span>
                  <Button variant="outline" size="sm" className="border-support text-support hover:bg-support hover:text-support-foreground">
                    Enabled
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">SMS Alerts</span>
                  <Button variant="outline" size="sm" className="border-muted text-muted-foreground">
                    Disabled
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Push Notifications</span>
                  <Button variant="outline" size="sm" className="border-support text-support hover:bg-support hover:text-support-foreground">
                    Enabled
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Alert Levels</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Critical Alerts</span>
                  <Button variant="outline" size="sm" className="border-alerts text-alerts hover:bg-alerts hover:text-alerts-foreground">
                    Always
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Warning Alerts</span>
                  <Button variant="outline" size="sm" className="border-acquisition text-acquisition hover:bg-acquisition hover:text-acquisition-foreground">
                    Business Hours
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Info Alerts</span>
                  <Button variant="outline" size="sm" className="border-muted text-muted-foreground">
                    Disabled
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 