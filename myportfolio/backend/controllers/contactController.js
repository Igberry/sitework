const Message = require('../models/Message');
const nodemailer = require('nodemailer');

exports.sendMessage = async (req, res) => {
    try {
        const { name, email, message } = req.body;

        // Save message to MongoDB
        const newMessage = new Message({ name, email, message });
        await newMessage.save();

        // Email transporter setup
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: process.env.SMTP_SECURE === 'true', // true for 465
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });

        // Send email
        await transporter.sendMail({
            from: `"Ig-berry Portfolio" <${process.env.SMTP_USER}>`,
            to: process.env.EMAIL_RECEIVER,
            subject: `New Message from ${name}`,
            text: `You received a new message from your portfolio site:\n\nName: ${name}\nEmail: ${email}\nMessage:\n${message}`
        });

        res.status(200).json({ message: 'Message sent successfully and email delivered!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'An error occurred', error: err });
    }
};
