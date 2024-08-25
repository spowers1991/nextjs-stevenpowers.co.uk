export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Only POST requests allowed' });
  }

  const { path } = req.body;

  // Validate the path
  if (!path || typeof path !== 'string') {
    return res.status(400).json({ message: 'Invalid path' });
  }

  console.log(`Attempting to revalidate path: ${path}`);
  
  try {
    // Trigger revalidation
    await res.revalidate(path);
    console.log(`Successfully revalidated path: ${path}`);
    return res.status(200).json({ message: `Revalidated ${path}` });
  } catch (err) {
    console.error('Error revalidating:', err);
    return res.status(500).json({ message: 'Error revalidating', error: err.message });
  }
}
