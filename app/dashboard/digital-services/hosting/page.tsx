'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Server, 
  Globe, 
  Globe2, 
  Mail, 
  Database, 
  Cloud, 
  Shield, 
  Activity,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  Play,
  Pause,
  Stop,
  RefreshCw,
  Download,
  Upload,
  Settings,
  Monitor,
  BarChart3,
  Calendar,
  Target,
  Zap,
  Palette,
  Search,
  Filter,
  ExternalLink,
  HardDrive,
  Wifi,
  Cpu,
  Memory,
  HardDrive as Storage,
  Network,
  Lock,
  Unlock,
  Globe as Domain,
  Mail as Email,
  Database as DatabaseIcon,
  Cloud as CloudIcon
} from 'lucide-react'

const hostingServices = [
  {
    id: 1,
    name: 'Web Hosting',
    type: 'Shared Hosting',
    status: 'active',
    clients: 25,
    servers: 8,
    uptime: 99.9,
    revenue: 18900,
    icon: Server,
    description: 'Reliable shared web hosting solutions',
    lastActivity: '2 hours ago',
    storage: '2.5 TB',
    bandwidth: '500 GB'
  },
  {
    id: 2,
    name: 'Domain Management',
    type: 'Domain Services',
    status: 'active',
    clients: 18,
    domains: 45,
    uptime: 100,
    revenue: 5400,
    icon: Globe2,
    description: 'Domain registration and management',
    lastActivity: '5 hours ago',
    storage: 'N/A',
    bandwidth: 'N/A'
  },
  {
    id: 3,
    name: 'Email Services',
    type: 'Email Hosting',
    status: 'active',
    clients: 15,
    accounts: 120,
    uptime: 99.8,
    revenue: 7200,
    icon: Mail,
    description: 'Professional email hosting',
    lastActivity: '1 day ago',
    storage: '500 GB',
    bandwidth: '100 GB'
  },
  {
    id: 4,
    name: 'Database Hosting',
    type: 'Database Services',
    status: 'active',
    clients: 8,
    databases: 12,
    uptime: 99.7,
    revenue: 9600,
    icon: Database,
    description: 'Managed database hosting',
    lastActivity: '3 hours ago',
    storage: '1 TB',
    bandwidth: '200 GB'
  },
  {
    id: 5,
    name: 'Cloud Storage',
    type: 'Cloud Services',
    status: 'active',
    clients: 12,
    storage: '5 TB',
    uptime: 99.9,
    revenue: 8400,
    icon: Cloud,
    description: 'Scalable cloud storage solutions',
    lastActivity: '4 hours ago',
    storage: '5 TB',
    bandwidth: '1 TB'
  },
  {
    id: 6,
    name: 'SSL Certificates',
    type: 'Security Services',
    status: 'active',
    clients: 22,
    certificates: 35,
    uptime: 100,
    revenue: 4200,
    icon: Shield,
    description: 'SSL certificate management',
    lastActivity: '6 hours ago',
    storage: 'N/A',
    bandwidth: 'N/A'
  }
]

const serverMetrics = [
  {
    name: 'Server Uptime',
    value: 99.9,
    change: '+0.1%',
    trend: 'up',
    icon: Activity
  },
  {
    name: 'Average Response Time',
    value: 45,
    change: '-5ms',
    trend: 'down',
    icon: Clock
  },
  {
    name: 'Storage Utilization',
    value: 78,
    change: '+2%',
    trend: 'up',
    icon: Storage
  },
  {
    name: 'Bandwidth Usage',
    value: 65,
    change: '+8%',
    trend: 'up',
    icon: Network
  }
]

const activeServers = [
  {
    id: 1,
    name: 'Web Server 01',
    type: 'Web Hosting',
    status: 'online',
    location: 'Sydney, AU',
    cpu: 45,
    memory: 62,
    storage: 78,
    uptime: '99.9%',
    lastUpdate: '2 minutes ago'
  },
  {
    id: 2,
    name: 'Database Server 01',
    type: 'Database Hosting',
    status: 'online',
    location: 'Melbourne, AU',
    cpu: 32,
    memory: 58,
    storage: 85,
    uptime: '99.8%',
    lastUpdate: '5 minutes ago'
  },
  {
    id: 3,
    name: 'Email Server 01',
    type: 'Email Hosting',
    status: 'online',
    location: 'Brisbane, AU',
    cpu: 28,
    memory: 45,
    storage: 52,
    uptime: '99.9%',
    lastUpdate: '1 minute ago'
  },
  {
    id: 4,
    name: 'Cloud Storage 01',
    type: 'Cloud Storage',
    status: 'maintenance',
    location: 'Perth, AU',
    cpu: 15,
    memory: 38,
    storage: 92,
    uptime: '99.7%',
    lastUpdate: '10 minutes ago'
  }
]

const recentAlerts = [
  {
    id: 1,
    type: 'warning',
    title: 'High CPU Usage on Web Server 01',
    server: 'Web Server 01',
    timestamp: '5 minutes ago',
    description: 'CPU usage reached 85%'
  },
  {
    id: 2,
    type: 'info',
    title: 'SSL Certificate Renewal',
    server: 'Domain Services',
    timestamp: '1 hour ago',
    description: 'SSL certificate renewed successfully'
  },
  {
    id: 3,
    type: 'critical',
    title: 'Database Connection Issues',
    server: 'Database Server 01',
    timestamp: '2 hours ago',
    description: 'Connection timeout detected'
  },
  {
    id: 4,
    type: 'success',
    title: 'Backup Completed',
    server: 'Cloud Storage 01',
    timestamp: '3 hours ago',
    description: 'Daily backup completed successfully'
  }
]

export default function HostingPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Hosting Services</h1>
          <p className="text-gray-600 mt-1">Web hosting, domains, email, and cloud infrastructure</p>
        </div>
        <Button className="bg-digital hover:bg-digital-hover text-digital-foreground">
          <Plus className="w-4 h-4 mr-2" />
          New Service
        </Button>
      </div>

      {/* Server Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {serverMetrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <div className="w-8 h-8 bg-digital icon-circle">
                <metric.icon className="h-4 w-4 text-digital-foreground" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-digital">
                {metric.name === 'Server Uptime' ? `${metric.value}%` : 
                 metric.name === 'Average Response Time' ? `${metric.value}ms` :
                 `${metric.value}%`}
              </div>
              <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last week
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Hosting Services Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Hosting Services</CardTitle>
              <CardDescription>Overview of all hosting services and their performance</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-digital"
                />
              </div>
              <Button variant="outline" size="sm" className="border-digital text-digital hover:bg-digital hover:text-digital-foreground">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostingServices.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-16 h-16 bg-digital-light icon-circle">
                    <service.icon className="w-8 h-8 text-digital" />
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" className="text-digital hover:bg-digital hover:text-digital-foreground">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-digital hover:bg-digital hover:text-digital-foreground">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      service.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.status}
                    </span>
                    <span className="text-xs text-gray-500">{service.type}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  <div>
                    <p className="text-gray-500">Clients</p>
                    <p className="font-semibold text-gray-900">{service.clients}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Uptime</p>
                    <p className="font-semibold text-gray-900">{service.uptime}%</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Revenue</p>
                    <p className="font-semibold text-gray-900">${service.revenue.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Storage</p>
                    <p className="font-semibold text-gray-900">{service.storage}</p>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 border-digital text-digital hover:bg-digital hover:text-digital-foreground">Manage</Button>
                  <Button variant="outline" size="sm" className="flex-1 border-digital text-digital hover:bg-digital hover:text-digital-foreground">Monitor</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Server Monitoring and Alerts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Active Servers</CardTitle>
            <CardDescription>Real-time server monitoring and status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activeServers.map((server) => (
                <div key={server.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="w-3 h-3 bg-gray-200 rounded-full flex items-center justify-center">
                          <Server className="w-2 h-2 text-gray-500" />
                        </div>
                        <h4 className="font-medium text-gray-900">{server.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          server.status === 'online' ? 'bg-green-100 text-green-800' :
                          server.status === 'maintenance' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {server.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-3">{server.type} • {server.location}</p>
                      
                      <div className="grid grid-cols-3 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">CPU</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className={`h-2 rounded-full ${
                              server.cpu > 80 ? 'bg-red-500' : server.cpu > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`} style={{ width: `${server.cpu}%` }}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{server.cpu}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Memory</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className={`h-2 rounded-full ${
                              server.memory > 80 ? 'bg-red-500' : server.memory > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`} style={{ width: `${server.memory}%` }}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{server.memory}%</p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">Storage</p>
                          <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                            <div className={`h-2 rounded-full ${
                              server.storage > 80 ? 'bg-red-500' : server.storage > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`} style={{ width: `${server.storage}%` }}></div>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">{server.storage}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right ml-4">
                      <p className="text-sm font-medium text-gray-900">{server.uptime}</p>
                      <p className="text-xs text-gray-500">Uptime</p>
                      <p className="text-xs text-gray-400 mt-1">{server.lastUpdate}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 pt-3 border-t border-gray-200">
                    <Button variant="outline" size="sm" className="border-digital text-digital hover:bg-digital hover:text-digital-foreground">
                      <Monitor className="w-4 h-4 mr-2" />
                      Monitor
                    </Button>
                    <Button variant="outline" size="sm" className="border-digital text-digital hover:bg-digital hover:text-digital-foreground">
                      <Settings className="w-4 h-4 mr-2" />
                      Configure
                    </Button>
                    <Button variant="outline" size="sm" className="border-digital text-digital hover:bg-digital hover:text-digital-foreground">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Restart
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Alerts</CardTitle>
            <CardDescription>System alerts and notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentAlerts.map((alert) => (
                <div key={alert.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
                  alert.type === 'critical' ? 'bg-red-50 border border-red-200' :
                  alert.type === 'warning' ? 'bg-orange-50 border border-orange-200' :
                  alert.type === 'success' ? 'bg-green-50 border border-green-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    alert.type === 'critical' ? 'bg-red-500' :
                    alert.type === 'warning' ? 'bg-orange-500' :
                    alert.type === 'success' ? 'bg-green-500' : 'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{alert.title}</p>
                    <p className="text-xs text-gray-500">{alert.server} • {alert.timestamp}</p>
                    <p className="text-xs text-gray-600 mt-1">{alert.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Infrastructure Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Infrastructure Overview</CardTitle>
          <CardDescription>Data center and network infrastructure status</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-digital-light icon-circle mx-auto mb-3">
                <Server className="w-8 h-8 text-digital" />
              </div>
              <h3 className="font-semibold text-gray-900">8</h3>
              <p className="text-sm text-gray-500">Active Servers</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-digital-light icon-circle mx-auto mb-3">
                <Globe className="w-8 h-8 text-digital" />
              </div>
              <h3 className="font-semibold text-gray-900">45</h3>
              <p className="text-sm text-gray-500">Managed Domains</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-digital-light icon-circle mx-auto mb-3">
                <Mail className="w-8 h-8 text-digital" />
              </div>
              <h3 className="font-semibold text-gray-900">120</h3>
              <p className="text-sm text-gray-500">Email Accounts</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-digital-light icon-circle mx-auto mb-3">
                <Shield className="w-8 h-8 text-digital" />
              </div>
              <h3 className="font-semibold text-gray-900">35</h3>
              <p className="text-sm text-gray-500">SSL Certificates</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hosting Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Hosting Tools</CardTitle>
          <CardDescription>Quick access to hosting management tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col border-digital text-digital hover:bg-digital hover:text-digital-foreground">
              <Server className="w-6 h-6 mb-2" />
              <span className="text-sm">Server Management</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col border-digital text-digital hover:bg-digital hover:text-digital-foreground">
              <Domain className="w-6 h-6 mb-2" />
              <span className="text-sm">Domain Control</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col border-digital text-digital hover:bg-digital hover:text-digital-foreground">
              <Email className="w-6 h-6 mb-2" />
              <span className="text-sm">Email Admin</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col border-digital text-digital hover:bg-digital hover:text-digital-foreground">
              <DatabaseIcon className="w-6 h-6 mb-2" />
              <span className="text-sm">Database Admin</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col border-digital text-digital hover:bg-digital hover:text-digital-foreground">
              <CloudIcon className="w-6 h-6 mb-2" />
              <span className="text-sm">Cloud Storage</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col border-digital text-digital hover:bg-digital hover:text-digital-foreground">
              <Shield className="w-6 h-6 mb-2" />
              <span className="text-sm">Security</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col border-digital text-digital hover:bg-digital hover:text-digital-foreground">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span className="text-sm">Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col border-digital text-digital hover:bg-digital hover:text-digital-foreground">
              <Settings className="w-6 h-6 mb-2" />
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 