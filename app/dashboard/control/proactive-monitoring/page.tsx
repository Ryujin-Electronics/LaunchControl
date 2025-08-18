'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi, 
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp
} from 'lucide-react'

const monitoringData = [
  {
    id: 1,
    name: 'Server-01',
    type: 'CPU Usage',
    value: 78,
    status: 'warning',
    threshold: 80,
    trend: 'up'
  },
  {
    id: 2,
    name: 'Server-02',
    type: 'Memory Usage',
    value: 45,
    status: 'normal',
    threshold: 80,
    trend: 'stable'
  },
  {
    id: 3,
    name: 'Network-Switch-01',
    type: 'Network Load',
    value: 92,
    status: 'critical',
    threshold: 85,
    trend: 'up'
  },
  {
    id: 4,
    name: 'Storage-Array-01',
    type: 'Disk Space',
    value: 23,
    status: 'normal',
    threshold: 90,
    trend: 'down'
  }
]

export default function ProactiveMonitoringPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Proactive Monitoring</h1>
          <p className="text-gray-600 mt-1">Real-time system monitoring and alerts</p>
        </div>
        <Button className="bg-control hover:bg-control-hover text-control-foreground">
          <Activity className="w-4 h-4 mr-2" />
          View Reports
        </Button>
      </div>

      {/* System Health Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94%</div>
            <p className="text-xs text-muted-foreground">All systems operational</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">2 warnings, 1 critical</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Uptime</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">99.9%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">+12%</div>
            <p className="text-xs text-muted-foreground">vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Monitoring Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Metrics */}
        <Card>
          <CardHeader>
            <CardTitle>Real-time Metrics</CardTitle>
            <CardDescription>Live system performance data</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monitoringData.map((item) => (
                <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      item.status === 'critical' ? 'bg-red-500' : 
                      item.status === 'warning' ? 'bg-orange-500' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <h3 className="font-medium text-gray-900">{item.name}</h3>
                      <p className="text-sm text-gray-500">{item.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2">
                      <span className={`text-lg font-bold ${
                        item.status === 'critical' ? 'text-red-600' : 
                        item.status === 'warning' ? 'text-orange-600' : 'text-green-600'
                      }`}>
                        {item.value}%
                      </span>
                      {item.trend === 'up' && <TrendingUp className="w-4 h-4 text-red-500" />}
                      {item.trend === 'down' && <TrendingUp className="w-4 h-4 text-green-500 rotate-180" />}
                    </div>
                    <p className="text-xs text-gray-500">Threshold: {item.threshold}%</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* System Resources */}
        <Card>
          <CardHeader>
            <CardTitle>System Resources</CardTitle>
            <CardDescription>Current resource utilization</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* CPU Usage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">CPU Usage</span>
                  <span className="text-sm text-gray-500">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
              </div>

              {/* Memory Usage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Memory Usage</span>
                  <span className="text-sm text-gray-500">45%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>

              {/* Disk Usage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Disk Usage</span>
                  <span className="text-sm text-gray-500">23%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '23%' }}></div>
                </div>
              </div>

              {/* Network Usage */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Network Usage</span>
                  <span className="text-sm text-gray-500">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-red-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Alerts */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Latest system notifications and warnings</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-red-500" />
                <div>
                  <p className="font-medium text-red-900">Critical: Network congestion detected</p>
                  <p className="text-sm text-red-700">Network-Switch-01 • 5 minutes ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Acknowledge</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-orange-900">Warning: High CPU usage</p>
                  <p className="text-sm text-orange-700">Server-01 • 15 minutes ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Acknowledge</Button>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="w-5 h-5 text-orange-500" />
                <div>
                  <p className="font-medium text-orange-900">Warning: Backup job failed</p>
                  <p className="text-sm text-orange-700">Backup-System • 1 hour ago</p>
                </div>
              </div>
              <Button variant="outline" size="sm">Acknowledge</Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 