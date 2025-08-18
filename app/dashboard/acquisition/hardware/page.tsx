'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Cpu, 
  Monitor, 
  Smartphone, 
  Laptop, 
  Package,
  Plus,
  Search,
  Filter,
  DollarSign,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'

const hardwareItems = [
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Pro',
    category: 'Laptops',
    price: 3499,
    stock: 12,
    supplier: 'Apple Australia',
    leadTime: '2-3 days',
    status: 'in-stock'
  },
  {
    id: 2,
    name: 'iMac 27" 5K Retina',
    category: 'Desktops',
    price: 2499,
    stock: 8,
    supplier: 'Apple Australia',
    leadTime: '1-2 days',
    status: 'in-stock'
  },
  {
    id: 3,
    name: 'iPhone 15 Pro 256GB',
    category: 'Smartphones',
    price: 1199,
    stock: 25,
    supplier: 'Apple Australia',
    leadTime: 'Same day',
    status: 'in-stock'
  },
  {
    id: 4,
    name: 'iPad Pro 12.9" M2',
    category: 'Tablets',
    price: 1099,
    stock: 15,
    supplier: 'Apple Australia',
    leadTime: '1-2 days',
    status: 'in-stock'
  },
  {
    id: 5,
    name: 'Mac Studio M2 Ultra',
    category: 'Workstations',
    price: 4999,
    stock: 3,
    supplier: 'Apple Australia',
    leadTime: '5-7 days',
    status: 'low-stock'
  }
]

export default function HardwarePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hardware Acquisition</h1>
          <p className="text-gray-600 mt-1">Manage hardware procurement and inventory</p>
        </div>
        <Button className="bg-acquisition hover:bg-acquisition-hover text-acquisition-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Hardware
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Items</CardTitle>
            <Package className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">247</div>
            <p className="text-xs text-muted-foreground">In inventory</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Value</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$124,580</div>
            <p className="text-xs text-muted-foreground">Inventory value</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low Stock</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">8</div>
            <p className="text-xs text-muted-foreground">Items need reorder</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Orders</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">45</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Hardware Catalog */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hardware Catalog</CardTitle>
              <CardDescription>Available hardware items and inventory levels</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search hardware..."
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
            {hardwareItems.map((item) => (
              <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-gray-500" />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.category} • {item.supplier}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>Lead time: {item.leadTime}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${item.price}</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      item.status === 'in-stock' ? 'bg-green-100 text-green-800' :
                      item.status === 'low-stock' ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {item.stock} in stock
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