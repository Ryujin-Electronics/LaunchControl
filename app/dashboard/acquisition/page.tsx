'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { 
  ShoppingCart, 
  Package, 
  Monitor, 
  Smartphone,
  Shield,
  TrendingUp,
  DollarSign,
  Clock,
  CheckCircle,
  AlertTriangle,
  Activity,
  Plus,
  Search,
  Filter,
  Camera
} from 'lucide-react'

const acquisitionServices = [
  {
    title: 'Online Store',
    description: 'E-commerce platform and product management',
    icon: ShoppingCart,
    href: '/dashboard/acquisition/online-store',
    color: 'bg-acquisition',
    textColor: 'text-acquisition-foreground',
    borderColor: 'border-acquisition',
    hoverColor: 'hover:bg-acquisition-hover',
    stats: { products: 89, orders: 1247 }
  },
  {
    title: 'Hardware',
    description: 'Computer hardware and equipment procurement',
    icon: Monitor,
    href: '/dashboard/acquisition/hardware',
    color: 'bg-acquisition',
    textColor: 'text-acquisition-foreground',
    borderColor: 'border-acquisition',
    hoverColor: 'hover:bg-acquisition-hover',
    stats: { items: 156, pending: 12 }
  },
  {
    title: 'Software',
    description: 'Software licenses and subscriptions',
    icon: Package,
    href: '/dashboard/acquisition/software',
    color: 'bg-acquisition',
    textColor: 'text-acquisition-foreground',
    borderColor: 'border-acquisition',
    hoverColor: 'hover:bg-acquisition-hover',
    stats: { licenses: 234, active: 198 }
  },
  {
    title: 'DJI Solutions',
    description: 'Professional and consumer drone solutions',
    icon: Camera,
    href: '/dashboard/acquisition/dji',
    color: 'bg-acquisition',
    textColor: 'text-acquisition-foreground',
    borderColor: 'border-acquisition',
    hoverColor: 'hover:bg-acquisition-hover',
    stats: { drones: 23, services: 8 }
  },
  {
    title: 'Custom Procurement',
    description: 'Bespoke procurement requests and solutions',
    icon: Shield,
    href: '/dashboard/acquisition/custom-procurement',
    color: 'bg-acquisition',
    textColor: 'text-acquisition-foreground',
    borderColor: 'border-acquisition',
    hoverColor: 'hover:bg-acquisition-hover',
    stats: { requests: 15, active: 7 }
  },
  {
    title: 'Physical Security',
    description: 'Surveillance and access control systems',
    icon: Smartphone,
    href: '/dashboard/acquisition/physical-security',
    color: 'bg-acquisition',
    textColor: 'text-acquisition-foreground',
    borderColor: 'border-acquisition',
    hoverColor: 'hover:bg-acquisition-hover',
    stats: { systems: 42, installed: 38 }
  }
]

const recentOrders = [
  {
    id: 'ORD-2024-001',
    customer: 'John Smith',
    items: ['MacBook Pro 16" M3 Pro', 'AirPods Pro'],
    total: 3748,
    status: 'shipped',
    date: '2 hours ago'
  },
  {
    id: 'ORD-2024-002',
    customer: 'Sarah Wilson',
    items: ['iPhone 15 Pro 256GB'],
    total: 1199,
    status: 'processing',
    date: '4 hours ago'
  },
  {
    id: 'ORD-2024-003',
    customer: 'David Lee',
    items: ['iPad Pro 12.9" M2', 'Apple Pencil'],
    total: 1349,
    status: 'delivered',
    date: '1 day ago'
  }
]

const pendingRequests = [
  {
    id: 'REQ-2024-001',
    type: 'Hardware',
    description: 'High-performance workstation for video editing',
    requester: 'Marketing Team',
    priority: 'high',
    date: '1 day ago'
  },
  {
    id: 'REQ-2024-002',
    type: 'Software',
    description: 'Adobe Creative Suite licenses for design team',
    requester: 'Design Department',
    priority: 'medium',
    date: '2 days ago'
  },
  {
    id: 'REQ-2024-003',
    type: 'Security',
    description: 'CCTV system for warehouse facility',
    requester: 'Operations',
    priority: 'high',
    date: '3 days ago'
  }
]

