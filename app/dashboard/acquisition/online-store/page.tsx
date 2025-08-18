'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  ShoppingCart, 
  DollarSign, 
  Package, 
  TrendingUp, 
  Star,
  Search,
  Filter,
  Plus,
  Eye,
  Edit
} from 'lucide-react'

const products = [
  {
    id: 1,
    name: 'MacBook Pro 16" M3 Pro',
    category: 'Laptops',
    price: 3499,
    stock: 12,
    rating: 4.8,
    sales: 45,
    image: '/api/placeholder/64/64'
  },
  {
    id: 2,
    name: 'iPhone 15 Pro 256GB',
    category: 'Smartphones',
    price: 1199,
    stock: 8,
    rating: 4.9,
    sales: 78,
    image: '/api/placeholder/64/64'
  },
  {
    id: 3,
    name: 'iPad Pro 12.9" M2',
    category: 'Tablets',
    price: 1099,
    stock: 15,
    rating: 4.7,
    sales: 32,
    image: '/api/placeholder/64/64'
  },
  {
    id: 4,
    name: 'AirPods Pro 2nd Gen',
    category: 'Audio',
    price: 249,
    stock: 25,
    rating: 4.6,
    sales: 89,
    image: '/api/placeholder/64/64'
  }
]

export default function OnlineStorePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Online Store</h1>
          <p className="text-gray-600 mt-1">Manage products and track sales</p>
        </div>
        <Button className="bg-acquisition hover:bg-acquisition-hover text-acquisition-foreground">
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Store Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
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
            <CardTitle className="text-sm font-medium">Orders</CardTitle>
            <div className="w-8 h-8 bg-acquisition icon-circle">
              <ShoppingCart className="h-4 w-4 text-acquisition-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-acquisition">1,247</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Products</CardTitle>
            <div className="w-8 h-8 bg-acquisition icon-circle">
              <Package className="h-4 w-4 text-acquisition-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-acquisition">89</div>
            <p className="text-xs text-muted-foreground">Active inventory</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
            <div className="w-8 h-8 bg-acquisition icon-circle">
              <TrendingUp className="h-4 w-4 text-acquisition-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-acquisition">3.2%</div>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Product Management */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Product Catalog</CardTitle>
              <CardDescription>Manage your product inventory and pricing</CardDescription>
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
              <Button variant="outline" size="sm" className="border-acquisition text-acquisition hover:bg-acquisition hover:text-acquisition-foreground">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-16 h-16 bg-gray-200 icon-circle">
                    <Package className="w-8 h-8 text-gray-400" />
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" className="text-acquisition hover:bg-acquisition hover:text-acquisition-foreground">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-acquisition hover:bg-acquisition hover:text-acquisition-foreground">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-500">({product.rating})</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xl font-bold text-gray-900">${product.price}</span>
                  <span className={`text-sm px-2 py-1 rounded-full ${
                    product.stock > 10 ? 'bg-green-100 text-green-800' :
                    product.stock > 5 ? 'bg-orange-100 text-orange-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.stock} in stock
                  </span>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{product.sales} sold this month</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 border-acquisition text-acquisition hover:bg-acquisition hover:text-acquisition-foreground">Edit</Button>
                  <Button variant="outline" size="sm" className="flex-1 border-acquisition text-acquisition hover:bg-acquisition hover:text-acquisition-foreground">View</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
            <CardDescription>Latest customer orders and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Order #ORD-2024-001</h4>
                  <p className="text-sm text-gray-500">MacBook Pro 16" M3 Pro</p>
                  <p className="text-xs text-gray-400">2 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">$3,499</p>
                  <span className="text-sm text-green-600 font-medium">Shipped</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Order #ORD-2024-002</h4>
                  <p className="text-sm text-gray-500">iPhone 15 Pro 256GB</p>
                  <p className="text-xs text-gray-400">4 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">$1,199</p>
                  <span className="text-sm text-blue-600 font-medium">Processing</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Order #ORD-2024-003</h4>
                  <p className="text-sm text-gray-500">AirPods Pro 2nd Gen</p>
                  <p className="text-xs text-gray-400">6 hours ago</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-900">$249</p>
                  <span className="text-sm text-green-600 font-medium">Delivered</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Categories</CardTitle>
            <CardDescription>Best performing product categories</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Laptops</span>
                  <span className="text-sm text-gray-500">$45,230</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Smartphones</span>
                  <span className="text-sm text-gray-500">$38,450</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '38%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Tablets</span>
                  <span className="text-sm text-gray-500">$22,100</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Audio</span>
                  <span className="text-sm text-gray-500">$18,800</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full" style={{ width: '18%' }}></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 