import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Phone, MapPin, ChevronDown } from 'lucide-react';

const AppointmentBooking = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [selectedDate, setSelectedDate] = useState('07/31/2025');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedHospital, setSelectedHospital] = useState('');
  const [showDoctorProfile, setShowDoctorProfile] = useState(false);

  const hospitals = [
    { id: 1, name: 'Swastha Medical Center', location: 'Kathmandu, Nepal' },
    { id: 2, name: 'Grande International Hospital', location: 'Dhapasi, Kathmandu' },
    { id: 3, name: 'Nepal Mediciti Hospital', location: 'Lalitpur, Nepal' },
    { id: 4, name: 'Tribhuvan University Teaching Hospital', location: 'Maharajgunj, Kathmandu' }
  ];

  const departments = [
    'Pediatrics',
    'Cardiology',
    'Orthopedics',
    'Neurology',
    'Dermatology',
    'Internal Medicine'
  ];

  const doctors = {
    'Pediatrics': [
      { name: 'Dr. Emily Brown', specialization: 'Pediatric Care' },
      { name: 'Dr. Rajesh Sharma', specialization: 'Child Development' },
      { name: 'Dr. Sarah Johnson', specialization: 'Pediatric Surgery' }
    ],
    'Cardiology': [
      { name: 'Dr. Michael Chen', specialization: 'Interventional Cardiology' },
      { name: 'Dr. Priya Patel', specialization: 'Cardiac Surgery' }
    ],
    'Orthopedics': [
      { name: 'Dr. David Wilson', specialization: 'Joint Replacement' },
      { name: 'Dr. Lisa Anderson', specialization: 'Sports Medicine' }
    ]
  };

  const timeSlots = [
    { time: '09:00 - 09:45 AM', value: '09:00-09:45' },
    { time: '10:00 - 10:45 AM', value: '10:00-10:45' },
    { time: '11:00 - 11:45 AM', value: '11:00-11:45' },
    { time: '02:00 - 02:45 PM', value: '14:00-14:45' },
    { time: '03:00 - 03:45 PM', value: '15:00-15:45' },
    { time: '04:00 - 04:45 PM', value: '16:00-16:45' }
  ];

  useEffect(() => {
    if (selectedDoctor && selectedTime) {
      setShowDoctorProfile(true);
    } else {
      setShowDoctorProfile(false);
    }
  }, [selectedDoctor, selectedTime]);

  const handleDepartmentChange = (dept) => {
    setSelectedDepartment(dept);
    setSelectedDoctor('');
    setSelectedTime('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Book Your Appointment</h1>
              <p className="text-gray-600">Welcome, <span className="text-blue-600 font-semibold">Sanjog Gautam</span>! Please fill out the form below to schedule your visit.</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Personal Information */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <User className="w-6 h-6 text-blue-600" />
                Personal Information
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    defaultValue="Sanjog Gautam"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    defaultValue="2280651@mbmc.edu.np"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    defaultValue="+977 98 1234 5678"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Hospital Selection */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <MapPin className="w-6 h-6 text-blue-600" />
                Select Hospital
              </h2>
              
              <div className="relative">
                <select
                  value={selectedHospital}
                  onChange={(e) => setSelectedHospital(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">-- Select a Hospital --</option>
                  {hospitals.map((hospital) => (
                    <option key={hospital.id} value={hospital.name}>
                      {hospital.name} - {hospital.location}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* Appointment Details */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-3">
                <Clock className="w-6 h-6 text-blue-600" />
                Appointment Details
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedDepartment}
                      onChange={(e) => handleDepartmentChange(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white"
                    >
                      <option value="">-- Select Department --</option>
                      {departments.map((dept) => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Doctor <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedDoctor}
                      onChange={(e) => setSelectedDoctor(e.target.value)}
                      disabled={!selectedDepartment}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white disabled:bg-gray-100"
                    >
                      <option value="">-- Select Doctor --</option>
                      {selectedDepartment && doctors[selectedDepartment]?.map((doctor) => (
                        <option key={doctor.name} value={doctor.name}>{doctor.name}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Preferred Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    value="2025-07-31"
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Available Time <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={selectedTime}
                      onChange={(e) => setSelectedTime(e.target.value)}
                      disabled={!selectedDoctor}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white disabled:bg-gray-100"
                    >
                      <option value="">-- Select a Time Slot --</option>
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>{slot.time}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Reason for Appointment <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={4}
                  placeholder="Please describe your symptoms, concerns, or the reason for your visit..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                ></textarea>
              </div>

              <button className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200">
                Book Appointment
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-8">
            {/* Calendar Preview */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Schedule</h3>
              
              <div className="space-y-3">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <div className="text-blue-700 font-semibold">Thursday, July 31, 2025</div>
                  <div className="text-sm text-blue-600 mt-1">Available: 09:00 AM - 04:45 PM</div>
                  <div className="text-xs text-blue-500 mt-1">6 time slots available</div>
                </div>
                
                <div className="bg-gray-50 p-4 rounded-lg">
                  <div className="text-gray-700 font-semibold">Friday, August 1, 2025</div>
                  <div className="text-sm text-gray-600 mt-1">Available: 10:00 AM - 03:45 PM</div>
                  <div className="text-xs text-gray-500 mt-1">4 time slots available</div>
                </div>

                <div className="bg-red-50 p-4 rounded-lg">
                  <div className="text-red-700 font-semibold">Saturday, August 2, 2025</div>
                  <div className="text-sm text-red-600 mt-1">Limited availability</div>
                  <div className="text-xs text-red-500 mt-1">2 time slots available</div>
                </div>
              </div>
            </div>

            {/* Doctor Profile - Only show when doctor and time are selected */}
            {showDoctorProfile && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Selected Doctor</h3>
                
                <div className="text-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-full mx-auto mb-4 flex items-center justify-center">
                    <User className="w-10 h-10 text-gray-400" />
                  </div>
                  
                  <h4 className="font-bold text-gray-900 text-lg">{selectedDoctor}</h4>
                  <p className="text-blue-600 text-sm mb-2">
                    {selectedDepartment && doctors[selectedDepartment]?.find(d => d.name === selectedDoctor)?.specialization}
                  </p>
                  <p className="text-gray-600 text-sm mb-4">{selectedDepartment} Department</p>
                  
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <div className="text-green-800 font-semibold text-sm">Selected Time Slot</div>
                    <div className="text-green-700 text-lg font-bold">
                      {timeSlots.find(slot => slot.value === selectedTime)?.time}
                    </div>
                  </div>
                  
                  <div className="text-center">
                    <div className="text-sm text-gray-600">Consultation Fee</div>
                    <div className="text-2xl font-bold text-blue-600">NPR 1,500</div>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Info</h3>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-3xl font-bold text-blue-600">31</div>
                  <div className="text-sm text-blue-700">Total Slots/Week</div>
                </div>
                
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-3xl font-bold text-green-600">6</div>
                  <div className="text-sm text-green-700">Working Days</div>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-yellow-50 rounded-lg">
                <div className="text-yellow-800 font-semibold text-sm mb-1">Notice</div>
                <div className="text-yellow-700 text-xs">Please arrive 15 minutes before your scheduled appointment time.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;