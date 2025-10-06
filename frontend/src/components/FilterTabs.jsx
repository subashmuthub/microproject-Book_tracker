import React from 'react';

const FilterTabs = ({ activeFilter, onFilterChange }) => {
  const filters = [
    { name: 'All', emoji: '📚' },
    { name: 'To Read', emoji: '📖' },
    { name: 'Reading', emoji: '📕' },
    { name: 'Completed', emoji: '✅' }
  ];

  return (
    <div className="bg-white rounded-2xl shadow-lg p-4 mb-8">
      <div className="flex flex-wrap gap-3">
        {filters.map((filter) => (
          <button
            key={filter.name}
            onClick={() => onFilterChange(filter.name)}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              activeFilter === filter.name
                ? 'bg-gradient-to-r from-peach-400 to-peach-500 text-white shadow-lg scale-105'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            <span className="mr-2">{filter.emoji}</span>
            {filter.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;