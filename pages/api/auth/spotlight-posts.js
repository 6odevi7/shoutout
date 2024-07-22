export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { content, paymentAmount, duration, paymentToken } = req.body;
    
    // Validate input
    if (!content || !paymentAmount || !duration || !paymentToken) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      // Process payment (implement your payment logic here)
      // Create spotlight post in database
      const spotlightPost = {
        content,
        paymentAmount,
        duration,
        createdAt: new Date(),
        expiresAt: new Date(Date.now() + duration * 60 * 60 * 1000) // Convert hours to milliseconds
      };

      // Save spotlightPost to database (implement your database logic here)

      res.status(201).json({ message: 'Spotlight post created successfully', post: spotlightPost });
    } catch (error) {
      res.status(500).json({ message: 'Error creating spotlight post', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

export const config = {
  runtime: 'edge',
};