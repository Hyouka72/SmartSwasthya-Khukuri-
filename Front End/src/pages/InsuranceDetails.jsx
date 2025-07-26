import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function InsuranceDetails() {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [insuranceData, setInsuranceData] = useState({
    provider: "Blue Cross Blue Shield",
    policyNumber: "BC123456789",
    groupNumber: "GRP001234",
    memberID: "MEM789456123",
    planType: "Premium Health Plan",
    effectiveDate: "2024-01-01",
    expirationDate: "2024-12-31",
    copay: "$25",
    deductible: "$1,500",
    outOfPocketMax: "$5,000",
    primaryCarePhysician: "Dr. Sarah Johnson",
    emergencyContact: "+1 (800) 555-BLUE"
  });

  const handleInputChange = (field, value) => {
    setInsuranceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
    console.log("Saving insurance data:", insuranceData);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original data if needed
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              Home
            </Link>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-600">Insurance Details</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Insurance Details</h1>
              <p className="text-gray-600 mt-2">Manage your health insurance information</p>
            </div>
            <div className="flex space-x-3">
              {isEditing ? (
                <>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                  >
                    Save Changes
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Edit Details
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Insurance Card Preview */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold">{insuranceData.provider}</h3>
                <p className="text-blue-100">{insuranceData.planType}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-blue-100">Member ID</p>
                <p className="font-mono text-lg">{insuranceData.memberID}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-blue-100">Policy Number</p>
                <p className="font-mono">{insuranceData.policyNumber}</p>
              </div>
              <div>
                <p className="text-sm text-blue-100">Group Number</p>
                <p className="font-mono">{insuranceData.groupNumber}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-blue-500">
              <p className="text-sm text-blue-100">
                {user?.firstName} {user?.lastName}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Policy Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Insurance Provider */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Insurance Provider
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={insuranceData.provider}
                    onChange={(e) => handleInputChange('provider', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{insuranceData.provider}</p>
                )}
              </div>

              {/* Policy Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Policy Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={insuranceData.policyNumber}
                    onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2 font-mono">{insuranceData.policyNumber}</p>
                )}
              </div>

              {/* Group Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Group Number
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={insuranceData.groupNumber}
                    onChange={(e) => handleInputChange('groupNumber', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2 font-mono">{insuranceData.groupNumber}</p>
                )}
              </div>

              {/* Member ID */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Member ID
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={insuranceData.memberID}
                    onChange={(e) => handleInputChange('memberID', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2 font-mono">{insuranceData.memberID}</p>
                )}
              </div>

              {/* Plan Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Plan Type
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={insuranceData.planType}
                    onChange={(e) => handleInputChange('planType', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{insuranceData.planType}</p>
                )}
              </div>

              {/* Effective Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Effective Date
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={insuranceData.effectiveDate}
                    onChange={(e) => handleInputChange('effectiveDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{new Date(insuranceData.effectiveDate).toLocaleDateString()}</p>
                )}
              </div>

              {/* Expiration Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expiration Date
                </label>
                {isEditing ? (
                  <input
                    type="date"
                    value={insuranceData.expirationDate}
                    onChange={(e) => handleInputChange('expirationDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{new Date(insuranceData.expirationDate).toLocaleDateString()}</p>
                )}
              </div>

              {/* Primary Care Physician */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Primary Care Physician
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={insuranceData.primaryCarePhysician}
                    onChange={(e) => handleInputChange('primaryCarePhysician', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                ) : (
                  <p className="text-gray-900 py-2">{insuranceData.primaryCarePhysician}</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Coverage Details */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Coverage Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{insuranceData.copay}</div>
                <div className="text-sm text-gray-600">Copay</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{insuranceData.deductible}</div>
                <div className="text-sm text-gray-600">Annual Deductible</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <div className="text-2xl font-bold text-blue-600">{insuranceData.outOfPocketMax}</div>
                <div className="text-sm text-gray-600">Out-of-Pocket Max</div>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Emergency Contact</h2>
            <div className="flex items-center space-x-3">
              <div className="bg-red-100 p-2 rounded-full">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <p className="font-medium text-gray-900">Insurance Emergency Line</p>
                <p className="text-blue-600 font-mono">{insuranceData.emergencyContact}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InsuranceDetails;