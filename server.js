// server.js - API server for contact form
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for all origins during development
app.use(cors());

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Middleware to log all requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Configure nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'shubhamsharma2004.16@gmail.com',
    pass: 'lsyo pjys gtob kgxd' // Your app password
  }
});

// Test route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API server is working!' });
});

// Contact form endpoint
app.post('/send-email', async (req, res) => {
  console.log('Received request to /send-email');
  console.log('Request body:', req.body);
  
  try {
    const { name, email, subject, message } = req.body;
    
    // Validate input
    if (!name || !email || !subject || !message) {
      console.log('Missing required fields');
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    
    // Email to you
    const mailOptions = {
      from: `"${name}" <${email}>`,
      to: 'shubhamsharma2004.16@gmail.com',
      subject: `Portfolio Contact: ${subject}`,
      html: `
        <h2>New Message from Your Portfolio</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    console.log('Sending email...');
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    
    // Auto-reply to sender
    const autoReplyOptions = {
      from: '"Shubham Khandelwal" <shubhamsharma2004.16@gmail.com>',
      to: email,
      subject: 'Thank you for contacting me',
      html: `
        <h2>Thank you for reaching out!</h2>
        <p>Hello ${name},</p>
        <p>Thank you for contacting me through my portfolio website. I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Shubham Khandelwal<br>UI/UX Designer & Web Developer</p>
      `
    };
    
    await transporter.sendMail(autoReplyOptions);
    console.log('Auto-reply sent successfully');
    
    res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send email', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`API server running at http://localhost:${PORT}`);
  console.log('Ready to receive contact form submissions');
});