import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import StatsCard from './components/StatsCard';
import FilterTabs from './components/FilterTabs';
import BookCard from './components/BookCard';
import BookModal from './components/BookModal';
import EmptyState from './components/EmptyState';
import Toast from './components/Toast';
import { booksAPI } from './services/api';
import { FaBook, FaCheckCircle, FaBookReader, FaBookmark } from 'react-icons/fa';

function App() {
  const [books, setBooks] = useState([]);
  const [stats, setStats] = useState({ total: 0, completed: 0, reading: 0, toRead: 0 });
  const [activeFilter, setActiveFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadBooks = useCallback(async () => {
    try {
      setLoading(true);
      const params = activeFilter !== 'All' ? { status: activeFilter } : {};
      const response = await booksAPI.getAll(params);
      setBooks(response.data);
    } catch (error) {
      showToast('Failed to load books', 'error');
    } finally {
      setLoading(false);
    }
  }, [activeFilter]);

  const loadStats = useCallback(async () => {
    try {
      const response = await booksAPI.getStats();
      setStats(response.data);
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  }, []);

  useEffect(() => {
    loadBooks();
    loadStats();
  }, [loadBooks, loadStats]);

  const handleAddBook = () => {
    setEditingBook(null);
    setIsModalOpen(true);
  };

  const handleEditBook = (book) => {
    setEditingBook(book);
    setIsModalOpen(true);
  };

  const handleSaveBook = async (bookData) => {
    try {
      if (editingBook) {
        await booksAPI.update(editingBook._id, bookData);
        showToast('Book updated successfully! 🎉');
      } else {
        await booksAPI.create(bookData);
        showToast('Book added successfully! 📚');
      }
      setIsModalOpen(false);
      setEditingBook(null);
      loadBooks();
      loadStats();
    } catch (error) {
      showToast('Failed to save book', 'error');
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        await booksAPI.delete(id);
        showToast('Book deleted successfully! 🗑️');
        loadBooks();
        loadStats();
      } catch (error) {
        showToast('Failed to delete book', 'error');
      }
    }
  };

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  const statsData = [
    { icon: FaBook, title: 'Total Books', value: stats.total, color: 'border-purple-400' },
    { icon: FaCheckCircle, title: 'Completed', value: stats.completed, color: 'border-green-400' },
    { icon: FaBookReader, title: 'Reading', value: stats.reading, color: 'border-orange-400' },
    { icon: FaBookmark, title: 'To Read', value: stats.toRead, color: 'border-blue-400' },
  ];

  return (
    <div className="min-h-screen pb-12">
      <Header onAddBook={handleAddBook} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <StatsCard key={index} {...stat} />
          ))}
        </div>

        {/* Filters */}
        <FilterTabs activeFilter={activeFilter} onFilterChange={setActiveFilter} />

        {/* Books */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-20 w-20 border-4 border-peach-200 border-t-peach-500"></div>
          </div>
        ) : books.length === 0 ? (
          <EmptyState onAddBook={handleAddBook} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {books.map((book) => (
              <BookCard key={book._id} book={book} onEdit={handleEditBook} onDelete={handleDeleteBook} />
            ))}
          </div>
        )}
      </main>

      <BookModal
        isOpen={isModalOpen}
        onClose={() => { setIsModalOpen(false); setEditingBook(null); }}
        onSave={handleSaveBook}
        book={editingBook}
      />

      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
    </div>
  );
}

export default App;