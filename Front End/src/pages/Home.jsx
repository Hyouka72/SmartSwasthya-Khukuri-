// Frontend/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Hospital1 from '../assets/hospital1.jpg';
function Home() {
  // Define an array of slider content objects
  const sliderContent = [
    {
      image: "https://via.placeholder.com/800x600/6A7EE8/FFFFFF?text=Slide+1%3A+Patient+Care", // Replace with your image 1
      alt: "Dedicated Patient Care",
      overlayTitle: "Dedicated Patient Care",
      overlayDescription: "Our compassionate team puts your well-being first."
    },
    {
      image: "https://via.placeholder.com/800x600/4CAF50/FFFFFF?text=Slide+2%3A+Modern+Facilities", // Replace with your image 2
      alt: "State-of-the-Art Facilities",
      overlayTitle: "Modern Facilities",
      overlayDescription: "Equipped with advanced technology for precise treatment."
    },
    {
      image: "https://via.placeholder.com/800x600/FF9800/FFFFFF?text=Slide+3%3A+Expert+Doctors", // Replace with your image 3
      alt: "Experienced Medical Professionals",
      overlayTitle: "Expert Medical Team",
      overlayDescription: "Trust in our highly skilled and experienced doctors."
    },
    {
      image: "https://via.placeholder.com/800x600/03A9F4/FFFFFF?text=Slide+4%3A+Preventive+Health", // Replace with your image 4
      alt: "Focus on Preventive Health",
      overlayTitle: "Preventive Wellness",
      overlayDescription: "Proactive care to keep you healthy and strong."
    },
    {
      image: "https://via.placeholder.com/800x600/9C27B0/FFFFFF?text=Slide+5%3A+Community+Wellbeing", // Replace with your image 5
      alt: "Promoting Community Wellbeing",
      overlayTitle: "Community Health",
      overlayDescription: "Committed to fostering a healthier local community."
    },
    {
      image: "https://via.placeholder.com/800x600/F44336/FFFFFF?text=Slide+6%3A+Holistic+Approach", // Replace with your image 6
      alt: "Holistic Approach to Health",
      overlayTitle: "Holistic Health Solutions",
      overlayDescription: "Integrating mind, body, and spirit for complete well-being."
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        (prevIndex + 1) % sliderContent.length
      );
    }, 5000); // Change slide every 5 seconds (adjust as needed)

    return () => clearInterval(intervalId);
  }, [sliderContent.length]);

  return (
    // Main content wrapper:
    // Increased vertical padding slightly and ensured horizontal padding is robust
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-16">

      {/* Hero Section */}
      {/* Increased bottom margin for more separation */}
      <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-10 sm:p-16 mb-28 shadow-2xl overflow-hidden
                          md:flex md:items-center md:justify-between transform hover:scale-[1.005] transition-transform duration-500 ease-in-out">
        {/* Decorative background shapes (no change needed for alignment) */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-white bg-opacity-15 rounded-full -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white bg-opacity-15 rounded-full translate-x-1/4 translate-y-1/4"></div>

        <div className="relative z-10 text-center md:text-left md:w-1/2 md:pr-10">
          {/* Adjusted heading margin-bottom for better flow */}
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
            Your Health, Our Priority.
          </h1>
          {/* Adjusted paragraph margin-bottom */}
          <p className="text-lg sm:text-xl leading-relaxed mb-10 opacity-95">
            Compassionate care, innovative solutions, and a healthier future for you and your family.
          </p>
          <Link to="/appointment"
                className="bg-white text-blue-700 hover:bg-blue-800 hover:text-white
                           font-bold py-3.5 px-9 rounded-full shadow-lg hover:shadow-xl
                           transition-all duration-300 transform hover:scale-105 active:scale-100
                           inline-block">
            Book an Appointment
          </Link>
        </div>

        {/* --- Slider Integration --- */}
        <div className="relative z-10 mt-10 md:mt-0 md:w-1/2 flex justify-center items-center min-h-[300px] sm:min-h-[400px] overflow-hidden rounded-xl">
          {sliderContent.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out
                          ${index === currentSlideIndex ? 'opacity-100' : 'opacity-0'}`}
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label={slide.alt}
            >
              {/* Overlay content directly on the image */}
              {index === currentSlideIndex && (
                <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-end p-6 text-white transition-opacity duration-700 ease-in-out">
                  <h3 className="text-2xl font-semibold mb-2 drop-shadow-lg">{slide.overlayTitle}</h3>
                  <p className="text-sm leading-snug drop-shadow-md">{slide.overlayDescription}</p>
                </div>
              )}
            </div>
          ))}
        </div>
        {/* --- End Slider Integration --- */}
      </section>

      {/* About Us Section */}
      {/* Increased vertical padding and bottom margin */}
      <section className="bg-white p-14 rounded-xl shadow-lg mb-28 text-gray-800
                          transform hover:scale-[1.005] transition-transform duration-500 ease-in-out">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">About Swastha</h2>
        {/* Max width and auto margins ensure the paragraph is centered and readable */}
        <p className="text-lg leading-loose text-center max-w-3xl mx-auto">
          At Swastha, we believe in a holistic approach to health. Our team of dedicated professionals is committed to providing personalized, high-quality care that addresses not just your symptoms, but your overall well-being. We combine cutting-edge medical technology with compassionate human touch to ensure you receive the best possible care.
        </p>
      </section>

      {/* Our Services Section */}
      {/* Increased bottom margin */}
      <section className="mb-28">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">Our Comprehensive Services</h2>
        {/* Added justify-items-center for potential centering of smaller cards if the grid doesn't fill entirely */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          {/* Each Link block already has good internal padding and shadows */}
          <Link to="/services/general-checkups" className="block bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full max-w-sm"> {/* Added w-full max-w-sm for consistent card width on smaller screens */}
            <h3 className="text-xl font-semibold text-gray-900 mb-4">General Check-ups</h3>
            <p className="text-gray-600 leading-normal">Regular health assessments to keep you on track.</p>
          </Link>

          <Link to="/services/preventive-care" className="block bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full max-w-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Preventive </h3>
            <p className="text-gray-600 leading-normal">Programs designed to prevent illness and promote wellness.</p>
          </Link>

          <Link to="/services/telehealth-consultations" className="block bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full max-w-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Telehealth Consultations</h3>
            <p className="text-gray-600 leading-normal">Convenient online medical advice and support.</p>
          </Link>

          <Link to="/services/emergency-care" className="block bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full max-w-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Emergency Care</h3>
            <p className="text-gray-600 leading-normal">Rapid response for urgent medical needs.</p>
          </Link>
        </div>
      </section>

      {/* Testimonial Section */}
      {/* Increased vertical padding and bottom margin */}
      <section className="bg-blue-100 p-14 rounded-xl shadow-lg mb-28 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">What Our Patients Say</h2>
        {/* Ensured testimonials are well-spaced and self-contained */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center"> {/* Added justify-items-center */}
          <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md"> {/* Added w-full max-w-md for consistent card width */}
            <p className="text-gray-700 italic mb-6 leading-loose">"The care I received at Swastha was exceptional. The staff are incredibly kind and the doctors are thorough and knowledgeable. Highly recommend!"</p>
            <p className="font-semibold text-gray-900">- Jane Doe, Patient</p>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
            <p className="text-gray-700 italic mb-6 leading-loose">"Swastha changed my perspective on healthcare. Their holistic approach truly made a difference in my recovery journey."</p>
            <p className="font-semibold text-gray-900">- John Smith, Patient</p>
          </div>
        </div>
      </section>

      {/* Call to Action / Contact Section */}
      {/* Increased vertical padding */}
      <section className="text-center bg-gradient-to-r from-green-500 to-green-700 text-white
                          rounded-xl p-12 sm:p-18 shadow-xl transform hover:scale-[1.005] transition-transform duration-500 ease-in-out">
        {/* Adjusted heading margin-bottom */}
        <h2 className="text-3xl sm:text-4xl font-bold mb-9">Ready to Take Control of Your Health?</h2>
        {/* Adjusted paragraph margin-bottom */}
        <p className="text-lg sm:text-xl leading-relaxed mb-12 opacity-95">
          Contact us today to schedule your consultation and begin your journey to a healthier you.
        </p>
        <button className="bg-white text-green-700 hover:bg-green-800 hover:text-white
                           font-bold py-3.5 px-9 rounded-full shadow-lg hover:shadow-xl
                           transition-all duration-300 transform hover:scale-105 active:scale-100">
          Get in Touch
        </button>
      </section>
    </div>
  );
}

export default Home;