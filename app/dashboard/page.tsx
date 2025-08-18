'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Monitor, 
  Headphones, 
  Target, 
  ShoppingCart, 
  Users, 
  Building,
  BarChart3,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Smartphone,
  Settings,
  Shield,
  Code,
  MoreHorizontal,
  Globe,
  Server,
  Cpu,
  Database,
  Trash2,
  Printer,
  Share2,
  Mail,
  Globe2,
  Activity
} from 'lucide-react'
import { isRyujinUser, isClientUser, hasPermission } from '@/lib/auth'

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session || !session.user) {
    return <div className="text-red-600 font-bold p-8">Error: No session or user data found. Please sign out and sign in again, or contact support if the issue persists.</div>
  }

  const isRyujin = isRyujinUser(session.user.role as any)
  const isClient = isClientUser(session.user.role as any)
  const canViewAnalytics = hasPermission(session.user.role as any, 'canViewAnalytics')
  const canManageProjects = hasPermission(session.user.role as any, 'canManageProjects')

  // Service modules for client users
  const serviceModules = [
    {
      title: 'Control',
      description: 'Device management, monitoring & alerts',
      icon: Monitor,
      href: '/dashboard/control',
      color: 'bg-control',
      textColor: 'text-control-foreground',
      borderColor: 'border-control',
      hoverColor: 'hover:bg-control-hover',
      stats: { active: 247, alerts: 3 }
    },
    {
      title: 'Support',
      description: 'Remote & on-site support services',
      icon: Headphones,
      href: '/dashboard/support',
      color: 'bg-support',
      textColor: 'text-support-foreground',
      borderColor: 'border-support',
      hoverColor: 'hover:bg-support-hover',
      stats: { tickets: 12, active: 5 }
    },
    {
      title: 'Strategy',
      description: 'Planning, ecosystem & security',
      icon: Target,
      href: '/dashboard/strategy',
      color: 'bg-strategy',
      textColor: 'text-strategy-foreground',
      borderColor: 'border-strategy',
      hoverColor: 'hover:bg-strategy-hover',
      stats: { projects: 8, active: 3 }
    },
    {
      title: 'Acquisition',
      description: 'Store, procurement & purchases',
      icon: ShoppingCart,
      href: '/dashboard/acquisition',
      color: 'bg-acquisition',
      textColor: 'text-acquisition-foreground',
      borderColor: 'border-acquisition',
      hoverColor: 'hover:bg-acquisition-hover',
      stats: { orders: 24, pending: 7 }
    },
    {
      title: 'Digital Services',
      description: 'Development & hosting solutions',
      icon: Code,
      href: '/dashboard/digital-services',
      color: 'bg-digital',
      textColor: 'text-digital-foreground',
      borderColor: 'border-digital',
      hoverColor: 'hover:bg-digital-hover',
      stats: { projects: 15, hosting: 42 }
    },
    {
      title: 'More',
      description: 'Recycling, print & social media',
      icon: MoreHorizontal,
      href: '/dashboard/more',
      color: 'bg-muted',
      textColor: 'text-muted-foreground',
      borderColor: 'border-muted',
      hoverColor: 'hover:bg-muted',
      stats: { services: 3, active: 2 }
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-muted-foreground mt-2">
            {session.user.organization?.name} • {session.user.role.replace('_', ' ').toUpperCase()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Last login</p>
          <p className="text-sm font-medium text-foreground">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <div className="w-8 h-8 bg-alerts icon-circle">
              <AlertTriangle className="h-4 w-4 text-alerts-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-alerts">3</div>
            <p className="text-xs text-muted-foreground">
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <div className="w-8 h-8 bg-support icon-circle">
              <Headphones className="h-4 w-4 text-support-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-support">12</div>
            <p className="text-xs text-muted-foreground">
              -3 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <div className="w-8 h-8 bg-strategy icon-circle">
              <Target className="h-4 w-4 text-strategy-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-strategy">8</div>
            <p className="text-xs text-muted-foreground">
              +1 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Purchases</CardTitle>
            <div className="w-8 h-8 bg-acquisition icon-circle">
              <ShoppingCart className="h-4 w-4 text-acquisition-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-acquisition">5</div>
            <p className="text-xs text-muted-foreground">
              +1 from yesterday
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Role-specific content */}
      {isRyujin && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Ryujin-specific content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary icon-circle">
                  <Building className="h-4 w-4 text-primary-foreground" />
                </div>
                Client Organizations
              </CardTitle>
              <CardDescription>
                Overview of all client organizations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Total Clients</span>
                <span className="font-semibold text-foreground">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Active Clients</span>
                <span className="font-semibold text-support">22</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">New This Month</span>
                <span className="font-semibold text-primary">3</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary icon-circle">
                  <BarChart3 className="h-4 w-4 text-primary-foreground" />
                </div>
                System Analytics
              </CardTitle>
              <CardDescription>
                Overall system performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">System Uptime</span>
                <span className="font-semibold text-support">99.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Average Response Time</span>
                <span className="font-semibold text-foreground">2.3s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Support Satisfaction</span>
                <span className="font-semibold text-support">4.8/5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isClient && (
        <>
          {/* Service Modules - Now First */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">Service Modules</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {serviceModules.map((module) => (
                <Link key={module.href} href={module.href}>
                  <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`w-8 h-8 ${module.color} icon-circle group-hover:scale-110 transition-transform`}>
                          <module.icon className="w-4 h-4 text-white" />
                        </div>
                        <Activity className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                      </div>
                      <CardTitle className="text-xl">{module.title}</CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-muted-foreground">
                          {Object.entries(module.stats).map(([key, value]) => (
                            <div key={key} className="flex items-center space-x-1">
                              <span className="capitalize">{key}:</span>
                              <span className="font-semibold text-foreground">{value}</span>
                            </div>
                          ))}
                        </div>
                        <Button 
                          size="sm" 
                          className={`${module.color} ${module.textColor} ${module.hoverColor}`}
                        >
                          Access
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Client-specific information cards - Now Second */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                                  <div className="w-8 h-8 bg-control icon-circle">
                  <Monitor className="h-4 w-4 text-control-foreground" />
                </div>
                  System Status
                </CardTitle>
                <CardDescription>
                  Current system health and status
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Network Status</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-support" />
                    <span className="font-semibold text-support">Online</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Server Status</span>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-support" />
                    <span className="font-semibold text-support">Healthy</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Last Backup</span>
                  <span className="font-semibold text-foreground">2 hours ago</span>
                </div>
              </CardContent>
            </Card>

            {canViewAnalytics && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                                    <div className="w-8 h-8 bg-support icon-circle">
                  <TrendingUp className="h-4 w-4 text-support-foreground" />
                </div>
                    Performance Metrics
                  </CardTitle>
                  <CardDescription>
                    Your organization's performance overview
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">System Efficiency</span>
                    <span className="font-semibold text-support">94%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Response Time</span>
                    <span className="font-semibold text-foreground">1.8s</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Uptime This Month</span>
                    <span className="font-semibold text-support">99.9%</span>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </>
      )}

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Latest updates and activities in your system
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-support icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">New support ticket created</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-support icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">System backup completed</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-acquisition icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Purchase request submitted</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-strategy icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Project status updated</p>
                <p className="text-xs text-muted-foreground">5 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="mt-10">
        <details className="bg-gray-100 rounded p-4 text-xs">
          <summary className="cursor-pointer font-bold">Debug: session.user</summary>
          <pre>{JSON.stringify(session?.user, null, 2)}</pre>
        </details>
      </div>
    </div>
  )
} 