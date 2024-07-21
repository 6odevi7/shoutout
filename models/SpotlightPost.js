const mongoose = require('mongoose');

const spotlightPostSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  expiresAt: {
    type: Date,
    required: true
  }
});

const SpotlightPost = mongoose.model('SpotlightPost', spotlightPostSchema);

module.exports = SpotlightPost;
