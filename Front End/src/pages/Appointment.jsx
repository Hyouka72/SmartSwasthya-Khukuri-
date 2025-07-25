// src/pages/Appointment.jsx
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';

function Appointment() {
  const { isLoggedIn, user } = useAuth();

  const [formData, setFormData] = useState({
    name: user ? user.username : '',
    email: '',
    phone: '',
    date: '',
    time: '',
    reason: '',
    doctor: ''
  });

  const [submissionStatus, setSubmissionStatus] = useState(null);

  const doctors = [
    { id: 'general', name: 'General Physician' },
    { id: 'pediatrician', name: 'Pediatrician' },
    { id: 'dermatologist', name: 'Dermatologist' },
    { id: 'cardiologist', name: 'Cardiologist' },
    { id: 'physiotherapist', name: 'Physiotherapist' },
    { id: 'other', name: 'Other / Not sure' }
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmissionStatus(null);

    if (!formData.name || !formData.email || !formData.date || !formData.time || !formData.reason) {
      setSubmissionStatus('error');
      alert('Please fill in all required fields.');
      return;
    }

    console.log('Appointment Data Submitted:', formData);
    console.log('Booked by:', user ? user.username : 'Guest');

    setTimeout(() => {
      setSubmissionStatus('success');
      setFormData({
        name: user ? user.username : '',
        email: '',
        phone: '',
        date: '',
        time: '',
        reason: '',
        doctor: ''
      });
      alert('Your appointment has been booked successfully!');
    }, 1000);
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto px-6 sm:px-10 py-12 text-center">
        <section className="bg-white p-8 sm:p-12 rounded-xl shadow-lg text-gray-800">
          <h2 className="text-3xl font-bold text-red-600 mb-6">Access Denied</h2>
          <p className="text-lg leading-relaxed mb-6">
            You must be logged in to book an appointment.
          </p>
          <p className="text-lg leading-relaxed mb-8">
            Please <Link to="/auth" className="text-blue-600 hover:underline font-semibold">Login</Link> or{' '}
            <Link to="/auth" className="text-blue-600 hover:underline font-semibold">Create an Account</Link> to proceed.
          </p>
          <Link
            to="/auth"
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-blue-700
                       transition-all duration-300 transform hover:scale-105 active:scale-95"
          >
            Go to Login / Register
          </Link>
        </section>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <section className="bg-white p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800">
        <h2 className="text-4xl font-extrabold text-center text-blue-700 mb-10">Book Your Appointment</h2>
        <p className="text-lg leading-relaxed text-center max-w-3xl mx-auto mb-6 text-gray-700">
          Welcome, <span className="font-semibold text-blue-600">{user?.username}</span>! Please fill out the form below to schedule your visit.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-2">
              Full Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              readOnly={!!user}
              className={`mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg
                          ${user ? 'bg-gray-100 cursor-not-allowed' : ''}`}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-lg font-medium text-gray-700 mb-2">
              Email Address <span className="text-red-500">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              placeholder="john.doe@example.com"
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-lg font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              placeholder="+1 234 567 8900"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="date" className="block text-lg font-medium text-gray-700 mb-2">
                Preferred Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              />
            </div>
            <div>
              <label htmlFor="time" className="block text-lg font-medium text-gray-700 mb-2">
                Preferred Time <span className="text-red-500">*</span>
              </label>
              <input
                type="time"
                id="time"
                name="time"
                value={formData.time}
                onChange={handleChange}
                required
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              />
            </div>
          </div>

          <div>
            <label htmlFor="doctor" className="block text-lg font-medium text-gray-700 mb-2">
              Consult with (Optional)
            </label>
            <select
              id="doctor"
              name="doctor"
              value={formData.doctor}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
            >
              <option value="">-- Select a Doctor/Specialty --</option>
              {doctors.map((doc) => (
                <option key={doc.id} value={doc.name}>
                  {doc.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="reason" className="block text-lg font-medium text-gray-700 mb-2">
              Reason for Appointment <span className="text-red-500">*</span>
            </label>
            <textarea
              id="reason"
              name="reason"
              rows="4"
              value={formData.reason}
              onChange={handleChange}
              required
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-lg"
              placeholder="Briefly describe your reason for booking..."
            ></textarea>
          </div>

          {submissionStatus === 'success' && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Success!</strong>
              <span className="block sm:inline ml-2">Your appointment request has been sent. We will contact you shortly.</span>
            </div>
          )}
          {submissionStatus === 'error' && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error!</strong>
              <span className="block sm:inline ml-2">Please correct the errors and try again.</span>
            </div>
          )}

          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-blue-700
                         transition-all duration-300 transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Confirm Appointment
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export default Appointment;