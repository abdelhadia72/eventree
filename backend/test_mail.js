import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import generateQRCode from "./services/qrService.js";

dotenv.config();

const sendEmail = async (img) => {
    const transporter = nodemailer.createTransport({
        service: 'xxx',
        auth: {
            user: "xxx",
            pass: "xxx"
        },
    });

    const mailOptions = {
        from: "xxx",
        to: "xxx",
        subject: "test mail 5",
        html: `<h1>Scan the QR code below to check in to the event</h1><img src="${img}" alt="QR Code" />`,
    };

    try {
        // Send mail with defined transport object
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};

export default sendEmail;


const qrCodeUrl = await generateQRCode("xxx");

sendEmail(qrCodeUrl)
    .then(info => console.log('Email sent:', info))
    .catch(err => console.error('Error sending email:', err));

// const qrCodeUrl = await generateQRCode("https://www.google.com");
// sendEmail('eventree99@gmail.com', qrCodeUrl).catch(console.error);
