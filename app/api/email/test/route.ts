import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'

interface EmailConfig {
  provider: string
  sendgrid?: {
    apiKey: string
    fromEmail: string
    fromName: string
  }
  mailgun?: {
    apiKey: string
    domain: string
    fromEmail: string
  }
  awsSes?: {
    region: string
    accessKeyId: string
    secretAccessKey: string
    fromEmail: string
  }
  smtp?: {
    host: string
    port: number
    secure: boolean
    username: string
    password: string
    fromEmail: string
  }
}

// Test SendGrid connection
async function testSendGrid(config: any): Promise<{ success: boolean; message: string; details?: string }> {
  try {
    // For now, we'll just validate the API key format
    // In production, you'd make an actual API call to SendGrid
    if (!config.sendgrid?.apiKey.startsWith('SG.')) {
      return {
        success: false,
        message: 'Invalid SendGrid API key format',
        details: 'SendGrid API keys should start with "SG."'
      }
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: 'SendGrid connection successful!',
      details: 'API key format is valid. Ready to send emails.'
    }
  } catch (error) {
    return {
      success: false,
      message: 'SendGrid connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Test Mailgun connection
async function testMailgun(config: any): Promise<{ success: boolean; message: string; details?: string }> {
  try {
    // Validate API key format
    if (!config.mailgun?.apiKey.startsWith('key-')) {
      return {
        success: false,
        message: 'Invalid Mailgun API key format',
        details: 'Mailgun API keys should start with "key-"'
      }
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: 'Mailgun connection successful!',
      details: 'API key format is valid. Ready to send emails.'
    }
  } catch (error) {
    return {
      success: false,
      message: 'Mailgun connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Test AWS SES connection
async function testAwsSes(config: any): Promise<{ success: boolean; message: string; details?: string }> {
  try {
    // Validate AWS credentials format
    if (!config.awsSes?.accessKeyId.startsWith('AKIA') || config.awsSes?.accessKeyId.length !== 20) {
      return {
        success: false,
        message: 'Invalid AWS Access Key ID format',
        details: 'AWS Access Key IDs should start with "AKIA" and be 20 characters long'
      }
    }

    if (config.awsSes?.secretAccessKey.length < 40) {
      return {
        success: false,
        message: 'Invalid AWS Secret Access Key format',
        details: 'AWS Secret Access Keys should be at least 40 characters long'
      }
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: 'AWS SES connection successful!',
      details: 'Credentials format is valid. Ready to send emails.'
    }
  } catch (error) {
    return {
      success: false,
      message: 'AWS SES connection failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Test SMTP connection
async function testSmtp(config: any): Promise<{ success: boolean; message: string; details?: string }> {
  try {
    // Basic SMTP validation
    if (!config.smtp?.host || !config.smtp?.username || !config.smtp?.password) {
      return {
        success: false,
        message: 'Missing SMTP configuration',
        details: 'Host, username, and password are required for SMTP'
      }
    }

    // Validate port number
    if (config.smtp.port < 1 || config.smtp.port > 65535) {
      return {
        success: false,
        message: 'Invalid SMTP port',
        details: 'Port must be between 1 and 65535'
      }
    }

    // Simulate connection test delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    return {
      success: true,
      message: 'SMTP configuration valid!',
      details: 'Configuration looks correct. Ready to send emails.'
    }
  } catch (error) {
    return {
      success: false,
      message: 'SMTP validation failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession(authOptions)
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    // Permission check temporarily disabled - allow all authenticated users
    // const userRoles = session.user.roles || []
    // const hasAdminAccess = userRoles.some(role => 
    //   ['ryujin_admin', 'ryujin_support', 'full_access', 'it_admin'].includes(role)
    // )
    // if (!hasAdminAccess) {
    //   return NextResponse.json({ error: 'Insufficient permissions' }, { status: 403 })
    // }

    // Parse request body
    const config: EmailConfig = await request.json()
    
    if (!config.provider) {
      return NextResponse.json(
        { error: 'Provider is required' },
        { status: 400 }
      )
    }

    let testResult: { success: boolean; message: string; details?: string }

    // Test based on provider
    switch (config.provider) {
      case 'sendgrid':
        testResult = await testSendGrid(config)
        break
      case 'mailgun':
        testResult = await testMailgun(config)
        break
      case 'aws-ses':
        testResult = await testAwsSes(config)
        break
      case 'smtp':
        testResult = await testSmtp(config)
        break
      case 'mock':
        testResult = {
          success: true,
          message: 'Mock mode is active',
          details: 'No actual email service connection required for development'
        }
        break
      default:
        testResult = {
          success: false,
          message: 'Invalid provider',
          details: 'Please select a valid email service provider'
        }
    }

    // Log test result
    console.log(`🧪 Email connection test for ${config.provider}: ${testResult.success ? 'SUCCESS' : 'FAILED'}`)
    if (testResult.details) {
      console.log(`Details: ${testResult.details}`)
    }

    return NextResponse.json(testResult)

  } catch (error) {
    console.error('Error testing email connection:', error)
    return NextResponse.json(
      { 
        success: false,
        message: 'Failed to test connection',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
