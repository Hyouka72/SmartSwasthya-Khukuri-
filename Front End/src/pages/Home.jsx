// Frontend/src/pages/Home.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import hospital1 from '../assets/hospital1.jpg';
import hospital2 from "../assets/hospital2.jpeg";
import hospital3 from "../assets/hospital3.jpg";
import Chat from "../Component/Chat.jsx"

function Home() {
  // Define an array of slider content objects
  const sliderContent = [
    {
      image: hospital1,
      alt: "Dedicated Patient Care",
      overlayTitle: "Dedicated Patient Care",
      overlayDescription: "Our compassionate team puts your well-being first."
    },
    {
      image: hospital2,
      alt: "State-of-the-Art Facilities",
      overlayTitle: "Modern Facilities",
      overlayDescription: "Equipped with advanced technology for precise treatment."
    },
    {
      image: hospital3,
      alt: "Experienced Medical Professionals",
      overlayTitle: "Expert Medical Team",
      overlayDescription: "Trust in our highly skilled and experienced doctors."
    },
    {
      image: hospital1, // Reusing image
      alt: "Focus on Preventive Health",
      overlayTitle: "Preventive Wellness",
      overlayDescription: "Proactive care to keep you healthy and strong."
    },
    {
      image: hospital2, // Reusing image
      alt: "Promoting Community Wellbeing",
      overlayTitle: "Community Health",
      overlayDescription: "Committed to fostering a healthier local community."
    },
    {
      image: hospital3, // Reusing image
      alt: "Holistic Approach to Health",
      overlayTitle: "Holistic Health Solutions",
      overlayDescription: "Integrating mind, body, and spirit for complete well-being."
    }
  ];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  // Add state for controlling chat visibility
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlideIndex((prevIndex) =>
        (prevIndex + 1) % sliderContent.length
      );
    }, 8000); // Set to 8 seconds for longer hold

    return () => clearInterval(intervalId);
  }, [sliderContent.length]);

  // Function to handle AI assistance click
  const handleAIAssistantClick = () => {
    setIsChatOpen(true);
    // Scroll to bottom to show the chat
    setTimeout(() => {
      window.scrollTo({ 
        top: document.body.scrollHeight, 
        behavior: 'smooth' 
      });
    }, 100);
  };

  return (
    <div className="max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-16 py-16">

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-500 to-blue-700 text-white rounded-xl p-10 sm:p-16 mb-28 shadow-2xl overflow-hidden
                          md:flex md:items-center md:justify-between transform hover:scale-[1.005] transition-transform duration-500 ease-in-out">
        {/* Decorative background shapes */}
        <div className="absolute top-0 left-0 w-40 h-40 bg-white bg-opacity-15 rounded-full -translate-x-1/3 -translate-y-1/3"></div>
        <div className="absolute bottom-0 right-0 w-60 h-60 bg-white bg-opacity-15 rounded-full translate-x-1/4 translate-y-1/4"></div>

        <div className="relative z-10 text-center md:text-left md:w-1/2 md:pr-10">
          <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight mb-5">
            Your Health, Our Priority.
          </h1>
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

        {/* --- Slider Integration (Restored for Fading) --- */}
        <div className="relative z-10 mt-10 md:mt-0 md:w-1/2 flex justify-center items-center min-h-[300px] sm:min-h-[400px] overflow-hidden rounded-xl">
          {sliderContent.map((slide, index) => (
            <div
              key={index}
              // Stack all slides with absolute positioning
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out will-change-opacity
                          ${index === currentSlideIndex ? 'opacity-100' : 'opacity-0'}`} // Control visibility via opacity
              style={{ backgroundImage: `url(${slide.image})` }}
              role="img"
              aria-label={slide.alt}
            >
              {/* Overlay content directly on the image, only for the active slide */}
              {index === currentSlideIndex && (
                <div className="absolute inset-0 bg-opacity-40 flex flex-col justify-end p-6 text-black transition-opacity duration-700 ease-in-out">
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
      <section className="bg-white p-14 rounded-xl shadow-lg mb-28 text-gray-800
                          transform hover:scale-[1.005] transition-transform duration-500 ease-in-out">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-10">About Swastha</h2>
        <p className="text-lg leading-loose text-center max-w-3xl mx-auto">
          At Swastha, we believe in a holistic approach to health. Our team of dedicated professionals is committed to providing personalized, high-quality care that addresses not just your symptoms, but your overall well-being. We combine cutting-edge medical technology with compassionate human touch to ensure you receive the best possible care.
        </p>
      </section>

      {/* Our Services Section */}
      <section className="mb-28">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">Our Comprehensive Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 justify-items-center">
          <Link to="/services/general-checkups" className="block bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full max-w-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">General Check-ups</h3>
            <p className="text-gray-600 leading-normal">Regular health assessments to keep you on track.</p>
          </Link>

          <Link to="/services/preventive-care" className="block bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full max-w-sm">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Preventive Cure</h3>
            <p className="text-gray-600 leading-normal">Programs designed to prevent illness and promote wellness.</p>
          </Link>

          {/* Modified AI Assistance card to open chat instead of navigating */}
          <div 
            onClick={handleAIAssistantClick}
            className="block bg-white p-8 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105 w-full max-w-sm cursor-pointer"
          >
            <h3 className="text-xl font-semibold text-gray-900 mb-4">AI Assistance</h3>
            <p className="text-gray-600 leading-normal">Convenient online medical advice and support.</p>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="bg-blue-100 p-14 rounded-xl shadow-lg mb-28 text-gray-800">
        <h2 className="text-3xl font-bold text-center text-blue-700 mb-12">What Our Patients Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
          <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
            <p className="text-gray-700 italic mb-6 leading-loose">"The Ease through which this app helped me in this dire situation has helped me alot in the difficult time of my life "</p>
            <p className="font-semibold text-gray-900">- Madan Shrestha, Patient</p>
          </div>
          <div className="bg-white p-10 rounded-xl shadow-md w-full max-w-md">
            <p className="text-gray-700 italic mb-6 leading-loose">"Swastha changed my perspective on healthcare. Their holistic approach truly made a difference in my recovery journey."</p>
            <p className="font-semibold text-gray-900">- Hari Gurung, Patient</p>
          </div>
        </div>
      </section>

      {/* Call to Action / Contact Section */}
      <section className="text-center bg-gradient-to-r from-green-500 to-green-700 text-white
                          rounded-xl p-12 sm:p-18 shadow-xl transform hover:scale-[1.005] transition-transform duration-500 ease-in-out">
        <h2 className="text-3xl sm:text-4xl font-bold mb-9">Ready to Take Control of Your Health?</h2>
        <p className="text-lg sm:text-xl leading-relaxed mb-12 opacity-95">
          Contact us today to schedule your consultation and begin your journey to a healthier you.
        </p>
        <button className="bg-white text-green-700 hover:bg-green-800 hover:text-white
                           font-bold py-3.5 px-9 rounded-full shadow-lg hover:shadow-xl
                           transition-all duration-300 transform hover:scale-105 active:scale-100">
          Get in Touch
        </button>
      </section>
      
      {/* Modified Chat component with controlled visibility */}
      <Chat isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default Home;