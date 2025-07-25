// Frontend/src/pages/PreventiveCare.jsx
import React from 'react';
import { Link } from 'react-router-dom';

function PreventiveCare() {
  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-12">
      <section className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-xl p-10 sm:p-16 mb-12 shadow-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          Preventive Care Services
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed opacity-95 max-w-3xl mx-auto">
          Proactive measures to keep you healthy, happy, and reduce the risk of future illnesses.
        </p>
      </section>

      <section className="bg-white p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Our Approach to Prevention</h2>
        <p className="text-lg leading-relaxed mb-4">
          Preventive care at Swastha goes beyond just treating illness. We focus on empowering you with the knowledge and tools to lead a healthy lifestyle, prevent diseases, and improve your overall quality of life.
        </p>
        <ul className="list-disc list-inside text-lg space-y-2 text-gray-700 ml-4">
          <li>Personalized wellness plans</li>
          <li>Vaccinations and immunizations</li>
          <li>Chronic disease management and education</li>
          <li>Nutritional counseling</li>
          <li>Stress management techniques</li>
          <li>Early screening tests (e.g., blood tests, mammograms)</li>
        </ul>
      </section>

      <section className="bg-green-50 p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800 text-center">
        <h2 className="text-3xl font-bold text-green-700 mb-6">Why Preventive Care Matters</h2>
        <p className="text-lg leading-relaxed mb-4">
          Investing in preventive care means investing in your future health. It helps:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Reduce Health Risks</h3>
            <p className="text-gray-700 text-sm">Minimize the chances of developing serious health conditions.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Improve Quality of Life</h3>
            <p className="text-gray-700 text-sm">Live a healthier, more energetic life.</p>
          </div>
          <div className="p-4 bg-white rounded-lg shadow-md">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Save Costs</h3>
            <p className="text-gray-700 text-sm">Preventative measures can save significant medical costs long-term.</p>
          </div>
        </div>
      </section>

      <section className="text-center mt-12">
        <Link
          to="/appointment"
          className="bg-green-600 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:bg-green-700
                     transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Schedule a Preventive Consultation
        </Link>
      </section>
    </div>
  );
}

export default PreventiveCare;