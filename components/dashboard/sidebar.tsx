'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
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
  LogOut
} from 'lucide-react'

interface MenuItem {
  title: string
  href: string
  icon: React.ComponentType<{ className?: string }>
  children?: MenuItem[]
}

const menuItems: MenuItem[] = [
  {
    title: 'Control',
    href: '/dashboard/control',
    icon: Monitor,
    children: [
      { title: 'Device Management', href: '/dashboard/control/device-management', icon: Smartphone },
      { title: 'Proactive Monitoring', href: '/dashboard/control/proactive-monitoring', icon: Cpu },
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
      { title: 'Purchase History', href: '/dashboard/acquisition/purchase-history', icon: History },
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

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [expandedItems, setExpandedItems] = useState<string[]>(['Control'])

  const toggleExpanded = (title: string) => {
    setExpandedItems(prev => 
      prev.includes(title) 
        ? prev.filter(item => item !== title)
        : [...prev, title]
    )
  }

  const isExpanded = (title: string) => expandedItems.includes(title)
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/')

    const renderMenuItem = (item: MenuItem, level: number = 0) => {
    const hasChildren = item.children && item.children.length > 0
    const expanded = isExpanded(item.title)
    const active = isActive(item.href)

    return (
      <div key={item.href}>
        <div className="flex items-center">
          <Link
            href={item.href}
            className={cn(
              "flex items-center w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200",
              level === 0 
                ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100/80" 
                : "text-gray-600 hover:text-gray-800 hover:bg-gray-50/80",
              active && "bg-gradient-to-r from-blue-50 to-blue-100/50 text-blue-700 shadow-sm",
              level > 0 && "ml-4"
            )}
            onClick={onClose}
          >
            <item.icon className={cn("mr-3 h-4 w-4 transition-colors", active && "text-blue-600")} />
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
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
            <Link href="/dashboard" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Monitor className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold text-gray-900">Launch Control</span>
                <p className="text-xs text-gray-500">Command Centre</p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {menuItems.map(item => renderMenuItem(item))}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-gray-200/50 bg-gray-50/50">
            {/* Alerts/Notifications */}
            <div className="mb-4">
              <Link
                href="/dashboard/alerts"
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-all duration-200"
                onClick={onClose}
              >
                <Bell className="mr-3 h-4 w-4" />
                <span className="flex-1">Alerts</span>
                <span className="w-2 h-2 bg-red-500 rounded-full"></span>
              </Link>
            </div>

            {/* User Account */}
            <div className="mb-4">
              <Link
                href="/dashboard/account"
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-all duration-200"
                onClick={onClose}
              >
                <User className="mr-3 h-4 w-4" />
                <span className="flex-1">Account</span>
              </Link>
            </div>

            {/* Sign Out */}
            <div className="mb-4">
              <button
                onClick={() => signOut({ callbackUrl: '/auth/signin' })}
                className="flex items-center w-full px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100/80 rounded-lg transition-all duration-200"
              >
                <LogOut className="mr-3 h-4 w-4" />
                <span className="flex-1 text-left">Sign Out</span>
              </button>
            </div>

            {/* Company Info */}
            <div className="text-center pt-4 border-t border-gray-200/50">
              <p className="text-sm font-medium text-gray-700">Ryujin Electronics</p>
              <p className="text-xs text-gray-500 mt-1">Canberra, ACT</p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
} 