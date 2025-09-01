import React from 'react';
const StatCard = ({
  title,
  value,
  change,
  icon,
  iconColor
}) => {
  const isPositive = !change.includes('-');
  const changeColor = isPositive ? 'text-green-600' : 'text-red-600';
  return <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-medium text-gray-500">{title}</h3>
        <div className={`p-2 rounded-md ${iconColor}`}>{icon}</div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-semibold">{value}</p>
          <p className={`text-xs flex items-center ${changeColor}`}>{change}</p>
        </div>
      </div>
    </div>;
};
export default StatCard;