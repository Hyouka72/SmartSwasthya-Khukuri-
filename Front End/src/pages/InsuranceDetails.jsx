import React, { useState, useEffect } from "react";

function InsuranceDetails() {
  const user = { firstName: "Sanjog", lastName: "Gautam" }; // Mock user data
  const [selectedClaim, setSelectedClaim] = useState(null);
  const [hasInsuranceCard, setHasInsuranceCard] = useState(false);
  const [showCardForm, setShowCardForm] = useState(false);
  const [showExpiryAlert, setShowExpiryAlert] = useState(false);
  const [insuranceData, setInsuranceData] = useState({
    provider: "",
    policyNumber: "",
    memberID: "",
    planType: "",
    copay: "",
    deductible: "",
    expiryDate: ""
  });

  // Function to check if insurance is expiring within 10 days
  const checkExpiryDate = (expiryDate) => {
    if (!expiryDate) return false;
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff <= 10 && daysDiff >= 0;
  };

  // Function to get days until expiry
  const getDaysUntilExpiry = (expiryDate) => {
    if (!expiryDate) return null;
    
    const today = new Date();
    const expiry = new Date(expiryDate);
    const timeDiff = expiry.getTime() - today.getTime();
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));
    
    return daysDiff;
  };

  // Check expiry when insurance data changes
  useEffect(() => {
    if (hasInsuranceCard && insuranceData.expiryDate) {
      setShowExpiryAlert(checkExpiryDate(insuranceData.expiryDate));
    }
  }, [hasInsuranceCard, insuranceData.expiryDate]);

  const handleInputChange = (field, value) => {
    setInsuranceData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCardSubmit = () => {
    if (insuranceData.provider && insuranceData.policyNumber && insuranceData.memberID) {
      setHasInsuranceCard(true);
      setShowCardForm(false);
      console.log("Insurance card details saved successfully!");
    } else {
      console.log("Please fill in all required fields");
    }
  };

  const handleClaimSelect = (claimType) => {
    if (!hasInsuranceCard) {
      console.log("Please add your insurance card details first to proceed with claims");
      setShowCardForm(true);
      return;
    }
    setSelectedClaim(claimType);
  };

  const handleClaimSubmit = () => {
    console.log(`Submitting ${selectedClaim} claim`);
    console.log(`${selectedClaim} claim process initiated!`);
  };

  const handleRenewPolicy = () => {
    console.log("Redirecting to policy renewal...");
    // In a real app, this would redirect to renewal page or open renewal modal
  };

  const dismissExpiryAlert = () => {
    setShowExpiryAlert(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <button className="text-blue-600 hover:text-blue-700">
              Home
            </button>
            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
            </svg>
            <span className="text-gray-600">Insurance Claim</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Insurance Claim</h1>
          <p className="text-gray-600 mt-2">Manage your health insurance and claims</p>
        </div>

        {/* Expiry Alert - Show when insurance is expiring within 10 days */}
        {showExpiryAlert && hasInsuranceCard && insuranceData.expiryDate && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start">
              <div className="bg-red-100 p-2 rounded-full mr-4 flex-shrink-0">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-red-800">Policy Expiring Soon!</h3>
                <p className="text-red-700 mt-1">
                  Your insurance policy expires in{' '}
                  <span className="font-bold">
                    {getDaysUntilExpiry(insuranceData.expiryDate)} day(s)
                  </span>{' '}
                  on {new Date(insuranceData.expiryDate).toLocaleDateString()}. 
                  Renew now to avoid coverage gaps.
                </p>
                <div className="mt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={handleRenewPolicy}
                    className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium"
                  >
                    Renew Policy Now
                  </button>
                  <button
                    onClick={dismissExpiryAlert}
                    className="px-4 py-2 text-red-600 hover:text-red-700 text-sm underline"
                  >
                    Dismiss Alert
                  </button>
                </div>
              </div>
              <button
                onClick={dismissExpiryAlert}
                className="text-red-400 hover:text-red-600 flex-shrink-0"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Insurance Card Status */}
        <div className="mb-8">
          {!hasInsuranceCard ? (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
              <div className="flex items-center">
                <div className="bg-yellow-100 p-2 rounded-full mr-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-yellow-800">Insurance Card Required</h3>
                  <p className="text-yellow-700 mt-1">Please add your insurance card details to proceed with claims</p>
                </div>
                <button
                  onClick={() => setShowCardForm(true)}
                  className="px-4 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 transition-colors duration-200"
                >
                  Add Card Details
                </button>
              </div>
            </div>
          ) : (
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
                  <p className="text-sm text-blue-100">Member Name</p>
                  <p>{user?.firstName} {user?.lastName}</p>
                </div>
              </div>
              {insuranceData.expiryDate && (
                <div className="mt-4 pt-4 border-t border-blue-500">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm text-blue-100">Expires On</p>
                      <p className="font-medium">{new Date(insuranceData.expiryDate).toLocaleDateString()}</p>
                    </div>
                    {checkExpiryDate(insuranceData.expiryDate) && (
                      <div className="bg-red-500 px-3 py-1 rounded-full">
                        <p className="text-xs font-medium">Expires Soon</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={() => setShowCardForm(true)}
                  className="text-blue-100 hover:text-white text-sm underline"
                >
                  Edit Details
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Insurance Card Form Modal */}
        {showCardForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4 max-h-screen overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-900">Insurance Card Details</h2>
                <button
                  onClick={() => setShowCardForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Insurance Provider *
                  </label>
                  <input
                    type="text"
                    value={insuranceData.provider}
                    onChange={(e) => handleInputChange('provider', e.target.value)}
                    placeholder="e.g., Blue Cross Blue Shield"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Number *
                  </label>
                  <input
                    type="text"
                    value={insuranceData.policyNumber}
                    onChange={(e) => handleInputChange('policyNumber', e.target.value)}
                    placeholder="e.g., BC123456789"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Member ID *
                  </label>
                  <input
                    type="text"
                    value={insuranceData.memberID}
                    onChange={(e) => handleInputChange('memberID', e.target.value)}
                    placeholder="e.g., MEM789456123"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Plan Type
                  </label>
                  <input
                    type="text"
                    value={insuranceData.planType}
                    onChange={(e) => handleInputChange('planType', e.target.value)}
                    placeholder="e.g., Premium Health Plan"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Policy Expiry Date
                  </label>
                  <input
                    type="date"
                    value={insuranceData.expiryDate}
                    onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">We'll alert you when your policy is about to expire</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Copay
                    </label>
                    <input
                      type="text"
                      value={insuranceData.copay}
                      onChange={(e) => handleInputChange('copay', e.target.value)}
                      placeholder="e.g., $25"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deductible
                    </label>
                    <input
                      type="text"
                      value={insuranceData.deductible}
                      onChange={(e) => handleInputChange('deductible', e.target.value)}
                      placeholder="e.g., $1,500"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex space-x-3 mt-6">
                <button
                  onClick={() => setShowCardForm(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors duration-200"
                >
                  Cancel
                </button>
                <button
                  onClick={handleCardSubmit}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                >
                  Save Details
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Coverage Summary - Only show if card details exist */}
        {hasInsuranceCard && insuranceData.copay && insuranceData.deductible && (
          <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Coverage Summary</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{insuranceData.copay}</div>
                  <div className="text-sm text-gray-600">Copay</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">{insuranceData.deductible}</div>
                  <div className="text-sm text-gray-600">Annual Deductible</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Insurance Claims Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Insurance Claims</h2>
            
            {!hasInsuranceCard && (
              <div className="text-center py-8">
                <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400 mx-auto mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 0h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Claims Locked</h3>
                <p className="text-gray-600 mb-4">Add your insurance card details to unlock claim options</p>
                <button
                  onClick={() => setShowCardForm(true)}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Add Insurance Card
                </button>
              </div>
            )}

            {hasInsuranceCard && (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  {/* Cashless Claim */}
                  <div 
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                      selectedClaim === 'Cashless' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleClaimSelect('Cashless')}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-green-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Cashless Claim</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Get treatment at network hospitals without paying upfront. The hospital directly settles with the insurance company.
                    </p>
                  </div>

                  {/* Reimbursement Claim */}
                  <div 
                    className={`border-2 rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                      selectedClaim === 'Reimbursement' 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleClaimSelect('Reimbursement')}
                  >
                    <div className="flex items-center mb-4">
                      <div className="bg-orange-100 p-3 rounded-full mr-4">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                        </svg>
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900">Reimbursement Claim</h3>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Pay for treatment yourself and get reimbursed later. Can be used at any hospital or clinic.
                    </p>
                  </div>
                </div>

                {/* Claim Action Button */}
                {selectedClaim && (
                  <div className="text-center">
                    <button
                      onClick={handleClaimSubmit}
                      className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      Proceed with {selectedClaim} Claim
                    </button>
                    <p className="text-sm text-gray-500 mt-2">
                      You will be guided through the {selectedClaim.toLowerCase()} claim process
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Quick Actions - Only show if insurance card exists */}
        {hasInsuranceCard && (
          <div className="mt-6 bg-white rounded-lg shadow-sm border border-gray-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  View Claims History
                </button>
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                  Find Network Hospitals
                </button>
                <button className="flex items-center justify-center p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <svg className="w-5 h-5 text-blue-600 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Contact Support
                </button>
              </div>
              
              {/* Renew Policy Button */}
              <button 
                onClick={handleRenewPolicy}
                className={`w-full flex items-center justify-center my-3 p-4 border rounded-lg transition-colors duration-200 ${
                  checkExpiryDate(insuranceData.expiryDate) 
                    ? 'border-red-300 bg-red-50 hover:bg-red-100 text-red-700' 
                    : 'border-gray-200 hover:bg-gray-50'
                }`}
              >
                <svg className={`w-5 h-5 mr-2 ${
                  checkExpiryDate(insuranceData.expiryDate) ? 'text-red-600' : 'text-blue-600'
                }`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                {checkExpiryDate(insuranceData.expiryDate) ? 'Renew Policy (Expires Soon!)' : 'Renew Policy'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default InsuranceDetails;