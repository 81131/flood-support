import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home, User } from 'lucide-react';
import ServiceCard from './components/ServiceCard';
import { serviceCards } from './data/services';
// Import the new pages
import RescuePage from './pages/RescuePage';
import ContactPage from './pages/ContactPage';

// --- Components defined internally for simplicity, can be moved later ---

const Header = () => (
  <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
      {/* Left: Home Icon */}
      <div className="flex items-center border-r border-gray-200 pr-4 h-full">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          <Home className="w-8 h-8" />
        </Link>
      </div>

      {/* Center: Title & Nav */}
      <div className="flex-1 flex items-center justify-between px-6">
        <h1 className="text-xl font-bold text-gray-900 hidden md:block">
          Flood Support by DV
        </h1>
        
        <nav className="flex space-x-4">
          {['Donate', 'Supply Notices', 'Shelters'].map((item) => (
            <Link 
              key={item} 
              to={`/${item.toLowerCase().replace(' ', '-')}`}
              className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors border border-transparent hover:border-gray-200"
            >
              {item}
            </Link>
          ))}
        </nav>
      </div>

      {/* Right: User Profile */}
      <div className="flex items-center border-l border-gray-200 pl-4 h-full">
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80">
          <span className="text-sm font-semibold text-gray-800 hidden sm:block">
            User Name
          </span>
          <div className="bg-gray-200 p-2 rounded-full">
            <User className="w-5 h-5 text-gray-700" />
          </div>
        </div>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-50 border-t border-gray-200 mt-12">
    <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <p className="text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Flood Support by DV. All rights reserved.
        <br />
        <span className="text-xs text-gray-400 block mt-2">
          Emergency Contact: 119 | Disaster Management Center: 117
        </span>
      </p>
    </div>
  </footer>
);

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />

      <main className="flex-grow max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How can we help you today?
          </h2>
          <p className="mt-3 max-w-2xl mx-auto text-xl text-gray-500 sm:mt-4">
            Select a category below to access rapid support services.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceCards.map((card, index) => (
            <ServiceCard key={index} {...card} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

// Main App Component with Routing
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* New Routes Added Here */}
        <Route path="/rescue" element={<RescuePage />} />
        <Route path="/rescue/contact" element={<ContactPage />} />
        
        <Route path="/donate" element={<div className="p-10 text-center">Donate Page Placeholder</div>} />
      </Routes>
    </Router>
  );
}