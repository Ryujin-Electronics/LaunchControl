'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Code, 
  Download, 
  Key, 
  Package,
  Plus,
  Search,
  Filter,
  DollarSign,
  Users,
  Calendar
} from 'lucide-react'

const softwareItems = [
  {
    id: 1,
    name: 'Adobe Creative Suite',
    category: 'Design Software',
    price: 599,
    licenseType: 'Annual Subscription',
    seats: 10,
    vendor: 'Adobe',
    renewalDate: '2024-12-15',
    status: 'active'
  },
  {
    id: 2,
    name: 'Microsoft 365 Business',
    category: 'Productivity',
    price: 12.50,
    licenseType: 'Per User/Month',
    seats: 25,
    vendor: 'Microsoft',
    renewalDate: '2024-11-30',
    status: 'active'
  },
  {
    id: 3,
    name: 'Slack Pro',
    category: 'Communication',
    price: 7.25,
    licenseType: 'Per User/Month',
    seats: 15,
    vendor: 'Slack Technologies',
    renewalDate: '2024-10-20',
    status: 'active'
  },
  {
    id: 4,
    name: 'Zoom Pro',
    category: 'Video Conferencing',
    price: 14.99,
    licenseType: 'Per User/Month',
    seats: 8,
    vendor: 'Zoom Video',
    renewalDate: '2024-09-15',
    status: 'expiring'
  },
  {
    id: 5,
    name: 'Final Cut Pro X',
    category: 'Video Editing',
    price: 399,
    licenseType: 'One-time Purchase',
    seats: 3,
    vendor: 'Apple',
    renewalDate: 'N/A',
    status: 'active'
  }
]

export default function SoftwarePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Software Acquisition</h1>
          <p className="text-gray-600 mt-1">Manage software licenses and subscriptions</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Software
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Licenses</CardTitle>
            <Key className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">23</div>
            <p className="text-xs text-muted-foreground">Software titles</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$2,847</div>
            <p className="text-xs text-muted-foreground">Total subscriptions</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">156</div>
            <p className="text-xs text-muted-foreground">Licensed seats</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Expiring Soon</CardTitle>
            <Calendar className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">3</div>
            <p className="text-xs text-muted-foreground">Next 30 days</p>
          </CardContent>
        </Card>
      </div>

      {/* Software Licenses */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Software Licenses</CardTitle>
              <CardDescription>Manage software licenses and subscription renewals</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search software..."
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
            {softwareItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Code className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category} • {item.vendor}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>{item.licenseType}</span>
                      <span>{item.seats} seats</span>
                      <span>Renewal: {item.renewalDate}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">
                      {item.licenseType.includes('Month') ? `$${item.price}/month` : `$${item.price}`}
                    </p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'active' ? 'bg-green-100 text-green-800' :
                      item.status === 'expiring' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Manage</Button>
                    <Button variant="outline" size="sm">Renew</Button>
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