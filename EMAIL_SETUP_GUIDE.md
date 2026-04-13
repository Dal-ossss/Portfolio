# EmailJS Setup Guide for Portfolio Contact Form

This guide will help you configure the SMTP email functionality for your portfolio's contact form using EmailJS.

## What is EmailJS?

EmailJS is a service that allows you to send emails directly from JavaScript without needing a backend server. It's perfect for static websites and portfolios.

**Free Tier:** Up to 200 emails per month

## Setup Instructions

### Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Set Up Email Service

1. After logging in, go to **Email Services** in the left sidebar
2. Click **"Add New Service"**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Connect your email account (this is where emails will be sent TO)
5. Click **"Create Service"**
6. **Copy your Service ID** (it looks like: `service_xxxxx`)

### Step 3: Create Email Template

1. Go to **Email Templates** in the left sidebar
2. Click **"Create New Template"**
3. Design your email template using the variables provided:

```
From: {{from_name}} <{{from_email}}>
Subject: {{subject}}

Message:
{{message}}

---
This message was sent from your portfolio contact form.
```

4. In the **Settings** tab of the template:
   - Set **"Send copy to sender"** if you want senders to receive a copy
   - Set the **"To Email"** as your email address (where you want to receive messages)
5. Click **"Save"**
6. **Copy your Template ID** (it looks like: `template_xxxxx`)

### Step 4: Get Your Public Key

1. Go to **Account** in the left sidebar (click your profile icon)
2. Under **"API Keys"** section
3. **Copy your Public Key** (it looks like: `user_xxxxx`)

### Step 5: Update Your Code

Open `script.js` and replace the placeholder values with your actual EmailJS credentials:

```javascript
// Find this section in the sendEmail function:
const serviceID = 'YOUR_SERVICE_ID'; // Replace with your Service ID
const templateID = 'YOUR_TEMPLATE_ID'; // Replace with your Template ID
const publicKey = 'YOUR_PUBLIC_KEY'; // Replace with your Public Key

// Replace with your actual values, for example:
const serviceID = 'service_abc123';
const templateID = 'template_def456';
const publicKey = 'user_ghi789';
```

### Step 6: Test Your Contact Form

1. Open your portfolio in a web browser
2. Go to the Contact section
3. Fill out the form and click "Send Message"
4. Check your email to see if you received the message

## Troubleshooting

### Common Issues:

1. **"Failed to send message" error**
   - Double-check your Service ID, Template ID, and Public Key
   - Make sure you've saved the template in EmailJS
   - Check your browser console for detailed error messages

2. **Emails not arriving**
   - Check your spam folder
   - Verify the "To Email" in your template settings
   - Make sure your EmailJS account is verified

3. **CORS errors**
   - EmailJS should handle CORS automatically
   - Make sure you're using the latest EmailJS SDK (already included)

## Alternative: Formspree

If you prefer a simpler solution, you can use Formspree instead:

1. Go to [Formspree](https://formspree.io/)
2. Create a free account
3. Create a new form and get your endpoint URL
4. Replace the form submission code with a simple fetch request to your Formspree endpoint

## Security Note

Your EmailJS Public Key is safe to expose in client-side code. However, keep your Service ID and Template ID somewhat private as they're specific to your account.

## Support

If you need help:
- EmailJS Documentation: https://www.emailjs.com/docs/
- EmailJS Support: https://www.emailjs.com/support/

---

**Important:** After completing the setup, your contact form will send real emails to your configured email address!