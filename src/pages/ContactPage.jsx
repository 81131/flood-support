import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Copy, Check } from 'lucide-react';
import { hotlineData } from '../data/rescueData';

const ContactPage = () => {
  // State to track which number was just copied (to show "Copied!" feedback)
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = (id, number) => {
    navigator.clipboard.writeText(number);
    setCopiedId(id);
    // Reset the "Copied!" status after 2 seconds
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link to="/rescue" className="flex items-center text-gray-600 hover:text-blue-600 transition-colors">
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span className="font-medium">Back to Rescue Services</span>
          </Link>
        </div>
      </header>

      <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            National Emergency Hotlines
          </h2>
          <p className="mt-2 text-gray-600">
            Click a number to call directly or use the copy button.
          </p>
        </div>

        {/* Table Container */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact Name
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Number / Action
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hotlineData.map((hotline) => (
                <tr key={hotline.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {hotline.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex justify-end items-center gap-3">
                    
                    {/* Phone Link (Click to Call) */}
                    <a 
                      href={`tel:${hotline.number}`} 
                      className="text-blue-600 hover:text-blue-800 flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                      {hotline.number}
                    </a>

                    {/* Copy Button */}
                    <button
                      onClick={() => handleCopy(hotline.id, hotline.number)}
                      className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none"
                      title="Copy number"
                    >
                      {copiedId === hotline.id ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;