export default function AcquisitionPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-acquisition to-primary rounded-lg p-6 text-white">
        <h1 className="text-3xl font-bold mb-2">Acquisition Centre</h1>
        <p className="text-acquisition-light">Procurement, purchasing, and inventory management</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                              <div className="w-8 h-8 bg-acquisition icon-circle">
                    <DollarSign className="h-4 w-4 text-acquisition-foreground" />
                  </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-acquisition">$124,580</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
                              <div className="w-8 h-8 bg-acquisition icon-circle">
                    <Clock className="h-4 w-4 text-acquisition-foreground" />
                  </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-acquisition">24</div>
            <p className="text-xs text-muted-foreground">Awaiting processing</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Procurement Requests</CardTitle>
                              <div className="w-8 h-8 bg-acquisition icon-circle">
                    <Package className="h-4 w-4 text-acquisition-foreground" />
                  </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-acquisition">15</div>
            <p className="text-xs text-muted-foreground">7 high priority</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Items</CardTitle>
                              <div className="w-8 h-8 bg-acquisition icon-circle">
                    <ShoppingCart className="h-4 w-4 text-acquisition-foreground" />
                  </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-acquisition">1,247</div>
            <p className="text-xs text-muted-foreground">Active products</p>
          </CardContent>
        </Card>
      </div>

      {/* Acquisition Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {acquisitionServices.map((service) => (
          <Link key={service.href} href={service.href}>
            <Card className="hover:shadow-lg transition-all duration-200 hover:scale-105 cursor-pointer group">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 ${service.color} icon-circle group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-6 h-6 text-white" />
                  </div>
                  <Activity className="w-5 h-5 text-muted-foreground group-hover:text-foreground" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription>{service.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-sm text-muted-foreground">
                    {Object.entries(service.stats).map(([key, value]) => (
                      <div key={key} className="flex items-center space-x-1">
                        <span className="capitalize">{key}:</span>
                        <span className="font-semibold text-foreground">{value}</span>
                      </div>
                    ))}
                  </div>
                  <Button 
                    size="sm" 
                    className={`${service.color} ${service.textColor} ${service.hoverColor}`}
                  >
                    Access
                  </Button>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>Latest customer orders and status</CardDescription>
              </div>
              <div className="flex items-center space-x-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    className="pl-10 pr-4 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-acquisition bg-background text-foreground"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-acquisition text-acquisition hover:bg-acquisition hover:text-acquisition-foreground">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted">
                  <div>
                    <h4 className="font-medium text-foreground">{order.id}</h4>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                    <p className="text-xs text-muted-foreground">{order.items.join(', ')}</p>
                    <p className="text-xs text-muted-foreground">{order.date}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-foreground">${order.total}</p>
                    <span className={`text-sm font-medium ${
                      order.status === 'shipped' ? 'text-support' :
                      order.status === 'processing' ? 'text-acquisition' : 'text-primary'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Pending Requests */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Procurement Requests</CardTitle>
            <CardDescription>Requests awaiting approval or processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingRequests.map((request) => (
                <div key={request.id} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-muted">
                  <div>
                    <h4 className="font-medium text-foreground">{request.id}</h4>
                    <p className="text-sm text-muted-foreground">{request.type}</p>
                    <p className="text-xs text-muted-foreground">{request.description}</p>
                    <p className="text-xs text-muted-foreground">{request.requester} • {request.date}</p>
                  </div>
                  <div className="text-right">
                                         <span className={`text-sm px-3 py-1 rounded-full ${
                       request.priority === 'high' ? 'bg-alerts text-alerts-foreground' : 'bg-acquisition text-acquisition-foreground'
                     }`}>
                       {request.priority}
                     </span>
                    <div className="flex space-x-1 mt-2">
                      <Button variant="outline" size="sm" className="border-acquisition text-acquisition hover:bg-acquisition hover:text-acquisition-foreground">Approve</Button>
                      <Button variant="outline" size="sm" className="border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">Reject</Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Acquisition Performance</CardTitle>
          <CardDescription>Key performance indicators and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-medium text-foreground mb-2">Monthly Sales Trend</h4>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-acquisition icon-circle">
                  <TrendingUp className="w-4 h-4 text-acquisition-foreground" />
                </div>
                <span className="text-2xl font-bold text-acquisition">+12%</span>
                <span className="text-sm text-muted-foreground">vs last month</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">Order Fulfillment</h4>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-support icon-circle">
                  <CheckCircle className="w-4 h-4 text-support-foreground" />
                </div>
                <span className="text-2xl font-bold text-support">98.5%</span>
                <span className="text-sm text-muted-foreground">on-time delivery</span>
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-foreground mb-2">Customer Satisfaction</h4>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-acquisition icon-circle">
                  <AlertTriangle className="w-4 h-4 text-acquisition-foreground" />
                </div>
                <span className="text-2xl font-bold text-acquisition">4.8/5</span>
                <span className="text-sm text-muted-foreground">average rating</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 