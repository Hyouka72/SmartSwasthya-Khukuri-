import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import QRCode from "react-qr-code";

function PatientQR() {
  const { user } = useUser();
  const [qrCodeData, setQrCodeData] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  // Generate QR code data based on essential patient information
  useEffect(() => {
    if (user) {
      const simplifiedPatientData = {
        patientId: user.id,
        memberNumber: `SW${user.id.slice(-8).toUpperCase()}`,
        // You can add a timestamp if you need to invalidate older QRs,
        // but for a simpler QR, we can omit it if not strictly required
        // dateGenerated: new Date().toISOString(),
      };
      setQrCodeData(JSON.stringify(simplifiedPatientData));
    }
  }, [user]);

  // Generate new QR code
  const generateNewQR = () => {
    setIsGenerating(true);
    setTimeout(() => {
      if (user) {
        const simplifiedPatientData = {
          patientId: user.id,
          memberNumber: `SW${user.id.slice(-8).toUpperCase()}`,
          // dateGenerated: new Date().toISOString(), // Omit if not needed for simpler QR
        };
        setQrCodeData(JSON.stringify(simplifiedPatientData));
      }
      setIsGenerating(false);
    }, 1500);
  };

  // Download QR code (placeholder function)
  const downloadQR = () => {
    console.log("QR Code download feature would be implemented here");
  };

  // Share QR code (placeholder function)
  const shareQR = () => {
    if (navigator.share) {
      navigator.share({
        title: "My Swastha Patient QR Code",
        text: "Here is my patient QR code for Swastha Healthcare",
      });
    } else {
      console.log(
        "Sharing feature would be implemented here (Web Share API not supported)"
      );
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Access Denied
          </h2>
          <p className="text-gray-600">Please sign in to view your QR code.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Header Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link to="/" className="text-blue-600 hover:text-blue-700">
              Home
            </Link>
            <svg
              className="w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              />
            </svg>
            <span className="text-gray-600">Patient QR Code</span>
          </nav>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            My Patient QR Code
          </h1>
          <p className="text-gray-600">
            Use this QR code for quick check-ins and medical appointments
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* QR Code Display */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="text-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Your QR Code
              </h2>

              {/* QR Code Container */}
              <div className="mb-6 flex justify-center">
                <div className="bg-white p-4 rounded-lg shadow-inner border-2 border-gray-100">
                  {qrCodeData ? (
                    <div className="w-48 h-48 flex items-center justify-center">
                      {/* Actual QR code generated by react-qr-code */}
                      <QRCode
                        id="qr-code-svg" // ID for potential download functionality
                        value={qrCodeData}
                        size={192} // 48 * 4, to fit the 48x48 container
                        level={"M"} // Medium error correction level for simpler QR
                        bgColor="#FFFFFF"
                        fgColor="#000000"
                        viewBox={`0 0 192 192`}
                      />
                    </div>
                  ) : (
                    <div className="w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 16h4.01M12 8h4.01M8 12h.01M16 8h.01m-4.01 0h.01M8 16h.01m.01-4h.01m0 4h.01m-4.01-4h.01M4 12h.01M4 16h.01M4 8h.01"
                          />
                        </svg>
                        <p className="text-sm text-gray-500 mt-2">
                          Generating QR Code...
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={generateNewQR}
                  disabled={isGenerating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200 flex items-center justify-center"
                >
                  {isGenerating ? (
                    <>
                      <svg
                        className="animate-spin -ml-1 mr-3 h-4 w-4 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Generating...
                    </>
                  ) : (
                    <>
                      <svg
                        className="w-4 h-4 mr-2"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                        />
                      </svg>
                      Refresh QR
                    </>
                  )}
                </button>

                <button
                  onClick={downloadQR}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download
                </button>

                <button
                  onClick={shareQR}
                  className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors duration-200 flex items-center justify-center"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                    />
                  </svg>
                  Share
                </button>
              </div>
            </div>
          </div>

          {/* Patient Information */}
          <div className="space-y-6">
            {/* Patient Details Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Patient Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Patient Name:
                  </span>
                  <span className="text-sm text-gray-900">
                    {user?.firstName} {user?.lastName}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Member Number:
                  </span>
                  <span className="text-sm text-gray-900 font-mono">
                    SW{user?.id.slice(-8).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Email:
                  </span>
                  <span className="text-sm text-gray-900">
                    {user?.primaryEmailAddress?.emailAddress}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Phone:
                  </span>
                  <span className="text-sm text-gray-900">
                    {user?.primaryPhoneNumber?.phoneNumber || "Not provided"}
                  </span>
                </div>
              </div>
            </div>

            {/* QR Code Status */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                QR Code Status
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Status:
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Active
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Generated:
                  </span>
                  <span className="text-sm text-gray-900">
                    {new Date().toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium text-gray-500">
                    Valid Until:
                  </span>
                  <span className="text-sm text-gray-900">
                    {new Date(
                      Date.now() + 30 * 24 * 60 * 60 * 1000
                    ).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            {/* Usage Instructions */}
            <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
              <h3 className="text-lg font-semibold text-blue-900 mb-4">
                How to Use Your QR Code
              </h3>
              <ul className="space-y-2 text-sm text-blue-800">
                <li className="flex items-start">
                  <svg
                    className="w-4 h-4 mt-0.5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Show this QR code at reception for quick check-in
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-4 h-4 mt-0.5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Use during appointments for faster service
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-4 h-4 mt-0.5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Keep it saved on your phone for easy access
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-4 h-4 mt-0.5 mr-2 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  Refresh periodically for updated information
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-start">
            <svg
              className="w-5 h-5 text-yellow-600 mt-0.5 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <div>
              <h4 className="text-sm font-medium text-yellow-800 mb-1">
                Security Notice
              </h4>
              <p className="text-sm text-yellow-700">
                Keep your QR code secure and do not share it with unauthorized
                individuals. This code contains your personal medical
                information and should only be used at authorized Swastha
                facilities.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PatientQR;