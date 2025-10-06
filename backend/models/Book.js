const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  author: {
    type: String,
    required: true,
    trim: true
  },
  status: {
    type: String,
    enum: ['To Read', 'Reading', 'Completed'],
    default: 'To Read'
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    default: 0
  },
  pages: {
    type: Number,
    default: 0
  },
  genre: {
    type: String,
    trim: true,
    default: ''
  },
  notes: {
    type: String,
    trim: true,
    default: ''
  },
  coverColor: {
    type: String,
    default: '#6366f1'
  },
  startDate: {
    type: Date
  },
  completedDate: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Book', bookSchema);