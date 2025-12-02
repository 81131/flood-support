import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Phone, Copy, Check, Search, ArrowUpDown } from 'lucide-react';
import { hotlineData } from '../data/rescueData';

const ContactPage = () => {
  // State for copy feedback
  const [copiedId, setCopiedId] = useState(null);
  
  // State for Search and Sort
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc'); // 'asc' or 'desc'
  const [isSorted, setIsSorted] = useState(false); // To check if sort is active

  const handleCopy = (id, number) => {
    navigator.clipboard.writeText(number);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const toggleSort = () => {
    setIsSorted(true);
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };

  // Filter and Sort Logic
  const filteredAndSortedData = useMemo(() => {
    // 1. Filter
    let data = hotlineData.filter((item) => 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.district.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // 2. Sort (only if active)
    if (isSorted) {
      data = [...data].sort((a, b) => {
        const districtA = a.district.toLowerCase();
        const districtB = b.district.toLowerCase();
        
        if (districtA < districtB) return sortOrder === 'asc' ? -1 : 1;
        if (districtA > districtB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return data;
  }, [searchTerm, sortOrder, isSorted]);

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

      <main className="flex-grow max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
            National Emergency Hotlines
          </h2>
          <p className="mt-2 text-gray-600">
            Search by service name or district, and click the district header to sort.
          </p>
        </div>

        {/* Controls: Search Bar */}
        <div className="mb-6 flex justify-center">
          <div className="relative w-full max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 sm:text-sm shadow-sm"
              placeholder="Search by District or Service..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Table Container */}
        <div className="bg-white shadow-sm rounded-lg border border-gray-200 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                  Contact Name
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3">
                  Number / Action
                </th>
                {/* Sortable Header */}
                <th 
                  scope="col" 
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider w-1/3 cursor-pointer hover:bg-gray-100 group select-none"
                  onClick={toggleSort}
                >
                  <div className="flex items-center justify-end gap-1">
                    District
                    <ArrowUpDown className={`w-4 h-4 transition-colors ${isSorted ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAndSortedData.length > 0 ? (
                filteredAndSortedData.map((hotline) => (
                  <tr key={hotline.id} className="hover:bg-gray-50 transition-colors">
                    {/* Column 1: Name */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {hotline.name}
                    </td>

                    {/* Column 2: Number & Actions */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end items-center gap-3">
                        <a 
                          href={`tel:${hotline.number}`} 
                          className="text-blue-600 hover:text-blue-800 flex items-center gap-1 px-3 py-1.5 rounded-md hover:bg-blue-50 transition-colors"
                        >
                          <Phone className="w-4 h-4" />
                          {hotline.number}
                        </a>

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
                      </div>
                    </td>
                        
                    {/* Column 3: District */}
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                        {hotline.district}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="px-6 py-10 text-center text-gray-500">
                    No results found for "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default ContactPage;