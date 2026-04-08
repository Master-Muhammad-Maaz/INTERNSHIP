const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json({ limit: '50mb' }));

app.post('/send-email', async (req, res) => {
    const { email, pdfBase64, name } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
    });

    const mailOptions = {
        from: 'WebReich Technologies',
        to: email,
        subject: 'Internship Certificate - WebReich',
        text: `Hello ${name}, Please find your internship certificate attached.`,
        attachments: [{ filename: 'Certificate.pdf', content: pdfBase64, encoding: 'base64' }]
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send("Email Sent!");
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

app.listen(5000, () => console.log("Server running on port 5000"));
