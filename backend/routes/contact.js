const express = require("express");
const nodemailer = require("nodemailer");
require("dotenv").config();

const router = express.Router();

// Configure Nodemailer with Gmail SMTP
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_PORT == 465, // Use SSL for port 465
    auth: {
        user: process.env.SMTP_USER, // Admin email
        pass: process.env.SMTP_PASS, // App password
    },
});

// Contact form submission route
router.post("/", async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: `"${name}" <${email}>`, // Show user's email as "From"
        to: process.env.SMTP_USER, // Admin email (receiving the message)
        replyTo: email, // When the admin clicks "Reply", it goes to the user
        subject: "New Contact Form Submission",
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).json({ message: "Your message has been sent successfully!" });
    } catch (error) {
        console.error("Email sending error:", error);
        res.status(500).json({ message: "Failed to send message" });
    }
});

module.exports = router;
