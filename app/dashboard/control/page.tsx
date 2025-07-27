'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Monitor, 
  Smartphone, 
  Cpu, 
  AlertTriangle, 
  History,
  Activity,
  TrendingUp,
  Shield,
  Users,
  Clock
} from 'lucide-react'

const controlServices = [
  {
    title: 'Device Management',
    description: 'Manage and monitor all connected devices',
    icon: Smartphone,
    href: '/dashboard/control/device-management',
    color: 'bg-blue-500',
    stats: { devices: 247, online: 189 }
  },
  {
    title: 'Proactive Monitoring',
    description: 'Real-time system monitoring and alerts',
    icon: Cpu,
    href: '/dashboard/control/proactive-monitoring',
    color: 'bg-green-500',
    stats: { systems: 45, alerts: 3 }
  },
  {
    title: 'Alerts',
    description: 'System alerts and notifications',
    icon: AlertTriangle,
    href: '/dashboard/alerts',
    color: 'bg-red-500',
    stats: { active: 3, critical: 1 }
  },
  {
    title: 'Alert History',
    description: 'Historical alert records and analysis',
    icon: History,
    href: '/dashboard/control/alert-history',
    color: 'bg-purple-500',
    stats: { total: 1247, resolved: 1189 }
  },
  {
    title: 'Device History',
    description: 'Device activity and event logs',
    icon: History,
    href: '/dashboard/control/device-history',
    color: 'bg-orange-500',
    stats: { events: 3847, today: 156 }
  }
]

export default function ControlPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Control Centre</h1>
        <p className="text-blue-100">Device management, monitoring, and system control</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.5%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">1 critical</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.3s</div>
            <p className="text-xs text-muted-foreground">Average</p>
          </CardContent>
        </Card>
      </div>

      {/* Control Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Control Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {controlServices.map((service) => (
            <Link key={service.href} href={service.href}>
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <service.icon className="w-6 h-6 text-white" />
                    </div>
                    <TrendingUp className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                  <CardDescription>{service.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {Object.entries(service.stats).map(([key, value]) => (
                        <div key={key} className="flex items-center space-x-1">
                          <span className="capitalize">{key}:</span>
                          <span className="font-semibold">{value}</span>
                        </div>
                      ))}
                    </div>
                    <Button variant="outline" size="sm" className="group-hover:bg-blue-50 group-hover:border-blue-200">
                      Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent System Activity</CardTitle>
          <CardDescription>Latest device events and system changes</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New device connected</p>
                <p className="text-xs text-gray-500">MacBook Pro 16" • 2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">High CPU usage detected</p>
                <p className="text-xs text-gray-500">Server-01 • 15 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Backup completed successfully</p>
                <p className="text-xs text-gray-500">Database-02 • 1 hour ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 