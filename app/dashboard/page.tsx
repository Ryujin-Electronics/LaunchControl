'use client'

import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
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
  TrendingUp
} from 'lucide-react'
import { isRyujinUser, isClientUser, hasPermission } from '@/lib/auth'

export default function DashboardPage() {
  const { data: session } = useSession()

  if (!session) {
    return <div>Loading...</div>
  }

  const isRyujin = isRyujinUser(session.user.role as any)
  const isClient = isClientUser(session.user.role as any)
  const canViewAnalytics = hasPermission(session.user.role as any, 'canViewAnalytics')
  const canManageProjects = hasPermission(session.user.role as any, 'canManageProjects')

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {session.user.name}!
          </h1>
          <p className="text-gray-600 mt-2">
            {session.user.organization?.name} • {session.user.role.replace('_', ' ').toUpperCase()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Last login</p>
          <p className="text-sm font-medium">{new Date().toLocaleDateString()}</p>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">3</div>
            <p className="text-xs text-muted-foreground">
              +2 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tickets</CardTitle>
            <Headphones className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">12</div>
            <p className="text-xs text-muted-foreground">
              -3 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Target className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">8</div>
            <p className="text-xs text-muted-foreground">
              +1 from yesterday
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Purchases</CardTitle>
            <ShoppingCart className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">5</div>
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
                <Building className="h-5 w-5" />
                Client Organizations
              </CardTitle>
              <CardDescription>
                Overview of all client organizations
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Total Clients</span>
                <span className="font-semibold">24</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Active Clients</span>
                <span className="font-semibold text-green-600">22</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">New This Month</span>
                <span className="font-semibold text-blue-600">3</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                System Analytics
              </CardTitle>
              <CardDescription>
                Overall system performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">System Uptime</span>
                <span className="font-semibold text-green-600">99.8%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Average Response Time</span>
                <span className="font-semibold">2.3s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Support Satisfaction</span>
                <span className="font-semibold text-green-600">4.8/5</span>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {isClient && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Client-specific content */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Monitor className="h-5 w-5" />
                System Status
              </CardTitle>
              <CardDescription>
                Current system health and status
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Network Status</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-semibold text-green-600">Online</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Server Status</span>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="font-semibold text-green-600">Healthy</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Last Backup</span>
                <span className="font-semibold">2 hours ago</span>
              </div>
            </CardContent>
          </Card>

          {canViewAnalytics && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Performance Metrics
                </CardTitle>
                <CardDescription>
                  Your organization's performance overview
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">System Efficiency</span>
                  <span className="font-semibold text-green-600">94%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Response Time</span>
                  <span className="font-semibold">1.8s</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Uptime This Month</span>
                  <span className="font-semibold text-green-600">99.9%</span>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
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
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">New support ticket created</p>
                <p className="text-xs text-gray-500">2 minutes ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">System backup completed</p>
                <p className="text-xs text-gray-500">1 hour ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Purchase request submitted</p>
                <p className="text-xs text-gray-500">3 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Project status updated</p>
                <p className="text-xs text-gray-500">5 hours ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 