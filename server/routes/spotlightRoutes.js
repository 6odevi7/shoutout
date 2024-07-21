const express = require('express');
const router = express.Router();

// TODO: Import the spotlight controller once it's created
// const spotlightController = require('../controllers/spotlightController');

// POST route for submitting a spotlight post
router.post('/submit', (req, res) => {
  // TODO: Implement spotlight submission logic
  res.status(200).json({ message: 'Spotlight submission received' });
});

module.exports = router;
