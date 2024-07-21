const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const http = require('http');
const socketIo = require('socket.io');
const SpotlightPost = require('./models/SpotlightPost');
const spotlightRoutes = require('./routes/spotlightRoutes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

const port = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();
  const httpServer = http.createServer(server);
  const io = socketIo(httpServer);

  // Connect to MongoDB
  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

  // Socket.io connection handling
  // Socket.io connection handling
io.on('connection', (socket) => {
  console.log('New client connected');

  // Join a room for receiving shoutout updates
  socket.join('shoutout-feed');

  // Handle client disconnection
  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });

  // Handle joining a specific user's room for private messaging
  socket.on('join-user-room', (userId) => {
    socket.join(`user-${userId}`);
  });

  // Handle leaving a specific user's room
  socket.on('leave-user-room', (userId) => {
    socket.leave(`user-${userId}`);
  });
});


    // Add more socket event handlers here
  });

  // Your existing API routes go here

  // Default catch-all handler to allow Next.js to handle all other routes
  server.all('*', (req, res) => {
    return handle(req, res);
  });

  httpServer.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});

// Create a new shoutout (protected route)
server.post('/api/shoutouts', authenticateJWT, async (req, res) => {
  try {
    const { content, topic, promotionalUrl } = req.body;
    const userId = req.user.userId;

    const shoutout = new Shoutout({
      user: userId,
      content,
      topic,
      promotionalUrl
    });

    await shoutout.save();

    // Emit a 'newShoutout' event to all connected clients
    io.emit('newShoutout', shoutout);

    res.status(201).json(shoutout);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// In your server.js file, add this new route
server.get('/api/spotlight-posts', async (req, res) => {
  try {
    const currentDate = new Date();
    const spotlightPosts = await SpotlightPost.find({ expiresAt: { $gt: currentDate } })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('author', 'username');
    res.json(spotlightPosts);
  } catch (error) {
    console.error('Error fetching spotlight posts:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

server.post('/api/spotlight-posts', authenticateJWT, async (req, res) => {
  try {
    const { content, duration } = req.body;
    const userId = req.user.userId;

    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + duration);

    const newSpotlightPost = new SpotlightPost({
      content,
      author: userId,
      expiresAt
    });

    await newSpotlightPost.save();

    res.status(201).json({ message: 'Spotlight post created successfully', post: newSpotlightPost });
  } catch (error) {
    console.error('Error creating spotlight post:', error);
    res.status(500).json({ message: 'Error creating spotlight post' });
  }
});

app.use('/api/spotlight', spotlightRoutes);

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

server.post('/api/spotlight-posts', authenticateJWT, async (req, res) => {
  try {
    const { content, duration, paymentAmount, paymentToken } = req.body;
    const userId = req.user.userId;

    // Process payment
    const paymentIntent = await stripe.paymentIntents.create({
      amount: paymentAmount * 100, // Stripe uses cents
      currency: 'usd',
      payment_method: paymentToken,
      confirm: true
    });

    if (paymentIntent.status === 'succeeded') {
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + duration);

      const newSpotlightPost = new SpotlightPost({
        content,
        author: userId,
        expiresAt,
        paymentAmount
      });

      await newSpotlightPost.save();

      res.status(201).json({ message: 'Spotlight post created successfully', post: newSpotlightPost });
    } else {
      res.status(400).json({ message: 'Payment failed' });
    }
  } catch (error) {
    console.error('Error creating spotlight post:', error);
    res.status(500).json({ message: 'Error creating spotlight post' });
  }
});