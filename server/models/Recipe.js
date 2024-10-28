const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: 'This field is required.'
  },
  author: {
    type: String,
    required: 'This field is required.'
  },
  smallDescription: {
    type: String,
    required: 'This field is required.',
  },
  fullDescription: {
    type: String,
    required: 'This field is required.'
  },
  email: {
    type: String,
    required: 'This field is required.'
  },
  ingredients: {
    type: Array,
    required: 'This field is required.'
  },
  category: {
    type: String,
    enum: ['All', 'Breakfast', 'Lunch', 'Dinner'],
    required: 'This field is required.'
  },
  type: {
    type: String,
    enum: ['Full-meal', 'Side-dish', 'Dessert', 'Snack', 'Other'],
    required: 'This field is required.'
  },
  tags: {
    type: [String],
  },
  images: {
    type: [String],
    required: 'This field is required.'
  },
});

recipeSchema.index({ name: 'text', description: 'text' });
// WildCard Indexing
//recipeSchema.index({ "$**" : 'text' });

module.exports = mongoose.model('Recipe', recipeSchema);