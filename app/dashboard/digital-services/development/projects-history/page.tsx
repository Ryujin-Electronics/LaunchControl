'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  History, 
  Code, 
  Globe, 
  Smartphone,
  Search,
  Filter,
  Calendar,
  DollarSign,
  CheckCircle,
  Clock
} from 'lucide-react'

const projectHistory = [
  {
    id: 1,
    name: 'TechCorp E-commerce Platform',
    type: 'Web Development',
    client: 'TechCorp Inc.',
    status: 'completed',
    startDate: '2023-06-01',
    completionDate: '2023-09-15',
    budget: 45000,
    revenue: 45000,
    team: ['Mike Johnson', 'Sarah Wilson', 'David Lee'],
    technologies: ['React', 'Node.js', 'PostgreSQL']
  },
  {
    id: 2,
    name: 'Canberra Tourism Mobile App',
    type: 'App Development',
    client: 'Canberra Tourism Board',
    status: 'completed',
    startDate: '2023-10-15',
    completionDate: '2024-01-15',
    budget: 18000,
    revenue: 18000,
    team: ['Alex Chen', 'Lisa Brown'],
    technologies: ['React Native', 'Firebase']
  },
  {
    id: 3,
    name: 'Global Solutions CRM System',
    type: 'Web Development',
    client: 'Global Solutions',
    status: 'completed',
    startDate: '2023-08-01',
    completionDate: '2023-11-30',
    budget: 32000,
    revenue: 32000,
    team: ['Sarah Wilson', 'David Lee', 'Mike Johnson'],
    technologies: ['Vue.js', 'Laravel', 'MySQL']
  },
  {
    id: 4,
    name: 'StartupXYZ Business Portal',
    type: 'Web Development',
    client: 'StartupXYZ',
    status: 'completed',
    startDate: '2023-04-01',
    completionDate: '2023-07-15',
    budget: 28000,
    revenue: 28000,
    team: ['David Lee', 'Alex Chen'],
    technologies: ['Next.js', 'TypeScript', 'MongoDB']
  },
  {
    id: 5,
    name: 'Canberra Corp Inventory System',
    type: 'App Development',
    client: 'Canberra Corp',
    status: 'completed',
    startDate: '2023-02-01',
    completionDate: '2023-05-30',
    budget: 22000,
    revenue: 22000,
    team: ['Mike Johnson', 'Lisa Brown'],
    technologies: ['Flutter', 'Firebase']
  }
]

export default function ProjectsHistoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Projects History</h1>
          <p className="text-gray-600 mt-1">Complete history of all development projects</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Calendar className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button variant="outline" size="sm">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <History className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">47</div>
            <p className="text-xs text-muted-foreground">Completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$1.2M</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">98%</div>
            <p className="text-xs text-muted-foreground">On-time delivery</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Duration</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">3.4 months</div>
            <p className="text-xs text-muted-foreground">Per project</p>
          </CardContent>
        </Card>
      </div>

      {/* Project History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Completed Projects</CardTitle>
              <CardDescription>Historical record of all completed development projects</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search projects..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {projectHistory.map((project) => (
              <div key={project.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{project.name}</h3>
                    <p className="text-sm text-gray-500">{project.client} • {project.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${project.revenue.toLocaleString()}</p>
                    <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                      {project.status}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Start Date</p>
                    <p className="text-sm font-medium">{project.startDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Completion Date</p>
                    <p className="text-sm font-medium">{project.completionDate}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Budget</p>
                    <p className="text-sm font-medium">${project.budget.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Team Size</p>
                    <p className="text-sm font-medium">{project.team.length} developers</p>
                  </div>
                </div>
                
                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-2">Technologies Used</p>
                  <div className="flex flex-wrap gap-1">
                    {project.technologies.map((tech, index) => (
                      <span key={index} className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">
                        {tech}
                      </span>
                    ))}
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
                    <Button variant="outline" size="sm">Case Study</Button>
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