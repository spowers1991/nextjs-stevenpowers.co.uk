// pages/api/revalidate.js
export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Only POST requests allowed' });
    }
  
    const { path } = req.body;
    console.log(path)
    try {
      // Trigger revalidation
      await res.revalidate(path);
      return res.status(200).json({ message: `Revalidated ${path}` });
    } catch (err) {
      console.error('Error revalidating:', err);
      return res.status(500).json({ message: 'Error revalidating' });
    }
  }
  