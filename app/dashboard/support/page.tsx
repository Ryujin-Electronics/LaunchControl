'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Plus, 
  MessageSquare, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Filter,
  Search
} from 'lucide-react'
import Link from 'next/link'
import { isRyujinUser, hasPermission } from '@/lib/auth'

interface Ticket {
  id: string
  title: string
  description: string
  status: string
  priority: string
  type: string
  category?: string
  createdAt: string
  updatedAt: string
  user: {
    id: string
    name: string
    email: string
    role: string
  }
  assignedUser?: {
    id: string
    name: string
    email: string
    role: string
  }
  organization: {
    id: string
    name: string
    type: string
  }
  messages: Array<{
    id: string
    content: string
    createdAt: string
    user: {
      name: string
    }
  }>
  _count: {
    messages: number
  }
}

export default function SupportPage() {
  const { data: session } = useSession()
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  const isRyujin = isRyujinUser(session?.user.role as any)
  const canCreateTickets = hasPermission(session?.user.role as any, 'canCreateTickets')

  useEffect(() => {
    fetchTickets()
  }, [filter])

  const fetchTickets = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams()
      if (filter !== 'all') {
        params.append('status', filter)
      }
      
      const response = await fetch(`/api/tickets?${params.toString()}`)
      if (response.ok) {
        const data = await response.json()
        setTickets(data)
      }
    } catch (error) {
      console.error('Error fetching tickets:', error)
    } finally {
      setLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertTriangle className="h-4 w-4 text-orange-500" />
      case 'in_progress':
        return <Clock className="h-4 w-4 text-blue-500" />
      case 'resolved':
        return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'closed':
        return <XCircle className="h-4 w-4 text-gray-500" />
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-500" />
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-100 text-red-800'
      case 'high':
        return 'bg-orange-100 text-orange-800'
      case 'medium':
        return 'bg-yellow-100 text-yellow-800'
      case 'low':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-orange-100 text-orange-800'
      case 'in_progress':
        return 'bg-blue-100 text-blue-800'
      case 'resolved':
        return 'bg-green-100 text-green-800'
      case 'closed':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  // Filter tickets based on search term and status
  const filteredTickets = tickets.filter(ticket => {
    const searchLower = searchTerm.toLowerCase()
    const matchesSearch = (
      ticket.title.toLowerCase().includes(searchLower) ||
      ticket.description.toLowerCase().includes(searchLower) ||
      ticket.user.name.toLowerCase().includes(searchLower) ||
      ticket.status.toLowerCase().includes(searchLower) ||
      ticket.priority.toLowerCase().includes(searchLower)
    )
    
    // If filter is 'all', show all tickets except resolved ones by default
    if (filter === 'all') {
      return matchesSearch && ticket.status !== 'resolved'
    }
    
    // If filter is 'resolved', only show resolved tickets
    if (filter === 'resolved') {
      return matchesSearch && ticket.status === 'resolved'
    }
    
    // For other filters, show tickets matching both search and status
    return matchesSearch && ticket.status === filter
  }).sort((a, b) => {
    // Priority order: urgent > high > medium > low
    const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
    const aPriority = priorityOrder[a.priority as keyof typeof priorityOrder] || 0
    const bPriority = priorityOrder[b.priority as keyof typeof priorityOrder] || 0
    
    // Status order: open > in_progress > closed
    const statusOrder = { open: 3, in_progress: 2, closed: 1 }
    const aStatus = statusOrder[a.status as keyof typeof statusOrder] || 0
    const bStatus = statusOrder[b.status as keyof typeof statusOrder] || 0
    
    // Sort by priority first (descending), then by status (descending)
    if (aPriority !== bPriority) {
      return bPriority - aPriority
    }
    
    return bStatus - aStatus
  })

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Support Tickets</h1>
          <p className="text-gray-600 mt-2">
            {isRyujin ? 'Manage all support tickets' : 'View and manage your support tickets'}
            {filter === 'resolved' && ' (showing resolved tickets)'}
          </p>
        </div>
        {canCreateTickets && (
          <Link href="/dashboard/support/new">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              New Ticket
            </Button>
          </Link>
        )}
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <input
              type="text"
              placeholder="Search tickets..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            Active
          </Button>
          <Button
            variant={filter === 'open' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('open')}
          >
            Open
          </Button>
          <Button
            variant={filter === 'in_progress' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('in_progress')}
          >
            In Progress
          </Button>
          <Button
            variant={filter === 'resolved' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('resolved')}
          >
            Resolved
          </Button>
        </div>
      </div>

      {/* Tickets List */}
      {loading ? (
        <div className="text-center py-8">
          <div className="text-gray-500">Loading tickets...</div>
        </div>
      ) : filteredTickets.length === 0 ? (
        <Card>
          <CardContent className="text-center py-8">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tickets found</h3>
            <p className="text-gray-500 mb-4">
              {searchTerm ? 'No tickets match your search criteria.' : 'No tickets have been created yet.'}
            </p>
            {canCreateTickets && (
              <Link href="/dashboard/support/new">
                <Button>Create First Ticket</Button>
              </Link>
            )}
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredTickets.map((ticket) => (
            <Link 
              key={ticket.id} 
              href={`/dashboard/support/tickets/${ticket.id}`}
              className="block"
            >
              <Card className="hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        {getStatusIcon(ticket.status)}
                        <span className="text-lg font-semibold text-gray-900">
                          {ticket.title}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {ticket.description}
                      </p>
                      
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span>Created by {ticket.user.name}</span>
                        <span>•</span>
                        <span>{formatDate(ticket.createdAt)}</span>
                        <span>•</span>
                        <span>{ticket._count.messages} messages</span>
                        {isRyujin && (
                          <>
                            <span>•</span>
                            <span>{ticket.organization.name}</span>
                          </>
                        )}
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end gap-2">
                      <div className="flex gap-2">
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {ticket.priority}
                        </Badge>
                        <Badge className={getStatusColor(ticket.status)}>
                          {ticket.status.replace('_', ' ')}
                        </Badge>
                      </div>
                      
                      {ticket.assignedUser && (
                        <div className="text-sm text-gray-500">
                          Assigned to {ticket.assignedUser.name}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
} 