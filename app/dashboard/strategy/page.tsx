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
    color: 'bg-strategy',
    textColor: 'text-strategy-foreground',
    borderColor: 'border-strategy',
    hoverColor: 'hover:bg-strategy-hover',
    stats: { projects: 8, active: 3 }
  },
  {
    title: 'Ecosystem',
    description: 'Technology ecosystem management',
    icon: Database,
    href: '/dashboard/strategy/ecosystem',
    color: 'bg-digital',
    textColor: 'text-digital-foreground',
    borderColor: 'border-digital',
    hoverColor: 'hover:bg-digital-hover',
    stats: { systems: 15, integrated: 12 }
  },
  {
    title: 'Security',
    description: 'Security strategy and compliance',
    icon: Shield,
    href: '/dashboard/strategy/security',
    color: 'bg-alerts',
    textColor: 'text-alerts-foreground',
    borderColor: 'border-alerts',
    hoverColor: 'hover:bg-alerts-hover',
    stats: { policies: 24, compliant: 22 }
  },
  {
    title: 'Project History',
    description: 'Strategic project history and outcomes',
    icon: History,
    href: '/dashboard/strategy/project-history',
    color: 'bg-support',
    textColor: 'text-support-foreground',
    borderColor: 'border-support',
    hoverColor: 'hover:bg-support-hover',
    stats: { completed: 47, success: 45 }
  }
]

export default function StrategyPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-strategy to-primary rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Strategy Centre</h1>
        <p className="text-strategy-light">Strategic planning, ecosystem management, and security</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <div className="w-8 h-8 bg-strategy icon-circle">
              <Target className="h-4 w-4 text-strategy-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-strategy">8</div>
            <p className="text-xs text-muted-foreground">3 in planning</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <div className="w-8 h-8 bg-support icon-circle">
              <CheckCircle className="h-4 w-4 text-support-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-support">96%</div>
            <p className="text-xs text-muted-foreground">Project success rate</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <div className="w-8 h-8 bg-alerts icon-circle">
              <Shield className="h-4 w-4 text-alerts-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-alerts">92</div>
            <p className="text-xs text-muted-foreground">Out of 100</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Ecosystem Health</CardTitle>
            <div className="w-8 h-8 bg-digital icon-circle">
              <Database className="h-4 w-4 text-digital-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-digital">87%</div>
            <p className="text-xs text-muted-foreground">Systems integrated</p>
          </CardContent>
        </Card>
      </div>

      {/* Strategy Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {strategyServices.map((service) => (
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
                    size="sm" 
                    className={`${service.color} ${service.textColor} ${service.hoverColor}`}
                  >
                    Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Strategy Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Strategic Initiatives
            </CardTitle>
            <CardDescription>
              Current strategic initiatives and their progress
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Digital Transformation</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div className="w-12 h-2 bg-strategy rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-strategy">75%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Security Enhancement</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div className="w-14 h-2 bg-alerts rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-alerts">88%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Cloud Migration</span>
              <div className="flex items-center gap-2">
                <div className="w-16 h-2 bg-muted rounded-full">
                  <div className="w-10 h-2 bg-digital rounded-full"></div>
                </div>
                <span className="text-sm font-medium text-digital">62%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team Performance
            </CardTitle>
            <CardDescription>
              Strategic team performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Strategy Team</span>
              <span className="font-semibold text-strategy">12 members</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Avg Project Completion</span>
              <span className="font-semibold text-support">18 days</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Client Satisfaction</span>
              <span className="font-semibold text-support">4.9/5</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Strategic Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Strategic Activities</CardTitle>
          <CardDescription>
            Latest strategic decisions and implementations
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-strategy icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">New strategic roadmap approved</p>
                <p className="text-xs text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-alerts icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Security audit completed</p>
                <p className="text-xs text-muted-foreground">1 day ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-digital icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Ecosystem integration milestone</p>
                <p className="text-xs text-muted-foreground">3 days ago</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-support icon-circle"></div>
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Strategic project delivered</p>
                <p className="text-xs text-muted-foreground">1 week ago</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 