// src/Component/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo[1].png'; // Using the specific uploaded logo name
import AuthPage from '../pages/AuthPage'
function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = AuthPage();

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
    alert('You have been logged out.');
  };

  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-xl sticky top-0 z-50 transition-all duration-300">
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between p-4 sm:p-6 lg:p-8">
        {/* Logo and Brand Name */}
        <div className="flex items-center space-x-3">
          <Link to="/" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="Swastha Logo"
              className="h-12 w-auto drop-shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <span className="text-4xl font-extrabold text-white drop-shadow-md transition-colors duration-300 group-hover:text-blue-200">
              Swastha
            </span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8 lg:space-x-12 items-center">
          <Link
            to="/"
            className="text-lg font-semibold text-white hover:text-blue-200 transition-colors duration-300 py-2 px-3 rounded-md"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-lg font-semibold text-white hover:text-blue-200 transition-colors duration-300 py-2 px-3 rounded-md"
          >
            About Us
          </Link>
          <Link
            to="/services"
            className="text-lg font-semibold text-white hover:text-blue-200 transition-colors duration-300 py-2 px-3 rounded-md"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-lg font-semibold text-white hover:text-blue-200 transition-colors duration-300 py-2 px-3 rounded-md"
          >
            Contact Us
          </Link>

          {/* Conditional rendering for Login/Register vs. Logout */}
          {isLoggedIn ? (
            <>
              <span className="text-lg font-semibold text-blue-200">Hello, {user?.username}!</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white font-bold py-2 px-6 rounded-full shadow-md hover:bg-red-600 transition-all duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="bg-white text-blue-800 font-extrabold py-3 px-8 rounded-full shadow-lg hover:bg-blue-100 hover:shadow-xl
                         transition-all duration-300 transform hover:scale-105 active:scale-95 border-2 border-blue-800"
            >
              Login / Register
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white hover:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-300 rounded-md p-2"
            aria-label="Toggle mobile menu"
          >
            <svg className="w-9 h-9" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-blue-700 shadow-xl py-4 px-6 absolute w-full z-40">
          <Link to="/" className="block py-3 text-lg font-semibold text-white hover:bg-blue-600 rounded-md transition-colors duration-300 px-4" onClick={() => setIsMobileMenuOpen(false)}>
            Home
          </Link>
          <Link to="/about" className="block py-3 text-lg font-semibold text-white hover:bg-blue-600 rounded-md transition-colors duration-300 px-4" onClick={() => setIsMobileMenuOpen(false)}>
            About Us
          </Link>
          <Link to="/services" className="block py-3 text-lg font-semibold text-white hover:bg-blue-600 rounded-md transition-colors duration-300 px-4" onClick={() => setIsMobileMenuOpen(false)}>
            Services
          </Link>
          <Link to="/contact" className="block py-3 text-lg font-semibold text-white hover:bg-blue-600 rounded-md transition-colors duration-300 px-4" onClick={() => setIsMobileMenuOpen(false)}>
            Contact Us
          </Link>
          {isLoggedIn ? (
            <>
              <span className="block py-3 text-lg font-semibold text-blue-200 px-4">Hello, {user?.username}!</span>
              <button
                onClick={handleLogout}
                className="block w-full text-left py-3 px-4 text-lg font-extrabold bg-red-500 text-white rounded-md text-center mt-4 shadow-md hover:bg-red-600 transition-colors duration-300"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/auth"
              className="block w-full text-left py-3 px-4 text-lg font-extrabold bg-white text-blue-800 rounded-md text-center mt-4 shadow-md hover:bg-blue-100 transition-colors duration-300"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Login / Register
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

export default Header;