const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: 'This field is required.'
  },
  summary: {
    type: String,
    required: 'This field is required.'
  },
  content: {
    type: String,
    required: 'This field is required.'
  },
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('article', articleSchema);
