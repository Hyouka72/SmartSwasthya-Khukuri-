import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo[1].png"; // Make sure this path is correct
import { useAuth } from "../contexts/AuthContext"; // Assuming this context exists
import { useUser, SignOutButton } from "@clerk/clerk-react"; // Assuming Clerk integration

import QRCode from "react-qr-code"; // Ensure react-qr-code is correctly installed: npm install react-qr-code or yarn add react-qr-code

// Dummy Doctor Data (remains the same)
const dummyDoctors = [
  { id: "doc1", name: "Dr. Alice Smith", specialty: "General Physician" },
  { id: "doc2", name: "Dr. Bob Johnson", specialty: "Pediatrician" },
  { id: "doc3", name: "Dr. Carol White", specialty: "Dermatologist" },
  { id: "doc4", name: "Dr. David Green", specialty: "Cardiologist" },
  { id: "doc5", name: "Dr. Emily Brown", specialty: "Neurologist" },
  { id: "doc6", name: "Dr. Frank Black", specialty: "Orthopedic Surgeon" },
  { id: "doc7", name: "Dr. Grace Lee", specialty: "Ophthalmologist" },
  { id: "doc8", name: "Dr. Henry Wilson", specialty: "Dentist" },
];

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isQrCodeOpen, setIsQrCodeOpen] = useState(false);

  // Search related states
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [isSearchDropdownOpen, setIsSearchDropdownOpen] = useState(false);

  const { logout } = useAuth(); // Destructure logout from useAuth
  const { user } = useUser(); // Destructure user from useUser (Clerk)
  const navigate = useNavigate();
  const qrCodeData = user ? user.id : "";

  // Function to close all overlays (mobile menu, dropdowns, QR code, profile dropdown, search dropdown)
  const closeAllOverlays = () => {
    setIsMobileMenuOpen(false);
    setIsServicesDropdownOpen(false);
    setIsProfileDropdownOpen(false);
    setIsQrCodeOpen(false);
    setIsSearchDropdownOpen(false); // Close search dropdown
    setSearchQuery(""); // Clear search query
    setFilteredDoctors([]); // Clear filtered doctors
  };

  // Toggles the profile dropdown
  const handleUserProfileClick = () => {
    setIsProfileDropdownOpen(!isProfileDropdownOpen);
    setIsServicesDropdownOpen(false); // Close other dropdowns
    setIsQrCodeOpen(false); // Ensure QR code is closed if profile dropdown opens
    setIsSearchDropdownOpen(false); // Close search dropdown
  };

  // Handles showing the QR code and closing profile dropdown
  const handleShowQrCode = () => {
    setIsQrCodeOpen(true);
    setIsProfileDropdownOpen(false); // Close profile dropdown after selecting QR
  };

  // Handles changes in the search input
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.length > 0) {
      const filtered = dummyDoctors.filter(
        (doctor) =>
          doctor.name.toLowerCase().includes(query.toLowerCase()) ||
          doctor.specialty.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredDoctors(filtered);
      setIsSearchDropdownOpen(true); // Open search dropdown
    } else {
      setFilteredDoctors([]);
      setIsSearchDropdownOpen(false); // Close search dropdown if query is empty
    }
    // Close other dropdowns when search is active
    setIsServicesDropdownOpen(false);
    setIsProfileDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsQrCodeOpen(false);
  };

  // Handles selection of a doctor from search results
  const handleDoctorSelect = (doctor) => {
    closeAllOverlays(); // Close all overlays including search
    navigate(`/doctor/${doctor.id}`); // Navigate to doctor's profile page
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 font-inter">
      <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-4 flex flex-wrap justify-between items-center gap-y-4">
        {/* Logo */}
        <Link to="/" onClick={closeAllOverlays} className="flex items-center">
          <img
            src={logo}
            alt="Swastha Logo"
            className="h-10 sm:h-12 mr-3 rounded-md"
          />
          <span className="text-2xl sm:text-3xl font-bold text-blue-700">
            Swastha
          </span>
        </Link>

        {/* Search Bar (visible on desktop, takes full width on mobile) */}
        <div className="relative w-full md:w-1/3 order-3 md:order-none md:flex-grow md:mx-4">
          <input
            type="text"
            placeholder="Search doctors by name or specialty..."
            className="w-full p-2 pl-10 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 shadow-sm"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() =>
              searchQuery.length > 0 && setIsSearchDropdownOpen(true)
            }
            onBlur={() => setTimeout(() => setIsSearchDropdownOpen(false), 200)}
          />
          <svg
            className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>

          {isSearchDropdownOpen && filteredDoctors.length > 0 && (
            <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-40 max-h-60 overflow-y-auto">
              {filteredDoctors.map((doctor) => (
                <button
                  key={doctor.id}
                  className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                  onMouseDown={() => handleDoctorSelect(doctor)}
                >
                  <span className="font-semibold">{doctor.name}</span> -{" "}
                  <span className="text-sm text-gray-600">
                    {doctor.specialty}
                  </span>
                </button>
              ))}
            </div>
          )}
          {isSearchDropdownOpen &&
            filteredDoctors.length === 0 &&
            searchQuery.length > 0 && (
              <div className="absolute left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-40 p-4 text-center text-gray-500">
                No doctors found.
              </div>
            )}
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8 order-2">
          <Link
            to="/"
            className="text-lg text-gray-700 hover:text-blue-700 transition duration-300 font-medium"
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
            <button className="flex items-center text-lg text-gray-700 hover:text-blue-700 focus:outline-none py-2 font-medium">
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
                  AI Assistance
                </Link>
              </div>
            )}
          </div>

          <Link
            to="/about"
            className="text-lg text-gray-700 hover:text-blue-700 transition duration-300 font-medium"
            onClick={closeAllOverlays}
          >
            About Us
          </Link>
          <Link
            to="/contact"
            className="text-lg text-gray-700 hover:text-blue-700 transition duration-300 font-medium"
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
                    {/* New: View Insurance Details */}
                    <Link
                      to="/profile/insurance"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                      onClick={closeAllOverlays} // Close all when navigating
                    >
                      View Insurance Details
                    </Link>
                    {/* New: View Medical Reports */}
                    <Link
                      to="/profile/medical-reports"
                      className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                      onClick={closeAllOverlays} // Close all when navigating
                    >
                      View Medical Reports
                    </Link>
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

        {/* Mobile Menu Toggle (order adjusted for mobile view) */}
        <div className="md:hidden order-last">
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

      {/* Mobile Navigation (Conditional Rendering) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white pb-4 shadow-lg border-t border-gray-100">
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
                    AI Assistance
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
                      {/* New: View Insurance Details (Mobile) */}
                      <Link
                        to="/profile/insurance"
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                        onClick={closeAllOverlays}
                      >
                        View Insurance Details
                      </Link>
                      {/* New: View Medical Reports (Mobile) */}
                      <Link
                        to="/profile/medical-reports"
                        className="block px-4 py-2 text-gray-800 hover:bg-blue-100 hover:text-blue-700 transition duration-200"
                        onClick={closeAllOverlays}
                      >
                        View Medical Reports
                      </Link>
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
