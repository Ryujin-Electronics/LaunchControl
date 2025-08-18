'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Send, 
  Plus, 
  Search, 
  MoreVertical, 
  Image as ImageIcon,
  Video,
  File,
  Smile,
  Edit3,
  Trash2,
  Users,
  UserPlus,
  Settings,
  Clock
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  image?: string
  jobTitle?: string
  role: string
  organization?: {
    name: string
    type: string
  }
}

interface Message {
  id: string
  content: string
  messageType: string
  mediaUrl?: string
  mediaThumbnail?: string
  mediaSize?: number
  mediaDuration?: number
  isEdited: boolean
  editedAt?: string
  createdAt: string
  sender: {
    id: string
    name: string
    image?: string
    role: string
  }
}

interface Conversation {
  id: string
  name?: string
  type: string
  participants: Array<{
    id: string
    role: string
    user: User
  }>
  lastMessage?: Message
  _count: {
    messages: number
  }
}

export default function MessagingPage() {
  const { data: session } = useSession()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const [showNewConversation, setShowNewConversation] = useState(false)
  const [availableUsers, setAvailableUsers] = useState<User[]>([])
  const [selectedUsers, setSelectedUsers] = useState<User[]>([])
  const [conversationName, setConversationName] = useState('')
  const [conversationType, setConversationType] = useState<'direct' | 'group'>('direct')
  const [isLoading, setIsLoading] = useState(false)

  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Fetch conversations on mount
  useEffect(() => {
    fetchConversations()
  }, [])

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // Fetch conversations
  const fetchConversations = async () => {
    try {
      const response = await fetch('/api/messaging/conversations')
      if (response.ok) {
        const data = await response.json()
        setConversations(data)
      }
    } catch (error) {
      console.error('Error fetching conversations:', error)
    }
  }

  // Fetch messages for a conversation
  const fetchMessages = async (conversationId: string) => {
    try {
      const response = await fetch(`/api/messaging/messages?conversationId=${conversationId}`)
      if (response.ok) {
        const data = await response.json()
        setMessages(data)
      }
    } catch (error) {
      console.error('Error fetching messages:', error)
    }
  }

  // Send message
  const sendMessage = async () => {
    if (!newMessage.trim() || !selectedConversation) return

    try {
      const response = await fetch('/api/messaging/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          content: newMessage.trim(),
          messageType: 'text'
        })
      })

      if (response.ok) {
        const message = await response.json()
        setMessages(prev => [...prev, message])
        setNewMessage('')
        
        // Update conversation list with new last message
        setConversations(prev => 
          prev.map(conv => 
            conv.id === selectedConversation.id 
              ? { ...conv, lastMessage: message }
              : conv
          )
        )
      }
    } catch (error) {
      console.error('Error sending message:', error)
    }
  }

  // Handle conversation selection
  const handleConversationSelect = (conversation: Conversation) => {
    setSelectedConversation(conversation)
    fetchMessages(conversation.id)
  }

  // Search users for new conversation
  const searchUsers = async (query: string) => {
    if (!query.trim()) {
      setAvailableUsers([])
      return
    }

    try {
      const response = await fetch(`/api/messaging/users?search=${encodeURIComponent(query)}`)
      if (response.ok) {
        const data = await response.json()
        setAvailableUsers(data)
      }
    } catch (error) {
      console.error('Error searching users:', error)
    }
  }

  // Create new conversation
  const createConversation = async () => {
    if (selectedUsers.length === 0) return

    try {
      setIsLoading(true)
      const response = await fetch('/api/messaging/conversations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: conversationType,
          participantIds: selectedUsers.map(u => u.id),
          name: conversationType === 'group' ? conversationName : undefined
        })
      })

      if (response.ok) {
        const conversation = await response.json()
        setConversations(prev => [conversation, ...prev])
        setSelectedConversation(conversation)
        setShowNewConversation(false)
        setSelectedUsers([])
        setConversationName('')
        setConversationType('direct')
        setAvailableUsers([])
        setSearchQuery('')
      }
    } catch (error) {
      console.error('Error creating conversation:', error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !selectedConversation) return

    try {
      // Create FormData for file upload
      const formData = new FormData()
      formData.append('file', file)

      // Upload file
      const response = await fetch('/api/messaging/upload', {
        method: 'POST',
        body: formData
      })

      if (!response.ok) {
        throw new Error('Upload failed')
      }

      const uploadResult = await response.json()
      
      // Create message with uploaded file
      const message: Message = {
        id: Date.now().toString(),
        content: `File: ${file.name}`,
        messageType: file.type.startsWith('image/') ? 'image' : 
                    file.type.startsWith('video/') ? 'video' : 'file',
        mediaUrl: uploadResult.fileUrl,
        mediaSize: file.size,
        isEdited: false,
        createdAt: new Date().toISOString(),
        sender: {
          id: session?.user?.id || '',
          name: session?.user?.name || '',
          image: session?.user?.image || '',
          role: session?.user?.role || ''
        }
      }

      // Add message to conversation
      setMessages(prev => [...prev, message])
      
      // Update conversation list with new last message
      setConversations(prev => 
        prev.map(conv => 
          conv.id === selectedConversation.id 
            ? { ...conv, lastMessage: message }
            : conv
        )
      )

      // Send message to API
      await fetch('/api/messaging/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          conversationId: selectedConversation.id,
          content: `File: ${file.name}`,
          messageType: file.type.startsWith('image/') ? 'image' : 
                      file.type.startsWith('video/') ? 'video' : 'file',
          mediaUrl: uploadResult.fileUrl,
          mediaSize: file.size
        })
      })

    } catch (error) {
      console.error('Error uploading file:', error)
      // You could show a toast notification here
    }

    // Clear the file input
    if (event.target) {
      event.target.value = ''
    }
  }

  // Format timestamp
  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInMinutes = diffInMs / (1000 * 60)
    const diffInHours = diffInMinutes / 60
    const diffInDays = diffInHours / 24
    
    if (diffInMinutes < 1) {
      return 'Just now'
    } else if (diffInMinutes < 60) {
      return `${Math.floor(diffInMinutes)}m ago`
    } else if (diffInHours < 24) {
      return `${Math.floor(diffInHours)}h ago`
    } else if (diffInDays < 7) {
      return `${Math.floor(diffInDays)}d ago`
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' })
    }
  }

  // Get conversation display name
  const getConversationName = (conversation: Conversation) => {
    if (conversation.name) return conversation.name
    if (conversation.type === 'direct') {
      const otherParticipant = conversation.participants.find(p => p.user.id !== session?.user?.id)
      return otherParticipant?.user.name || 'Unknown User'
    }
    return 'Group Chat'
  }

  return (
    <div className="h-[calc(100vh-120px)] flex bg-white rounded-lg shadow-sm border">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Messages</h2>
            <Button
              onClick={() => setShowNewConversation(true)}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Conversations List */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              onClick={() => handleConversationSelect(conversation)}
              className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-all duration-200 ${
                selectedConversation?.id === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                  {conversation.type === 'group' ? (
                    <Users className="w-6 h-6" />
                  ) : (
                    getConversationName(conversation).charAt(0).toUpperCase()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 truncate">
                    {getConversationName(conversation)}
                  </h3>
                  {conversation.lastMessage ? (
                    <p className="text-sm text-gray-600 truncate mt-1">
                      <span className="font-medium text-gray-700">{conversation.lastMessage.sender.name}:</span> {conversation.lastMessage.content}
                    </p>
                  ) : (
                    <p className="text-sm text-gray-400 mt-1">No messages yet</p>
                  )}
                </div>
                <div className="text-xs text-gray-400 text-right">
                  {conversation.lastMessage ? (
                    <div className="flex items-center space-x-1 justify-end">
                      <Clock className="w-3 h-3" />
                      <span>{formatTime(conversation.lastMessage.createdAt)}</span>
                    </div>
                  ) : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-700 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                  {selectedConversation.type === 'group' ? (
                    <Users className="w-6 h-6" />
                  ) : (
                    getConversationName(selectedConversation).charAt(0).toUpperCase()
                  )}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {getConversationName(selectedConversation)}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {selectedConversation.participants.length} participant{selectedConversation.participants.length !== 1 ? 's' : ''}
                  </p>
                </div>
              </div>
              <Button variant="ghost" size="sm">
                <MoreVertical className="w-4 h-4" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4">
              {messages.map((message, index) => {
                const isCurrentUser = message.sender.id === session?.user?.id
                const prevMessage = index > 0 ? messages[index - 1] : null
                const nextMessage = index < messages.length - 1 ? messages[index + 1] : null
                
                // Check if this message should be grouped with previous/next
                const isFirstInGroup = !prevMessage || prevMessage.sender.id !== message.sender.id
                const isLastInGroup = !nextMessage || nextMessage.sender.id !== message.sender.id
                






                return (
                  <div
                    key={message.id}
                    className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'} ${
                      isFirstInGroup ? 'mt-4' : 'mt-0.5'
                    }`}
                  >
                    <div className={`max-w-xs lg:max-w-md ${isCurrentUser ? 'order-2' : 'order-1'}`}>
                      {/* Show sender info only for first message in group from other users */}
                      {!isCurrentUser && isFirstInGroup && (
                        <div className="flex items-center space-x-3 mb-2 ml-1">
                          <div className="w-6 h-6 bg-gray-700 rounded-md flex items-center justify-center text-xs text-white font-semibold shadow-sm">
                            {message.sender.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm text-gray-600 font-medium">{message.sender.name}</span>
                        </div>
                      )}
                      
                      <div 
                        className={`relative px-4 py-3 shadow-md transition-all duration-200 ${
                          isCurrentUser
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        } ${
                          !isLastInGroup ? 'mb-0.5' : ''
                        }`}
                        style={{ 
                          borderRadius: isFirstInGroup && isLastInGroup ? '8px' : 
                                      isFirstInGroup ? '8px 8px 4px 8px' :
                                      isLastInGroup ? '8px 4px 8px 8px' :
                                      '8px 4px 4px 8px'
                        }}
                        onMouseEnter={(e) => {
                          const timestamp = e.currentTarget.querySelector('[data-timestamp]')
                          if (timestamp) timestamp.style.opacity = '1'
                        }}
                        onMouseLeave={(e) => {
                          const timestamp = e.currentTarget.querySelector('[data-timestamp]')
                          if (timestamp) timestamp.style.opacity = '0'
                        }}

                      >
                        {/* Message content */}
                        {message.messageType === 'image' && message.mediaUrl && (
                          <div className="mb-2">
                            <img 
                              src={message.mediaUrl} 
                              alt="Image" 
                              className="max-w-full rounded-md shadow-sm"
                            />
                          </div>
                        )}
                        {message.messageType === 'video' && message.mediaUrl && (
                          <div className="mb-2">
                            <video 
                              src={message.mediaUrl} 
                              controls 
                              className="max-w-full rounded-md shadow-sm"
                            />
                          </div>
                        )}
                        {message.messageType === 'file' && (
                          <div className="flex items-center space-x-3 mb-2 p-2 rounded-md bg-black/10">
                            <File className="w-4 h-4" />
                            <div className="flex-1">
                              <p className="text-sm font-medium">File attachment</p>
                              <p className="text-xs opacity-80">{message.mediaSize ? `${(message.mediaSize / 1024 / 1024).toFixed(1)} MB` : 'Unknown size'}</p>
                            </div>
                          </div>
                        )}
                        
                        <p className="text-sm leading-relaxed">{message.content}</p>
                        
                        {message.isEdited && (
                          <p className="text-xs opacity-70 mt-1 italic">(edited)</p>
                        )}

                        {/* Timestamp - appears on hover */}
                        <div 
                          className={`absolute top-2 ${
                            isCurrentUser ? 'left-2' : 'right-2'
                          } opacity-0 transition-opacity duration-200 pointer-events-none z-10`}
                          data-timestamp
                        >
                          <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-md px-2 py-1 shadow-sm">
                            <Clock className="w-3 h-3 text-gray-600" />
                            <span className="text-xs text-gray-600 font-medium">
                              {formatTime(message.createdAt)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200 bg-gray-50">
              <div className="flex items-center space-x-3 bg-white rounded-lg border border-gray-200 px-4 py-2 shadow-sm">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  className="text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md p-2 transition-colors"
                >
                  <ImageIcon className="w-5 h-5" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  className="flex-1 border-0 focus:ring-0 focus:outline-none bg-transparent"
                />
                <Button
                  onClick={sendMessage}
                  disabled={!newMessage.trim()}
                  className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-md p-2 transition-all duration-200 shadow-sm"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*,.pdf,.doc,.docx,.txt"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Select a conversation</h3>
              <p className="text-gray-500">Choose a conversation from the list to start messaging</p>
            </div>
          </div>
        )}
      </div>

      {/* New Conversation Modal */}
      {showNewConversation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">New Conversation</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Conversation Type
                </label>
                <select
                  value={conversationType}
                  onChange={(e) => setConversationType(e.target.value as 'direct' | 'group')}
                  className="w-full p-2 border border-gray-300 rounded-md"
                >
                  <option value="direct">Direct Message</option>
                  <option value="group">Group Chat</option>
                </select>
              </div>

              {conversationType === 'group' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Group Name
                  </label>
                  <Input
                    placeholder="Enter group name"
                    value={conversationName}
                    onChange={(e) => setConversationName(e.target.value)}
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Search Users
                </label>
                <p className="text-xs text-gray-500 mb-2">
                  You can create multiple conversations with the same user for different topics or purposes.
                </p>
                <Input
                  placeholder="Search by name, email, or job title"
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    searchUsers(e.target.value)
                  }}
                />
              </div>

              {availableUsers.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Available Users
                  </label>
                  <div className="max-h-40 overflow-y-auto space-y-2">
                    {availableUsers.map((user) => (
                      <div
                        key={user.id}
                        onClick={() => {
                          if (selectedUsers.find(u => u.id === user.id)) {
                            setSelectedUsers(prev => prev.filter(u => u.id !== user.id))
                          } else {
                            setSelectedUsers(prev => [...prev, user])
                          }
                        }}
                        className={`p-2 border rounded-md cursor-pointer transition-colors ${
                          selectedUsers.find(u => u.id === user.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center text-xs text-gray-600">
                            {user.name.charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-gray-900">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.jobTitle} • {user.organization?.name}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {selectedUsers.length > 0 && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Selected Users ({selectedUsers.length})
                  </label>
                  <div className="space-y-2">
                    {selectedUsers.map((user) => (
                      <div key={user.id} className="flex items-center justify-between p-2 bg-blue-50 border border-blue-200 rounded-md">
                        <span className="text-sm text-gray-900">{user.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedUsers(prev => prev.filter(u => u.id !== user.id))}
                          className="text-red-600 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end space-x-2 mt-6">
              <Button
                variant="outline"
                onClick={() => {
                  setShowNewConversation(false)
                  setSelectedUsers([])
                  setConversationName('')
                  setConversationType('direct')
                  setAvailableUsers([])
                  setSearchQuery('')
                }}
              >
                Cancel
              </Button>
              <Button
                onClick={createConversation}
                disabled={selectedUsers.length === 0 || isLoading}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {isLoading ? 'Creating...' : 'Create Conversation'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
