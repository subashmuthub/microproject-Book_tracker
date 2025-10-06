import React from 'react';
import { FaBookOpen, FaPlus } from 'react-icons/fa';

const Header = ({ onAddBook }) => {
  return (
    <header className="bg-white/90 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b-4 border-peach-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-br from-peach-400 to-peach-600 p-3 rounded-2xl shadow-lg">
              <FaBookOpen className="text-3xl text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-peach-500 to-pink-500 bg-clip-text text-transparent">
                My BookShelf
              </h1>
              <p className="text-sm text-gray-500">Track your reading journey</p>
            </div>
          </div>

          {/* Add Button */}
          <button
            onClick={onAddBook}
            className="flex items-center gap-2 bg-gradient-to-r from-peach-400 to-peach-500 hover:from-peach-500 hover:to-peach-600 text-white px-6 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
          >
            <FaPlus className="text-lg" />
            <span>Add Book</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;