'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  History, 
  ShoppingCart, 
  DollarSign, 
  Package,
  Search,
  Filter,
  Calendar,
  TrendingUp
} from 'lucide-react'

const purchaseHistory = [
  {
    id: 'PO-2024-001',
    client: 'TechCorp Inc.',
    items: [
      { name: 'MacBook Pro 16" M3 Pro', quantity: 5, price: 3499 },
      { name: 'iPhone 15 Pro 256GB', quantity: 10, price: 1199 }
    ],
    total: 29485,
    status: 'delivered',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20',
    paymentStatus: 'paid'
  },
  {
    id: 'PO-2024-002',
    client: 'Global Solutions',
    items: [
      { name: 'DJI Mavic 3 Pro', quantity: 2, price: 2199 },
      { name: 'Hikvision IP Camera System', quantity: 1, price: 2499 }
    ],
    total: 6897,
    status: 'in-transit',
    orderDate: '2024-01-14',
    deliveryDate: '2024-01-25',
    paymentStatus: 'paid'
  },
  {
    id: 'PO-2024-003',
    client: 'StartupXYZ',
    items: [
      { name: 'Adobe Creative Suite', quantity: 8, price: 599 },
      { name: 'Microsoft 365 Business', quantity: 12, price: 12.50 }
    ],
    total: 4800,
    status: 'processing',
    orderDate: '2024-01-13',
    deliveryDate: '2024-01-18',
    paymentStatus: 'pending'
  },
  {
    id: 'PO-2024-004',
    client: 'Canberra Corp',
    items: [
      { name: 'iMac 27" 5K Retina', quantity: 3, price: 2499 },
      { name: 'iPad Pro 12.9" M2', quantity: 6, price: 1099 }
    ],
    total: 13491,
    status: 'delivered',
    orderDate: '2024-01-10',
    deliveryDate: '2024-01-15',
    paymentStatus: 'paid'
  }
]

export default function PurchaseHistoryPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Purchase History</h1>
          <p className="text-gray-600 mt-1">Complete history of all purchases and orders</p>
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
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">1,247</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$2.4M</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$1,925</div>
            <p className="text-xs text-muted-foreground">Per order</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <Package className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">23</div>
            <p className="text-xs text-muted-foreground">In processing</p>
          </CardContent>
        </Card>
      </div>

      {/* Purchase History */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Purchase Orders</CardTitle>
              <CardDescription>Complete history of all purchase orders and their status</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search orders..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {purchaseHistory.map((order) => (
              <div key={order.id} className="border border-gray-200 rounded-lg p-6">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{order.id}</h3>
                    <p className="text-sm text-gray-500">{order.client}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-gray-900">${order.total.toLocaleString()}</p>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                        order.status === 'in-transit' ? 'bg-blue-100 text-blue-800' :
                        'bg-orange-100 text-orange-800'
                      }`}>
                        {order.status}
                      </span>
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                        order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {order.paymentStatus}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{item.name} x{item.quantity}</span>
                      <span className="font-medium">${(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                
                <div className="flex items-center justify-between text-xs text-gray-500 border-t pt-4">
                  <div className="flex items-center space-x-4">
                    <span>Order Date: {order.orderDate}</span>
                    <span>Delivery Date: {order.deliveryDate}</span>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Details</Button>
                    <Button variant="outline" size="sm">Invoice</Button>
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