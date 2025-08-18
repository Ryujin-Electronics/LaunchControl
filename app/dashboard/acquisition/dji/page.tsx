'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Cpu, 
  Camera, 
  Battery, 
  Package,
  Plus,
  Search,
  Filter,
  DollarSign,
  MapPin,
  Clock
} from 'lucide-react'

const djiProducts = [
  {
    id: 1,
    name: 'DJI Mavic 3 Pro',
    category: 'Consumer Drone',
    price: 2199,
    stock: 8,
    features: '4K Camera, 46min Flight Time',
    weight: '958g',
    range: '15km',
    status: 'in-stock'
  },
  {
    id: 2,
    name: 'DJI Air 2S',
    category: 'Consumer Drone',
    price: 1299,
    stock: 15,
    features: '5.4K Camera, 31min Flight Time',
    weight: '595g',
    range: '12km',
    status: 'in-stock'
  },
  {
    id: 3,
    name: 'DJI Mini 3 Pro',
    category: 'Mini Drone',
    price: 899,
    stock: 22,
    features: '4K Camera, 34min Flight Time',
    weight: '249g',
    range: '12km',
    status: 'in-stock'
  },
  {
    id: 4,
    name: 'DJI Inspire 2',
    category: 'Professional Drone',
    price: 3299,
    stock: 3,
    features: '5.2K Camera, 27min Flight Time',
    weight: '3440g',
    range: '7km',
    status: 'low-stock'
  },
  {
    id: 5,
    name: 'DJI Phantom 4 Pro V2.0',
    category: 'Professional Drone',
    price: 1599,
    stock: 5,
    features: '4K Camera, 30min Flight Time',
    weight: '1375g',
    range: '7km',
    status: 'in-stock'
  }
]

export default function DJIPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">DJI Drones</h1>
          <p className="text-gray-600 mt-1">Professional and consumer drone solutions</p>
        </div>
        <Button className="bg-acquisition hover:bg-acquisition-hover text-acquisition-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Drone
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Drones</CardTitle>
            <Cpu className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">53</div>
            <p className="text-xs text-muted-foreground">In inventory</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$89,247</div>
            <p className="text-xs text-muted-foreground">Inventory value</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Categories</CardTitle>
            <Package className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">4</div>
            <p className="text-xs text-muted-foreground">Drone types</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Flight Time</CardTitle>
            <Clock className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">34min</div>
            <p className="text-xs text-muted-foreground">Per battery</p>
          </CardContent>
        </Card>
      </div>

      {/* DJI Products */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>DJI Drone Catalog</CardTitle>
              <CardDescription>Professional and consumer drone solutions</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search drones..."
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
            {djiProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Camera className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.category} • {product.features}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>Weight: {product.weight}</span>
                      <span>Range: {product.range}</span>
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