import React from 'react';
import { Link } from 'react-router-dom';

const ServiceCard = ({ title, icon, items, action }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 flex flex-col items-center hover:shadow-xl transition-shadow duration-300">
      {/* Icon Area */}
      <div className="mb-4 bg-gray-50 p-4 rounded-full">
        {icon}
      </div>
      
      <h3 className="text-xl font-bold text-gray-800 mb-4">{title}</h3>
      
      {/* List Items */}
      <ul className="w-full text-left mb-6 space-y-2 flex-grow">
        {items.map((item, index) => (
          <li key={index} className="flex items-center text-gray-600 text-sm font-medium">
            <span className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></span>
            {item}
          </li>
        ))}
      </ul>

      {/* Button */}
      <Link 
        to={action} 
        className="mt-auto px-6 py-2 bg-gray-900 text-white text-sm font-semibold rounded-lg hover:bg-gray-700 transition-colors w-full text-center"
      >
        Visit
      </Link>
    </div>
  );
};

export default ServiceCard;