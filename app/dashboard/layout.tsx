'use client'

import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { Sidebar } from '@/components/dashboard/sidebar'
import { UserSwitcher } from '@/components/user-switcher'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Menu, 
  X, 
  Bell, 
  Search, 
  LogOut,
  User,
  AlertTriangle,
  CheckCircle,
  Clock,
  XCircle,
  ChevronDown
} from 'lucide-react'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [alertsOpen, setAlertsOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { data: session } = useSession()

  const recentAlerts = [
    {
      id: 1,
      title: 'High CPU Usage Detected',
      type: 'critical',
      timestamp: '2 minutes ago',
      device: 'Server-01'
    },
    {
      id: 2,
      title: 'Backup Job Failed',
      type: 'warning',
      timestamp: '15 minutes ago',
      device: 'Database-02'
    },
    {
      id: 3,
      title: 'New Device Connected',
      type: 'info',
      timestamp: '1 hour ago',
      device: 'MacBook Pro 16"'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 lg:ml-0">
        {/* Top header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-4">
            {/* Mobile menu button */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <Menu className="h-5 w-5" />
            </button>

            {/* Search bar */}
            <div className="flex-1 max-w-lg mx-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search Launch Control..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right side actions */}
            <div className="flex items-center space-x-4">
              {/* User Switcher */}
              <UserSwitcher />
              
              {/* Notifications */}
              <div className="relative">
                <button 
                  className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                  onClick={() => setAlertsOpen(!alertsOpen)}
                >
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 icon-circle"></span>
                </button>

                {/* Alerts Popup */}
                {alertsOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setAlertsOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <Card className="border-0 shadow-none">
                        <CardHeader className="pb-3">
                          <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Recent Alerts</CardTitle>
                            <Button variant="outline" size="sm" onClick={() => window.location.href = '/dashboard/alerts'}>
                              View All
                            </Button>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-0">
                          <div className="space-y-3">
                            {recentAlerts.map((alert) => (
                              <div key={alert.id} className={`flex items-start space-x-3 p-3 rounded-lg ${
                                alert.type === 'critical' ? 'bg-red-50 border border-red-200' :
                                alert.type === 'warning' ? 'bg-orange-50 border border-orange-200' :
                                'bg-blue-50 border border-blue-200'
                              }`}>
                                <div className={`w-2 h-2 rounded-full mt-2 ${
                                  alert.type === 'critical' ? 'bg-red-500' :
                                  alert.type === 'warning' ? 'bg-orange-500' : 'bg-blue-500'
                                }`}></div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-gray-900 truncate">{alert.title}</p>
                                  <p className="text-xs text-gray-500">{alert.device} • {alert.timestamp}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </>
                )}
              </div>

              {/* User menu */}
              <div className="relative">
                <button 
                  className="flex items-center space-x-2 p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-md"
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-gray-700">{session?.user?.name}</p>
                    <p className="text-xs text-gray-500">{session?.user?.email}</p>
                  </div>
                  <ChevronDown className="h-4 w-4 text-gray-500" />
                </button>

                {/* User Menu Popup */}
                {userMenuOpen && (
                  <>
                    <div 
                      className="fixed inset-0 z-40"
                      onClick={() => setUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="py-1">
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => {
                            window.location.href = '/dashboard/account'
                            setUserMenuOpen(false)
                          }}
                        >
                          <User className="w-4 h-4 mr-2" />
                          Account Settings
                        </button>
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center"
                          onClick={() => {
                            window.location.href = '/dashboard/alerts'
                            setUserMenuOpen(false)
                          }}
                        >
                          <Bell className="w-4 h-4 mr-2" />
                          Alerts & Notifications
                        </button>
                        <hr className="my-1" />
                        <button
                          className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 flex items-center"
                          onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">
          {children}
        </main>
      </div>
    </div>
  )
} 