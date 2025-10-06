const express = require('express');
const router = express.Router();
const Book = require('../models/Book');

// Get all books with optional filtering
router.get('/', async (req, res) => {
  try {
    const { status, search } = req.query;
    let filter = {};
    
    if (status && status !== 'All') {
      filter.status = status;
    }
    
    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }
    
    const books = await Book.find(filter).sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single book
router.get('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    res.json(book);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create book
router.post('/', async (req, res) => {
  const book = new Book(req.body);

  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update book
router.patch('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    Object.keys(req.body).forEach(key => {
      book[key] = req.body[key];
    });

    const updatedBook = await book.save();
    res.json(updatedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete book
router.delete('/:id', async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }
    
    await book.deleteOne();
    res.json({ message: 'Book deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get statistics
router.get('/stats/summary', async (req, res) => {
  try {
    const total = await Book.countDocuments();
    const completed = await Book.countDocuments({ status: 'Completed' });
    const reading = await Book.countDocuments({ status: 'Reading' });
    const toRead = await Book.countDocuments({ status: 'To Read' });
    
    const avgRating = await Book.aggregate([
      { $match: { rating: { $gt: 0 } } },
      { $group: { _id: null, avgRating: { $avg: '$rating' } } }
    ]);
    
    res.json({
      total,
      completed,
      reading,
      toRead,
      avgRating: avgRating.length > 0 ? avgRating[0].avgRating.toFixed(1) : 0
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;