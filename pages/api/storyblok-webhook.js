import { buffer } from 'micro';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const buf = await buffer(req);
  const payload = JSON.parse(buf.toString());

  if (payload.action === 'published' || payload.action === 'updated') {
    const pathToRevalidate = `/${payload.full_slug}`;

    try {
      // Trigger revalidation
      const response = await fetch('http://localhost:3000/api/revalidate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ path: pathToRevalidate }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to trigger revalidation: ${errorText}`);
      }

      return res.status(200).json({ message: 'Success' });
    } catch (err) {
     // console.error('Error triggering revalidation:', err);
      return res.status(500).json({ message: 'Error triggering revalidation' });
    }
  }

  return res.status(204).end(); // No content for non-publish events
}
