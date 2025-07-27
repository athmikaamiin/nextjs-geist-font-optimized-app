import React, { useState } from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.className = newTheme;
  };

  return (
    <div className="min-h-screen">
      <header className="flex justify-between items-center p-6 border-b border-gray-300 bg-white shadow-sm">
        <nav>
          <ul className="flex space-x-8">
            <li>
              <Link 
                to="/" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                to="/upload" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Upload Report
              </Link>
            </li>
            <li>
              <Link 
                to="/family" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Family
              </Link>
            </li>
            <li>
              <Link 
                to="/chat" 
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors duration-200"
              >
                Chat
              </Link>
            </li>
          </ul>
        </nav>
        <button
          onClick={toggleTheme}
          className="px-4 py-2 border border-gray-400 rounded-lg hover:bg-gray-100 transition-colors duration-200 font-medium"
        >
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </button>
      </header>
      <main className="p-6 max-w-6xl mx-auto">
        {children}
      </main>
      <footer className="p-6 mt-12 text-center border-t border-gray-300 bg-gray-50">
        <p className="text-gray-600">© 2024 Health Report Manager - Your Health, Our Priority</p>
      </footer>
    </div>
  );
};

export default Layout;
