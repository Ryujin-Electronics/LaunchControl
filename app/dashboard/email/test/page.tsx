'use client'

import { useSession } from 'next-auth/react'

export default function EmailTestPage() {
  const { data: session, status } = useSession()

  if (status === 'loading') {
    return <div>Loading session...</div>
  }

  if (status === 'unauthenticated') {
    return <div>Not authenticated</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Email System Test</h1>
      <p>Status: {status}</p>
      <p>User: {session?.user?.email || 'No user'}</p>
      <p>Roles: {session?.user?.roles?.join(', ') || 'No roles'}</p>
      
      <div className="mt-4">
        <h2 className="text-lg font-semibold mb-2">Test Links:</h2>
        <ul className="space-y-2">
          <li><a href="/dashboard/email" className="text-blue-600 hover:underline">Main Email Page</a></li>
          <li><a href="/dashboard/email/setup" className="text-blue-600 hover:underline">Email Setup</a></li>
          <li><a href="/dashboard" className="text-blue-600 hover:underline">Dashboard</a></li>
        </ul>
      </div>
    </div>
  )
}
