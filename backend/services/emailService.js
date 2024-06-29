import nodemailer from 'nodemailer'
import dotenv from 'dotenv'

dotenv.config()

const sendEmail = async (recipientEmail, qrCodeUrl, username) => {

    console.log("the password is: ", process.env.SECRET_PASSWORD)

    const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
            user: process.env.SECRET_MAIL,
            pass: process.env.SECRET_PASSWORD,
        },
    });

    // email template
    const htmlTemplate = `
        <html>
        <head>
            <style>
                body {
                    font-family: Arial, sans-serif;
                }
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    border: 1px solid #ccc;
                    border-radius: 5px;
                    background-color: #f9f9f9;
                }
                .header {
                    background-color: #d53648;
                    color: #fff;
                    text-align: center;
                    padding: 10px;
                    border-radius: 5px 5px 0 0;
                }
                .content {
                    padding: 20px;
                    text-align: center; /* Center align content */
                }
                .logo {
                    max-width: 100px;
                    height: auto;
                    display: block;
                    margin: 0 auto;
                }
                .footer {
                    text-align: center;
                    margin-top: 20px;
                }
                .powered-by {
                    font-size: 12px;
                    color: #666;
                    margin-top: 15px;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <h2>Your Event Ticket</h2>
                </div>
                <div class="content">
                    <p>Hello <strong>${username}</strong>,</p>
                    <p>Thank you for registering for our event. Please find your ticket details below:</p>
                    <img src="${qrCodeUrl}" alt="QR Code" style="display: block; margin: 0 auto;"/>
                    <p style="text-align: center;">Scan the QR code above to check in at the event.</p>
                </div>
                <div class="footer">
                    <div style="width: 100px; margin: 0 auto;">
                        <img src="http://localhost:5000/uploads/logo.png" style="width: 50px" alt="Eventree Logo" class="logo"/>
                    </div>
                    <p class="powered-by">Powered by Eventree</p>
                </div>
            </div>
        </body>
        </html>
    `;


    const mailOptions = {
        from: process.env.SECRET_MAIL,
        to: recipientEmail,
        subject: 'Your event ticket',
        html: htmlTemplate,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}

export default  sendEmail;