// Frontend/src/pages/TelehealthConsultations.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function TelehealthConsultations() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white rounded-xl p-10 sm:p-16 mb-12 shadow-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          Telehealth Consultations
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed opacity-95 max-w-3xl mx-auto">
          Access expert medical advice from the comfort of your home, safely and conveniently.
        </p>
      </section>

      <section className="bg-white p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800">
        <h2 className="text-3xl font-bold text-purple-700 mb-6">How Telehealth Works</h2>
        <p className="text-lg leading-relaxed mb-4">
          Our telehealth service connects you with our qualified doctors via secure video calls or phone consultations. It's ideal for follow-up appointments, medication refills, general health advice, and discussing non-emergency symptoms.
        </p>
        <ul className="list-disc list-inside text-lg space-y-2 text-gray-700 ml-4">
          <li>Book an appointment online</li>
          <li>Receive a secure link via email/SMS</li>
          <li>Connect with your doctor from any device</li>
          <li>Receive prescriptions or referrals digitally</li>
          <li>Get medical advice without leaving home</li>
        </ul>
      </section>

      <section className="bg-purple-50 p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800 text-center">
        <h2 className="text-3xl font-bold text-purple-700 mb-6">Benefits of Telehealth</h2>
        <p className="text-lg leading-relaxed mb-4">
          Telehealth offers numerous advantages:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Convenience</h3>
            <p className="text-gray-700 text-sm">Consult a doctor from anywhere, saving time and travel.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Accessibility</h3>
            <p className="text-gray-700 text-sm">Great for those with limited mobility or living in remote areas.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Safety</h3>
            <p className="text-gray-700 text-sm">Reduce exposure to illness by consulting remotely.</p>
          </div>
        </div>
      </section>

      <section className="text-center mt-12">
        <Link
          to="/appointment"
          className="bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-purple-700
                     transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Book a Telehealth Consultation
        </Link>
      </section>
    </div>
  );
}

export default TelehealthConsultations;