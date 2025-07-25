import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import About from './pages/About';
import Contact from './pages/Contact'; // <--- Import the new Contact page

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-100">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} /> {/* <--- Add this new Route */}
            {/* Add more routes here as your application grows */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;