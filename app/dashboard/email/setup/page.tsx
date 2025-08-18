'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Mail, 
  Send, 
  CheckCircle, 
  XCircle, 
  AlertTriangle,
  Settings,
  TestTube,
  Save,
  RefreshCw,
  Eye,
  EyeOff,
  ExternalLink,
  Info
} from 'lucide-react'

interface EmailConfig {
  provider: 'sendgrid' | 'mailgun' | 'aws-ses' | 'smtp' | 'mock'
  sendgrid: {
    apiKey: string
    fromEmail: string
    fromName: string
  }
  mailgun: {
    apiKey: string
    domain: string
    fromEmail: string
  }
  awsSes: {
    region: string
    accessKeyId: string
    secretAccessKey: string
    fromEmail: string
  }
  smtp: {
    host: string
    port: number
    secure: boolean
    username: string
    password: string
    fromEmail: string
  }
  company: {
    name: string
    address: string
    phone: string
    website: string
  }
  rateLimit: {
    maxEmailsPerHour: number
    maxEmailsPerDay: number
  }
}

interface TestResult {
  success: boolean
  message: string
  details?: string
}

export default function EmailSetupPage() {
  const { data: session } = useSession()
  const [config, setConfig] = useState<EmailConfig>({
    provider: 'smtp', // Default to SMTP since that's what you'll use
    sendgrid: {
      apiKey: '',
      fromEmail: '',
      fromName: ''
    },
    mailgun: {
      apiKey: '',
      domain: '',
      fromEmail: ''
    },
    awsSes: {
      region: 'us-east-1',
      accessKeyId: '',
      secretAccessKey: '',
      fromEmail: ''
    },
    smtp: {
      host: 'smtp.gmail.com', // Default Gmail SMTP
      port: 587,
      secure: false,
      username: '',
      password: '',
      fromEmail: ''
    },
    company: {
      name: 'Ryujin Electronics',
      address: '123 Tech Street, Canberra ACT 2600',
      phone: '+61 2 6123 4567',
      website: 'www.ryujinelectronics.com.au'
    },
    rateLimit: {
      maxEmailsPerHour: 100,
      maxEmailsPerDay: 1000
    }
  })

  const [showPasswords, setShowPasswords] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [testResult, setTestResult] = useState<TestResult | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  // Load current configuration
  useEffect(() => {
    loadCurrentConfig()
  }, [])

  const loadCurrentConfig = async () => {
    try {
      const response = await fetch('/api/email/config')
      if (response.ok) {
        const currentConfig = await response.json()
        setConfig(currentConfig)
      }
    } catch (error) {
      console.log('No existing config found, using defaults')
    }
  }

  const updateConfig = (section: keyof EmailConfig, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }))
  }

  const updateNestedConfig = (section: keyof EmailConfig, subsection: string, field: string, value: any) => {
    setConfig(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }))
  }

  const testConnection = async () => {
    setIsLoading(true)
    setTestResult(null)

    try {
      const response = await fetch('/api/email/test', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })

      const result = await response.json()
      setTestResult(result)
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to test connection',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsLoading(false)
    }
  }

  const saveConfiguration = async () => {
    setIsSaving(true)

    try {
      const response = await fetch('/api/email/config', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config)
      })

      if (response.ok) {
        setTestResult({
          success: true,
          message: 'Configuration saved successfully!'
        })
      } else {
        const error = await response.json()
        setTestResult({
          success: false,
          message: 'Failed to save configuration',
          details: error.error
        })
      }
    } catch (error) {
      setTestResult({
        success: false,
        message: 'Failed to save configuration',
        details: error instanceof Error ? error.message : 'Unknown error'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const getProviderDocs = () => {
    switch (config.provider) {
      case 'sendgrid':
        return 'https://sendgrid.com/docs/for-developers/sending-email/api-getting-started/'
      case 'mailgun':
        return 'https://documentation.mailgun.com/en/latest/quickstart-sending.html'
      case 'aws-ses':
        return 'https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-api.html'
      case 'smtp':
        return 'https://nodemailer.com/smtp/'
      default:
        return '#'
    }
  }

  const getProviderSetupSteps = () => {
    switch (config.provider) {
      case 'sendgrid':
        return [
          'Sign up at sendgrid.com',
          'Get API Key from your dashboard',
          'Verify your domain for better deliverability'
        ]
      case 'mailgun':
        return [
          'Sign up at mailgun.com',
          'Get API Key from your dashboard',
          'Verify your domain'
        ]
      case 'aws-ses':
        return [
          'Set up AWS account and enable SES',
          'Verify your domain in SES',
          'Create IAM user with SES permissions'
        ]
      case 'smtp':
        return [
          'Enable 2FA on your email account',
          'Generate app password (for Gmail)',
          'Use your email provider\'s SMTP settings'
        ]
      default:
        return []
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Email System Setup</h1>
        <p className="text-gray-600">Configure your email service provider and company settings</p>
        
        {/* SMTP Setup Note */}
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div className="text-sm text-blue-800 text-left">
              <p className="font-medium mb-2">SMTP Setup (Recommended for Gmail/Outlook):</p>
              <ol className="list-decimal list-inside space-y-1">
                <li>Enable 2-Factor Authentication on your email account</li>
                <li>Generate an App Password (for Gmail: Settings → Security → App Passwords)</li>
                <li>Use your email as username and the app password as password</li>
                <li>Test the connection before saving</li>
              </ol>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Selection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Mail className="w-5 h-5 mr-2" />
            Email Service Provider
          </CardTitle>
          <CardDescription>
            Choose your email service provider. Each has different setup requirements and pricing.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { value: 'sendgrid', label: 'SendGrid', description: 'Popular, reliable', color: 'bg-blue-50 border-blue-200' },
              { value: 'mailgun', label: 'Mailgun', description: 'Developer friendly', color: 'bg-purple-50 border-purple-200' },
              { value: 'aws-ses', label: 'AWS SES', description: 'Cost effective', color: 'bg-orange-50 border-orange-200' },
              { value: 'smtp', label: 'SMTP', description: 'Use existing email', color: 'bg-green-50 border-green-200' },
              { value: 'mock', label: 'Mock', description: 'Development only', color: 'bg-gray-50 border-gray-200' }
            ].map((provider) => (
              <button
                key={provider.value}
                onClick={() => setConfig(prev => ({ ...prev, provider: provider.value as any }))}
                className={`p-4 rounded-lg border-2 transition-all ${
                  config.provider === provider.value
                    ? `${provider.color} border-current`
                    : 'bg-white border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <div className="font-medium text-gray-900">{provider.label}</div>
                  <div className="text-sm text-gray-600">{provider.description}</div>
                </div>
              </button>
            ))}
          </div>

          {/* Provider-specific setup steps */}
          {config.provider !== 'mock' && (
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900 mb-2">Setup Steps:</h4>
              <ol className="list-decimal list-inside space-y-1 text-sm text-blue-800">
                {getProviderSetupSteps().map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
              <div className="mt-3">
                <a
                  href={getProviderDocs()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 text-sm"
                >
                  View Documentation <ExternalLink className="w-4 h-4 ml-1" />
                </a>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Provider Configuration */}
      {config.provider === 'sendgrid' && (
        <Card>
          <CardHeader>
            <CardTitle>SendGrid Configuration</CardTitle>
            <CardDescription>Enter your SendGrid API credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key *</label>
              <Input
                type={showPasswords ? 'text' : 'password'}
                placeholder="SG.xxxxxxxxxxxxxxxxxxxxx"
                value={config.sendgrid.apiKey}
                onChange={(e) => updateConfig('sendgrid', 'apiKey', e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Email *</label>
                <Input
                  type="email"
                  placeholder="noreply@ryujin.com.au"
                  value={config.sendgrid.fromEmail}
                  onChange={(e) => updateConfig('sendgrid', 'fromEmail', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Name</label>
                <Input
                  placeholder="Ryujin Electronics"
                  value={config.sendgrid.fromName}
                  onChange={(e) => updateConfig('sendgrid', 'fromName', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {config.provider === 'mailgun' && (
        <Card>
          <CardHeader>
            <CardTitle>Mailgun Configuration</CardTitle>
            <CardDescription>Enter your Mailgun API credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">API Key *</label>
              <Input
                type={showPasswords ? 'text' : 'password'}
                placeholder="key-xxxxxxxxxxxxxxxxxxxxx"
                value={config.mailgun.apiKey}
                onChange={(e) => updateConfig('mailgun', 'apiKey', e.target.value)}
                className="font-mono"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Domain *</label>
                <Input
                  placeholder="yourdomain.com"
                  value={config.mailgun.domain}
                  onChange={(e) => updateConfig('mailgun', 'domain', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Email *</label>
                <Input
                  type="email"
                  placeholder="noreply@ryujin.com.au"
                  value={config.mailgun.fromEmail}
                  onChange={(e) => updateConfig('mailgun', 'fromEmail', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {config.provider === 'aws-ses' && (
        <Card>
          <CardHeader>
            <CardTitle>AWS SES Configuration</CardTitle>
            <CardDescription>Enter your AWS SES credentials</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Region *</label>
                <Input
                  placeholder="us-east-1"
                  value={config.awsSes.region}
                  onChange={(e) => updateConfig('awsSes', 'region', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From Email *</label>
                <Input
                  type="email"
                  placeholder="noreply@ryujin.com.au"
                  value={config.awsSes.fromEmail}
                  onChange={(e) => updateConfig('awsSes', 'fromEmail', e.target.value)}
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Access Key ID *</label>
                <Input
                  type={showPasswords ? 'text' : 'password'}
                  placeholder="AKIAXXXXXXXXXXXXXXXX"
                  value={config.awsSes.accessKeyId}
                  onChange={(e) => updateConfig('awsSes', 'accessKeyId', e.target.value)}
                  className="font-mono"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Secret Access Key *</label>
                <Input
                  type={showPasswords ? 'text' : 'password'}
                  placeholder="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
                  value={config.awsSes.secretAccessKey}
                  onChange={(e) => updateConfig('awsSes', 'secretAccessKey', e.target.value)}
                  className="font-mono"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {config.provider === 'smtp' && (
        <Card>
          <CardHeader>
            <CardTitle>SMTP Configuration</CardTitle>
            <CardDescription>Enter your SMTP server details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Host *</label>
                <Input
                  placeholder="smtp.gmail.com"
                  value={config.smtp.host}
                  onChange={(e) => updateConfig('smtp', 'host', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Port *</label>
                <Input
                  type="number"
                  placeholder="587"
                  value={config.smtp.port}
                  onChange={(e) => updateConfig('smtp', 'port', parseInt(e.target.value))}
                />
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="secure"
                  checked={config.smtp.secure}
                  onChange={(e) => updateConfig('smtp', 'secure', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <label htmlFor="secure" className="text-sm font-medium text-gray-700">
                  Use SSL/TLS
                </label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Username *</label>
                <Input
                  type="email"
                  placeholder="your_email@gmail.com"
                  value={config.smtp.username}
                  onChange={(e) => updateConfig('smtp', 'username', e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password *</label>
                <Input
                  type={showPasswords ? 'text' : 'password'}
                  placeholder="your_app_password"
                  value={config.smtp.password}
                  onChange={(e) => updateConfig('smtp', 'password', e.target.value)}
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">From Email *</label>
              <Input
                type="email"
                placeholder="your_email@gmail.com"
                value={config.smtp.fromEmail}
                onChange={(e) => updateConfig('smtp', 'fromEmail', e.target.value)}
              />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>Company Information</CardTitle>
          <CardDescription>These details will be used in email signatures and templates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name</label>
              <Input
                placeholder="Ryujin Electronics"
                value={config.company.name}
                onChange={(e) => updateConfig('company', 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
              <Input
                placeholder="+61 2 6123 4567"
                value={config.company.phone}
                onChange={(e) => updateConfig('company', 'phone', e.target.value)}
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
            <Input
              placeholder="123 Tech Street, Canberra ACT 2600"
              value={config.company.address}
              onChange={(e) => updateConfig('company', 'address', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
            <Input
              placeholder="www.ryujinelectronics.com.au"
              value={config.company.website}
              onChange={(e) => updateConfig('company', 'website', e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      {/* Rate Limiting */}
      <Card>
        <CardHeader>
          <CardTitle>Rate Limiting</CardTitle>
          <CardDescription>Set limits to prevent email abuse</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Emails per Hour</label>
              <Input
                type="number"
                placeholder="100"
                value={config.rateLimit.maxEmailsPerHour}
                onChange={(e) => updateConfig('rateLimit', 'maxEmailsPerHour', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Max Emails per Day</label>
              <Input
                type="number"
                placeholder="1000"
                value={config.rateLimit.maxEmailsPerDay}
                onChange={(e) => updateConfig('rateLimit', 'maxEmailsPerDay', parseInt(e.target.value))}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Password Visibility Toggle */}
      <div className="flex items-center justify-center">
        <Button
          variant="outline"
          onClick={() => setShowPasswords(!showPasswords)}
          className="flex items-center space-x-2"
        >
          {showPasswords ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
          <span>{showPasswords ? 'Hide' : 'Show'} Passwords</span>
        </Button>
      </div>

      {/* Test Connection */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TestTube className="w-5 h-5 mr-2" />
            Test Connection
          </CardTitle>
          <CardDescription>
            Test your email configuration to ensure everything is working correctly
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4">
            <Button
              onClick={testConnection}
              disabled={isLoading || config.provider === 'mock'}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4 mr-2" />
                  Test Connection
                </>
              )}
            </Button>
            {config.provider === 'mock' && (
              <div className="flex items-center text-gray-500">
                <Info className="w-4 h-4 mr-2" />
                <span className="text-sm">Mock mode doesn't require testing</span>
              </div>
            )}
          </div>

          {/* Test Results */}
          {testResult && (
            <div className={`mt-4 p-4 rounded-lg ${
              testResult.success 
                ? 'bg-green-50 border border-green-200' 
                : 'bg-red-50 border border-red-200'
            }`}>
              <div className="flex items-center">
                {testResult.success ? (
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-600 mr-2" />
                )}
                <span className={`font-medium ${
                  testResult.success ? 'text-green-800' : 'text-red-800'
                }`}>
                  {testResult.message}
                </span>
              </div>
              {testResult.details && (
                <p className={`mt-2 text-sm ${
                  testResult.success ? 'text-green-700' : 'text-red-700'
                }`}>
                  {testResult.details}
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex justify-center space-x-4">
        <Button
          onClick={saveConfiguration}
          disabled={isSaving}
          className="bg-green-600 hover:bg-green-700"
        >
          {isSaving ? (
            <>
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Save Configuration
            </>
          )}
        </Button>
        <Button
          variant="outline"
          onClick={() => window.location.href = '/dashboard/email'}
        >
          <Mail className="w-4 h-4 mr-2" />
          Go to Email
        </Button>
      </div>

      {/* Info Box */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="pt-6">
          <div className="flex items-start">
            <Info className="w-5 h-5 text-blue-600 mr-3 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="font-medium mb-2">Configuration Notes:</p>
              <ul className="list-disc list-inside space-y-1">
                <li>Configuration is saved locally and will persist between sessions</li>
                <li>Test your connection before sending emails to production</li>
                <li>For production use, consider using environment variables for sensitive data</li>
                <li>Mock mode is perfect for development and testing</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
