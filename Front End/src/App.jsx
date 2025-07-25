// Frontend/src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './Component/Header';
import Footer from './Component/Footer';
import Home from './pages/Home';
import Appointment from './pages/Appointment';
import About from './pages/About';
import Contact from './pages/Contact';
import AuthPage from './pages/AuthPage';
import GeneralCheckups from './pages/GeneralCheckups'; // New import
import PreventiveCare from './pages/PreventiveCare';   // New import
import TelehealthConsultations from './pages/TelehealthConsultations'; // New import
import EmergencyCare from './pages/EmergencyCare';     // New import
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col bg-gray-100">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/appointment" element={<Appointment />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/auth" element={<AuthPage />} />
              {/* New Service Routes */}
              <Route path="/services/general-checkups" element={<GeneralCheckups />} />
              <Route path="/services/preventive-care" element={<PreventiveCare />} />
              <Route path="/services/telehealth-consultations" element={<TelehealthConsultations />} />
              <Route path="/services/emergency-care" element={<EmergencyCare />} />
              {/* Add more routes here as your application grows */}
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;