'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Share2, 
  Instagram, 
  Facebook, 
  Twitter,
  Plus,
  Search,
  Filter,
  DollarSign,
  Users,
  TrendingUp
} from 'lucide-react'

const socialMediaAccounts = [
  {
    id: 1,
    client: 'TechCorp Inc.',
    platform: 'LinkedIn',
    handle: '@techcorp_inc',
    followers: 15420,
    posts: 247,
    engagement: 4.2,
    status: 'active',
    monthlyCost: 800,
    lastPost: '2024-01-15'
  },
  {
    id: 2,
    client: 'Canberra Tourism Board',
    platform: 'Instagram',
    handle: '@canberra_tourism',
    followers: 28950,
    posts: 156,
    engagement: 6.8,
    status: 'active',
    monthlyCost: 1200,
    lastPost: '2024-01-16'
  },
  {
    id: 3,
    client: 'StartupXYZ',
    platform: 'Twitter',
    handle: '@startupxyz',
    followers: 8230,
    posts: 89,
    engagement: 3.1,
    status: 'active',
    monthlyCost: 600,
    lastPost: '2024-01-14'
  },
  {
    id: 4,
    client: 'Global Solutions',
    platform: 'Facebook',
    handle: 'Global Solutions',
    followers: 12450,
    posts: 203,
    engagement: 2.8,
    status: 'paused',
    monthlyCost: 750,
    lastPost: '2024-01-10'
  }
]

export default function SocialMediaManagementPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Social Media Management</h1>
          <p className="text-gray-600 mt-1">Manage social media accounts and content strategy</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          Add Account
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <Share2 className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">12</div>
            <p className="text-xs text-muted-foreground">Managed accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Followers</CardTitle>
            <Users className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">65,050</div>
            <p className="text-xs text-muted-foreground">Combined reach</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Engagement</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">4.2%</div>
            <p className="text-xs text-muted-foreground">Across all accounts</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">$8,350</div>
            <p className="text-xs text-muted-foreground">Management fees</p>
          </CardContent>
        </Card>
      </div>

      {/* Social Media Accounts */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Social Media Accounts</CardTitle>
              <CardDescription>Managed social media accounts and performance metrics</CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search accounts..."
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
            {socialMediaAccounts.map((account) => (
              <div key={account.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center">
                    {account.platform === 'Instagram' && <Instagram className="w-6 h-6 text-pink-500" />}
                    {account.platform === 'Facebook' && <Facebook className="w-6 h-6 text-blue-600" />}
                    {account.platform === 'Twitter' && <Twitter className="w-6 h-6 text-blue-400" />}
                    {account.platform === 'LinkedIn' && <Share2 className="w-6 h-6 text-blue-700" />}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900">{account.handle}</h3>
                    <p className="text-sm text-gray-500">{account.client} • {account.platform}</p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
                      <span>{account.followers.toLocaleString()} followers</span>
                      <span>{account.posts} posts</span>
                      <span>{account.engagement}% engagement</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <div className="text-right">
                    <p className="text-lg font-bold text-gray-900">${account.monthlyCost}/month</p>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      account.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {account.status}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">Last post: {account.lastPost}</p>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm">View Analytics</Button>
                    <Button variant="outline" size="sm">Schedule Post</Button>
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