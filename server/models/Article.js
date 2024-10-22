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
  image: {
    type: String,
    required: 'This field is required.'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Article', articleSchema);
