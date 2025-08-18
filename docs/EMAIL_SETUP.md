# Email System Setup Guide

This guide will help you set up the email system for your Ryujin Electronics staff to send emails like Apple Mail or Gmail.

## 🚀 Quick Start

The email system is already functional in development mode (mock mode). Emails will be logged to the console for testing purposes.

## 📧 Email Service Providers

### Option 1: SendGrid (Recommended for Production)

SendGrid is a popular email service with excellent deliverability and easy setup.

1. **Sign up** at [sendgrid.com](https://sendgrid.com)
2. **Get API Key** from your SendGrid dashboard
3. **Verify your domain** for better deliverability
4. **Set environment variables:**

```bash
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your_api_key_here
FROM_EMAIL=noreply@ryujin.com.au
FROM_NAME=Ryujin Electronics
```

### Option 2: Mailgun

Mailgun is great for transactional emails and has good pricing.

1. **Sign up** at [mailgun.com](https://mailgun.com)
2. **Get API Key** from your Mailgun dashboard
3. **Verify your domain**
4. **Set environment variables:**

```bash
EMAIL_PROVIDER=mailgun
MAILGUN_API_KEY=your_api_key_here
MAILGUN_DOMAIN=yourdomain.com
FROM_EMAIL=noreply@ryujin.com.au
```

### Option 3: AWS SES

AWS SES is cost-effective for high-volume email sending.

1. **Set up AWS account** and enable SES
2. **Verify your domain** in SES
3. **Create IAM user** with SES permissions
4. **Set environment variables:**

```bash
EMAIL_PROVIDER=aws-ses
AWS_REGION=us-east-1
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
FROM_EMAIL=noreply@ryujin.com.au
```

### Option 4: SMTP (Gmail, Outlook, etc.)

Use your existing email provider's SMTP server.

1. **Enable 2FA** on your email account
2. **Generate app password** (for Gmail)
3. **Set environment variables:**

```bash
EMAIL_PROVIDER=smtp
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
FROM_EMAIL=your_email@gmail.com
```

## 🔧 Installation Steps

### 1. Install Dependencies

```bash
# For SendGrid
npm install @sendgrid/mail

# For Mailgun
npm install mailgun.js

# For AWS SES
npm install aws-sdk

# For SMTP
npm install nodemailer
```

### 2. Update Environment Variables

Add the appropriate variables to your `.env.local` file:

```env
# Email Configuration
EMAIL_PROVIDER=sendgrid
SENDGRID_API_KEY=your_api_key

# Company Information
COMPANY_NAME=Ryujin Electronics
COMPANY_ADDRESS=123 Tech Street, Canberra ACT 2600
COMPANY_PHONE=+61 2 6123 4567
COMPANY_WEBSITE=www.ryujinelectronics.com.au

# Rate Limiting
MAX_EMAILS_PER_HOUR=100
MAX_EMAILS_PER_DAY=1000
```

### 3. Update Email API

Uncomment the appropriate email service in `app/api/email/send/route.ts` and install the required package.

## 🎯 Features

### ✅ What's Working Now
- **Compose Interface**: Clean, professional email composition
- **Email Templates**: Pre-built templates for common use cases
- **File Attachments**: Support for multiple file types
- **Draft Saving**: Save emails as drafts
- **Search & Filter**: Find emails quickly
- **Responsive Design**: Works on all devices

### 🔄 What's Coming Next
- **Email Receiving**: Inbox functionality
- **Email Threading**: Conversation view
- **Advanced Templates**: Customizable templates
- **Email Scheduling**: Send emails later
- **Email Analytics**: Track delivery and opens
- **Team Collaboration**: Shared templates and signatures

## 📱 Usage

### For Staff Members

1. **Navigate** to Dashboard → Email
2. **Click Compose** to write a new email
3. **Fill in** recipient, subject, and message
4. **Add attachments** if needed
5. **Click Send** or **Save Draft**

### Email Templates

Use pre-built templates for:
- **Client Follow-ups**
- **Project Updates**
- **Support Requests**

### Best Practices

- **Subject Lines**: Be clear and specific
- **Attachments**: Keep file sizes reasonable
- **CC/BCC**: Use appropriately for privacy
- **Signatures**: Professional company signature is automatic

## 🛠️ Troubleshooting

### Common Issues

1. **Emails not sending**
   - Check API keys and credentials
   - Verify domain verification
   - Check rate limits

2. **Authentication errors**
   - Ensure environment variables are set
   - Check API key permissions
   - Verify account status

3. **Delivery issues**
   - Check spam folder
   - Verify sender domain
   - Review email content

### Development Mode

In development, emails are logged to the console. Check your terminal for email details.

## 🔒 Security & Compliance

- **Authentication**: Required for all email operations
- **Rate Limiting**: Prevents abuse
- **Email Validation**: Ensures valid email addresses
- **Logging**: All email activity is logged
- **GDPR Ready**: Easy to implement data deletion

## 📊 Monitoring

Monitor your email system with:
- **SendGrid Analytics**: Delivery rates, opens, clicks
- **Mailgun Logs**: Detailed sending logs
- **AWS CloudWatch**: SES metrics and alarms
- **Custom Dashboard**: Build your own monitoring

## 🚀 Production Deployment

1. **Choose email provider** based on your needs
2. **Set up domain verification**
3. **Configure environment variables**
4. **Test thoroughly** with small batches
5. **Monitor performance** and adjust settings
6. **Set up alerts** for failures

## 💰 Cost Considerations

- **SendGrid**: $14.95/month for 50k emails
- **Mailgun**: $35/month for 50k emails
- **AWS SES**: $0.10 per 1000 emails
- **SMTP**: Usually free with existing email

## 📞 Support

For technical support:
- **Email**: support@ryujin.com.au
- **Phone**: +61 2 6123 4567
- **Documentation**: Check provider-specific docs

---

**Note**: This system is designed to integrate seamlessly with your existing Ryujin Electronics infrastructure while providing a professional email experience for your staff.

