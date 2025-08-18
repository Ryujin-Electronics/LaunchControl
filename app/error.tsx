'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { RefreshCw, Home, AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application error:', error)
  }, [error])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-8">
          <div className="w-24 h-24 bg-red-600 rounded-lg flex items-center justify-center mx-auto mb-4 shadow-lg">
            <AlertTriangle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Something went wrong!</h1>
          <p className="text-gray-600 mb-4">
            We encountered an unexpected error. Please try again or contact support if the problem persists.
          </p>
          {process.env.NODE_ENV === 'development' && (
            <details className="text-left bg-white rounded-lg p-4 shadow-md border border-gray-200">
              <summary className="cursor-pointer font-medium text-gray-700 mb-2">
                Error Details (Development)
              </summary>
              <pre className="text-xs text-red-600 bg-red-50 p-2 rounded overflow-auto">
                {error.message}
              </pre>
            </details>
          )}
        </div>

        {/* Action Buttons */}
        <div className="space-y-4 mb-8">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            Try Again
          </button>
          
          <Link 
            href="/dashboard"
            className="inline-flex items-center justify-center w-full px-6 py-3 bg-gray-700 hover:bg-gray-800 text-white font-medium rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg"
          >
            <Home className="w-5 h-5 mr-2" />
            Go to Dashboard
          </Link>
        </div>

        {/* Contact Info */}
        <div className="bg-white rounded-lg p-6 shadow-md border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Need immediate assistance?</h3>
          <div className="space-y-2 text-sm">
            <p className="text-gray-600">
              If this error continues, please contact our technical support team:
            </p>
            <div className="text-center">
              <p className="font-medium text-blue-600">support@ryujinelectronics.com.au</p>
              <p className="text-gray-500">+61 2 6123 4567</p>
            </div>
          </div>
        </div>

        {/* Error ID for Support */}
        {error.digest && (
          <div className="mt-4 text-xs text-gray-500">
            <p>Error ID: {error.digest}</p>
            <p>Please include this ID when contacting support</p>
          </div>
        )}
      </div>
    </div>
  )
}
