'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Shield, 
  Camera, 
  Lock, 
  AlertTriangle,
  Plus,
  Search,
  Filter,
  DollarSign,
  Users,
  MapPin
} from 'lucide-react'

const securityProducts = [
  {
    id: 1,
    name: 'Hikvision IP Camera System',
    category: 'Surveillance',
    price: 2499,
    stock: 5,
    features: '4K Resolution, Night Vision, Motion Detection',
    coverage: '360°',
    storage: '2TB',
    status: 'in-stock'
  },
  {
    id: 2,
    name: 'ADT Security System',
    category: 'Alarm System',
    price: 899,
    stock: 12,
    features: 'Wireless, Mobile App, 24/7 Monitoring',
    coverage: 'Whole House',
    battery: '24h Backup',
    status: 'in-stock'
  },
  {
    id: 3,
    name: 'Yale Smart Lock',
    category: 'Access Control',
    price: 299,
    stock: 25,
    features: 'Fingerprint, PIN, Mobile App',
    battery: '12 months',
    connectivity: 'WiFi + Bluetooth',
    status: 'in-stock'
  },
  {
    id: 4,
    name: 'Ring Video Doorbell Pro',
    category: 'Door Security',
    price: 199,
    stock: 18,
    features: '1080p HD, Two-way Talk, Motion Alerts',
    battery: '6 months',
    connectivity: 'WiFi',
    status: 'in-stock'
  },
  {
    id: 5,
    name: 'Arlo Pro 4 Security Camera',
    category: 'Wireless Camera',
    price: 399,
    stock: 8,
    features: '2K HDR, Color Night Vision, Spotlight',
    battery: '6 months',
    weatherproof: 'Yes',
    status: 'low-stock'
  }
]

export default function PhysicalSecurityPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Physical Security</h1>
          <p className="text-gray-600 mt-1">Surveillance, access control, and security systems</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Security Product
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Systems</CardTitle>
            <Shield className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">68</div>
            <p className="text-xs text-muted-foreground">Installed systems</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$156,847</div>
            <p className="text-xs text-muted-foreground">Equipment value</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Cameras</CardTitle>
            <Camera className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">247</div>
            <p className="text-xs text-muted-foreground">Monitoring</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Protected Sites</CardTitle>
            <MapPin className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">23</div>
            <p className="text-xs text-muted-foreground">Client locations</p>
          </CardContent>
        </Card>
      </div>

      {/* Security Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Security Products</CardTitle>
              <CardDescription>Surveillance, access control, and alarm systems</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
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
            {securityProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Shield className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category} • {product.features}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      {product.coverage && <span>Coverage: {product.coverage}</span>}
                      {product.storage && <span>Storage: {product.storage}</span>}
                      {product.battery && <span>Battery: {product.battery}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${product.price}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.status === 'in-stock' ? 'bg-green-100 text-green-800' :
                      product.status === 'low-stock' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {product.stock} in stock
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">Order</Button>
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