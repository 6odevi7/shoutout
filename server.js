const express = require('express');
const next = require('next');
const mongoose = require('mongoose');
const http = require('http');
const { socketIo, Server } = require('socket.io');
const SpotlightPost = require('./models/SpotlightPost');
const spotlightRoutes = require('./server/routes/spotlightRoutes');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const moment = require('moment-timezone');
const jwt = require('jsonwebtoken');



const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const port = process.env.PORT || 3000;
const JWT_SECRET = process.env.JWT_SECRET || 'f9e0a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_FRONTEND_URL,
    methods: ["GET", "POST"]
  }
});

io.on('connection', (socket) => {
  console.log('A user connected');
  
  socket.on('new_shoutout', (data) => {
    io.emit('shoutout_added', data);
  });

  socket.on('new_insight', (data) => {
    io.emit('insight_added', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

moment.tz.setDefault('UTC');

const getCurrentUTCTime = () => moment().toISOString();

const authenticateJWT = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

nextApp.prepare().then(() => {
  const app = express();
  const server = http.createServer(app);
  const io = new Server(server);

  mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

  app.use((req, res, next) => {
    res.locals.currentTime = getCurrentUTCTime();
    next();
  });

  app.use(express.json());

  // Your existing routes and socket.io setup here

  app.all('*', (req, res) => {
    return handle(req, res);
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://localhost:${port}`);
  });
});
