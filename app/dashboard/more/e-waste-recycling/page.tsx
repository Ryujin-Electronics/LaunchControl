'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Trash2, 
  Recycle, 
  Truck, 
  Calendar,
  Plus,
  Search,
  Filter,
  DollarSign,
  Users,
  MapPin
} from 'lucide-react'

const recyclingServices = [
  {
    id: 1,
    client: 'TechCorp Inc.',
    service: 'Corporate E-waste Collection',
    items: ['Laptops', 'Monitors', 'Servers', 'Printers'],
    weight: '2.5 tons',
    status: 'scheduled',
    scheduledDate: '2024-01-20',
    location: 'Canberra CBD',
    value: 1500,
    certificate: 'Yes'
  },
  {
    id: 2,
    client: 'Global Solutions',
    service: 'Data Center Decommissioning',
    items: ['Servers', 'Storage Arrays', 'Network Equipment'],
    weight: '5.2 tons',
    status: 'completed',
    scheduledDate: '2024-01-15',
    location: 'Belconnen',
    value: 3200,
    certificate: 'Yes'
  },
  {
    id: 3,
    client: 'StartupXYZ',
    service: 'Office Equipment Recycling',
    items: ['Desktops', 'Monitors', 'Keyboards', 'Mice'],
    weight: '0.8 tons',
    status: 'in-progress',
    scheduledDate: '2024-01-18',
    location: 'Woden',
    value: 800,
    certificate: 'Pending'
  }
]

export default function EwasteRecyclingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">E-Waste Recycling</h1>
          <p className="text-gray-600 mt-1">Sustainable electronic waste disposal and recycling services</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Schedule Pickup
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Collections</CardTitle>
            <Truck className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">47</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Weight</CardTitle>
            <Recycle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12.5 tons</div>
            <p className="text-xs text-muted-foreground">Recycled</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$28,500</div>
            <p className="text-xs text-muted-foreground">This year</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recycling Rate</CardTitle>
            <Trash2 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">98%</div>
            <p className="text-xs text-muted-foreground">Materials recovered</p>
          </CardContent>
        </Card>
      </div>

      {/* Recycling Services */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Recycling Services</CardTitle>
              <CardDescription>E-waste collection and recycling operations</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search services..."
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
            {recyclingServices.map((service) => (
              <div key={service.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Recycle className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{service.service}</h3>
                    <p className="text-sm text-gray-500">{service.client} • {service.location}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>Weight: {service.weight}</span>
                      <span>Items: {service.items.join(', ')}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${service.value}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      service.status === 'completed' ? 'bg-green-100 text-green-800' :
                      service.status === 'in-progress' ? 'bg-blue-100 text-blue-800' : 'bg-orange-100 text-orange-800'
                    }`}>
                      {service.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Date: {service.scheduledDate}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Certificate</Button>
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