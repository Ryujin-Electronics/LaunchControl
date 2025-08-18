import Link from 'next/link'
import { Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600">
            The page you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <Link 
            href="/dashboard"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Link>
          
          <Link 
            href="/"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Home
          </Link>
        </div>

        {/* Helpful Links */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Looking for something specific?</h3>
          <div className="space-y-3 text-left">
            <Link 
              href="/dashboard/messaging"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Internal Messaging
            </Link>
            <Link 
              href="/dashboard/support"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Support Tickets
            </Link>
            <Link 
              href="/dashboard/control"
              className="flex items-center text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <Search className="w-4 h-4 mr-2" />
              Device Management
            </Link>
          </div>
        </div>

        {/* Contact Info */}
        <div className="mt-8 text-sm text-gray-500">
          <p>Need help? Contact our support team</p>
          <p className="font-medium text-gray-700">support@ryujinelectronics.com.au</p>
        </div>
      </div>
    </div>
  )
}

