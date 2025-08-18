import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { authOptions } from '@/lib/auth-config'
import fs from 'fs'
import path from 'path'

const CONFIG_FILE_PATH = path.join(process.cwd(), 'data', 'email-config.json')

// Ensure data directory exists
const ensureDataDir = () => {
  const dataDir = path.dirname(CONFIG_FILE_PATH)
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true })
  }
}

// Load configuration from file
const loadConfig = () => {
  try {
    ensureDataDir()
    if (fs.existsSync(CONFIG_FILE_PATH)) {
      const configData = fs.readFileSync(CONFIG_FILE_PATH, 'utf8')
      return JSON.parse(configData)
    }
  } catch (error) {
    console.error('Error loading email config:', error)
  }
  
  // Return default configuration
  return {
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
      host: '',
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
  }
}

// Save configuration to file
const saveConfig = (config: any) => {
  try {
    ensureDataDir()
    fs.writeFileSync(CONFIG_FILE_PATH, JSON.stringify(config, null, 2))
    return true
  } catch (error) {
    console.error('Error saving email config:', error)
    return false
  }
}

export async function GET() {
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

    const config = loadConfig()
    return NextResponse.json(config)

  } catch (error) {
    console.error('Error getting email config:', error)
    return NextResponse.json(
      { error: 'Failed to load configuration' },
      { status: 500 }
    )
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
    const config = await request.json()
    
    // Validate configuration
    if (!config.provider) {
      return NextResponse.json(
        { error: 'Provider is required' },
        { status: 400 }
      )
    }

    // Validate provider-specific required fields
    let validationError = null
    
    switch (config.provider) {
      case 'sendgrid':
        if (!config.sendgrid?.apiKey || !config.sendgrid?.fromEmail) {
          validationError = 'SendGrid requires API Key and From Email'
        }
        break
      case 'mailgun':
        if (!config.mailgun?.apiKey || !config.mailgun?.domain || !config.mailgun?.fromEmail) {
          validationError = 'Mailgun requires API Key, Domain, and From Email'
        }
        break
      case 'aws-ses':
        if (!config.awsSes?.accessKeyId || !config.awsSes?.secretAccessKey || !config.awsSes?.fromEmail) {
          validationError = 'AWS SES requires Access Key ID, Secret Access Key, and From Email'
        }
        break
      case 'smtp':
        if (!config.smtp?.host || !config.smtp?.username || !config.smtp?.password || !config.smtp?.fromEmail) {
          validationError = 'SMTP requires Host, Username, Password, and From Email'
        }
        break
      case 'mock':
        // Mock mode doesn't require additional validation
        break
      default:
        validationError = 'Invalid provider selected'
    }

    if (validationError) {
      return NextResponse.json(
        { error: validationError },
        { status: 400 }
      )
    }

    // Save configuration
    const success = saveConfig(config)
    
    if (success) {
      console.log(`✅ Email configuration saved successfully by user ${session.user.email}`)
      return NextResponse.json({
        success: true,
        message: 'Configuration saved successfully'
      })
    } else {
      return NextResponse.json(
        { error: 'Failed to save configuration' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error saving email config:', error)
    return NextResponse.json(
      { error: 'Failed to save configuration' },
      { status: 500 }
    )
  }
}
