import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const data = req.body;

      // Check the honeypot field
      const honeypotField = data['bot-field'];
      if (honeypotField) {
        // This is likely a spam submission, so don't process it
        return res.status(400).json({ message: 'Spam submission detected' });
      }

      // Your Nodemailer configuration
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true, // use SSL
        auth: {
          user: 'stevenpowers1991',
          pass: process.env.GMAIL_PASSCODE,
        },
      });

      // Define the email data
      const mailOptions = {
        from: data.email,
        to: 'stevenpowers1991@gmail.com',
        subject: 'Portfolio Site Form Submission',
        text: 'Name: ' + data.name + '\nEmail: ' + data.email + '\nMessage: ' + data.message,
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Email not sent:', error);
          res.status(500).json({ message: 'Email sending failed' });
        } else {
          console.log('Email sent:', info.response);
          res.status(200).json({ message: 'Form submitted successfully' });
        }
      });
    } catch (error) {
      console.error('Internal Server Error:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
