'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useParams, useRouter } from 'next/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  ArrowLeft, 
  Send,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  User,
  MessageSquare,
  Edit,
  Save,
  X,
  Phone
} from 'lucide-react'
import Link from 'next/link'
import { isRyujinUser, hasPermission } from '@/lib/auth'

interface Message {
  id: string
  content: string
  createdAt: string
  user: {
    id: string
    name: string
    email: string
    role: string
    phone?: string // Added phone number
  }
  imageUrl?: string // Added imageUrl
}

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
    phone?: string // Added phone number
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
    phone?: string // Added phone number
  }
  messages: Message[]
  parentTicket?: {
    id: string
    title: string
  }
}

export default function TicketPage() {
  const { data: session } = useSession()
  const params = useParams()
  const router = useRouter()
  const [ticket, setTicket] = useState<Ticket | null>(null)
  const [loading, setLoading] = useState(true)
  const [sending, setSending] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [editing, setEditing] = useState(false)
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    status: '',
    priority: '',
    category: ''
  })
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const [reopening, setReopening] = useState(false)

  const isRyujin = isRyujinUser(session?.user.role as any)
  const canAssignTickets = hasPermission(session?.user.role as any, 'canAssignTickets')
  const canReplyToTickets = hasPermission(session?.user.role as any, 'canReplyToTickets')

  useEffect(() => {
    fetchTicket()
  }, [params.id])

  useEffect(() => {
    scrollToBottom()
  }, [ticket?.messages])

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }

  const fetchTicket = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/tickets/${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setTicket(data)
        setEditData({
          title: data.title,
          description: data.description,
          status: data.status,
          priority: data.priority,
          category: data.category || 'other'
        })
      } else {
        router.push('/dashboard/support')
      }
    } catch (error) {
      console.error('Error fetching ticket:', error)
      router.push('/dashboard/support')
    } finally {
      setLoading(false)
    }
  }

  // Add phone number extraction for call button
  const userPhone = ticket?.user?.phone || null

  // Handle image selection
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setImageFile(file)
    if (file) {
      setImagePreview(URL.createObjectURL(file))
    } else {
      setImagePreview(null)
    }
  }

  // Send message with optional image
  const sendMessage = async () => {
    if ((!newMessage.trim() && !imageFile) || !ticket) return
    setSending(true)
    setUploadError(null)
    try {
      let message
      if (imageFile) {
        const formData = new FormData()
        formData.append('content', newMessage)
        formData.append('image', imageFile)
        const response = await fetch(`/api/tickets/${ticket.id}/messages`, {
          method: 'POST',
          body: formData,
        })
        if (response.ok) {
          message = await response.json()
        } else {
          const err = await response.json()
          setUploadError(err.error || 'Image upload failed')
        }
      } else {
        const response = await fetch(`/api/tickets/${ticket.id}/messages`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: newMessage }),
        })
        if (response.ok) {
          message = await response.json()
        }
      }
      if (message) {
        setTicket(prev => prev ? { ...prev, messages: [...prev.messages, message] } : null)
        setNewMessage('')
        setImageFile(null)
        setImagePreview(null)
        // Scroll to bottom after new message
        setTimeout(() => {
          scrollToBottom()
        }, 200)
      }
    } catch (error) {
      setUploadError('Image upload failed')
      console.error('Error sending message:', error)
    } finally {
      setSending(false)
    }
  }

  // Mark ticket as resolved
  const markAsResolved = async () => {
    if (!ticket) return
    try {
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'resolved' }),
      })
      if (response.ok) {
        const updatedTicket = await response.json()
        setTicket(updatedTicket)
        setEditing(false)
      }
    } catch (error) {
      console.error('Error resolving ticket:', error)
    }
  }

  const updateTicket = async () => {
    if (!ticket) return

    try {
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      })

      if (response.ok) {
        const updatedTicket = await response.json()
        setTicket(updatedTicket)
        setEditing(false)
      }
    } catch (error) {
      console.error('Error updating ticket:', error)
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

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const handleReopenTicket = async () => {
    if (!ticket) return
    setReopening(true)
    try {
      const response = await fetch(`/api/tickets/${ticket.id}`, {
        method: 'POST',
      })
      if (response.ok) {
        const newTicket = await response.json()
        router.push(`/dashboard/support/tickets/${newTicket.id}`)
      } else {
        alert('Failed to reopen ticket.')
      }
    } catch (err) {
      alert('Failed to reopen ticket.')
    } finally {
      setReopening(false)
    }
  }

  if (loading) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="text-gray-500">Loading ticket...</div>
        </div>
      </div>
    )
  }

  if (!ticket) {
    return (
      <div className="p-6">
        <div className="text-center py-8">
          <div className="text-gray-500">Ticket not found</div>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/support">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Tickets
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {editing ? (
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData(prev => ({ ...prev, title: e.target.value }))}
                  className="border border-gray-300 rounded px-2 py-1"
                />
              ) : (
                ticket.title
              )}
            </h1>
            <p className="text-gray-600 mt-1">
              Created by {ticket.user.name} • {formatDate(ticket.createdAt)}
            </p>
          </div>
        </div>
        
        {canAssignTickets && (
          <div className="flex gap-2">
            {editing ? (
              <>
                <Button size="sm" onClick={updateTicket}>
                  <Save className="h-4 w-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" size="sm" onClick={() => setEditing(false)}>
                  <X className="h-4 w-4 mr-2" />
                  Cancel
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => setEditing(true)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            )}
          </div>
        )}
        {/* Mark as Resolved button for both user and admin if not resolved */}
        {ticket.status !== 'resolved' && (
          <Button variant="default" size="sm" onClick={markAsResolved}>
            <CheckCircle className="h-4 w-4 mr-2" />
            Mark as Resolved
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ticket Details */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Ticket Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700">Status</label>
                <div className="flex items-center gap-2 mt-1">
                  {getStatusIcon(ticket.status)}
                  {editing ? (
                    <select
                      value={editData.status}
                      onChange={(e) => setEditData(prev => ({ ...prev, status: e.target.value }))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="open">Open</option>
                      <option value="in_progress">In Progress</option>
                      <option value="resolved">Resolved</option>
                      <option value="closed">Closed</option>
                    </select>
                  ) : (
                    <Badge className={getStatusColor(ticket.status)}>
                      {ticket.status.replace('_', ' ')}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Priority</label>
                <div className="mt-1">
                  {editing ? (
                    <select
                      value={editData.priority}
                      onChange={(e) => setEditData(prev => ({ ...prev, priority: e.target.value }))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  ) : (
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority}
                    </Badge>
                  )}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Type</label>
                <p className="text-sm text-gray-600 mt-1">{ticket.type}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700">Category</label>
                <div className="mt-1">
                  {editing ? (
                    <select
                      value={editData.category}
                      onChange={(e) => setEditData(prev => ({ ...prev, category: e.target.value }))}
                      className="border border-gray-300 rounded px-2 py-1 text-sm"
                    >
                      <option value="hardware">Hardware</option>
                      <option value="software">Software</option>
                      <option value="network">Network</option>
                      <option value="account">Account</option>
                      <option value="billing">Billing</option>
                      <option value="other">Other</option>
                    </select>
                  ) : (
                    <p className="text-sm text-gray-600">{ticket.category || 'Other'}</p>
                  )}
                </div>
              </div>

              {ticket.assignedUser && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Assigned To</label>
                  <p className="text-sm text-gray-600 mt-1">{ticket.assignedUser.name}</p>
                </div>
              )}

              {isRyujin && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Organization</label>
                  <p className="text-sm text-gray-600 mt-1">{ticket.organization.name}</p>
                </div>
              )}
              {/* Call User button for admin if phone exists */}
              {isRyujin && userPhone && (
                <a href={`tel:${userPhone}`} target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="w-full mt-4">
                    <Phone className="h-4 w-4 mr-2" />
                    Call User
                  </Button>
                </a>
              )}
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              {editing ? (
                <textarea
                  value={editData.description}
                  onChange={(e) => setEditData(prev => ({ ...prev, description: e.target.value }))}
                  rows={6}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                />
              ) : (
                <p className="text-sm text-gray-600 whitespace-pre-wrap">{ticket.description}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Chat */}
        <div className="lg:col-span-2">
          <Card className="h-[600px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Messages ({ticket.messages.length})
                {/* Ticket ID */}
                <span className="ml-auto text-xs font-mono bg-gray-200 px-2 py-1 rounded text-gray-700" title="Ticket ID">
                  ID: {ticket.id.toUpperCase()}
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col min-h-0">
              {/* Previous Ticket Link */}
              {ticket.parentTicket && (
                <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded flex items-center gap-2">
                  <span className="font-semibold text-blue-800">Previous Ticket:</span>
                  <Link href={`/dashboard/support/tickets/${ticket.parentTicket.id}`} className="underline text-blue-700 hover:text-blue-900">
                    {ticket.parentTicket.title} (ID: {ticket.parentTicket.id.toUpperCase()})
                  </Link>
                  <span className="text-xs text-blue-700 ml-2">View previous ticket history</span>
                </div>
              )}
              {/* Messages */}
              <div className="flex-1 overflow-y-auto space-y-4 mb-4 min-h-0">
                {ticket.messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex gap-3 ${
                      message.user.id === session?.user.id ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.user.id === session?.user.id
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <User className="h-3 w-3" />
                        <span className="text-xs font-medium">
                          {message.user.name}
                          {message.user.id === session?.user.id && ' (You)'}
                        </span>
                      </div>
                      {/* Display image if present */}
                      {message.imageUrl && (
                        <a href={message.imageUrl} target="_blank" rel="noopener noreferrer">
                          <img src={message.imageUrl} alt="attachment" className="max-h-60 max-w-xs rounded-lg mb-2 border shadow" />
                        </a>
                      )}
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs opacity-70 mt-1">
                        {formatDate(message.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
              {/* Resolution Details section for resolved tickets */}
              {ticket.status === 'resolved' && (
                <div className="bg-green-50 border border-green-200 rounded p-4 mb-4">
                  <div className="font-semibold text-green-800 mb-1">Resolution Details</div>
                  <div className="text-sm text-green-900">
                    {/* Show last Ryujin message or a summary */}
                    {(() => {
                      const ryujinMsg = [...ticket.messages].reverse().find(m => m.user.role?.startsWith('ryujin'));
                      if (ryujinMsg) {
                        return <>{ryujinMsg.content}</>;
                      } else {
                        return <>No resolution details provided.</>;
                      }
                    })()}
                  </div>
                </div>
              )}
              {/* Message Input - only if not resolved */}
              {canReplyToTickets && ticket.status !== 'resolved' && (
                <form className="flex gap-2 items-end mt-auto pt-4 border-t" onSubmit={e => { e.preventDefault(); sendMessage(); }}>
                  <div className="flex-1 flex flex-col gap-2">
                    <input
                      type="text"
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      disabled={sending}
                    />
                    {/* Image upload */}
                    <div className="flex items-center gap-2">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        disabled={sending}
                        className="block"
                      />
                      {imagePreview && (
                        <div className="relative">
                          <img src={imagePreview} alt="preview" className="h-16 w-16 object-cover rounded-lg border shadow" />
                          <button type="button" className="absolute -top-2 -right-2 bg-white rounded-full border p-1 shadow" onClick={() => { setImageFile(null); setImagePreview(null); }}>
                            <X className="h-3 w-3 text-gray-500" />
                          </button>
                        </div>
                      )}
                    </div>
                    {uploadError && <div className="text-xs text-red-500 mt-1">{uploadError}</div>}
                  </div>
                  <Button type="submit" disabled={sending || (!newMessage.trim() && !imageFile)}>
                    {sending ? (
                      <Clock className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </form>
              )}
              {/* Reopen Ticket button for users on resolved tickets */}
              {ticket.status === 'resolved' && !isRyujin && (
                <div className="flex justify-end mt-4">
                  <Button variant="outline" onClick={handleReopenTicket} disabled={reopening}>
                    {reopening ? 'Reopening...' : 'Reopen Ticket'}
                  </Button>
                </div>
              )}
              {/* Show link to parent/original ticket if present */}
              {ticket.parentTicket && (
                <div className="mt-4 text-xs text-gray-500">
                  Based on previous ticket: <Link href={`/dashboard/support/tickets/${ticket.parentTicket.id}`} className="underline">{ticket.parentTicket.title} (ID: {ticket.parentTicket.id.toUpperCase()})</Link>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 