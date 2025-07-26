import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

function MedicalReports() {
  const { user } = useUser();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedReport, setSelectedReport] = useState(null);

  // Sample medical reports data
  const medicalReports = [
    {
      id: 1,
      title: "Annual Physical Examination",
      date: "2024-07-15",
      doctor: "Dr. Sarah Johnson",
      category: "checkup",
      status: "completed",
      summary: "Regular annual checkup with blood work and vitals assessment.",
      details: {
        vitals: {
          bloodPressure: "120/80 mmHg",
          heartRate: "72 bpm",
          temperature: "98.6°F",
          weight: "165 lbs",
          height: "5'8\""
        },
        notes: "Patient is in good health. All vitals within normal range. Recommended to continue current lifestyle habits.",
        followUp: "Next annual checkup in 12 months"
      }
    },
    {
      id: 2,
      title: "Blood Test Results",
      date: "2024-07-10",
      doctor: "Dr. Sarah Johnson",
      category: "lab",
      status: "completed",
      summary: "Comprehensive metabolic panel and lipid profile.",
      details: {
        results: [
          { test: "Total Cholesterol", value: "180 mg/dL", range: "< 200 mg/dL", status: "normal" },
          { test: "HDL Cholesterol", value: "55 mg/dL", range: "> 40 mg/dL", status: "normal" },
          { test: "LDL Cholesterol", value: "110 mg/dL", range: "< 130 mg/dL", status: "normal" },
          { test: "Glucose", value: "90 mg/dL", range: "70-100 mg/dL", status: "normal" },
          { test: "Hemoglobin A1C", value: "5.2%", range: "< 5.7%", status: "normal" }
        ],
        notes: "All lab values are within normal limits. Continue current diet and exercise routine."
      }
    },
    {
      id: 3,
      title: "Chest X-Ray",
      date: "2024-06-20",
      doctor: "Dr. Michael Chen",
      category: "imaging",
      status: "completed",
      summary: "Routine chest X-ray for pre-employment screening.",
      details: {
        findings: "Clear lung fields bilaterally. Heart size normal. No acute abnormalities.",
        impression: "Normal chest X-ray",
        notes: "No further action required."
      }
    },
    {
      id: 4,
      title: "Cardiology Consultation",
      date: "2024-06-01",
      doctor: "Dr. Robert Davis",
      category: "consultation",
      status: "completed",
      summary: "Follow-up consultation for heart murmur evaluation.",
      details: {
        findings: "Innocent heart murmur confirmed. EKG shows normal rhythm.",
        recommendations: [
          "Continue regular exercise",
          "Annual cardiology follow-up",
          "Monitor for any symptoms"
        ],
        notes: "Patient educated about innocent murmur. No restrictions on activities."
      }
    },
    {
      id: 5,
      title: "Vaccination Record Update",
      date: "2024-05-15",
      doctor: "Dr. Emily Wilson",
      category: "vaccination",
      status: "completed",
      summary: "COVID-19 booster and flu vaccination administered.",
      details: {
        vaccines: [
          { name: "COVID-19 Booster (Pfizer)", date: "2024-05-15", lot: "EW0182" },
          { name: "Influenza (Quadrivalent)", date: "2024-05-15", lot: "FLU2024" }
        ],
        notes: "No adverse reactions observed. Patient advised about potential mild side effects."
      }
    }
  ];

  const categories = [
    { id: "all", name: "All Reports", count: medicalReports.length },
    { id: "checkup", name: "Check-ups", count: medicalReports.filter(r => r.category === "checkup").length },
    { id: "lab", name: "Lab Results", count: medicalReports.filter(r => r.category === "lab").length },
    { id: "imaging", name: "Imaging", count: medicalReports.filter(r => r.category === "imaging").length },
    { id: "consultation", name: "Consultations", count: medicalReports.filter(r => r.category === "consultation").length },
    { id: "vaccination", name: "Vaccinations", count: medicalReports.filter(r => r.category === "vaccination").length }
  ];

  const filteredReports = selectedCategory === "all" 
    ? medicalReports 
    : medicalReports.filter(report => report.category === selectedCategory);

  const getCategoryIcon = (category) => {
    switch (category) {
      case "checkup":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case "lab":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        );
      case "imaging":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        );
      case "consultation":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        );
      case "vaccination":
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "in-progress":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
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
            <span className="text-gray-600">Medical Reports</span>
          </nav>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Medical Reports</h1>
          <p className="text-gray-600 mt-2">View and manage your medical history and test results</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Categories */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
              <h3 className="font-medium text-gray-900 mb-4">Categories</h3>
              <nav className="space-y-1">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 text-sm rounded-md transition-colors duration-200 ${
                      selectedCategory === category.id
                        ? "bg-blue-50 text-blue-600 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <span>{category.name}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      selectedCategory === category.id
                        ? "bg-blue-100 text-blue-600"
                        : "bg-gray-100 text-gray-600"
                    }`}>
                      {category.count}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {!selectedReport ? (
              <div className="space-y-4">
                {filteredReports.map((report) => (
                  <div
                    key={report.id}
                    className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200 cursor-pointer"
                    onClick={() => setSelectedReport(report)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className={`p-2 rounded-lg ${
                          report.category === "checkup" ? "bg-green-100 text-green-600" :
                          report.category === "lab" ? "bg-blue-100 text-blue-600" :
                          report.category === "imaging" ? "bg-purple-100 text-purple-600" :
                          report.category === "consultation" ? "bg-orange-100 text-orange-600" :
                          report.category === "vaccination" ? "bg-red-100 text-red-600" :
                          "bg-gray-100 text-gray-600"
                        }`}>
                          {getCategoryIcon(report.category)}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-lg font-medium text-gray-900 mb-1">{report.title}</h3>
                          <p className="text-gray-600 text-sm mb-2">{report.summary}</p>
                          <div className="flex items-center space-x-4 text-sm text-gray-500">
                            <span>{new Date(report.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <span>{report.doctor}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                          {report.status}
                        </span>
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                ))}

                {filteredReports.length === 0 && (
                  <div className="text-center py-12">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h3 className="mt-2 text-sm font-medium text-gray-900">No reports found</h3>
                    <p className="mt-1 text-sm text-gray-500">No medical reports in this category yet.</p>
                  </div>
                )}
              </div>
            ) : (
              /* Report Detail View */
              <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                {/* Report Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-center justify-between mb-4">
                    <button
                      onClick={() => setSelectedReport(null)}
                      className="flex items-center text-blue-600 hover:text-blue-700 text-sm font-medium"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                      </svg>
                      Back to Reports
                    </button>
                    <div className="flex space-x-2">
                      <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                        Download PDF
                      </button>
                      <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors duration-200">
                        Share
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className={`p-3 rounded-lg ${
                      selectedReport.category === "checkup" ? "bg-green-100 text-green-600" :
                      selectedReport.category === "lab" ? "bg-blue-100 text-blue-600" :
                      selectedReport.category === "imaging" ? "bg-purple-100 text-purple-600" :
                      selectedReport.category === "consultation" ? "bg-orange-100 text-orange-600" :
                      selectedReport.category === "vaccination" ? "bg-red-100 text-red-600" :
                      "bg-gray-100 text-gray-600"
                    }`}>
                      {getCategoryIcon(selectedReport.category)}
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold text-gray-900 mb-2">{selectedReport.title}</h1>
                      <div className="flex items-center space-x-4 text-gray-600">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0l-1 1v6a1 1 0 001 1h6a1 1 0 001-1V8l-1-1m-6 0v6" />
                          </svg>
                          {new Date(selectedReport.date).toLocaleDateString()}
                        </span>
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          {selectedReport.doctor}
                        </span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(selectedReport.status)}`}>
                          {selectedReport.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Report Content */}
                <div className="p-6">
                  <div className="prose max-w-none">
                    <p className="text-gray-700 mb-6">{selectedReport.summary}</p>

                    {/* Render different content based on report type */}
                    {selectedReport.category === "checkup" && selectedReport.details.vitals && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vital Signs</h3>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                          {Object.entries(selectedReport.details.vitals).map(([key, value]) => (
                            <div key={key} className="bg-gray-50 p-3 rounded-lg">
                              <div className="text-sm text-gray-600 capitalize">
                                {key.replace(/([A-Z])/g, ' $1').toLowerCase()}
                              </div>
                              <div className="text-lg font-semibold text-gray-900">{value}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedReport.category === "lab" && selectedReport.details.results && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Test Results</h3>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Test</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Reference Range</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                              {selectedReport.details.results.map((result, index) => (
                                <tr key={index}>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{result.test}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{result.value}</td>
                                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{result.range}</td>
                                  <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                                      result.status === "normal" ? "bg-green-100 text-green-800" :
                                      result.status === "high" ? "bg-red-100 text-red-800" :
                                      result.status === "low" ? "bg-yellow-100 text-yellow-800" :
                                      "bg-gray-100 text-gray-800"
                                    }`}>
                                      {result.status}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}

                    {selectedReport.category === "consultation" && selectedReport.details.recommendations && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommendations</h3>
                        <ul className="list-disc list-inside space-y-2 text-gray-700">
                          {selectedReport.details.recommendations.map((rec, index) => (
                            <li key={index}>{rec}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {selectedReport.category === "vaccination" && selectedReport.details.vaccines && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Vaccines Administered</h3>
                        <div className="space-y-3">
                          {selectedReport.details.vaccines.map((vaccine, index) => (
                            <div key={index} className="bg-gray-50 p-4 rounded-lg">
                              <div className="flex justify-between items-start">
                                <div>
                                  <div className="font-medium text-gray-900">{vaccine.name}</div>
                                  <div className="text-sm text-gray-600">Date: {new Date(vaccine.date).toLocaleDateString()}</div>
                                </div>
                                <div className="text-sm text-gray-500">
                                  Lot: {vaccine.lot}
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedReport.details.findings && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Findings</h3>
                        <p className="text-gray-700">{selectedReport.details.findings}</p>
                      </div>
                    )}

                    {selectedReport.details.impression && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Impression</h3>
                        <p className="text-gray-700">{selectedReport.details.impression}</p>
                      </div>
                    )}

                    {selectedReport.details.notes && (
                      <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-900 mb-3">Notes</h3>
                        <p className="text-gray-700">{selectedReport.details.notes}</p>
                      </div>
                    )}

                    {selectedReport.details.followUp && (
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h3 className="text-lg font-semibold text-blue-900 mb-2">Follow-up</h3>
                        <p className="text-blue-800">{selectedReport.details.followUp}</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MedicalReports;