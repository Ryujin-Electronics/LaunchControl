'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  Target, 
  Database, 
  Shield, 
  History,
  Activity,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'

const strategyServices = [
  {
    title: 'Strategy & Planning',
    description: 'Strategic planning and technology roadmaps',
    icon: Target,
    href: '/dashboard/strategy/strategy-and-planning',
    color: 'bg-blue-500',
    stats: { projects: 8, active: 3 }
  },
  {
    title: 'Ecosystem',
    description: 'Technology ecosystem management',
    icon: Database,
    href: '/dashboard/strategy/ecosystem',
    color: 'bg-green-500',
    stats: { systems: 15, integrated: 12 }
  },
  {
    title: 'Security',
    description: 'Security strategy and compliance',
    icon: Shield,
    href: '/dashboard/strategy/security',
    color: 'bg-red-500',
    stats: { policies: 24, compliant: 22 }
  },
  {
    title: 'Project History',
    description: 'Strategic project history and outcomes',
    icon: History,
    href: '/dashboard/strategy/project-history',
    color: 'bg-purple-500',
    stats: { completed: 47, success: 45 }
  }
]

export default function StrategyPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Strategy Centre</h1>
        <p className="text-purple-100">Strategic planning, ecosystem management, and security</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Target className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">3 in planning</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">96%</div>
            <p className="text-xs text-muted-foreground">Project success rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">92</div>
            <p className="text-xs text-muted-foreground">Out of 100</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Available experts</p>
          </CardContent>
        </Card>
      </div>

      {/* Strategy Services */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Strategy Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {strategyServices.map((service) => (
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
                    <Button variant="outline" size="sm" className="group-hover:bg-purple-50 group-hover:border-purple-200">
                      Access
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Strategic Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Strategic Activity</CardTitle>
          <CardDescription>Latest strategic initiatives and planning activities</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-3 bg-blue-50 rounded-lg">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Strategy review completed</p>
                <p className="text-xs text-gray-500">TechCorp Inc. • 2 hours ago</p>
              </div>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">Completed</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-green-50 rounded-lg">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Security audit initiated</p>
                <p className="text-xs text-gray-500">Global Solutions • 1 day ago</p>
              </div>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">In Progress</span>
            </div>
            <div className="flex items-center space-x-4 p-3 bg-purple-50 rounded-lg">
              <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
              <div className="flex-1">
                <p className="text-sm font-medium">Ecosystem integration planned</p>
                <p className="text-xs text-gray-500">StartupXYZ • 3 days ago</p>
              </div>
              <span className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-full">Planned</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 