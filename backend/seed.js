const mongoose = require('mongoose');
const Book = require('./models/Book');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/booktracker';

const sampleBooks = [
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    status: "Completed",
    rating: 5,
    pages: 324,
    genre: "Fiction",
    notes: "A classic American novel about racial injustice and childhood innocence.",
    coverColor: "#6366f1"
  },
  {
    title: "1984",
    author: "George Orwell",
    status: "Completed",
    rating: 5,
    pages: 328,
    genre: "Dystopian Fiction",
    notes: "A dystopian masterpiece about totalitarianism and surveillance.",
    coverColor: "#ef4444"
  },
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    status: "Completed",
    rating: 4,
    pages: 180,
    genre: "Classic Fiction",
    notes: "The American Dream explored through the Jazz Age.",
    coverColor: "#10b981"
  },
  {
    title: "Atomic Habits",
    author: "James Clear",
    status: "Reading",
    rating: 4,
    pages: 320,
    genre: "Self-Help",
    notes: "Practical guide to building good habits and breaking bad ones.",
    coverColor: "#f59e0b"
  },
  {
    title: "Harry Potter and the Sorcerer's Stone",
    author: "J.K. Rowling",
    status: "Completed",
    rating: 5,
    pages: 309,
    genre: "Fantasy",
    notes: "The magical beginning of an incredible journey.",
    coverColor: "#8b5cf6"
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    status: "Reading",
    rating: 0,
    pages: 310,
    genre: "Fantasy",
    notes: "An adventure in Middle-earth.",
    coverColor: "#06b6d4"
  },
  {
    title: "Sapiens: A Brief History of Humankind",
    author: "Yuval Noah Harari",
    status: "To Read",
    rating: 0,
    pages: 443,
    genre: "Non-Fiction",
    notes: "Explores the history of humanity from the Stone Age to modern times.",
    coverColor: "#ec4899"
  },
  {
    title: "The Alchemist",
    author: "Paulo Coelho",
    status: "Completed",
    rating: 4,
    pages: 208,
    genre: "Fiction",
    notes: "A philosophical tale about following your dreams.",
    coverColor: "#3b82f6"
  },
  {
    title: "Educated",
    author: "Tara Westover",
    status: "To Read",
    rating: 0,
    pages: 334,
    genre: "Memoir",
    notes: "A memoir about education and self-invention.",
    coverColor: "#f59e0b"
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    status: "Completed",
    rating: 5,
    pages: 432,
    genre: "Romance",
    notes: "A timeless romance with social commentary.",
    coverColor: "#ec4899"
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    status: "To Read",
    rating: 0,
    pages: 277,
    genre: "Fiction",
    notes: "A story about teenage angst and alienation.",
    coverColor: "#6366f1"
  },
  {
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    status: "Reading",
    rating: 0,
    pages: 499,
    genre: "Psychology",
    notes: "Explores the two systems that drive the way we think.",
    coverColor: "#10b981"
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ MongoDB connected');

    await Book.deleteMany({});
    console.log('🗑️  Cleared existing books');

    await Book.insertMany(sampleBooks);
    console.log(`✅ Successfully added ${sampleBooks.length} sample books!`);

    await mongoose.disconnect();
    console.log('👋 Database connection closed');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();