import React from 'react';
import { FaPlus } from 'react-icons/fa';

const EmptyState = ({ onAddBook }) => {
  return (
    <div className="bg-white rounded-3xl shadow-xl p-16 text-center fade-in">
      <div className="text-9xl mb-6">📚</div>
      <h3 className="text-3xl font-bold text-gray-800 mb-4">No Books Yet!</h3>
      <p className="text-gray-500 mb-8 text-lg">
        Start your reading journey by adding your first book
      </p>
      <button
        onClick={onAddBook}
        className="inline-flex items-center gap-2 bg-gradient-to-r from-peach-400 to-peach-500 hover:from-peach-500 hover:to-peach-600 text-white px-8 py-4 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all text-lg"
      >
        <FaPlus /> Add Your First Book
      </button>
    </div>
  );
};

export default EmptyState;