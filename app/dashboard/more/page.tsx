'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { 
  Trash2, 
  Printer, 
  Share2, 
  Settings, 
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  AlertTriangle,
  Plus,
  Eye,
  Edit,
  Download,
  Upload,
  Activity,
  BarChart3,
  Calendar,
  Target,
  Shield,
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
  Cloud as CloudIcon,
  Recycle,
  FileText,
  Image,
  Video,
  Music,
  Camera,
  Monitor,
  Smartphone,
  Tablet,
  Laptop,
  Desktop,
  Server,
  Router,
  Switch,
  Cable,
  Battery,
  Power,
  Lightbulb,
  Globe,
  MapPin,
  Truck,
  Package,
  Scale,
  DollarSign,
  Percent,
  Award,
  Star,
  Heart,
  ThumbsUp,
  MessageCircle,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  TikTok,
  Building,
  User,
  FileCheck,
  Clipboard,
  CalendarDays,
  Clock as TimeIcon,
  CheckCircle as SuccessIcon,
  AlertCircle,
  Info
} from 'lucide-react'

// Client-side services (what clients see)
const clientServices = [
  {
    id: 1,
    name: 'E-waste Recycling',
    type: 'Environmental Services',
    status: 'available',
    description: 'Secure electronic waste disposal and recycling',
    icon: Recycle,
    lastActivity: '2 hours ago',
    impact: '2.3 tons recycled',
    requestType: 'Collection Request'
  },
  {
    id: 2,
    name: 'Print Services',
    type: 'Printing Services',
    status: 'available',
    description: 'Professional printing and document services',
    icon: Printer,
    lastActivity: '1 hour ago',
    impact: '1,245 pages printed',
    requestType: 'Print Job'
  },
  {
    id: 3,
    name: 'Hardware Repair',
    type: 'Technical Services',
    status: 'available',
    description: 'Computer and device repair services',
    icon: Settings,
    lastActivity: '3 hours ago',
    impact: '67 devices repaired',
    requestType: 'Repair Request'
  },
  {
    id: 4,
    name: 'Data Recovery',
    type: 'Data Services',
    status: 'available',
    description: 'Professional data recovery services',
    icon: HardDrive,
    lastActivity: '4 hours ago',
    impact: '2.1 TB recovered',
    requestType: 'Recovery Request'
  }
]

// Ryujin admin services (what Ryujin sees)
const ryujinServices = [
  {
    id: 1,
    name: 'E-waste Recycling',
    type: 'Environmental Services',
    status: 'active',
    clients: 45,
    collections: 128,
    revenue: 15600,
    icon: Recycle,
    description: 'Secure electronic waste disposal and recycling',
    lastActivity: '2 hours ago',
    impact: '2.3 tons recycled',
    locations: 3
  },
  {
    id: 2,
    name: 'Print Services',
    type: 'Printing Services',
    status: 'active',
    clients: 32,
    jobs: 89,
    revenue: 12400,
    icon: Printer,
    description: 'Professional printing and document services',
    lastActivity: '1 hour ago',
    impact: '1,245 pages printed',
    locations: 2
  },
  {
    id: 3,
    name: 'Social Media Management',
    type: 'Digital Marketing',
    status: 'active',
    clients: 18,
    accounts: 45,
    revenue: 21800,
    icon: Share2,
    description: 'Social media strategy and content management',
    lastActivity: '30 minutes ago',
    impact: '156 posts created',
    locations: 1
  },
  {
    id: 4,
    name: 'Hardware Repair',
    type: 'Technical Services',
    status: 'active',
    clients: 28,
    repairs: 67,
    revenue: 18900,
    icon: Settings,
    description: 'Computer and device repair services',
    lastActivity: '3 hours ago',
    impact: '67 devices repaired',
    locations: 2
  },
  {
    id: 5,
    name: 'Data Recovery',
    type: 'Data Services',
    status: 'active',
    clients: 15,
    recoveries: 23,
    revenue: 14200,
    icon: HardDrive,
    description: 'Professional data recovery services',
    lastActivity: '4 hours ago',
    impact: '2.1 TB recovered',
    locations: 1
  },
  {
    id: 6,
    name: 'IT Consulting',
    type: 'Consulting Services',
    status: 'active',
    clients: 22,
    projects: 34,
    revenue: 25600,
    icon: Monitor,
    description: 'IT strategy and technology consulting',
    lastActivity: '1 day ago',
    impact: '34 projects completed',
    locations: 1
  }
]

// Client metrics
const clientMetrics = [
  {
    name: 'Available Services',
    value: 4,
    change: '+1',
    trend: 'up',
    icon: Settings
  },
  {
    name: 'Active Requests',
    value: 3,
    change: '+1',
    trend: 'up',
    icon: FileCheck
  },
  {
    name: 'Completed Services',
    value: 12,
    change: '+2',
    trend: 'up',
    icon: CheckCircle
  },
  {
    name: 'Satisfaction Rating',
    value: 4.8,
    change: '+0.1',
    trend: 'up',
    icon: Star
  }
]

// Ryujin admin metrics
const ryujinMetrics = [
  {
    name: 'Total Services',
    value: 6,
    change: '+1',
    trend: 'up',
    icon: Settings
  },
  {
    name: 'Active Clients',
    value: 160,
    change: '+12',
    trend: 'up',
    icon: Users
  },
  {
    name: 'Monthly Revenue',
    value: 108700,
    change: '+8.5%',
    trend: 'up',
    icon: DollarSign
  },
  {
    name: 'Client Satisfaction',
    value: 4.7,
    change: '+0.2',
    trend: 'up',
    icon: Star
  }
]

// Client recent activities
const clientActivities = [
  {
    id: 1,
    type: 'request',
    title: 'E-waste Collection Requested',
    service: 'E-waste Recycling',
    timestamp: '2 hours ago',
    description: 'Requested collection of old computers and monitors',
    status: 'pending'
  },
  {
    id: 2,
    type: 'completed',
    title: 'Print Job Completed',
    service: 'Print Services',
    timestamp: '1 hour ago',
    description: 'Business cards and letterheads printed successfully',
    status: 'completed'
  },
  {
    id: 3,
    type: 'in-progress',
    title: 'Laptop Repair in Progress',
    service: 'Hardware Repair',
    timestamp: '3 hours ago',
    description: 'MacBook Pro motherboard replacement',
    status: 'in-progress'
  },
  {
    id: 4,
    type: 'completed',
    title: 'Data Recovery Successful',
    service: 'Data Recovery',
    timestamp: '4 hours ago',
    description: 'Recovered critical business files from failed drive',
    status: 'completed'
  }
]

// Ryujin admin recent activities
const ryujinActivities = [
  {
    id: 1,
    type: 'recycling',
    title: 'E-waste Collection Completed',
    service: 'E-waste Recycling',
    timestamp: '2 hours ago',
    description: 'Collected 45kg of electronic waste from TechCorp',
    impact: '45kg recycled'
  },
  {
    id: 2,
    type: 'printing',
    title: 'Large Print Job Completed',
    service: 'Print Services',
    timestamp: '1 hour ago',
    description: 'Printed 500 business cards for FinanceBank',
    impact: '500 cards printed'
  },
  {
    id: 3,
    type: 'social',
    title: 'Social Media Campaign Launched',
    service: 'Social Media Management',
    timestamp: '30 minutes ago',
    description: 'Launched new product campaign for StartupXYZ',
    impact: 'Campaign active'
  },
  {
    id: 4,
    type: 'repair',
    title: 'Laptop Repair Completed',
    service: 'Hardware Repair',
    timestamp: '3 hours ago',
    description: 'Fixed motherboard issue on MacBook Pro',
    impact: 'Device restored'
  },
  {
    id: 5,
    type: 'recovery',
    title: 'Data Recovery Successful',
    service: 'Data Recovery',
    timestamp: '4 hours ago',
    description: 'Recovered 500GB of critical business data',
    impact: '500GB recovered'
  },
  {
    id: 6,
    type: 'consulting',
    title: 'IT Strategy Session',
    service: 'IT Consulting',
    timestamp: '1 day ago',
    description: 'Completed technology roadmap for ManufacturingCo',
    impact: 'Strategy delivered'
  }
]

const environmentalImpact = [
  {
    name: 'E-waste Recycled',
    value: 2.3,
    unit: 'tons',
    change: '+0.4',
    trend: 'up',
    icon: Recycle
  },
  {
    name: 'CO2 Offset',
    value: 4.7,
    unit: 'tons',
    change: '+0.8',
    trend: 'up',
    icon: Globe
  },
  {
    name: 'Devices Repaired',
    value: 67,
    unit: 'devices',
    change: '+12',
    trend: 'up',
    icon: Settings
  },
  {
    name: 'Data Recovered',
    value: 2.1,
    unit: 'TB',
    change: '+0.3',
    trend: 'up',
    icon: HardDrive
  }
]

const socialMediaStats = [
  {
    platform: 'Instagram',
    accounts: 12,
    posts: 156,
    engagement: 89,
    icon: Instagram
  },
  {
    platform: 'Facebook',
    accounts: 8,
    posts: 89,
    engagement: 234,
    icon: Facebook
  },
  {
    platform: 'LinkedIn',
    accounts: 15,
    posts: 67,
    engagement: 445,
    icon: Linkedin
  },
  {
    platform: 'Twitter',
    accounts: 6,
    posts: 123,
    engagement: 178,
    icon: Twitter
  }
]

export default function MorePage() {
  const { data: session } = useSession()
  const isRyujinUser = session?.user?.role === 'ryujin_admin' || session?.user?.role === 'ryujin_support'
  
  const services = isRyujinUser ? ryujinServices : clientServices
  const metrics = isRyujinUser ? ryujinMetrics : clientMetrics
  const activities = isRyujinUser ? ryujinActivities : clientActivities

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Additional Services</h1>
          <p className="text-gray-600 mt-1">
            {isRyujinUser 
              ? 'E-waste recycling, printing, social media, and more services management'
              : 'Request e-waste recycling, printing, hardware repair, and data recovery services'
            }
          </p>
        </div>
        <Button className="bg-gray-600 hover:bg-gray-700 text-white">
          <Plus className="w-4 h-4 mr-2" />
          {isRyujinUser ? 'New Service' : 'Request Service'}
        </Button>
      </div>

      {/* Service Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <Card key={metric.name}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
              <div className="w-8 h-8 bg-gray-600 icon-circle">
                <metric.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-700">
                {metric.name === 'Available Services' || metric.name === 'Total Services' ? metric.value :
                 metric.name === 'Active Requests' || metric.name === 'Active Clients' ? metric.value :
                 metric.name === 'Completed Services' ? metric.value :
                 metric.name === 'Monthly Revenue' ? `$${metric.value.toLocaleString()}` :
                 `${metric.value}/5`}
              </div>
              <p className={`text-xs ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {metric.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Services Overview */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>
                {isRyujinUser ? 'Additional Services' : 'Available Services'}
              </CardTitle>
              <CardDescription>
                {isRyujinUser 
                  ? 'Overview of all additional services and their performance'
                  : 'Services you can request from Ryujin Electronics'
                }
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
              </div>
              <Button variant="outline" size="sm" className="border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <div key={service.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-16 h-16 bg-gray-100 icon-circle">
                    <service.icon className="w-8 h-8 text-gray-600" />
                  </div>
                  <div className="flex space-x-1">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:bg-gray-100 hover:text-gray-800">
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                
                <div className="mb-3">
                  <h3 className="font-semibold text-gray-900 mb-1">{service.name}</h3>
                  <p className="text-sm text-gray-500 mb-2">{service.description}</p>
                  <div className="flex items-center space-x-2 mb-2">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      service.status === 'active' || service.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {service.status}
                    </span>
                    <span className="text-xs text-gray-500">{service.type}</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3 text-sm">
                  {isRyujinUser ? (
                    <>
                      <div>
                        <p className="text-gray-500">Clients</p>
                        <p className="font-semibold text-gray-900">{service.clients}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Revenue</p>
                        <p className="font-semibold text-gray-900">${service.revenue.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Impact</p>
                        <p className="font-semibold text-gray-900">{service.impact}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Locations</p>
                        <p className="font-semibold text-gray-900">{service.locations}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="text-gray-500">Request Type</p>
                        <p className="font-semibold text-gray-900">{service.requestType}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Impact</p>
                        <p className="font-semibold text-gray-900">{service.impact}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Last Activity</p>
                        <p className="font-semibold text-gray-900">{service.lastActivity}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Status</p>
                        <p className="font-semibold text-gray-900">{service.status}</p>
                      </div>
                    </>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm" className="flex-1 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                    {isRyujinUser ? 'Manage' : 'Request'}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                    View
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activities and Impact */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {isRyujinUser && (
          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
              <CardDescription>Sustainability metrics and environmental contributions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {environmentalImpact.map((impact) => (
                  <div key={impact.name} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-100 icon-circle">
                        <impact.icon className="w-5 h-5 text-gray-600" />
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900">{impact.name}</h4>
                        <p className="text-sm text-gray-500">{impact.unit}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-gray-900">{impact.value} {impact.unit}</p>
                      <p className={`text-xs ${impact.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {impact.change} from last month
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader>
            <CardTitle>
              {isRyujinUser ? 'Recent Activities' : 'My Service Requests'}
            </CardTitle>
            <CardDescription>
              {isRyujinUser 
                ? 'Latest service activities and updates'
                : 'Your recent service requests and their status'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {activities.map((activity) => (
                <div key={activity.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
                  activity.type === 'recycling' || activity.type === 'request' ? 'bg-green-50 border border-green-200' :
                  activity.type === 'printing' || activity.type === 'completed' ? 'bg-blue-50 border border-blue-200' :
                  activity.type === 'social' ? 'bg-purple-50 border border-purple-200' :
                  activity.type === 'repair' || activity.type === 'in-progress' ? 'bg-orange-50 border border-orange-200' :
                  activity.type === 'recovery' ? 'bg-red-50 border border-red-200' :
                  'bg-gray-50 border border-gray-200'
                }`}>
                  <div className={`w-8 h-8 icon-circle ${
                    activity.type === 'recycling' || activity.type === 'request' ? 'bg-green-100' :
                    activity.type === 'printing' || activity.type === 'completed' ? 'bg-blue-100' :
                    activity.type === 'social' ? 'bg-purple-100' :
                    activity.type === 'repair' || activity.type === 'in-progress' ? 'bg-orange-100' :
                    activity.type === 'recovery' ? 'bg-red-100' :
                    'bg-gray-100'
                  }`}>
                    {activity.type === 'recycling' || activity.type === 'request' ? <Recycle className="w-4 h-4 text-green-600" /> :
                     activity.type === 'printing' || activity.type === 'completed' ? <Printer className="w-4 h-4 text-blue-600" /> :
                     activity.type === 'social' ? <Share2 className="w-4 h-4 text-purple-600" /> :
                     activity.type === 'repair' || activity.type === 'in-progress' ? <Settings className="w-4 h-4 text-orange-600" /> :
                     activity.type === 'recovery' ? <HardDrive className="w-4 h-4 text-red-600" /> :
                     <Monitor className="w-4 h-4 text-gray-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.service} • {activity.timestamp}</p>
                    <p className="text-xs text-gray-600 mt-1">{activity.description}</p>
                    {isRyujinUser ? (
                      <p className="text-xs text-gray-500 mt-1">Impact: {activity.impact}</p>
                    ) : (
                      <p className="text-xs text-gray-500 mt-1">Status: {activity.status}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Social Media Management (Ryujin only) */}
      {isRyujinUser && (
        <Card>
          <CardHeader>
            <CardTitle>Social Media Management</CardTitle>
            <CardDescription>Overview of social media accounts and performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {socialMediaStats.map((platform) => (
                <div key={platform.platform} className="text-center">
                  <div className="w-16 h-16 bg-gray-100 icon-circle mx-auto mb-3">
                    <platform.icon className="w-8 h-8 text-gray-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900">{platform.platform}</h3>
                  <div className="space-y-1 mt-2">
                    <p className="text-sm text-gray-500">{platform.accounts} accounts</p>
                    <p className="text-sm text-gray-500">{platform.posts} posts</p>
                    <p className="text-sm text-gray-500">{platform.engagement} engagements</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Service Tools */}
      <Card>
        <CardHeader>
          <CardTitle>Service Tools</CardTitle>
          <CardDescription>
            {isRyujinUser 
              ? 'Quick access to service management tools'
              : 'Quick access to request services and track requests'
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button variant="outline" className="h-20 flex-col border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
              <Recycle className="w-6 h-6 mb-2" />
              <span className="text-sm">E-waste</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
              <Printer className="w-6 h-6 mb-2" />
              <span className="text-sm">Print Services</span>
            </Button>
            {isRyujinUser && (
              <Button variant="outline" className="h-20 flex-col border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                <Share2 className="w-6 h-6 mb-2" />
                <span className="text-sm">Social Media</span>
              </Button>
            )}
            <Button variant="outline" className="h-20 flex-col border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
              <Settings className="w-6 h-6 mb-2" />
              <span className="text-sm">Hardware Repair</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
              <HardDrive className="w-6 h-6 mb-2" />
              <span className="text-sm">Data Recovery</span>
            </Button>
            {isRyujinUser && (
              <Button variant="outline" className="h-20 flex-col border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
                <Monitor className="w-6 h-6 mb-2" />
                <span className="text-sm">IT Consulting</span>
              </Button>
            )}
            <Button variant="outline" className="h-20 flex-col border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
              <BarChart3 className="w-6 h-6 mb-2" />
              <span className="text-sm">Analytics</span>
            </Button>
            <Button variant="outline" className="h-20 flex-col border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white">
              <Settings className="w-6 h-6 mb-2" />
              <span className="text-sm">Settings</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 