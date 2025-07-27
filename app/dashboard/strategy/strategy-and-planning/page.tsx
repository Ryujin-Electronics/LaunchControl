'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Target, 
  TrendingUp, 
  Calendar, 
  Users, 
  FileText,
  Plus,
  CheckCircle,
  Clock,
  AlertTriangle
} from 'lucide-react'

const strategicInitiatives = [
  {
    id: 1,
    title: 'Digital Transformation 2024',
    status: 'in-progress',
    progress: 65,
    deadline: '2024-12-31',
    owner: 'Sarah Johnson',
    priority: 'high',
    description: 'Complete migration to cloud-based infrastructure'
  },
  {
    id: 2,
    title: 'Security Enhancement Program',
    status: 'planning',
    progress: 25,
    deadline: '2024-06-30',
    owner: 'Mike Wilson',
    priority: 'critical',
    description: 'Implement zero-trust security framework'
  },
  {
    id: 3,
    title: 'Mobile-First Strategy',
    status: 'completed',
    progress: 100,
    deadline: '2024-03-15',
    owner: 'Lisa Brown',
    priority: 'medium',
    description: 'Optimize all applications for mobile devices'
  }
]

export default function StrategyAndPlanningPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Strategy & Planning</h1>
          <p className="text-gray-600 mt-1">Strategic initiatives and technology roadmap</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          New Initiative
        </Button>
      </div>

      {/* Strategy Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Initiatives</CardTitle>
            <Target className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">12</div>
            <p className="text-xs text-muted-foreground">Currently in progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">78%</div>
            <p className="text-xs text-muted-foreground">On track for Q4</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Upcoming Deadlines</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">5</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">24</div>
            <p className="text-xs text-muted-foreground">Across all projects</p>
          </CardContent>
        </Card>
      </div>

      {/* Strategic Initiatives */}
      <Card>
        <CardHeader>
          <CardTitle>Strategic Initiatives</CardTitle>
          <CardDescription>Key technology initiatives and their progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {strategicInitiatives.map((initiative) => (
              <div key={initiative.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg font-semibold text-gray-900">{initiative.title}</h3>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        initiative.priority === 'critical' ? 'bg-red-100 text-red-800' :
                        initiative.priority === 'high' ? 'bg-orange-100 text-orange-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {initiative.priority}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{initiative.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <span>Owner: {initiative.owner}</span>
                      <span>Deadline: {initiative.deadline}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center space-x-2 mb-2">
                      {initiative.status === 'completed' && <CheckCircle className="w-5 h-5 text-green-500" />}
                      {initiative.status === 'in-progress' && <Clock className="w-5 h-5 text-blue-500" />}
                      {initiative.status === 'planning' && <AlertTriangle className="w-5 h-5 text-orange-500" />}
                      <span className={`text-sm font-medium ${
                        initiative.status === 'completed' ? 'text-green-600' :
                        initiative.status === 'in-progress' ? 'text-blue-600' : 'text-orange-600'
                      }`}>
                        {initiative.status.replace('-', ' ')}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{initiative.progress}%</div>
                  </div>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                  <div 
                    className={`h-2 rounded-full ${
                      initiative.progress === 100 ? 'bg-green-500' :
                      initiative.progress >= 50 ? 'bg-blue-500' : 'bg-orange-500'
                    }`} 
                    style={{ width: `${initiative.progress}%` }}
                  ></div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">View Details</Button>
                  <Button variant="outline" size="sm">Update Progress</Button>
                  <Button variant="outline" size="sm">Team Chat</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Technology Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Technology Roadmap</CardTitle>
            <CardDescription>Planned technology implementations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-blue-900">Q1 2024 - Cloud Migration</h4>
                  <p className="text-sm text-blue-700">Complete AWS migration</p>
                </div>
                <CheckCircle className="w-5 h-5 text-blue-500" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-orange-50 border border-orange-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-orange-900">Q2 2024 - Security Framework</h4>
                  <p className="text-sm text-orange-700">Zero-trust implementation</p>
                </div>
                <Clock className="w-5 h-5 text-orange-500" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Q3 2024 - AI Integration</h4>
                  <p className="text-sm text-gray-700">Machine learning platform</p>
                </div>
                <Target className="w-5 h-5 text-gray-500" />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Q4 2024 - IoT Platform</h4>
                  <p className="text-sm text-gray-700">Connected device management</p>
                </div>
                <Target className="w-5 h-5 text-gray-500" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resource Allocation</CardTitle>
            <CardDescription>Team and budget distribution</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Development Team</span>
                  <span className="text-sm text-gray-500">12 members</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Security Team</span>
                  <span className="text-sm text-gray-500">6 members</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Infrastructure</span>
                  <span className="text-sm text-gray-500">4 members</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Project Management</span>
                  <span className="text-sm text-gray-500">2 members</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '10%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 