"use client";

import { useState, useRef, useEffect } from "react";

export default function Page() {
  const [formData, setFormData] = useState({
    // Basic Information
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",

    // Professional Details
    department: "",
    bar_number: "",
    experience: "",
    specializations: [] as string[],
    status: "available",
    max_cases: "",
    hourly_rate: "",

    // Social & Documents
    linkedin: "",
    case_assignment: false,
    assigned_cases: [],
    case_duration: "",
    duration_unit: "days",
    notes: "",
  });

  const [profile_image, setProfileImage] = useState(null);
  const [certifications, setCertifications] = useState<any>([]);
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);

  const profileRef = useRef<HTMLInputElement | null>(null);
  const certsRef = useRef<HTMLInputElement | null>(null);
  const resumeRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log(formData);
    }, 15000); // 5 seconds in milliseconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [formData]);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSpecializationChange = (e: any) => {
    const { value, checked } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      specializations: checked
        ? [...prev.specializations, value]
        : prev.specializations.filter((s: any) => s !== value),
    }));
  };

  // Update the file input handlers:
  const handleProfileUpload = (e: any) => setProfileImage(e.target.files[0]);
  const handleCertUpload = (e: any) => setCertifications([...e.target.files]);
  const handleResumeUpload = (e: any) => setResume(e.target.files[0]);

  return (
    <div id="webcrumbs">
      <div className="w-full bg-white shadow-lg p-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Add New Lawyer</h1>
              <p className="text-sm mt-1">
                <span className="hover:underline cursor-pointer transition-all">
                  Dashboard
                </span>{" "}
                &gt;
                <span className="hover:underline cursor-pointer transition-all ml-1">
                  Lawyers
                </span>{" "}
                &gt;
                <span className="ml-1 font-medium">Add New Lawyer</span>
              </p>
            </div>
            <div className="flex space-x-3">
              <button className="px-4 py-2 bg-emerald-500 text-white rounded hover:bg-emerald-600 transition-all transform hover:scale-105 shadow">
                <span className="material-symbols-outlined text-sm mr-1 align-middle">
                  add
                </span>
                Save & Add Another
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all transform hover:scale-105 shadow">
                <span className="material-symbols-outlined text-sm mr-1 align-middle">
                  save
                </span>
                Save & Exit
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-all transform hover:scale-105 shadow">
                <span className="material-symbols-outlined text-sm mr-1 align-middle">
                  close
                </span>
                Cancel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            <div className="col-span-3 md:col-span-1 bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all">
              <h2 className="text-lg font-semibold mb-4 flex items-center">
                <span className="material-symbols-outlined mr-2">person</span>
                Personal Information
              </h2>

              <div className="mb-6">
                <div className="w-32 h-32 mx-auto bg-gray-50 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-blue-500 transition-all group relative overflow-hidden">
                  <input
                    type="file"
                    ref={profileRef}
                    onChange={handleProfileUpload}
                    readOnly={loading}
                    className="hidden"
                    id="profile-upload"
                  />
                  <label
                    htmlFor="profile-upload"
                    className="cursor-pointer flex flex-col items-center"
                  >
                    <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-blue-500 transition-all">
                      add_photo_alternate
                    </span>
                    <span className="text-xs mt-2 text-white0 group-hover:text-blue-500 transition-all">
                      Upload Photo
                    </span>
                  </label>
                  <div className="absolute inset-0 bg-black bg-opacity-50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="material-symbols-outlined">edit</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="full-name"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="full_name"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="John Smith"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    readOnly={loading}
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="email"
                  >
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="john.smith@lawfirm.com"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    readOnly={loading}
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="phone"
                  >
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    placeholder="+1 (555) 123-4567"
                    name="phone"
                    onChange={handleInputChange}
                    value={formData.phone}
                    readOnly={loading}
                    required
                  />
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="gender"
                  >
                    Gender
                  </label>
                  <select
                    id="gender"
                    name="gender"
                    onChange={handleInputChange}
                    value={formData.gender} // Bind to formData just like other inputs
                    disabled={loading} // Equivalent to readOnly for inputs
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="dob"
                  >
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    readOnly={loading}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-3 md:col-span-2">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6 hover:shadow-md transition-all">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">work</span>
                  Professional Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="department"
                    >
                      Department
                    </label>
                    <select
                      id="department"
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      disabled={loading}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="">Select Department</option>
                      <option value="consulting">Consulting</option>
                      <option value="litigation">Litigation</option>
                      <option value="customs">Customs</option>
                      <option value="tax">Tax</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="bar-number"
                    >
                      Bar Registration Number
                    </label>
                    <input
                      type="text"
                      id="bar-number"
                      name="bar_number"
                      value={formData.bar_number}
                      onChange={handleInputChange}
                      readOnly={loading}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="e.g. BAR12345"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="experience"
                    >
                      Years of Experience
                    </label>
                    <select
                      id="experience"
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="">Select Experience</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-15">11-15 years</option>
                      <option value="16+">16+ years</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="specialization"
                    >
                      Specialization
                    </label>
                    <details className="relative">
                      <summary className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all list-none cursor-pointer flex justify-between items-center">
                        <span className="text-white0">
                          Select Specializations
                        </span>
                        <span className="material-symbols-outlined">
                          expand_more
                        </span>
                      </summary>
                      <div className="absolute top-full left-0 right-0 bg-gray-50 border border-gray-300 mt-1 rounded z-10 shadow-lg p-2">
                        <div className="max-h-48 overflow-y-auto">
                          {[
                            "Corporate Law",
                            "Criminal Law",
                            "Family Law",
                            "Estate Planning",
                            "Intellectual Property",
                            "Real Estate Law",
                          ].map((spec) => (
                            <div
                              key={spec}
                              className="p-2 hover:bg-gray-100 rounded flex items-center"
                            >
                              <input
                                type="checkbox"
                                id={`spec-${spec}`}
                                value={spec}
                                checked={formData.specializations.includes(
                                  spec
                                )}
                                onChange={handleSpecializationChange}
                              />
                              <label htmlFor={`spec-${spec}`}>{spec}</label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </details>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6 hover:shadow-md transition-all">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">
                    calendar_month
                  </span>
                  Work & Availability
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="status"
                    >
                      Availability Status
                    </label>
                    <select
                      id="status"
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      disabled={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                    >
                      <option value="available">Available</option>
                      <option value="busy">Busy</option>
                      <option value="leave">On Leave</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="max-cases"
                    >
                      Max Number of Cases Allowed
                    </label>
                    <input
                      type="number"
                      id="max-cases"
                      name="max_cases"
                      value={formData.max_cases}
                      onChange={handleInputChange}
                      readOnly={loading}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      min="1"
                      placeholder="e.g. 10"
                    />
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="hourly-rate"
                    >
                      Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      name="hourly_rate"
                      value={formData.hourly_rate}
                      onChange={handleInputChange}
                      readOnly={loading}
                      id="hourly-rate"
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      min="0"
                      step="0.01"
                      placeholder="e.g. 250.00"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="col-span-3">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6 hover:shadow-md transition-all">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">badge</span>
                  Credentials & Documents
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Upload Certifications
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-all cursor-pointer group">
                      <input
                        type="file"
                        multiple
                        className="hidden"
                        id="certification-upload"
                        onChange={handleCertUpload}
                        ref={certsRef}
                      />
                      <label
                        htmlFor="certification-upload"
                        className="cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-blue-500 transition-all">
                          upload_file
                        </span>
                        <p className="mt-2 text-sm text-white0 group-hover:text-blue-500 transition-all">
                          Drag & drop files here or click to browse
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PDF, DOCX, JPG (Max 5MB each)
                        </p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="resume"
                    >
                      Upload Resume or CV
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-500 transition-all cursor-pointer group">
                      <input
                        type="file"
                        className="hidden"
                        id="resume-upload"
                        onChange={handleResumeUpload}
                        ref={resumeRef}
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <span className="material-symbols-outlined text-3xl text-gray-400 group-hover:text-blue-500 transition-all">
                          description
                        </span>
                        <p className="mt-2 text-sm text-white0 group-hover:text-blue-500 transition-all">
                          Drag & drop your CV here or click to browse
                        </p>
                        <p className="text-xs text-gray-400 mt-1">
                          PDF, DOCX (Max 10MB)
                        </p>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="linkedin"
                    >
                      LinkedIn Profile URL
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 py-2 text-white0 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        <i className="fa-brands fa-linkedin text-blue-600"></i>
                      </span>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        readOnly={loading}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        placeholder="https://linkedin.com/in/username"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 mb-6 hover:shadow-md transition-all">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">gavel</span>
                  Case Assignment
                </h2>

                <div className="mb-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      id="case-assignment-toggle"
                      name="case_assignment"
                      checked={formData.case_assignment}
                      onChange={handleInputChange}
                      disabled={loading}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-gray-50 after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    <span className="ml-3 text-sm font-medium">
                      Assign Cases Immediately?
                    </span>
                  </label>
                </div>
                <div className="space-y-4 mt-4">
                  {formData.case_assignment === true && (
                    <div>
                      <label
                        className="block text-sm font-medium mb-1"
                        htmlFor="case-selection"
                      >
                        Select Cases to Assign
                      </label>
                      <select
                        id="case-selection"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-32"
                      >
                        <option value="case1">
                          #1234 - Johnson vs. Smith (Corporate Dispute)
                        </option>
                        <option value="case2">
                          #1235 - Miller Estate Planning
                        </option>
                        <option value="case3">
                          #1236 - ABC Corp Merger Review
                        </option>
                        <option value="case4">
                          #1237 - Intellectual Property Claim - XYZ Tech
                        </option>
                        <option value="case5">
                          #1238 - Employment Dispute - Acme Inc.
                        </option>
                      </select>
                      <p className="text-xs text-white0 mt-1">
                        Hold Ctrl/Cmd to select multiple cases
                      </p>
                    </div>
                  )}

                  <div>
                    <label
                      className="block text-sm font-medium mb-1"
                      htmlFor="case-duration"
                    >
                      Case Duration
                    </label>
                    <div className="flex space-x-2">
                      <input
                        type="number"
                        id="case-duration"
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        min="1"
                        placeholder="e.g. 30"
                      />
                      <select
                        id="duration-unit"
                        className="px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                      >
                        <option value="days">Days</option>
                        <option value="weeks">Weeks</option>
                        <option value="months">Months</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">note</span>
                  Notes & Internal Comments
                </h2>

                <div>
                  <textarea
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all h-32"
                    placeholder="Add internal notes about this lawyer (only visible to administrators)"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-all transform hover:scale-105 shadow">
              Cancel
            </button>
            <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all transform hover:scale-105 shadow flex items-center">
              <span className="material-symbols-outlined mr-1">add_circle</span>
              Add Lawyer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
