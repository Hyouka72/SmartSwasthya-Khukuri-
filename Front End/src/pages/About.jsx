// src/pages/About.jsx
import React from 'react';

function About() {
  // Placeholder data for team members
  const teamMembers = [
    {
      name: "Dr. Anya Sharma",
      title: "Chief Medical Officer",
      image: "https://via.placeholder.com/150/4CAF50/FFFFFF?text=Dr.+Sharma",
      description: "With over 20 years of experience in internal medicine, Dr. Sharma leads our medical team with a focus on holistic patient care and innovative treatment protocols."
    },
    {
      name: "Mr. Rohan Gupta",
      title: "Chief Operating Officer",
      image: "https://via.placeholder.com/150/03A9F4/FFFFFF?text=Mr.+Gupta",
      description: "Rohan oversees all operational aspects of Swastha, ensuring seamless patient experiences and efficient service delivery. His expertise in healthcare management is invaluable."
    },
    {
      name: "Ms. Priya Singh",
      title: "Head of Patient Relations",
      image: "https://via.placeholder.com/150/FF9800/FFFFFF?text=Ms.+Singh",
      description: "Priya is dedicated to ensuring every patient feels heard, respected, and cared for. She manages patient feedback and strives for continuous improvement in our services."
    }
  ];

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-12">

      {/* Hero Section for About Page */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-10 sm:p-16 mb-12 shadow-2xl text-center">
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-4">
          About Swastha: Your Health Partner
        </h1>
        <p className="text-lg sm:text-xl leading-relaxed opacity-95 max-w-3xl mx-auto">
          Dedicated to fostering a healthier community through compassionate care, advanced medical practices, and a patient-first approach.
        </p>
      </section>

      {/* Our Mission Section */}
      <section className="bg-white p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-8">Our Mission</h2>
        <p className="text-lg leading-relaxed text-center max-w-4xl mx-auto">
          Our mission at Swastha is to provide accessible, high-quality, and holistic healthcare services that empower individuals to achieve optimal health and well-being. We are committed to integrating cutting-edge medical science with empathetic care, ensuring every patient receives personalized attention and effective treatment.
        </p>
      </section>

      {/* Our Values Section */}
      <section className="bg-blue-50 p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Our Core Values</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6 rounded-lg bg-white shadow-md transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Compassion</h3>
            <p className="text-gray-600">We treat every patient with empathy, respect, and kindness, understanding their unique needs and concerns.</p>
          </div>
          <div className="p-6 rounded-lg bg-white shadow-md transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Excellence</h3>
            <p className="text-gray-600">We strive for the highest standards in medical care, constantly innovating and improving our services.</p>
          </div>
          <div className="p-6 rounded-lg bg-white shadow-md transform hover:scale-105 transition-transform duration-300">
            <h3 className="text-xl font-semibold text-blue-800 mb-3">Integrity</h3>
            <p className="text-gray-600">We uphold the strongest ethical principles, ensuring transparency and trust in all our interactions.</p>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="bg-white p-8 sm:p-12 rounded-xl shadow-lg mb-12 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">Meet Our Dedicated Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="flex flex-col items-center text-center p-6 bg-blue-50 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-blue-200 shadow-lg"
              />
              <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-blue-600 font-medium mb-3">{member.title}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{member.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="bg-gradient-to-r from-green-500 to-green-700 text-white rounded-xl p-10 sm:p-16 text-center shadow-xl">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8">Why Choose Swastha?</h2>
        <p className="text-lg sm:text-xl leading-relaxed mb-8 opacity-95 max-w-3xl mx-auto">
          Choosing Swastha means opting for a healthcare partner who genuinely cares. We offer:
        </p>
        <ul className="list-disc list-inside text-left mx-auto max-w-md space-y-3 text-lg opacity-90">
          <li>Personalized Treatment Plans tailored to your unique health needs.</li>
          <li>Access to a Network of Top Specialists and comprehensive services under one roof.</li>
          <li>A Focus on Preventive Care to keep you healthy long-term.</li>
          <li>Cutting-Edge Technology ensuring accurate diagnostics and effective treatments.</li>
          <li>Seamless Patient Experience from booking to recovery.</li>
        </ul>
      </section>

    </div>
  );
}

export default About;