const Contact = require('../models/contact');
const nodemailer = require('nodemailer');

const sendEmail = async (name, email, message) => {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.GMAIL_USER,
          pass: process.env.GMAIL_PASS,
        }
      });
  
      const info = await transporter.sendMail({
        from: `"Portfolio Contact Form" <${process.env.GMAIL_USER}>`, // always from your Gmail
        to: process.env.GMAIL_USER,
        subject: 'New Contact Form Message',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
<p><strong>Name:</strong> ${name}</p>
<p><strong>Email:</strong> ${email}</p>
<p><strong>Message:</strong><br/>${message}</p>
`,
    });
  
      console.log('Email sent: ', info.response);
    } catch (error) {
      console.error('Error sending email: ', error);
      throw new Error('Failed to send email');
    }
  };

const create = async (req, res) => {
  try {
    const { name, email, text } = req.body;

    const contact = new Contact({ name, email, text });
    await contact.save();

    await sendEmail(name, email, text);

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message' });
  }
};

const getAll = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch messages' });
  }
};

const remove = async (req, res) => {
  try {
    await Contact.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Message deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to delete message' });
  }
};

module.exports = { create, getAll, remove };
