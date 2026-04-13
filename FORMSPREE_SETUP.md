# Formspree Setup for Portfolio Contact Form

If EmailJS seems complicated, you can use Formspree instead - it's much simpler to set up!

## Quick Setup with Formspree

### Step 1: Create Formspree Account
1. Go to [Formspree](https://formspree.io/)
2. Click "Get Started Free"
3. Sign up with your email

### Step 2: Create a Form
1. After logging in, click "New Form"
2. Name your form (e.g., "Portfolio Contact")
3. Copy the form endpoint URL (it looks like: `https://formspree.io/f/your-form-id`)

### Step 3: Update Your HTML Form
Replace your current form in `index.html` with this simpler version:

```html
<form class="contact-form" id="contactForm" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <div class="form-group">
        <input type="text" id="name" name="name" placeholder="Your Name" required>
    </div>
    <div class="form-group">
        <input type="email" id="email" name="email" placeholder="Your Email" required>
    </div>
    <div class="form-group">
        <input type="text" id="subject" name="subject" placeholder="Subject" required>
    </div>
    <div class="form-group">
        <textarea id="message" name="message" rows="5" placeholder="Your Message" required></textarea>
    </div>
    <button type="submit" class="btn btn-primary btn-submit">Send Message</button>
</form>
```

### Step 4: Update Your JavaScript
Replace the `sendEmail` function in `script.js` with this simpler version:

```javascript
// Simple Form Submission (Formspree)
function sendEmail(name, email, subject, message) {
    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.textContent;
    
    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    // Create form data
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('subject', subject);
    formData.append('message', message);
    
    // Send to Formspree
    fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    })
    .then(response => {
        if (response.ok) {
            showNotification('Message sent successfully! I will get back to you soon.', 'success');
            contactForm.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        } else {
            throw new Error('Form submission failed');
        }
    })
    .catch(error => {
        console.log('FAILED...', error);
        showNotification('Failed to send message. Please try again or contact me directly.', 'error');
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    });
}
```

## Formspree Free Plan Features:
- 50 form submissions per month
- Email notifications to your inbox
- No coding required (just change the form action)
- Spam protection included

## Which Should You Use?

**Formspree** (Recommended for beginners):
- ✅ Super easy setup
- ✅ No JavaScript configuration needed
- ✅ Works immediately
- ❌ Limited to 50 submissions/month

**EmailJS** (More features):
- ✅ 200 emails/month
- ✅ More customization options
- ✅ Better email templates
- ❌ Requires account setup and configuration

## Quick Test
Once you set up either service, test your form by:
1. Filling out the contact form
2. Clicking "Send Message"
3. Checking your email for the notification

Both services will send you an email notification when someone submits your contact form!