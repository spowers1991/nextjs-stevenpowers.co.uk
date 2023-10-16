// pages/api/submitForm.js
export default async function handler(req, res) {
    if (req.method === 'POST') {
      try {
        const data = req.body;
  
        // Handle the form submission logic here, e.g., sending an email or saving to a database
        // ...
  
        res.status(200).json({ message: 'Form submitted successfully' });
      } catch (error) {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    } else {
      res.status(405).json({ message: 'Method Not Allowed' });
    }
  }
  