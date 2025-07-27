import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Monitor, 
  Smartphone, 
  ShoppingCart, 
  Users, 
  Settings, 
  Shield,
  Headphones,
  Target,
  Code,
  MoreHorizontal,
  AlertTriangle,
  History,
  Globe,
  Server,
  Cpu,
  Database,
  Trash2,
  Printer,
  Share2,
  Mail,
  Globe2,
  TrendingUp,
  Activity
} from 'lucide-react'

export default async function DashboardPage() {
  const session = await getServerSession()
  
  if (!session) {
    redirect('/auth/signin')
  }

  const modules = [
    {
      title: 'Control',
      description: 'Device management, monitoring & alerts',
      icon: Monitor,
      href: '/dashboard/control',
      color: 'bg-blue-500',
      stats: { active: 247, alerts: 3 }
    },
    {
      title: 'Support',
      description: 'Remote & on-site support services',
      icon: Headphones,
      href: '/dashboard/support',
      color: 'bg-green-500',
      stats: { tickets: 12, active: 5 }
    },
    {
      title: 'Strategy',
      description: 'Planning, ecosystem & security',
      icon: Target,
      href: '/dashboard/strategy',
      color: 'bg-purple-500',
      stats: { projects: 8, active: 3 }
    },
    {
      title: 'Acquisition',
      description: 'Store, procurement & purchases',
      icon: ShoppingCart,
      href: '/dashboard/acquisition',
      color: 'bg-orange-500',
      stats: { orders: 24, pending: 7 }
    },
    {
      title: 'Digital Services',
      description: 'Development & hosting solutions',
      icon: Code,
      href: '/dashboard/digital',
      color: 'bg-indigo-500',
      stats: { projects: 15, hosting: 42 }
    },
    {
      title: 'More',
      description: 'Recycling, print & social media',
      icon: MoreHorizontal,
      href: '/dashboard/more',
      color: 'bg-gray-500',
      stats: { services: 3, active: 2 }
    }
  ]

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Welcome back, {session.user?.name}</h1>
        <p className="text-blue-100">Your operational command centre is ready</p>
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
            <CardTitle className="text-sm font-medium">Support Tickets</CardTitle>
            <Headphones className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 urgent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">2 due this week</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">$12,450 total</p>
          </CardContent>
        </Card>
      </div>

      {/* Service Modules */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Modules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {modules.map((module) => (
            <Link key={module.href} href={module.href}>
              <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className={`w-12 h-12 ${module.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <module.icon className="w-6 h-6 text-white" />
                    </div>
                    <Activity className="w-5 h-5 text-gray-400 group-hover:text-gray-600" />
                  </div>
                  <CardTitle className="text-xl">{module.title}</CardTitle>
                  <CardDescription>{module.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-gray-600">
                      {Object.entries(module.stats).map(([key, value]) => (
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
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-orange-500" />
              Recent Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">High CPU Usage</p>
                  <p className="text-xs text-gray-600">Server-01 • 2 minutes ago</p>
                </div>
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">Critical</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div>
                  <p className="font-medium text-sm">Backup Failed</p>
                  <p className="text-xs text-gray-600">Backup-System • 15 minutes ago</p>
                </div>
                <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-1 rounded">Warning</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <History className="w-5 h-5 mr-2 text-blue-500" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">New device registered</p>
                  <p className="text-xs text-gray-600">MacBook Pro • 5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Support ticket resolved</p>
                  <p className="text-xs text-gray-600">#TKT-2024-001 • 1 hour ago</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Project milestone completed</p>
                  <p className="text-xs text-gray-600">Website Redesign • 2 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 