// Email service configuration
export const EMAIL_CONFIG = {
  // Choose your email service provider
  provider: process.env.EMAIL_PROVIDER || 'mock', // 'sendgrid', 'mailgun', 'aws-ses', 'smtp', 'mock'
  
  // SendGrid configuration
  sendgrid: {
    apiKey: process.env.SENDGRID_API_KEY || '',
    fromEmail: process.env.FROM_EMAIL || 'noreply@ryujin.com.au',
    fromName: process.env.FROM_NAME || 'Ryujin Electronics'
  },
  
  // Mailgun configuration
  mailgun: {
    apiKey: process.env.MAILGUN_API_KEY || '',
    domain: process.env.MAILGUN_DOMAIN || '',
    fromEmail: process.env.FROM_EMAIL || 'noreply@ryujin.com.au'
  },
  
  // AWS SES configuration
  awsSes: {
    region: process.env.AWS_REGION || 'us-east-1',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || '',
    fromEmail: process.env.FROM_EMAIL || 'noreply@ryujin.com.au'
  },
  
  // SMTP configuration
  smtp: {
    host: process.env.SMTP_HOST || '',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    username: process.env.SMTP_USERNAME || '',
    password: process.env.SMTP_PASSWORD || '',
    fromEmail: process.env.FROM_EMAIL || 'noreply@ryujin.com.au'
  },
  
  // Rate limiting
  rateLimit: {
    maxEmailsPerHour: parseInt(process.env.MAX_EMAILS_PER_HOUR || '100'),
    maxEmailsPerDay: parseInt(process.env.MAX_EMAILS_PER_DAY || '1000')
  },
  
  // Email templates
  templates: {
    defaultSignature: process.env.DEFAULT_EMAIL_SIGNATURE || `
Best regards,
${process.env.COMPANY_NAME || 'Ryujin Electronics Team'}

${process.env.COMPANY_ADDRESS || '123 Tech Street, Canberra ACT 2600'}
${process.env.COMPANY_PHONE || '+61 2 6123 4567'}
${process.env.COMPANY_WEBSITE || 'www.ryujinelectronics.com.au'}
    `.trim()
  }
}

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Email sanitization
export const sanitizeEmail = (email: string): string => {
  return email.trim().toLowerCase()
}

// Rate limiting check
export const checkRateLimit = (userId: string, currentCount: number): boolean => {
  const hourlyLimit = EMAIL_CONFIG.rateLimit.maxEmailsPerHour
  return currentCount < hourlyLimit
}

// Get email provider info
export const getEmailProviderInfo = () => {
  const provider = EMAIL_CONFIG.provider
  
  switch (provider) {
    case 'sendgrid':
      return {
        name: 'SendGrid',
        status: EMAIL_CONFIG.sendgrid.apiKey ? 'Configured' : 'Not Configured',
        docs: 'https://sendgrid.com/docs/for-developers/sending-email/api-getting-started/'
      }
    case 'mailgun':
      return {
        name: 'Mailgun',
        status: EMAIL_CONFIG.mailgun.apiKey ? 'Configured' : 'Not Configured',
        docs: 'https://documentation.mailgun.com/en/latest/quickstart-sending.html'
      }
    case 'aws-ses':
      return {
        name: 'AWS SES',
        status: EMAIL_CONFIG.awsSes.accessKeyId ? 'Configured' : 'Not Configured',
        docs: 'https://docs.aws.amazon.com/ses/latest/DeveloperGuide/send-email-api.html'
      }
    case 'smtp':
      return {
        name: 'SMTP',
        status: EMAIL_CONFIG.smtp.host ? 'Configured' : 'Not Configured',
        docs: 'https://nodemailer.com/smtp/'
      }
    case 'mock':
    default:
      return {
        name: 'Mock (Development)',
        status: 'Active',
        docs: 'Emails are logged to console only'
      }
  }
}

