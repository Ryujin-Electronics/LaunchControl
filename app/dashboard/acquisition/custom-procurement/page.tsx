'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Settings, 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Plus,
  Search,
  Filter,
  DollarSign,
  Users
} from 'lucide-react'

const procurementRequests = [
  {
    id: 'PR-2024-001',
    title: 'Custom Server Configuration',
    client: 'TechCorp Inc.',
    description: 'High-performance server for data processing',
    budget: 15000,
    status: 'approved',
    submitted: '2024-01-15',
    estimatedDelivery: '2024-02-15',
    assignedTo: 'Mike Johnson',
    priority: 'high'
  },
  {
    id: 'PR-2024-002',
    title: 'Specialized Security Equipment',
    client: 'Global Solutions',
    description: 'Advanced security cameras and monitoring system',
    budget: 8500,
    status: 'in-review',
    submitted: '2024-01-14',
    estimatedDelivery: '2024-02-10',
    assignedTo: 'Sarah Wilson',
    priority: 'medium'
  },
  {
    id: 'PR-2024-003',
    title: 'Custom Software Development',
    client: 'StartupXYZ',
    description: 'Bespoke CRM system integration',
    budget: 25000,
    status: 'pending',
    submitted: '2024-01-13',
    estimatedDelivery: '2024-03-15',
    assignedTo: 'David Lee',
    priority: 'low'
  },
  {
    id: 'PR-2024-004',
    title: 'Network Infrastructure Upgrade',
    client: 'Canberra Corp',
    description: 'Complete network overhaul with custom routing',
    budget: 32000,
    status: 'completed',
    submitted: '2024-01-10',
    estimatedDelivery: '2024-01-25',
    assignedTo: 'Alex Chen',
    priority: 'high'
  }
]

export default function CustomProcurementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Custom Procurement</h1>
          <p className="text-gray-600 mt-1">Manage bespoke procurement requests and custom solutions</p>
        </div>
        <Button className="bg-acquisition hover:bg-acquisition-hover text-acquisition-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Request
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Requests</CardTitle>
            <FileText className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-muted-foreground">In progress</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Budget</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$89,500</div>
            <p className="text-xs text-muted-foreground">Current requests</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Delivery</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">18 days</div>
            <p className="text-xs text-muted-foreground">Time to complete</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">94%</div>
            <p className="text-xs text-muted-foreground">On-time delivery</p>
          </CardContent>
        </Card>
      </div>

      {/* Procurement Requests */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Procurement Requests</CardTitle>
              <CardDescription>Custom procurement requests and their status</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search requests..."
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
          <div className="space-y-4">
            {procurementRequests.map((request) => (
              <div key={request.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    request.status === 'completed' ? 'bg-green-500' :
                    request.status === 'approved' ? 'bg-blue-500' :
                    request.status === 'in-review' ? 'bg-orange-500' : 'bg-gray-500'
                  }`}></div>
                  <div>
                    <h3 className="font-medium text-gray-900">{request.title}</h3>
                    <p className="text-sm text-gray-500">{request.client} • {request.description}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>ID: {request.id}</span>
                      <span>Submitted: {request.submitted}</span>
                      <span>Delivery: {request.estimatedDelivery}</span>
                      <span>Assigned: {request.assignedTo}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${request.budget.toLocaleString()}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      request.priority === 'high' ? 'bg-red-100 text-red-800' :
                      request.priority === 'medium' ? 'bg-orange-100 text-orange-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {request.priority}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ml-2 ${
                      request.status === 'completed' ? 'bg-green-100 text-green-800' :
                      request.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      request.status === 'in-review' ? 'bg-orange-100 text-orange-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {request.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Update</Button>
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