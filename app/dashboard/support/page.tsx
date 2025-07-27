'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Headphones, 
  Monitor, 
  Settings, 
  History,
  Activity,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

const supportServices = [
  {
    title: 'Remote Support',
    description: 'Remote technical support and assistance',
    icon: Monitor,
    href: '/dashboard/support/remote-support',
    color: 'bg-blue-500',
    stats: { sessions: 8, active: 3 }
  },
  {
    title: 'On-site Support',
    description: 'On-site technical support services',
    icon: Settings,
    href: '/dashboard/support/on-site-support',
    color: 'bg-green-500',
    stats: { visits: 12, scheduled: 5 }
  },
  {
    title: 'Ticket History',
    description: 'Support ticket management and history',
    icon: History,
    href: '/dashboard/support/ticket-history',
    color: 'bg-purple-500',
    stats: { total: 1247, resolved: 1189 }
  }
]

export default function SupportPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Support Centre</h1>
        <p className="text-green-100">Technical support and customer service management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tickets</CardTitle>
            <Headphones className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">3 urgent</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Response</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2.1h</div>
            <p className="text-xs text-muted-foreground">Time to first response</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">95%</div>
            <p className="text-xs text-muted-foreground">First contact resolution</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Support Team</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Available technicians</p>
          </CardContent>
        </Card>
      </div>

      {/* Support Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Support Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportServices.map((service) => (
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
                    <Button variant="outline" size="sm" className="group-hover:bg-green-50 group-hover:border-green-200">
                      Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Support Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Support Activity</CardTitle>
          <CardDescription>Latest support tickets and sessions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Remote session started</p>
                <p className="text-xs text-gray-500">TechCorp Inc. • 5 minutes ago</p>
              </div>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Active</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Ticket resolved</p>
                <p className="text-xs text-gray-500">Global Solutions • 1 hour ago</p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">Resolved</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-orange-50 rounded-lg">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">On-site visit scheduled</p>
                <p className="text-xs text-gray-500">StartupXYZ • 2 hours ago</p>
              </div>
              <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">Scheduled</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 