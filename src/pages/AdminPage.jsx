import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const { isAdmin } = useAuth();

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-4">You do not have permission to view this page.</p>
        <Link to="/" className="text-blue-600 hover:underline">Return Home</Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Link to="/" className="bg-gray-200 px-4 py-2 rounded hover:bg-gray-300 transition">Back Home</Link>
        </div>

        <div className="bg-white rounded-lg shadow border border-gray-200 p-6">
          <h2 className="text-xl font-semibold mb-4">User Management</h2>
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex">
              <div className="ml-3">
                <p className="text-sm text-yellow-700">
                  <span className="font-bold">Local Emulator Mode:</span> User management (blocking/deleting) is best done via the Emulator UI at <a href="http://localhost:4000/auth" target="_blank" rel="noreferrer" className="underline font-bold">http://localhost:4000/auth</a>.
                </p>
              </div>
            </div>
          </div>
          
          <p className="text-gray-600">
            For advanced user management in production, we will need to integrate the Firebase Admin SDK. 
            For now, use the Local Emulator UI provided by Firebase CLI.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;