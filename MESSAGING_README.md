# Internal Staff Messaging System

## Overview

The LaunchControl internal staff messaging system provides a comprehensive chat platform for Ryujin Electronics staff members, featuring iMessage-like functionality with support for text, images, videos, files, and group conversations.

## Features

### 🚀 Core Messaging
- **Real-time Chat**: Instant messaging between staff members
- **Media Support**: Send images, videos, and files
- **Conversation Types**: Direct messages and group chats
- **Message History**: Persistent chat history with search
- **Edit & Delete**: Edit your own messages or delete them

### 👥 User Management
- **Staff Directory**: Search and find colleagues by name, email, or job title
- **Role-based Access**: Different permissions for admins and support staff
- **Organization Structure**: Clear hierarchy and team organization

### 🔒 Security & Privacy
- **Authentication Required**: Only authenticated staff can access
- **Organization Isolation**: Users can only see staff from their organization
- **Message Privacy**: Messages are private to conversation participants

## Getting Started

### 1. Access the Messaging System

1. Navigate to `/dashboard/messaging` in your browser
2. Ensure you're logged in as a Ryujin staff member
3. The system will automatically load your conversations

### 2. Start a New Conversation

1. Click the **"+"** button in the conversations sidebar
2. Choose conversation type:
   - **Direct Message**: One-on-one chat with a colleague
   - **Group Chat**: Multi-person conversation with a custom name
3. Search for users by typing their name, email, or job title
4. Select participants and click **"Create Conversation"**

### 3. Send Messages

1. **Text Messages**: Type in the input field and press Enter or click Send
2. **Media Files**: Click the attachment icon (📎) to upload:
   - Images (JPG, PNG, GIF)
   - Videos (MP4, MOV, AVI)
   - Documents (PDF, DOC, TXT)
3. **Quick Actions**: Use keyboard shortcuts for faster messaging

## Admin User Switcher

### Purpose
The Admin User Switcher allows you to quickly switch between different admin accounts for testing purposes without logging out and back in.

### Available Test Accounts

| Name | Email | Role | Description |
|------|-------|------|-------------|
| **Alex Chen** | alex.chen@ryujin.com | System Admin | Full system administrator |
| **Sarah Mitchell** | sarah.mitchell@ryujin.com | Support Staff | Support team lead |
| **David Park** | david.park@ryujin.com | System Admin | Technical director |
| **Emma Rodriguez** | emma.rodriguez@ryujin.com | Support Staff | Client relations specialist |
| **Michael Thompson** | michael.thompson@ryujin.com | System Admin | Operations manager |

### How to Use
1. Look for the **Admin User Switcher** in the top-right header
2. Click on your current user profile
3. Select a different admin account from the dropdown
4. The system will automatically switch to that user's session
5. **Default password for all accounts**: `admin123`

## API Endpoints

### Conversations
- `GET /api/messaging/conversations` - List user's conversations
- `POST /api/messaging/conversations` - Create new conversation

### Messages
- `GET /api/messaging/messages?conversationId=X` - Get messages for conversation
- `POST /api/messaging/messages` - Send new message
- `PUT /api/messaging/messages` - Edit existing message
- `DELETE /api/messaging/messages?messageId=X` - Delete message

### Users
- `GET /api/messaging/users?search=X` - Search for users to message

## Database Schema

### Core Tables
- **Conversation**: Chat sessions (direct or group)
- **ConversationParticipant**: Users in each conversation
- **InternalMessage**: Individual messages with media support
- **User**: Staff member profiles and roles
- **Organization**: Company structure (Ryujin Electronics)

### Key Relationships
- Users can participate in multiple conversations
- Messages are linked to conversations and senders
- Conversations track their last message for previews
- Soft deletion preserves message history

## Technical Implementation

### Frontend
- **React Hooks**: State management with useState and useEffect
- **Real-time Updates**: Automatic conversation and message refresh
- **Responsive Design**: Works on desktop and mobile devices
- **TypeScript**: Full type safety for all components

### Backend
- **Next.js API Routes**: RESTful endpoints for messaging
- **Prisma ORM**: Database operations and relationships
- **Authentication**: NextAuth.js integration with role-based access
- **File Handling**: Support for various media types

### Security Features
- **Session Validation**: All API calls require valid authentication
- **Permission Checks**: Users can only access their conversations
- **Input Sanitization**: Protection against malicious content
- **Rate Limiting**: Prevents spam and abuse

## Usage Examples

### Starting a Support Team Chat
1. Create a new group conversation named "Support Team"
2. Add all support staff members
3. Use for coordinating client support efforts
4. Share screenshots and documents

### Direct Technical Discussion
1. Start a direct message with a colleague
2. Share code snippets and technical details
3. Upload relevant files and images
4. Keep focused technical conversations organized

### Project Coordination
1. Create group chats for specific projects
2. Add relevant team members
3. Share progress updates and files
4. Coordinate meetings and deadlines

## Troubleshooting

### Common Issues

**Can't see other users?**
- Ensure you're logged in as a Ryujin staff member
- Check that users have active accounts
- Verify organization permissions

**Messages not sending?**
- Check your internet connection
- Ensure you're a participant in the conversation
- Try refreshing the page

**Media not uploading?**
- Check file size limits
- Ensure file type is supported
- Try a different browser or device

### Getting Help
- Check the browser console for error messages
- Verify your user role and permissions
- Contact system administrators for technical issues

## Future Enhancements

### Planned Features
- **Real-time Notifications**: Push notifications for new messages
- **Message Reactions**: Like, heart, and emoji reactions
- **Threaded Replies**: Reply to specific messages
- **Message Search**: Search through conversation history
- **Voice Messages**: Audio recording and playback
- **Screen Sharing**: Built-in screen sharing for support

### Integration Possibilities
- **Slack Integration**: Sync with existing Slack workspaces
- **Email Notifications**: Get email summaries of conversations
- **Calendar Integration**: Schedule meetings from chat
- **Task Management**: Create tasks from messages
- **Analytics Dashboard**: Message and conversation insights

## Support

For technical support or questions about the messaging system:
- **Email**: admin@ryujin.com
- **Internal Chat**: Use the messaging system itself
- **Documentation**: Check this README and system help

---

**Note**: This messaging system is designed for internal Ryujin Electronics staff use only. All conversations are logged and monitored for security and compliance purposes.

