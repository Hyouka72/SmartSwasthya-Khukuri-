import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo[1].png";
import { useAuth } from "../contexts/AuthContext";
import { useUser, SignOutButton } from "@clerk/clerk-react";
import QRCode from "react-qr-code"; // ✅ Modern QR code component

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false); // New state for profile dropdown
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);

  const { logout } = useAuth();
  const { user } = useUser();
  const navigate = useNavigate();
  const qrCodeData = user ? user.id : "";

  // Function to close all overlays (mobile menu, dropdowns, QR code, profile dropdown)
  const closeAllOverlays = () => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsProfileDropdownOpen(false); // Close profile dropdown
    setIsQrCodeOpen(false);
  };

  // Toggles the profile dropdown
  const handleUserProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsServicesDropdownOpen(false); // Close other dropdowns
    setIsQrCodeOpen(false); // Ensure QR code is closed if profile dropdown opens
  };

  // Handles showing the QR code and closing profile dropdown
  const handleShowQrCode = () => {
    setIsQrCodeOpen(true);
    setIsProfileDropdownOpen(false); // Close profile dropdown after selecting QR
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" onClick={closeAllOverlays} className="flex items-center">
          <img src={logo} alt="Swastha Logo" className="h-10 sm:h-12 mr-3" />
          <span className="text-2xl sm:text-3xl font-bold text-blue-700">
            Swastha
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link
            to="/"
            className="text-lg text-gray-700 hover:text-blue-700 transition duration-300"
            onClick={closeAllOverlays}
          >
            Home
          </Link>

          {/* Services Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsServicesDropdownOpen(true)}
            onMouseLeave={() => setIsServicesDropdownOpen(false)}
          >
            <button className="flex items-center text-lg text-gray-700 hover:text-blue-700 focus:outline-none py-2">
              Services
              <svg
                className="ml-1 w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>
            {isServicesDropdownOpen && (
              <div className="absolute left-0 mt-0.5 w-60 bg-white shadow-lg rounded-md py-2 z-50 border border-gray-100">
                <Link
                  to="/services/general-checkups"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                  onClick={closeAllOverlays}
                >
                  General Check-ups
                </Link>
                <Link
                  to="/services/preventive-care"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                  onClick={closeAllOverlays}
                >
                  Preventive Care
                </Link>
                <Link
                  to="/services/telehealth-consultations"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                  onClick={closeAllOverlays}
                >
                  Telehealth Consultations
                </Link>
                <Link
                  to="/services/emergency-care"
                  className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                  onClick={closeAllOverlays}
                >
                  Emergency Care
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="text-lg text-gray-700 hover:text-blue-700 transition duration-300"
            onClick={closeAllOverlays}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-lg text-gray-700 hover:text-blue-700 transition duration-300"
            onClick={closeAllOverlays}
          >
            Contact
          </Link>
          <Link
            to="/appointment"
            className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition duration-300 shadow-md"
            onClick={closeAllOverlays}
          >
            Appointment
          </Link>

          {user ? (
            <>
              {/* User Profile Picture & Dropdown */}
              <div className="relative">
                <img
                  src={user.imageUrl}
                  alt="User Profile"
                  className="h-10 w-10 rounded-full object-cover cursor-pointer"
                  onClick={handleUserProfileClick} // Click to open dropdown
                />
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
                    <button
                      onClick={handleShowQrCode}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                    >
                      Show QR Code
                    </button>
                    <SignOutButton
                      signOutCallback={() => {
                        navigate("/auth");
                        closeAllOverlays();
                        if (logout) logout();
                      }}
                    >
                      <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-100 hover:text-red-700 transition duration-200">
                        Logout
                      </button>
                    </SignOutButton>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              to="/auth"
              className="border border-blue-600 text-blue-600 px-6 py-2.5 rounded-full hover:bg-blue-50 transition duration-300 shadow-sm"
              onClick={closeAllOverlays}
            >
              Login/Signup
            </Link>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-gray-700 focus:outline-none"
            aria-label="Toggle mobile menu"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white pb-4 shadow-lg">
          <nav className="flex flex-col items-center space-y-4 pt-4">
            <Link
              to="/"
              className="text-gray-700 hover:text-blue-700 text-lg font-medium py-2"
              onClick={closeAllOverlays}
            >
              Home
            </Link>
            <div className="relative w-full text-center">
              <button
                onClick={() =>
                  setIsServicesDropdownOpen(!isServicesDropdownOpen)
                }
                className="flex items-center justify-center w-full text-gray-700 hover:text-blue-700 text-lg font-medium py-2 focus:outline-none"
                aria-expanded={isServicesDropdownOpen}
              >
                Services
                <svg
                  className={`ml-1 w-4 h-4 transform transition-transform ${
                    isServicesDropdownOpen ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
              {isServicesDropdownOpen && (
                <div className="mt-2 w-full bg-gray-50 rounded-md py-2 border border-gray-100">
                  <Link
                    to="/services/general-checkups"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                    onClick={closeAllOverlays}
                  >
                    General Check-ups
                  </Link>
                  <Link
                    to="/services/preventive-care"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                    onClick={closeAllOverlays}
                  >
                    Preventive Care
                  </Link>
                  <Link
                    to="/services/telehealth-consultations"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                    onClick={closeAllOverlays}
                  >
                    Telehealth Consultations
                  </Link>
                  <Link
                    to="/services/emergency-care"
                    className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                    onClick={closeAllOverlays}
                  >
                    Emergency Care
                  </Link>
                </div>
              )}
            </div>
            <Link
              to="/about"
              className="text-gray-700 hover:text-blue-700 text-lg font-medium py-2"
              onClick={closeAllOverlays}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-blue-700 text-lg font-medium py-2"
              onClick={closeAllOverlays}
            >
              Contact
            </Link>
            <Link
              to="/appointment"
              className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition duration-300 shadow-md w-max"
              onClick={closeAllOverlays}
            >
              Appointment
            </Link>

            {user ? (
              <>
                {/* Mobile User Profile Image & Dropdown */}
                <div className="relative">
                  <img
                    src={user.imageUrl}
                    alt="User Profile"
                    className="h-10 w-10 rounded-full object-cover cursor-pointer"
                    onClick={handleUserProfileClick} // Click to open dropdown
                  />
                  {isProfileDropdownOpen && (
                    <div className="mt-2 w-48 bg-white rounded-md shadow-lg py-1 border border-gray-100">
                      <button
                        onClick={handleShowQrCode}
                        className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                      >
                        Show QR Code
                      </button>
                      <SignOutButton
                        signOutCallback={() => {
                          navigate("/auth");
                          closeAllOverlays();
                          if (logout) logout();
                        }}
                      >
                        <button className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-red-100 hover:text-red-700 transition duration-200">
                          Logout
                        </button>
                      </SignOutButton>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/auth"
                className="text-blue-600 border border-blue-600 px-6 py-2.5 rounded-full hover:bg-blue-50 transition duration-300 shadow-sm w-max"
                onClick={closeAllOverlays}
              >
                Login/Signup
              </Link>
            )}
          </nav>
        </div>
      )}

      {/* QR Code Modal (remains the same) */}
      {isQrCodeOpen && user && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeAllOverlays}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-md relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute top-2 right-3 text-xl"
              onClick={closeAllOverlays}
            >
              &times;
            </button>
            <h2 className="text-center text-lg font-semibold mb-4">
              Your QR Code
            </h2>
            <div className="flex justify-center bg-gray-100 p-4 rounded">
              <QRCode value={qrCodeData} size={200} />
            </div>
            <p className="mt-4 text-center text-sm text-gray-600">
              User ID:{" "}
              <span className="text-blue-700 font-mono">{qrCodeData}</span>
            </p>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
