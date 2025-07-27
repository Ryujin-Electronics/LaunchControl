'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Code, 
  Globe, 
  GitBranch, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Plus,
  ExternalLink,
  Settings,
  Users
} from 'lucide-react'

const webProjects = [
  {
    id: 1,
    name: 'E-commerce Platform',
    client: 'TechCorp Inc.',
    status: 'in-development',
    progress: 75,
    deadline: '2024-04-15',
    team: ['John Smith', 'Sarah Wilson'],
    tech: ['React', 'Node.js', 'PostgreSQL'],
    url: 'https://dev-ecommerce.techcorp.com'
  },
  {
    id: 2,
    name: 'Corporate Website',
    client: 'Global Solutions',
    status: 'completed',
    progress: 100,
    deadline: '2024-03-01',
    team: ['Mike Johnson', 'Lisa Brown'],
    tech: ['Next.js', 'TypeScript', 'Tailwind'],
    url: 'https://globalsolutions.com'
  },
  {
    id: 3,
    name: 'Mobile App Backend',
    client: 'StartupXYZ',
    status: 'planning',
    progress: 15,
    deadline: '2024-06-30',
    team: ['Alex Chen', 'David Lee'],
    tech: ['Express.js', 'MongoDB', 'AWS'],
    url: null
  }
]

export default function WebDevelopmentPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Web Development</h1>
          <p className="text-gray-600 mt-1">Manage web development projects and deployments</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Project
        </Button>
      </div>

      {/* Project Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <Code className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">8</div>
            <p className="text-xs text-muted-foreground">Currently in development</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">24</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">12</div>
            <p className="text-xs text-muted-foreground">Developers & designers</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Delivery</CardTitle>
            <Clock className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">6.2 weeks</div>
            <p className="text-xs text-muted-foreground">Project completion</p>
          </CardContent>
        </Card>
      </div>

      {/* Project Management */}
      <Card>
        <CardHeader>
          <CardTitle>Active Projects</CardTitle>
          <CardDescription>Current web development projects and their status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {webProjects.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        project.status === 'completed' ? 'bg-green-100 text-green-800' :
                        project.status === 'in-development' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                      }`}>
                        {project.status.replace('-', ' ')}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">Client: {project.client}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 mb-3">
                      <span>Deadline: {project.deadline}</span>
                      <span>Team: {project.team.join(', ')}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {project.tech.map((tech) => (
                        <span key={tech} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-gray-900 mb-2">{project.progress}%</div>
                    <div className="w-32 bg-gray-200 rounded-full h-2 mb-3">
                      <div 
                        className={`h-2 rounded-full ${
                          project.progress === 100 ? 'bg-green-500' :
                          project.progress >= 50 ? 'bg-blue-500' : 'bg-orange-500'
                        }`} 
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    {project.url && (
                      <Button variant="outline" size="sm" className="mb-2">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Site
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <GitBranch className="w-4 h-4 mr-2" />
                    Repository
                  </Button>
                  <Button variant="outline" size="sm">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </Button>
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Development Tools */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Development Tools</CardTitle>
            <CardDescription>Quick access to development utilities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-blue-50 hover:bg-blue-100 border-2 border-blue-200">
                <GitBranch className="w-6 h-6 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Git Repos</span>
              </Button>
              
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-green-50 hover:bg-green-100 border-2 border-green-200">
                <Globe className="w-6 h-6 text-green-600" />
                <span className="text-sm font-medium text-green-900">Deploy</span>
              </Button>
              
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-purple-50 hover:bg-purple-100 border-2 border-purple-200">
                <Code className="w-6 h-6 text-purple-600" />
                <span className="text-sm font-medium text-purple-900">IDE</span>
              </Button>
              
              <Button className="h-20 flex flex-col items-center justify-center space-y-2 bg-orange-50 hover:bg-orange-100 border-2 border-orange-200">
                <Settings className="w-6 h-6 text-orange-600" />
                <span className="text-sm font-medium text-orange-900">Config</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Deployments</CardTitle>
            <CardDescription>Latest project deployments and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <div>
                    <p className="font-medium text-green-900">E-commerce Platform</p>
                    <p className="text-sm text-green-700">Deployed to staging • 2 hours ago</p>
                  </div>
                </div>
                <span className="text-sm text-green-600 font-medium">Success</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-blue-500" />
                  <div>
                    <p className="font-medium text-blue-900">Corporate Website</p>
                    <p className="text-sm text-blue-700">Production deployment • 1 day ago</p>
                  </div>
                </div>
                <span className="text-sm text-blue-600 font-medium">Live</span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="w-5 h-5 text-orange-500" />
                  <div>
                    <p className="font-medium text-orange-900">Mobile App Backend</p>
                    <p className="text-sm text-orange-700">Build failed • 3 hours ago</p>
                  </div>
                </div>
                <span className="text-sm text-orange-600 font-medium">Failed</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 