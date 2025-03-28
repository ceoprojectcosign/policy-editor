import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold text-indigo-600">PolicyAI</Link>
        <div className="space-x-4">
          <Link to="/login" className="hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;