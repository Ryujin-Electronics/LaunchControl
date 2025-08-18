'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { hasPermission, isRyujinUser, isClientUser } from '@/lib/auth'
import { Loading } from '@/components/ui/loading'
import { 
  Monitor, 
  Headphones, 
  Target, 
  ShoppingCart, 
  MoreHorizontal, 
  Code,
  ChevronDown,
  ChevronRight,
  Settings,
  Shield,
  History,
  AlertTriangle,
  Smartphone,
  Globe,
  Mail,
  Server,
  Trash2,
  Printer,
  Share2,
  Database,
  Cloud,
  Globe2,
  Cpu,
  Bell,
  User,
  LogOut,
  Users,
  Building,
  BarChart3,
  FileText,
  MessageSquare
} from 'lucide-react'
import Image from 'next/image'

interface MenuItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: MenuItem[]
  requiredPermission?: keyof import('@/lib/auth').Permission
  allowedRoles?: any[]
}

const clientMenuItems: MenuItem[] = [
  {
    title: 'Control',
    href: '/dashboard/control',
    icon: Monitor,
    children: [
      { title: 'Device Management', href: '/dashboard/control/device-management', icon: Smartphone, requiredPermission: 'canManageProjects' },
      { title: 'Proactive Monitoring', href: '/dashboard/control/proactive-monitoring', icon: Cpu, requiredPermission: 'canViewAnalytics' },
      { title: 'Alerts', href: '/dashboard/alerts', icon: AlertTriangle },
      { title: 'Alert History', href: '/dashboard/control/alert-history', icon: History },
      { title: 'Device History', href: '/dashboard/control/device-history', icon: History },
    ]
  },
  {
    title: 'Support',
    href: '/dashboard/support',
    icon: Headphones,
    children: [
      { title: 'Remote Support', href: '/dashboard/support/remote-support', icon: Monitor },
      { title: 'On-site Support', href: '/dashboard/support/on-site-support', icon: Settings },
      { title: 'Ticket History', href: '/dashboard/support/ticket-history', icon: History },
    ]
  },
  {
    title: 'Strategy',
    href: '/dashboard/strategy',
    icon: Target,
    requiredPermission: 'canManageProjects',
    children: [
      { title: 'Strategy & Planning', href: '/dashboard/strategy/strategy-and-planning', icon: Target },
      { title: 'Ecosystem', href: '/dashboard/strategy/ecosystem', icon: Database },
      { title: 'Security', href: '/dashboard/strategy/security', icon: Shield },
      { title: 'Project History', href: '/dashboard/strategy/project-history', icon: History },
    ]
  },
  {
    title: 'Acquisition',
    href: '/dashboard/acquisition',
    icon: ShoppingCart,
    children: [
      { title: 'Online Store', href: '/dashboard/acquisition/online-store', icon: ShoppingCart },
      { title: 'Hardware', href: '/dashboard/acquisition/hardware', icon: Cpu },
      { title: 'Software', href: '/dashboard/acquisition/software', icon: Code },
      { title: 'Custom Procurement', href: '/dashboard/acquisition/custom-procurement', icon: Settings },
      { title: 'DJI', href: '/dashboard/acquisition/dji', icon: Cpu },
      { title: 'Physical Security', href: '/dashboard/acquisition/physical-security', icon: Shield },
      { title: 'Purchase History', href: '/dashboard/acquisition/purchase-history', icon: History, requiredPermission: 'canViewPurchaseHistory' },
    ]
  },
  {
    title: 'Digital Services',
    href: '/dashboard/digital-services',
    icon: Code,
    children: [
      { 
        title: 'Development', 
        href: '/dashboard/digital-services/development', 
        icon: Code,
        children: [
          { title: 'Web Development', href: '/dashboard/digital-services/development/web-development', icon: Globe },
          { title: 'App Development', href: '/dashboard/digital-services/development/app-development', icon: Smartphone },
          { title: 'Projects History', href: '/dashboard/digital-services/development/projects-history', icon: History },
        ]
      },
      { 
        title: 'Hosting', 
        href: '/dashboard/digital-services/hosting', 
        icon: Server,
        children: [
          { title: 'Web Hosting', href: '/dashboard/digital-services/hosting/web-hosting', icon: Globe },
          { title: 'Domains', href: '/dashboard/digital-services/hosting/domains', icon: Globe2 },
          { title: 'Email', href: '/dashboard/digital-services/hosting/email', icon: Mail },
          { title: 'cPanel', href: '/dashboard/digital-services/hosting/cpanel', icon: Server },
        ]
      },
    ]
  },
  {
    title: 'More',
    href: '/dashboard/more',
    icon: MoreHorizontal,
    children: [
      { title: 'E-waste Recycling', href: '/dashboard/more/e-waste-recycling', icon: Trash2 },
      { title: 'Print Services', href: '/dashboard/more/print-services', icon: Printer },
      { title: 'Social Media Management', href: '/dashboard/more/social-media-management', icon: Share2 },
    ]
  },
]

