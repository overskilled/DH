"use client";

import { setToCollection } from "@/functions/add-to-collection";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function Page() {
  const [clientType, setClientType] = useState("personal");
  const [formData, setFormData] = useState({
    clientType: "personal",
    fullName: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    idNumber: "",
    companyReg: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    contactMethod: "",
    assignedCases: [],
    companyName: "",
    clientTypeDetail: "",
    notes: "",
    welcomeEmail: false,
    invoiceGeneration: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: any) => {
    const { id, value, type, checked, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    
  };

  return (
    <div id="webcrumbs">
      <div className="w-full bg-white shadow-lg p-6 font-sans">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Add New Client</h1>
              <div className="text-sm text-gray-500 mb-4">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  Dashboard
                </span>{" "}
                &gt;
                <span className="hover:text-blue-600 transition-colors cursor-pointer ml-1">
                  Clients
                </span>{" "}
                &gt;
                <span className="text-gray-700 ml-1">Add New Client</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
              <button
                type="button"
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all transform hover:scale-105"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline">Cancel</span>
              </button>
              <button
                type="submit"
                form="clientForm"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 inline-block mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="hidden sm:inline">Save & Exit</span>
              </button>
            </div>
          </div>

          <div className="bg-gray-100 h-1 w-full rounded-full mb-6"></div>

          <form id="clientForm" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-3">
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold mb-4">Client Type</h2>
                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setClientType("personal")}
                        className={`px-6 py-2 rounded-lg ${
                          clientType === "personal"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Personal
                      </button>
                      <button
                        type="button"
                        onClick={() => setClientType("organization")}
                        className={`px-6 py-2 rounded-lg ${
                          clientType === "organization"
                            ? "bg-blue-600 text-white"
                            : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                        }`}
                      >
                        Organization
                      </button>
                    </div>
                  </div>

                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                    {clientType === "personal" ? "Personal" : "Organization"}{" "}
                    Information
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="fullName"
                      >
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder={`Enter ${
                          clientType === "personal"
                            ? "client's full name"
                            : "company name"
                        }`}
                        required
                        value={formData.fullName}
                        onChange={handleInputChange}
                      />
                    </div>

                    {/* <div className="md:col-span-2">
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="profilePicture"
                      >
                        Profile Picture
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition-colors cursor-pointer">
                        <input
                          type="file"
                          id="profilePicture"
                          className="hidden"
                          accept="image/*"
                          onChange={handleInputChange}
                        />
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 mx-auto text-gray-400"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        <p className="mt-2 text-sm text-gray-600">
                          Drag and drop an image here or click to upload
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          PNG, JPG or JPEG (Max. 2MB)
                        </p>
                      </div>
                    </div> */}

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="email"
                      >
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="email@example.com"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="phone"
                      >
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="+1 (123) 456-7890"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                    </div>

                    {clientType === "personal" && (
                      <>
                        <div>
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="gender"
                          >
                            Gender
                          </label>
                          <select
                            id="gender"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                            value={formData.gender}
                            onChange={handleInputChange}
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        <div>
                          <label
                            className="block text-sm font-medium text-gray-700 mb-1"
                            htmlFor="dob"
                          >
                            Date of Birth
                          </label>
                          <input
                            type="date"
                            id="dob"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            value={formData.dob}
                            onChange={handleInputChange}
                          />
                        </div>
                      </>
                    )}

                    {clientType === "organization" && (
                      <div className="md:col-span-2">
                        <label
                          className="block text-sm font-medium text-gray-700 mb-1"
                          htmlFor="companyReg"
                        >
                          Company Registration Number{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="companyReg"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          placeholder="Enter company registration number"
                          required
                          value={formData.companyReg}
                          onChange={handleInputChange}
                        />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="idNumber"
                      >
                        {clientType === "personal"
                          ? "National ID / Passport Number"
                          : "Tax Identification Number"}
                      </label>
                      <input
                        type="text"
                        id="idNumber"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder={
                          clientType === "personal"
                            ? "Enter ID or passport number"
                            : "Enter tax ID number"
                        }
                        value={formData.idNumber}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Contact Details
                  </h2>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="street"
                      >
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="street"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="123 Main St"
                        value={formData.street}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="city"
                      >
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="New York"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="state"
                      >
                        State/Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="NY"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="zip"
                      >
                        Zip/Postal Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="10001"
                        value={formData.zip}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="country"
                      >
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Cameroon"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="contactMethod"
                      >
                        Preferred Contact Method
                      </label>
                      <select
                        id="contactMethod"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                        value={formData.contactMethod}
                        onChange={handleInputChange}
                      >
                        <option value="">Select contact method</option>
                        <option value="email">Email</option>
                        <option value="phone">Phone</option>
                        <option value="whatsapp">WhatsApp</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Case Details (Optional)
                  </h2>

                  <div className="mb-4">
                    <label className="inline-flex items-center cursor-pointer">
                      <span className="mr-3 text-sm font-medium text-gray-700">
                        Assign a Case Immediately?
                      </span>
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only peer"
                          id="assignCase"
                          checked={formData.assignCase}
                          onChange={handleInputChange}
                        />
                        <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                      </div>
                    </label>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="caseName"
                      >
                        Case Name
                      </label>
                      <input
                        type="text"
                        id="caseName"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Enter case name"
                        value={formData.caseName}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="caseType"
                      >
                        Case Type
                      </label>
                      <select
                        id="caseType"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                        value={formData.caseType}
                        onChange={handleInputChange}
                      >
                        <option value="">Select case type</option>
                        <option value="litigation">Litigation</option>
                        <option value="consulting">Consulting</option>
                        <option value="customs">Customs</option>
                        <option value="tax">Tax</option>
                      </select>
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="caseDuration"
                      >
                        Case Duration (Days)
                      </label>
                      <input
                        type="number"
                        id="caseDuration"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        placeholder="Enter duration"
                        min="1"
                        value={formData.caseDuration}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label
                        className="block text-sm font-medium text-gray-700 mb-1"
                        htmlFor="lawyer"
                      >
                        Assign Lawyer
                      </label>
                      <select
                        id="lawyer"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all appearance-none bg-white"
                        value={formData.lawyer}
                        onChange={handleInputChange}
                      >
                        <option value="">Select lawyer</option>
                        <option value="john">John Smith</option>
                        <option value="jane">Jane Doe</option>
                        <option value="robert">Robert Johnson</option>
                        <option value="sarah">Sarah Williams</option>
                      </select>
                    </div>
                  </div>
                </div> */}
                <div className="bg-white rounded-xl shadow-md p-6 mb-6">
                  <h2 className="text-xl font-semibold mb-4 flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2 text-blue-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                    Communication & Billing
                  </h2>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <label
                        className="flex w-full items-center justify-between cursor-pointer text-sm font-medium text-gray-700"
                        htmlFor="welcomeEmail"
                      >
                        Send Welcome Email?
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="welcomeEmail"
                            className="sr-only peer"
                            id="welcomeEmail"
                            checked={formData.welcomeEmail}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <label
                        className="flex w-full items-center justify-between cursor-pointer text-sm font-medium text-gray-700"
                        htmlFor="invoiceGeneration"
                      >
                        Enable Invoice Generation?
                        <div className="relative">
                          <input
                            type="checkbox"
                            name="invoiceGeneration"
                            className="sr-only peer"
                            id="invoiceGeneration"
                            checked={formData.invoiceGeneration}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
                  <div className="flex items-start mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-blue-600 mt-0.5 mr-2 flex-shrink-0"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <div>
                      <h3 className="font-medium text-blue-800">
                        Required Fields
                      </h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Fields marked with{" "}
                        <span className="text-red-500">*</span> must be
                        completed before submission.
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex justify-center gap-5 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting && <Loader2 className="animate-spin" />}
                    {isSubmitting ? "Submitting..." : "Add Client"}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
