import React from 'react';
import { FaEdit, FaTrash, FaStar } from 'react-icons/fa';

const BookCard = ({ book, onEdit, onDelete }) => {
  // Status emoji and color
  const getStatusStyle = (status) => {
    switch (status) {
      case 'To Read':
        return { emoji: '📖', color: 'from-blue-400 to-blue-500', badge: 'bg-blue-100 text-blue-600' };
      case 'Reading':
        return { emoji: '📕', color: 'from-yellow-400 to-orange-500', badge: 'bg-orange-100 text-orange-600' };
      case 'Completed':
        return { emoji: '✅', color: 'from-green-400 to-green-500', badge: 'bg-green-100 text-green-600' };
      default:
        return { emoji: '📚', color: 'from-gray-400 to-gray-500', badge: 'bg-gray-100 text-gray-600' };
    }
  };

  const statusStyle = getStatusStyle(book.status);

  // Render stars
  const renderStars = () => {
    return [...Array(5)].map((_, i) => (
      <FaStar
        key={i}
        className={`${i < book.rating ? 'text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 slide-up">
      {/* Book Cover */}
      <div className={`h-40 bg-gradient-to-br ${statusStyle.color} relative flex items-center justify-center`}>
        <span className="text-6xl">{statusStyle.emoji}</span>
        <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${statusStyle.badge}`}>
          {book.status}
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2 min-h-[3.5rem]">
          {book.title}
        </h3>

        {/* Author */}
        <p className="text-gray-500 text-sm mb-3">
          ✍️ {book.author}
        </p>

        {/* Genre & Pages */}
        {(book.genre || book.pages > 0) && (
          <div className="flex flex-wrap gap-2 mb-3 text-xs">
            {book.genre && (
              <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">
                🏷️ {book.genre}
              </span>
            )}
            {book.pages > 0 && (
              <span className="bg-pink-100 text-pink-600 px-3 py-1 rounded-full font-medium">
                📄 {book.pages} pages
              </span>
            )}
          </div>
        )}

        {/* Rating */}
        {book.rating > 0 && (
          <div className="flex gap-1 mb-4">
            {renderStars()}
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(book)}
            className="flex-1 bg-gradient-to-r from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 text-blue-700 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaEdit /> Edit
          </button>
          <button
            onClick={() => onDelete(book._id)}
            className="flex-1 bg-gradient-to-r from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 text-red-700 px-4 py-2.5 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2"
          >
            <FaTrash /> Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookCard;