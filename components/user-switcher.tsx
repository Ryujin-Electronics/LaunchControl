'use client'

import { useState, useEffect } from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  ChevronDown, 
  User, 
  Building, 
  Users, 
  Shield, 
  Settings, 
  MessageSquare, 
  BarChart3,
  LogOut,
  RefreshCw
} from 'lucide-react'

// Admin users for Ryujin staff switching
const ADMIN_USERS = [
  {
    id: 'admin-1',
    name: 'Alex Chen',
    email: 'alex.chen@ryujin.com',
    password: 'admin123',
    role: 'ryujin_admin',
    jobTitle: 'System Administrator',
    organization: 'Ryujin Electronics',
    icon: Shield,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'admin-2',
    name: 'Sarah Mitchell',
    email: 'sarah.mitchell@ryujin.com',
    password: 'admin123',
    role: 'ryujin_support',
    jobTitle: 'Support Team Lead',
    organization: 'Ryujin Electronics',
    icon: MessageSquare,
    color: 'from-blue-500 to-blue-600'
  }
]

// Client users for switching
const CLIENT_USERS = {
  full_access: {
    email: 'owner@abccorp.com',
    password: 'owner123',
    name: 'ABC Corp Owner',
    role: 'full_access',
    organization: 'ABC Corporation'
  },
  end_user: {
    email: 'user@abccorp.com',
    password: 'user123',
    name: 'ABC Corp User',
    role: 'end_user',
    organization: 'ABC Corporation'
  }
}

