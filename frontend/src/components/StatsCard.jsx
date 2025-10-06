import React from 'react';

const StatsCard = ({ icon: Icon, title, value, color }) => {
  return (
    <div className={`bg-white rounded-2xl shadow-lg p-6 border-l-4 ${color} hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 slide-up`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
          <h3 className="text-4xl font-bold text-gray-800">{value}</h3>
        </div>
        <div className={`bg-gradient-to-br ${color.replace('border-', 'from-')} to-purple-200 p-4 rounded-2xl`}>
          <Icon className="text-3xl text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;