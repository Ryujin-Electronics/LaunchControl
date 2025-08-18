export default function SimpleEmailPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Simple Email Page</h1>
      <p>This is a basic test page without any hooks or complex logic.</p>
      <p>If you can see this, the basic routing is working.</p>
      
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