const ryujinMenuItems: MenuItem[] = [
  {
    title: 'Messaging',
    href: '/dashboard/messaging',
    icon: MessageSquare,
    children: [
      { title: 'Internal Chat', href: '/dashboard/messaging', icon: MessageSquare },
      { title: 'Conversations', href: '/dashboard/messaging', icon: Users },
    ]
  },
  {
    title: 'Email',
    href: '/dashboard/email',
    icon: Mail,
    children: [
      { title: 'Compose', href: '/dashboard/email', icon: Mail },
      { title: 'Templates', href: '/dashboard/email', icon: FileText },
      { title: 'Setup', href: '/dashboard/email/setup', icon: Settings },
    ]
  },
  {
    title: 'Organizations',
    href: '/dashboard/organizations',
    icon: Building,
    requiredPermission: 'canViewAllOrganizations',
    children: [
      { title: 'All Clients', href: '/dashboard/organizations/clients', icon: Users },
      { title: 'Client Management', href: '/dashboard/organizations/management', icon: Settings, requiredPermission: 'canManageOrganization' },
    ]
  },
  {
    title: 'Support',
    href: '/dashboard/support',
    icon: Headphones,
    children: [
      { title: 'All Tickets', href: '/dashboard/support/all-tickets', icon: FileText, requiredPermission: 'canAssignTickets' },
      { title: 'Remote Support', href: '/dashboard/support/remote-support', icon: Monitor },
      { title: 'On-site Support', href: '/dashboard/support/on-site-support', icon: Settings },
      { title: 'Ticket History', href: '/dashboard/support/ticket-history', icon: History },
    ]
  },
  {
    title: 'Analytics',
    href: '/dashboard/analytics',
    icon: BarChart3,
    requiredPermission: 'canViewAnalytics',
    children: [
      { title: 'System Overview', href: '/dashboard/analytics/overview', icon: BarChart3 },
      { title: 'Client Analytics', href: '/dashboard/analytics/clients', icon: Users },
      { title: 'Performance Metrics', href: '/dashboard/analytics/performance', icon: Monitor },
    ]
  },
  {
    title: 'Projects',
    href: '/dashboard/projects',
    icon: Target,
    requiredPermission: 'canManageProjects',
    children: [
      { title: 'All Projects', href: '/dashboard/projects/all', icon: Target },
      { title: 'Project Management', href: '/dashboard/projects/management', icon: Settings },
      { title: 'Project History', href: '/dashboard/projects/history', icon: History },
    ]
  },
  {
    title: 'Purchases',
    href: '/dashboard/purchases',
    icon: ShoppingCart,
    children: [
      { title: 'All Purchases', href: '/dashboard/purchases/all', icon: ShoppingCart, requiredPermission: 'canViewPurchaseHistory' },
      { title: 'Purchase Approvals', href: '/dashboard/purchases/approvals', icon: Shield, requiredPermission: 'canApprovePurchases' },
      { title: 'Purchase History', href: '/dashboard/purchases/history', icon: History, requiredPermission: 'canViewPurchaseHistory' },
    ]
  },
  {
    title: 'Control',
    href: '/dashboard/control',
    icon: Monitor,
    children: [
      { title: 'All Devices', href: '/dashboard/control/all-devices', icon: Smartphone },
      { title: 'Proactive Monitoring', href: '/dashboard/control/proactive-monitoring', icon: Cpu },
      { title: 'All Alerts', href: '/dashboard/alerts', icon: AlertTriangle },
      { title: 'Alert History', href: '/dashboard/control/alert-history', icon: History },
      { title: 'Device History', href: '/dashboard/control/device-history', icon: History },
    ]
  },
]

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Control'])
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isExpanded = (title: string) => expandedItems.includes(title)
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

  // Filter menu items based on user role and permissions
  const getMenuItems = () => {
    if (!session) return []
    
    if (isRyujinUser(session.user.role as import('@/lib/auth').UserRole)) {
      return ryujinMenuItems
    } else {
      return clientMenuItems
    }
  }

  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
    return items.filter(item => {
      // Check role restrictions
      if (item.allowedRoles && session?.user.role && !item.allowedRoles.includes(session.user.role)) {
        return false
      }
      
      // Check permission requirements
      if (item.requiredPermission && !hasPermission(session?.user.role as import('@/lib/auth').UserRole, item.requiredPermission)) {
        return false
      }
      
      // Filter children recursively
      if (item.children) {
        item.children = filterMenuItems(item.children)
      }
      
      return true
    })
  }

  const menuItems = filterMenuItems(getMenuItems())

  const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const expanded = isExpanded(item.title)
    const active = isActive(item.href)

    // Determine theme colors based on menu section
    const getThemeColors = (title: string) => {
      switch (title.toLowerCase()) {
        case 'control':
          return {
            active: 'bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700',
            icon: 'text-blue-600',
            hover: 'hover:bg-blue-50/80'
          }
        case 'support':
          return {
            active: 'bg-gradient-to-r from-green-50 to-green-100/50 text-green-700',
            icon: 'text-green-600',
            hover: 'hover:bg-green-50/80'
          }
        case 'strategy':
          return {
            active: 'bg-gradient-to-r from-purple-50 to-purple-100/50 text-purple-700',
            icon: 'text-purple-600',
            hover: 'hover:bg-purple-50/80'
          }
        case 'acquisition':
          return {
            active: 'bg-gradient-to-r from-orange-50 to-orange-100/50 text-orange-700',
            icon: 'text-orange-600',
            hover: 'hover:bg-orange-50/80'
          }
        case 'digital services':
        case 'development':
        case 'hosting':
          return {
            active: 'bg-gradient-to-r from-teal-50 to-teal-100/50 text-teal-700',
            icon: 'text-teal-600',
            hover: 'hover:bg-teal-50/80'
          }
        case 'more':
          return {
            active: 'bg-gradient-to-r from-gray-50 to-gray-100/50 text-gray-700',
            icon: 'text-gray-600',
            hover: 'hover:bg-gray-50/80'
          }
        case 'alerts':
          return {
            active: 'bg-gradient-to-r from-red-50 to-red-100/50 text-red-700',
            icon: 'text-red-600',
            hover: 'hover:bg-red-50/80'
          }
        default:
          return {
            active: 'bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700',
            icon: 'text-blue-600',
            hover: 'hover:bg-gray-100/80'
          }
      }
    }

    const themeColors = getThemeColors(item.title)

    return (
      <div key={item.href}>
        <div className="flex items-center">
          <Link
            href={item.href}
            className={cn(
              "flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
              level === 0 
                ? "text-gray-700 hover:text-gray-900" 
                : "text-gray-600 hover:text-gray-800",
              level === 0 && themeColors.hover,
              active && themeColors.active,
              level > 0 && "ml-4"
            )}
            onClick={onClose}
          >
            <item.icon className={cn("mr-3 h-4 w-4 transition-colors", active && themeColors.icon)} />
            <span className="flex-1">{item.title}</span>
          </Link>
          {hasChildren && (
            <button
              onClick={() => toggleExpanded(item.title)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {expanded ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
            </button>
          )}
        </div>
        {hasChildren && expanded && item.children && (
          <div className="ml-6 mt-1 space-y-1">
            {item.children.map(child => renderMenuItem(child, level + 1))}
          </div>
        )}
      </div>
    )
  }

  // Show loading state during initial load
  if (status === 'loading' || !isClient) {
    return (
      <div className="fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 lg:relative">
        <div className="flex items-center justify-center h-full">
          <Loading text="Loading menu..." />
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      {/* Sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-white/95 backdrop-blur-sm border-r border-gray-200/50 transform transition-transform duration-200 ease-in-out lg:relative lg:translate-x-0 lg:inset-0 shadow-lg lg:shadow-none",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header - fixed */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200/50 flex-shrink-0 h-20 min-h-[80px] max-h-[80px]">
          <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Monitor className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold text-gray-900">Launch Control</span>
              <p className="text-xs text-gray-500">
                {session?.user.organization?.name || 'Command Centre'}
              </p>
            </div>
          </Link>
        </div>
        {/* Scrollable area: menu + user section, always 100vh minus header */}
        <div className="flex flex-col h-[calc(100vh-80px)] min-h-0 overflow-y-auto">
          <div className="flex-shrink-0 px-4 py-6 space-y-2 min-h-[calc(100vh-80px)]">
            {menuItems.map(item => renderMenuItem(item))}
          </div>
          {/* User Section at the very bottom of scroll, always below the fold */}
          <div className="flex-shrink-0 p-4 border-t border-gray-200/50 bg-gray-50/50" style={{height: '200px'}}>
            {/* Alerts/Notifications */}
            <div className="mb-4">
              <Link
                href="/dashboard/alerts"
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-all duration-200"
                onClick={onClose}
              >
                <Bell className="mr-3 h-4 w-4" />
                <span className="flex-1">Alerts</span>
                <span className="w-2 h-2 bg-red-500 icon-circle"></span>
              </Link>
            </div>
            {/* User Account */}
            <div className="mb-4">
              <Link
                href="/dashboard/account"
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-all duration-200"
                onClick={onClose}
              >
                {session?.user?.image ? (
                  <span className="mr-3 w-8 h-8 rounded-full overflow-hidden border-2 border-gray-200 bg-white flex items-center justify-center">
                    <Image
                      src={session.user.image}
                      alt="Profile"
                      width={32}
                      height={32}
                      className="object-cover w-8 h-8 rounded-full"
                    />
                  </span>
                ) : (
                  <User className="mr-3 h-4 w-4" />
                )}
                <span className="flex-1">Account</span>
              </Link>
            </div>
            {/* Sign Out */}
            <div className="mb-4">
              <button
                onClick={async () => {
                  console.log('Sign out clicked')
                  try {
                    await signOut({ callbackUrl: '/auth/signin' })
                  } catch (e) {
                    console.error('Sign out with callbackUrl failed, trying without:', e)
                    await signOut()
                  }
                }}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-all duration-200"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span className="flex-1 text-left">Sign Out</span>
              </button>
            </div>
            {/* Company Info */}
            <div className="text-center pt-4 border-t border-gray-200/50">
              <p className="text-sm font-medium text-gray-700">
                {session?.user.organization?.name || 'Ryujin Electronics'}
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {session?.user.role === 'ryujin_admin' || session?.user.role === 'ryujin_support' 
                  ? 'Canberra, ACT' 
                  : session?.user.organization?.type === 'client' 
                    ? 'Client Organization' 
                    : 'Command Centre'
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 