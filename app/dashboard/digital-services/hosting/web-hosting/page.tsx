'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Globe, 
  Server, 
  Database, 
  Shield,
  Plus,
  Search,
  Filter,
  DollarSign,
  Activity,
  Clock
} from 'lucide-react'

const hostingServices = [
  {
    id: 1,
    name: 'TechCorp Website',
    client: 'TechCorp Inc.',
    plan: 'Business Pro',
    status: 'active',
    uptime: 99.9,
    bandwidth: '500GB',
    storage: '100GB',
    monthlyCost: 89,
    renewalDate: '2024-02-15',
    server: 'AWS Sydney'
  },
  {
    id: 2,
    name: 'Canberra Tourism Site',
    client: 'Canberra Tourism Board',
    plan: 'Enterprise',
    status: 'active',
    uptime: 99.95,
    bandwidth: '1TB',
    storage: '250GB',
    monthlyCost: 149,
    renewalDate: '2024-03-01',
    server: 'AWS Sydney'
  },
  {
    id: 3,
    name: 'StartupXYZ Portal',
    client: 'StartupXYZ',
    plan: 'Starter',
    status: 'active',
    uptime: 99.8,
    bandwidth: '100GB',
    storage: '50GB',
    monthlyCost: 29,
    renewalDate: '2024-01-30',
    server: 'DigitalOcean Sydney'
  },
  {
    id: 4,
    name: 'Global Solutions CRM',
    client: 'Global Solutions',
    plan: 'Business Pro',
    status: 'suspended',
    uptime: 0,
    bandwidth: '500GB',
    storage: '100GB',
    monthlyCost: 89,
    renewalDate: '2024-01-15',
    server: 'AWS Sydney'
  }
]

export default function WebHostingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Web Hosting</h1>
          <p className="text-gray-600 mt-1">Manage web hosting services and server infrastructure</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Hosting
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Sites</CardTitle>
            <Globe className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">23</div>
            <p className="text-xs text-muted-foreground">Hosted websites</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$3,247</div>
            <p className="text-xs text-muted-foreground">Hosting services</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Uptime</CardTitle>
            <Activity className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">99.9%</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Storage</CardTitle>
            <Database className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">2.4TB</div>
            <p className="text-xs text-muted-foreground">Used storage</p>
          </CardContent>
        </Card>
      </div>

      {/* Hosting Services */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hosting Services</CardTitle>
              <CardDescription>Web hosting accounts and their status</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search hosting..."
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
            {hostingServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Server className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{service.name}</h3>
                    <p className="text-sm text-gray-500">{service.client} • {service.plan}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>Server: {service.server}</span>
                      <span>Bandwidth: {service.bandwidth}</span>
                      <span>Storage: {service.storage}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${service.monthlyCost}/month</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {service.status}
                      </span>
                      <span className="text-xs text-gray-500">
                        {service.uptime}% uptime
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">Renewal: {service.renewalDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Manage</Button>
                    <Button variant="outline" size="sm">View Details</Button>
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