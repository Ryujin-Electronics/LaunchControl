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
    color: 'bg-control',
    textColor: 'text-control-foreground',
    borderColor: 'border-control',
    hoverColor: 'hover:bg-control-hover',
    stats: { devices: 247, online: 189 }
  },
  {
    title: 'Proactive Monitoring',
    description: 'Real-time system monitoring and alerts',
    icon: Cpu,
    href: '/dashboard/control/proactive-monitoring',
    color: 'bg-support',
    textColor: 'text-support-foreground',
    borderColor: 'border-support',
    hoverColor: 'hover:bg-support-hover',
    stats: { systems: 45, alerts: 3 }
  },
  {
    title: 'Alerts',
    description: 'System alerts and notifications',
    icon: AlertTriangle,
    href: '/dashboard/alerts',
    color: 'bg-alerts',
    textColor: 'text-alerts-foreground',
    borderColor: 'border-alerts',
    hoverColor: 'hover:bg-alerts-hover',
    stats: { active: 3, critical: 1 }
  },
  {
    title: 'Alert History',
    description: 'Historical alert records and analysis',
    icon: History,
    href: '/dashboard/control/alert-history',
    color: 'bg-strategy',
    textColor: 'text-strategy-foreground',
    borderColor: 'border-strategy',
    hoverColor: 'hover:bg-strategy-hover',
    stats: { total: 1247, resolved: 1189 }
  },
  {
    title: 'Device History',
    description: 'Device activity and event logs',
    icon: History,
    href: '/dashboard/control/device-history',
    color: 'bg-acquisition',
    textColor: 'text-acquisition-foreground',
    borderColor: 'border-acquisition',
    hoverColor: 'hover:bg-acquisition-hover',
    stats: { events: 3847, today: 156 }
  }
]

export default function ControlPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-control to-primary rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Control Centre</h1>
        <p className="text-control-light">Device management, monitoring, and system control</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Devices</CardTitle>
            <div className="w-8 h-8 bg-control icon-circle">
              <Smartphone className="h-4 w-4 text-control-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-control">247</div>
            <p className="text-xs text-muted-foreground">+5 this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <div className="w-8 h-8 bg-support icon-circle">
              <Activity className="h-4 w-4 text-support-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-support">98.5%</div>
            <p className="text-xs text-muted-foreground">Uptime this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <div className="w-8 h-8 bg-alerts icon-circle">
              <AlertTriangle className="h-4 w-4 text-alerts-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-alerts">3</div>
            <p className="text-xs text-muted-foreground">Require attention</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Status</CardTitle>
            <div className="w-8 h-8 bg-strategy icon-circle">
              <Shield className="h-4 w-4 text-strategy-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-strategy">Secure</div>
            <p className="text-xs text-muted-foreground">All systems protected</p>
          </CardContent>
        </Card>
      </div>

      {/* Control Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {controlServices.map((service) => (
          <Link key={service.href} href={service.href}>
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 ${service.color} icon-circle group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-5 h-5 text-white" />
                  </div>
                  <Activity className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-1">
                        <span className="capitalize">{key}:</span>
                        <span className="font-semibold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={`${service.borderColor} ${service.textColor} ${service.hoverColor}`}
                  >
                    Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              System Performance
            </CardTitle>
            <CardDescription>
              Real-time system performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">CPU Usage</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div className="w-10 h-2 bg-control rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-control">62%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Memory Usage</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div className="w-12 h-2 bg-support rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-support">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Network Load</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div className="w-8 h-2 bg-acquisition rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-acquisition">48%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Device Status
            </CardTitle>
            <CardDescription>
              Overview of connected device status
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Online Devices</span>
              <span className="font-semibold text-support">189</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Offline Devices</span>
              <span className="font-semibold text-alerts">3</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">New This Week</span>
              <span className="font-semibold text-control">5</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Control Activities</CardTitle>
          <CardDescription>
            Latest system control activities and events
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-control icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">New device connected</p>
                <p className="text-xs text-muted-foreground">MacBook Pro 16" • 2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-support icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">System backup completed</p>
                <p className="text-xs text-muted-foreground">Server-01 • 1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-alerts icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">High CPU alert resolved</p>
                <p className="text-xs text-muted-foreground">Server-02 • 3 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-strategy icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Security scan completed</p>
                <p className="text-xs text-muted-foreground">All systems • 6 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 