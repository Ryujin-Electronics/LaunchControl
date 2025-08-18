'use client'

import { useState, useRef } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Send, 
  Paperclip, 
  Plus, 
  X,
  Mail,
  Inbox,
  Edit3,
  Settings,
  ArrowLeft
} from 'lucide-react'

interface Email {
  id: string
  from: string
  to: string[]
  cc?: string[]
  bcc?: string[]
  subject: string
  body: string
  attachments?: File[]
  isDraft: boolean
  isSent: boolean
  isRead: boolean
  isStarred: boolean
  isArchived: boolean
  createdAt: string
  sentAt?: string
}

export default function StandaloneEmailPage() {
  const [emails, setEmails] = useState<Email[]>([])
  const [composeMode, setComposeMode] = useState(false)
  const [currentView, setCurrentView] = useState<'inbox' | 'sent' | 'drafts'>('inbox')
  
  // Compose email state
  const [composeEmail, setComposeEmail] = useState({
    to: '',
    cc: '',
    bcc: '',
    subject: '',
    body: '',
    attachments: [] as File[]
  })

  const fileInputRef = useRef<HTMLInputElement>(null)

  // Handle file attachment
  const handleFileAttachment = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setComposeEmail(prev => ({
      ...prev,
      attachments: [...prev.attachments, ...files]
    }))
  }

  // Remove attachment
  const removeAttachment = (index: number) => {
    setComposeEmail(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }))
  }

  // Send email
  const sendEmail = async () => {
    if (!composeEmail.to.trim() || !composeEmail.subject.trim()) {
      alert('Please fill in at least the "To" and "Subject" fields')
      return
    }

    try {
      // Create email object
      const newEmail: Email = {
        id: Date.now().toString(),
        from: 'test@ryujin.com', // Hardcoded for testing
        to: composeEmail.to.split(',').map(email => email.trim()),
        cc: composeEmail.cc ? composeEmail.cc.split(',').map(email => email.trim()) : [],
        bcc: composeEmail.bcc ? composeEmail.bcc.split(',').map(email => email.trim()) : [],
        subject: composeEmail.subject,
        body: composeEmail.body,
        attachments: composeEmail.attachments,
        isDraft: false,
        isSent: true,
        isRead: true,
        isStarred: false,
        isArchived: false,
        createdAt: new Date().toISOString(),
        sentAt: new Date().toISOString()
      }

      // Add to sent emails
      setEmails(prev => [newEmail, ...prev])
      
      // Reset compose form
      setComposeEmail({
        to: '',
        cc: '',
        bcc: '',
        subject: '',
        body: '',
        attachments: []
      })
      
      setComposeMode(false)
      
      // Send email via API
      try {
        const response = await fetch('/api/email/send', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            to: newEmail.to,
            cc: newEmail.cc,
            bcc: newEmail.bcc,
            subject: newEmail.subject,
            body: newEmail.body,
            attachments: (newEmail.attachments || []).map(file => ({
              filename: file.name,
              content: '', // In a real implementation, you'd convert file to base64
              contentType: file.type
            }))
          })
        })

        if (!response.ok) {
          const errorData = await response.json()
          console.error('Email send error:', errorData)
        } else {
          const result = await response.json()
          console.log('Email sent successfully:', result)
        }
      } catch (error) {
        console.error('Failed to send email:', error)
      }
      
    } catch (error) {
      console.error('Error sending email:', error)
      alert('Failed to send email. Please try again.')
    }
  }

  // Save as draft
  const saveAsDraft = () => {
    if (!composeEmail.to.trim() && !composeEmail.subject.trim() && !composeEmail.body.trim()) {
      return
    }

    const draftEmail: Email = {
      id: Date.now().toString(),
      from: 'test@ryujin.com', // Hardcoded for testing
      to: composeEmail.to ? composeEmail.to.split(',').map(email => email.trim()) : [],
      cc: composeEmail.cc ? composeEmail.cc.split(',').map(email => email.trim()) : [],
      bcc: composeEmail.bcc ? composeEmail.bcc.split(',').map(email => email.trim()) : [],
      subject: composeEmail.subject,
      body: composeEmail.body,
      attachments: composeEmail.attachments,
      isDraft: true,
      isSent: false,
      isRead: true,
      isStarred: false,
      isArchived: false,
      createdAt: new Date().toISOString()
    }

    setEmails(prev => [draftEmail, ...prev])
    setComposeMode(false)
    
    // Reset compose form
    setComposeEmail({
      to: '',
      cc: '',
      bcc: '',
      subject: '',
      body: '',
      attachments: []
    })
  }

  // Filter emails based on current view
  const filteredEmails = emails.filter(email => {
    if (currentView === 'inbox') return !email.isSent && !email.isDraft
    if (currentView === 'sent') return email.isSent
    if (currentView === 'drafts') return email.isDraft
    return true
  })

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = '/'}
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
              <h1 className="text-xl font-semibold text-gray-900">Ryujin Email System</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.location.href = '/dashboard/email/setup'}
                className="border-blue-200 text-blue-700 hover:bg-blue-50"
              >
                <Settings className="w-4 h-4 mr-2" />
                Setup
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="h-[calc(100vh-200px)] flex bg-white rounded-lg shadow-sm border">
          {/* Sidebar */}
          <div className="w-64 border-r border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <Button 
                onClick={() => setComposeMode(true)}
                className="w-full bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Compose
              </Button>
            </div>

            <nav className="flex-1 p-4">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setCurrentView('inbox')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      currentView === 'inbox' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Inbox className="w-5 h-5" />
                    <span>Inbox</span>
                    <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {emails.filter(e => !e.isSent && !e.isDraft).length}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('sent')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      currentView === 'sent' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Send className="w-5 h-5" />
                    <span>Sent</span>
                    <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {emails.filter(e => e.isSent).length}
                    </span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setCurrentView('drafts')}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      currentView === 'drafts' ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Edit3 className="w-5 h-5" />
                    <span>Drafts</span>
                    <span className="ml-auto text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      {emails.filter(e => e.isDraft).length}
                    </span>
                  </button>
                </li>
              </ul>
            </nav>
          </div>

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col">
            {/* Content Header */}
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {currentView === 'inbox' && 'Inbox'}
                {currentView === 'sent' && 'Sent'}
                {currentView === 'drafts' && 'Drafts'}
              </h2>
            </div>

            {/* Content Area */}
            <div className="flex-1 flex">
              {composeMode ? (
                /* Compose Email */
                <div className="flex-1 p-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between">
                        <span>New Message</span>
                        <div className="flex items-center space-x-2">
                          <Button variant="outline" size="sm" onClick={saveAsDraft}>
                            Save Draft
                          </Button>
                          <Button variant="ghost" size="sm" onClick={() => setComposeMode(false)}>
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {/* To Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">To *</label>
                        <Input
                          placeholder="recipient@example.com"
                          value={composeEmail.to}
                          onChange={(e) => setComposeEmail(prev => ({ ...prev, to: e.target.value }))}
                          className="w-full"
                        />
                      </div>

                      {/* Subject Field */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject *</label>
                        <Input
                          placeholder="Email subject"
                          value={composeEmail.subject}
                          onChange={(e) => setComposeEmail(prev => ({ ...prev, subject: e.target.value }))}
                          className="w-full"
                        />
                      </div>

                      {/* Attachments */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="block text-sm font-medium text-gray-700">Attachments</label>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => fileInputRef.current?.click()}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Paperclip className="w-4 h-4 mr-1" />
                            Add Files
                          </Button>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          multiple
                          onChange={handleFileAttachment}
                          className="hidden"
                        />
                        {composeEmail.attachments.length > 0 && (
                          <div className="space-y-2">
                            {composeEmail.attachments.map((file, index) => (
                              <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded-md">
                                <span className="text-sm text-gray-600">{file.name}</span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => removeAttachment(index)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Message Body */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                        <textarea
                          value={composeEmail.body}
                          onChange={(e) => setComposeEmail(prev => ({ ...prev, body: e.target.value }))}
                          placeholder="Type your message here..."
                          className="w-full h-64 p-3 border border-gray-300 rounded-md resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>

                      {/* Send Button */}
                      <div className="flex justify-end">
                        <Button onClick={sendEmail} className="bg-blue-600 hover:bg-blue-700">
                          <Send className="w-4 h-4 mr-2" />
                          Send Email
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ) : (
                /* Email List */
                <div className="flex-1">
                  {filteredEmails.length === 0 ? (
                    <div className="flex items-center justify-center h-full">
                      <div className="text-center">
                        <Mail className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                          {currentView === 'inbox' && 'No emails in inbox'}
                          {currentView === 'sent' && 'No sent emails'}
                          {currentView === 'drafts' && 'No draft emails'}
                        </h3>
                        <p className="text-gray-500">
                          {currentView === 'inbox' && 'Emails you receive will appear here'}
                          {currentView === 'sent' && 'Emails you send will appear here'}
                          {currentView === 'drafts' && 'Saved drafts will appear here'}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="divide-y divide-gray-200">
                      {filteredEmails.map((email) => (
                        <div
                          key={email.id}
                          className="p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex-1 min-w-0">
                              <span className="font-medium text-gray-900 truncate">
                                {email.isDraft ? 'Draft: ' : ''}{email.subject || 'No Subject'}
                              </span>
                              <p className="text-sm text-gray-600 truncate mt-1">
                                {email.isDraft ? 'Draft' : email.to.join(', ')}
                              </p>
                            </div>
                            <div className="text-xs text-gray-400 ml-4">
                              {new Date(email.createdAt).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
