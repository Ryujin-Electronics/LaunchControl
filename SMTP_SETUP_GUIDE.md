# SMTP Email Setup Guide - Gmail/Outlook

## 🚀 **Quick Setup for SMTP Email**

Since you're only using SMTP, here's the simple setup process:

## 📧 **Gmail Setup (Recommended)**

### **Step 1: Enable 2-Factor Authentication**
1. Go to your Google Account settings
2. Navigate to Security → 2-Step Verification
3. Enable 2-Step Verification if not already enabled

### **Step 2: Generate App Password**
1. Go to Security → App Passwords
2. Select "Mail" and "Other (Custom name)"
3. Enter "Ryujin Email System" as the name
4. Click "Generate"
5. **Copy the 16-character password** (you'll need this)

### **Step 3: Configure in Email Setup**
1. Go to `/dashboard/email/setup`
2. **Provider**: SMTP (should be pre-selected)
3. **Host**: `smtp.gmail.com` (pre-filled)
4. **Port**: `587` (pre-filled)
5. **Secure**: Unchecked (pre-filled)
6. **Username**: Your Gmail address
7. **Password**: The 16-character app password (not your regular password)
8. **From Email**: Your Gmail address

## 📧 **Outlook Setup**

### **Step 1: Enable 2-Factor Authentication**
1. Go to account.live.com
2. Navigate to Security → Advanced Security Options
3. Enable 2-Step Verification

### **Step 2: Generate App Password**
1. Go to Security → App Passwords
2. Generate a new app password
3. **Copy the password** (you'll need this)

### **Step 3: Configure in Email Setup**
1. Go to `/dashboard/email/setup`
2. **Provider**: SMTP
3. **Host**: `smtp-mail.outlook.com`
4. **Port**: `587`
5. **Secure**: Unchecked
6. **Username**: Your Outlook email
7. **Password**: The app password
8. **From Email**: Your Outlook email

## ✅ **Test Your Configuration**

1. **Click "Test Connection"** to verify your settings
2. **Click "Save Configuration"** to store your settings
3. **Go to Email** to start sending emails

## 🔒 **Security Notes**

- **Never use your regular password** - always use app passwords
- **App passwords are 16 characters** (no spaces)
- **Keep your app password secure** - it's like a master key
- **You can revoke app passwords** anytime from your account settings

## 🚨 **Common Issues**

### **"Invalid credentials"**
- Make sure you're using the app password, not your regular password
- Verify 2FA is enabled on your account

### **"Connection failed"**
- Check your host and port settings
- Ensure your email provider allows SMTP access
- Some providers require you to "allow less secure apps"

### **"Authentication failed"**
- Double-check username (should be your full email address)
- Verify the app password is copied correctly (16 characters)

## 🎯 **What Happens Next**

1. **Configuration Saved**: Your SMTP settings are stored locally
2. **Ready to Send**: You can now compose and send emails
3. **Professional Interface**: Use the email system like Gmail/Outlook
4. **Company Branding**: Automatic signature with Ryujin Electronics details

---

**Your staff will now have professional email capabilities integrated directly into your dashboard!** 🎉

