// Frontend/src/Component/Header.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo[1].png';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isLoggedIn, user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/auth'); // Redirect to auth page after logout
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            {/* UPDATED: Use the imported Logo variable as the src */}
            <img src={logo} alt="Swastha Logo" className="h-10 sm:h-12 mr-3" />
            <span className="text-2xl sm:text-3xl font-bold text-blue-700">Swastha</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link to="/" className="text-gray-700 hover:text-blue-700 text-lg font-medium transition duration-300">Home</Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
          >
            <button className="flex items-center text-gray-700 hover:text-blue-700 text-lg font-medium transition duration-300 focus:outline-none py-2">
              Services
              <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
            </button>
            {isServicesDropdownOpen && (
              <div className="absolute left-0 mt-0.5 w-60 bg-white rounded-md shadow-lg py-2 z-50 border border-gray-100">
                <Link to="/services/general-checkups" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200">General Check-ups</Link>
                <Link to="/services/preventive-care" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200">Preventive Care</Link>
                <Link to="/services/telehealth-consultations" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200">Telehealth Consultations</Link>
                <Link to="/services/emergency-care" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200">Emergency Care</Link>
              </div>
            )}
          </div>
          <Link to="/about" className="text-gray-700 hover:text-blue-700 text-lg font-medium transition duration-300">About Us</Link>
          <Link to="/contact" className="text-gray-700 hover:text-blue-700 text-lg font-medium transition duration-300">Contact</Link>
          <Link to="/appointment" className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition duration-300 shadow-md">Appointment</Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition duration-300 shadow-md"
            >
              Logout
            </button>
          ) : (
            <Link to="/auth" className="text-blue-600 border border-blue-600 px-6 py-2.5 rounded-full hover:bg-blue-50 transition duration-300 shadow-sm">Login/Signup</Link>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-700 focus:outline-none">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg pb-4">
          <nav className="flex flex-col items-center space-y-4 pt-4">
            <Link to="/" className="text-gray-700 hover:text-blue-700 text-lg font-medium transition duration-300 py-2" onClick={() => { setIsMobileMenuOpen(false); setIsServicesDropdownOpen(false); }}>Home</Link>
            <div className="relative w-full text-center">
              <button
                onClick={() => setIsServicesDropdownOpen(!isServicesDropdownOpen)}
                className="flex items-center justify-center w-full text-gray-700 hover:text-blue-700 text-lg font-medium transition duration-300 py-2 focus:outline-none"
              >
                Services
                <svg className={`ml-1 w-4 h-4 transform transition-transform ${isServicesDropdownOpen ? 'rotate-180' : 'rotate-0'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
              </button>
              {isServicesDropdownOpen && (
                <div className="mt-2 w-full bg-gray-50 rounded-md py-2 border border-gray-100">
                  <Link to="/services/general-checkups" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200" onClick={() => { setIsMobileMenuOpen(false); setIsServicesDropdownOpen(false); }}>General Check-ups</Link>
                  <Link to="/services/preventive-care" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200" onClick={() => { setIsMobileMenuOpen(false); setIsServicesDropdownOpen(false); }}>Preventive Care</Link>
                  <Link to="/services/telehealth-consultations" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200" onClick={() => { setIsMobileMenuOpen(false); setIsServicesDropdownOpen(false); }}>Telehealth Consultations</Link>
                  <Link to="/services/emergency-care" className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200" onClick={() => { setIsMobileMenuOpen(false); setIsServicesDropdownOpen(false); }}>Emergency Care</Link>
                </div>
              )}
            </div>
            <Link to="/about" className="text-gray-700 hover:text-blue-700 text-lg font-medium transition duration-300 py-2" onClick={() => { setIsMobileMenuOpen(false); setIsServicesDropdownOpen(false); }}>About Us</Link>
            <Link to="/contact" className="text-gray-700 hover:text-blue-700 text-lg font-medium transition duration-300 py-2" onClick={() => { setIsMobileMenuOpen(false); setIsServicesDropdownOpen(false); }}>Contact</Link>
            <Link to="/appointment" className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition duration-300 shadow-md w-max" onClick={() => { setIsMobileMenuOpen(false); setIsServicesDropdownOpen(false); }}>Appointment</Link>
            {user ? (
              <button
                onClick={() => { handleLogout(); setIsMobileMenuOpen(false); setIsServicesDropdownOpen(false); }}
                className="bg-red-500 text-white px-6 py-2.5 rounded-full hover:bg-red-600 transition duration-300 shadow-md w-max"
              >
                Logout
              </button>
            ) : (
              <Link to="/auth" className="text-blue-600 border border-blue-600 px-6 py-2.5 rounded-full hover:bg-blue-50 transition duration-300 shadow-sm w-max" onClick={() => { setIsMobileMenuOpen(false); setIsServicesDropdownOpen(false); }}>Login/Signup</Link>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Header;