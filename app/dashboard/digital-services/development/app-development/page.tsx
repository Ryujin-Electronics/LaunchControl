'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Smartphone, 
  Code, 
  Download, 
  Users,
  Plus,
  Search,
  Filter,
  DollarSign,
  Clock,
  TrendingUp
} from 'lucide-react'

const appProjects = [
  {
    id: 1,
    name: 'TechCorp Mobile App',
    platform: 'iOS & Android',
    client: 'TechCorp Inc.',
    status: 'in-development',
    progress: 75,
    startDate: '2024-01-01',
    estimatedCompletion: '2024-03-15',
    budget: 25000,
    team: ['Mike Johnson', 'Sarah Wilson', 'David Lee']
  },
  {
    id: 2,
    name: 'Canberra Tourism App',
    platform: 'iOS',
    client: 'Canberra Tourism Board',
    status: 'completed',
    progress: 100,
    startDate: '2023-10-15',
    estimatedCompletion: '2024-01-15',
    budget: 18000,
    team: ['Alex Chen', 'Lisa Brown']
  },
  {
    id: 3,
    name: 'StartupXYZ Business App',
    platform: 'Android',
    client: 'StartupXYZ',
    status: 'planning',
    progress: 15,
    startDate: '2024-02-01',
    estimatedCompletion: '2024-06-30',
    budget: 35000,
    team: ['Mike Johnson', 'Sarah Wilson', 'David Lee', 'Alex Chen']
  },
  {
    id: 4,
    name: 'Global Solutions CRM App',
    platform: 'iOS & Android',
    client: 'Global Solutions',
    status: 'testing',
    progress: 90,
    startDate: '2023-11-01',
    estimatedCompletion: '2024-02-28',
    budget: 22000,
    team: ['Sarah Wilson', 'David Lee']
  }
]

export default function AppDevelopmentPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">App Development</h1>
          <p className="text-gray-600 mt-1">Mobile application development projects</p>
        </div>
        <Button className="bg-digital hover:bg-digital-hover text-digital-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Code className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">4</div>
            <p className="text-xs text-muted-foreground">In development</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$100,000</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Development Team</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">6</div>
            <p className="text-xs text-muted-foreground">Developers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Delivery</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">3.2 months</div>
            <p className="text-xs text-muted-foreground">Per project</p>
          </CardContent>
        </Card>
      </div>

      {/* App Projects */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>App Development Projects</CardTitle>
              <CardDescription>Current and completed mobile application projects</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search projects..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {appProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.client} • {project.platform}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${project.budget.toLocaleString()}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      project.status === 'completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'testing' ? 'bg-blue-100 text-blue-800' :
                      project.status === 'in-development' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{project.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        project.progress >= 100 ? 'bg-green-500' :
                        project.progress >= 75 ? 'bg-blue-500' :
                        project.progress >= 50 ? 'bg-orange-500' : 'bg-gray-400'
                      }`}
                      style={{ width: `${project.progress}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="text-sm font-medium">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Estimated Completion</p>
                    <p className="text-sm font-medium">{project.estimatedCompletion}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Team</p>
                    <p className="text-sm font-medium">{project.team.length} developers</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {project.team.map((member, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">
                        {member}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Update Progress</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 