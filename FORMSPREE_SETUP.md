# Formspree Email Setup Guide

This guide will help you set up email functionality for your portfolio contact form using Formspree.

## Step 1: Create a Formspree Account

1. Go to [Formspree.io](https://formspree.io/)
2. Sign up for a free account
3. Verify your email address

## Step 2: Create a New Form

1. Log in to your Formspree dashboard
2. Click "Create Form"
3. Give your form a name (e.g., "Portfolio Contact Form")
4. Set the email address where you want to receive messages
5. Click "Create"

## Step 3: Get Your Form Endpoint

1. After creating the form, you'll see a form endpoint URL
2. It will look like: `https://formspree.io/f/your-form-id`
3. Copy this URL

## Step 4: Update Your JavaScript

1. Open `script.js` in your portfolio
2. Find line 242 (around where the Formspree endpoint is defined)
3. Replace `'https://formspree.io/f/your-form-id'` with your actual Formspree form URL

```javascript
// Change this line:
const formspreeEndpoint = 'https://formspree.io/f/your-form-id';

// To your actual form URL:
const formspreeEndpoint = 'https://formspree.io/f/abc123def456';
```

## Step 5: Test Your Form

1. Open your portfolio in a browser
2. Fill out the contact form
3. Submit the form
4. Check your email for the message

## Free Plan Limits

- Formspree free plan allows 50 form submissions per month
- This should be sufficient for a personal portfolio
- If you need more, consider upgrading to a paid plan

## Alternative: EmailJS Setup

If you prefer to use EmailJS instead, you can revert to the EmailJS code by:

1. Uncommenting the EmailJS section in `script.js`
2. Getting an EmailJS account at [emailjs.com](https://www.emailjs.com/)
3. Setting up an email service and template
4. Replacing the placeholder credentials with your actual EmailJS credentials

## Troubleshooting

**Form not sending:**
- Check that you've replaced the placeholder URL with your actual Formspree URL
- Ensure your internet connection is working
- Check browser console for any error messages

**Email not received:**
- Check your spam folder
- Verify the email address in your Formspree form settings
- Make sure you're using the correct form endpoint

**Form validation errors:**
- Ensure all required fields are filled out
- Check that the email address is valid

## Security Note

Your Formspree form URL is visible in the JavaScript code. This is normal for client-side forms, but:
- Don't use sensitive information in form field names
- Consider adding additional validation on the server side if needed
- Monitor your Formspree dashboard for any suspicious activity