export function UserSwitcher() {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [isSwitching, setIsSwitching] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [currentAdminUser, setCurrentAdminUser] = useState<any>(null)

  useEffect(() => {
    setIsClient(true)
    if (session?.user) {
      const adminUser = ADMIN_USERS.find(user => 
        user.email === session.user.email || 
        user.role === session.user.role
      )
      setCurrentAdminUser(adminUser || null)
    }
  }, [session])

  const handleSwitchToAdmin = async (adminUser: any) => {
    setIsSwitching(true)
    try {
      // Sign out current session
      await signOut({ redirect: false })
      
      // Wait a moment to ensure session is cleared
      await new Promise((resolve) => setTimeout(resolve, 200))
      
      // Sign in as the new admin user
      const result = await signIn('credentials', {
        email: adminUser.email,
        password: adminUser.password,
        redirect: false,
      })
      
      if (result?.error) {
        console.error('Sign in error:', result.error)
        return
      }
      
      // Wait for session to update and force update
      await new Promise((resolve) => setTimeout(resolve, 200))
      await update()
      
      // Navigate to dashboard
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Error switching user:', error)
    } finally {
      setIsSwitching(false)
      setIsOpen(false)
    }
  }

  const handleSwitchToClient = async (userType: keyof typeof CLIENT_USERS) => {
    setIsSwitching(true)
    try {
      // Sign out and wait for session to clear
      await signOut({ redirect: false })
      
      // Wait a moment to ensure session is cleared
      await new Promise((resolve) => setTimeout(resolve, 200))
      
      // Sign in as the new user
      const user = CLIENT_USERS[userType]
      const result = await signIn('credentials', {
        email: user.email,
        password: user.password,
        redirect: false,
      })
      
      if (result?.error) {
        console.error('Sign in error:', result.error)
        return
      }
      
      // Wait for session to update and force update
      await new Promise((resolve) => setTimeout(resolve, 200))
      await update()
      
      // Navigate to dashboard
      router.push('/dashboard')
      
    } catch (error) {
      console.error('Error switching user:', error)
    } finally {
      setIsSwitching(false)
      setIsOpen(false)
    }
  }

  const getCurrentUserType = () => {
    if (!session) return null
    
    if (session.user.role?.includes('ryujin')) return 'ryujin'
    if (session.user.role === 'full_access') return 'full_access'
    if (session.user.role === 'end_user') return 'end_user'
    return null
  }

  const getRoleDisplayName = (role: string) => {
    switch (role) {
      case 'ryujin_admin':
        return 'System Admin'
      case 'ryujin_support':
        return 'Support Staff'
      case 'full_access':
        return 'Client Owner'
      case 'end_user':
        return 'End User'
      default:
        return role
    }
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'ryujin_admin':
        return 'text-red-600 bg-red-100'
      case 'ryujin_support':
        return 'text-blue-600 bg-blue-100'
      case 'full_access':
        return 'text-green-600 bg-green-100'
      case 'end_user':
        return 'text-gray-600 bg-gray-100'
      default:
        return 'text-gray-600 bg-gray-100'
    }
  }

  const currentUserType = getCurrentUserType()

  // Show loading state during initial load
  if (status === 'loading' || !isClient) {
    return (
      <div className="h-9 w-32 bg-gray-200 rounded-md animate-pulse"></div>
    )
  }

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
        disabled={isSwitching}
      >
        {currentUserType === 'ryujin' ? (
          <div className={`w-6 h-6 rounded-full bg-gradient-to-r ${currentAdminUser?.color || 'from-gray-500 to-gray-600'} flex items-center justify-center`}>
            {currentAdminUser?.icon ? 
              <currentAdminUser.icon className="h-3 w-3 text-white" /> : 
              <Building className="h-3 w-3 text-white" />
            }
          </div>
        ) : currentUserType === 'full_access' ? (
          <User className="h-4 w-4 text-green-600" />
        ) : (
          <User className="h-4 w-4 text-gray-600" />
        )}
        <span className="text-sm font-medium">
          {currentUserType === 'ryujin' 
            ? currentAdminUser?.name || 'Ryujin Staff'
            : currentUserType === 'full_access' ? 'Client Owner'
            : 'End User'
          }
        </span>
        <ChevronDown className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <Card className="border-0 shadow-none">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg">User Switcher</CardTitle>
              <CardDescription>
                Switch between different user accounts for testing
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              {/* Ryujin Admin Users */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Ryujin Staff</h4>
                <div className="space-y-2">
                  {ADMIN_USERS.map((adminUser) => (
                    <div
                      key={adminUser.id}
                      onClick={() => handleSwitchToAdmin(adminUser)}
                      className={`p-3 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                        currentAdminUser?.id === adminUser.id
                          ? 'border-blue-300 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${adminUser.color} flex items-center justify-center`}>
                          <adminUser.icon className="w-4 h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-2 mb-1">
                            <h4 className="font-medium text-gray-900 truncate text-sm">
                              {adminUser.name}
                            </h4>
                            <span className={`text-xs px-2 py-1 rounded-full ${getRoleColor(adminUser.role)}`}>
                              {getRoleDisplayName(adminUser.role)}
                            </span>
                          </div>
                          <p className="text-xs text-gray-500 truncate">{adminUser.jobTitle}</p>
                        </div>
                        {currentAdminUser?.id === adminUser.id && (
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Users */}
              <div className="mb-4">
                <h4 className="text-sm font-medium text-gray-700 mb-2">Client Users</h4>
                <div className="space-y-2">
                  {Object.entries(CLIENT_USERS).map(([key, user]) => (
                    <button
                      key={key}
                      onClick={() => handleSwitchToClient(key as keyof typeof CLIENT_USERS)}
                      disabled={currentUserType === key || isSwitching}
                      className={`w-full flex items-center gap-3 p-3 rounded-lg text-left transition-colors ${
                        currentUserType === key
                          ? 'bg-green-50 border border-green-200 text-green-700'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      {key === 'full_access' ? (
                        <User className="h-4 w-4 text-green-600" />
                      ) : (
                        <User className="h-4 w-4 text-gray-600" />
                      )}
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-gray-500">{getRoleDisplayName(user.role)}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Current Session Info */}
              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                  <span>Current Session:</span>
                  <span className="font-medium">
                    {session?.user?.organization?.name || 
                     (currentUserType === 'ryujin' ? 'Ryujin Electronics' : 'Client Organization')}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
                  <span>Role:</span>
                  <span className="font-medium">{getRoleDisplayName(session?.user?.role || '')}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                  className="w-full text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </div>

              {isSwitching && (
                <div className="mt-3 text-center">
                  <div className="text-sm text-gray-500">Switching user...</div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
} 