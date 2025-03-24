"use client";

import { useState, useRef, useEffect } from "react";
import { updateDocument } from "@/functions/update-doc-in-collection";
import { uploadFile } from "@/functions/upload-file";
import Loader from "@/components/loader";
import { toast } from "sonner";
import { useParams } from "next/navigation";
import { useAuth } from "@/components/context/auth-context";

interface LawyerData {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  gender: string;
  dob: string;
  department: string;
  bar_number: string;
  experience: string;
  specializations: string[];
  status: string;
  max_cases: string;
  hourly_rate: string;
  linkedin: string;
  case_assignment: boolean;
  assigned_cases: string[];
  case_duration: string;
  duration_unit: string;
  notes: string;
  profileImage: string;
  certifications: Array<{ name: string; url: string }>;
  resume: string;
  createdAt: string;
}

export default function UpdateLawyerPage() {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    gender: "",
    dob: "",
    department: "",
    bar_number: "",
    experience: "",
    specializations: [] as string[],
    status: "available",
    max_cases: "",
    hourly_rate: "",
    linkedin: "",
    case_assignment: false,
    assigned_cases: [] as string[],
    case_duration: "",
    duration_unit: "days",
    notes: "",
  });

  const [existingFiles, setExistingFiles] = useState({
    profileImage: "",
    certifications: [] as Array<{ name: string; url: string }>,
    resume: "",
  });
  const { id } = useParams();
  const [profile_image, setProfileImage] = useState<File | null>(null);
  const [certifications, setCertifications] = useState<File[]>([]);
  const [resume, setResume] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const { lawyers, cases } = useAuth();
  const profileRef = useRef<HTMLInputElement | null>(null);
  const certsRef = useRef<HTMLInputElement | null>(null);
  const resumeRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const fetchLawyerData = async () => {
      try {
        const data = lawyers?.find((lawyer: any) => lawyer.id === id);

        if (data) {
          setFormData({
            full_name: data.full_name,
            email: data.email,
            phone: data.phone,
            gender: data.gender,
            dob: data.dob,
            department: data.department,
            bar_number: data.bar_number,
            experience: data.experience,
            specializations: data.specializations,
            status: data.status,
            max_cases: data.max_cases,
            hourly_rate: data.hourly_rate,
            linkedin: data.linkedin,
            case_assignment: data.case_assignment,
            assigned_cases: data.assigned_cases,
            case_duration: data.case_duration,
            duration_unit: data.duration_unit,
            notes: data.notes,
          });

          setExistingFiles({
            profileImage: data.profileImage || "",
            certifications: data.certifications || [],
            resume: data.resume || "",
          });
        }
      } catch (error) {
        toast.error("Error loading lawyer data");
      } finally {
        setInitialLoad(false);
      }
    };

    fetchLawyerData();
  }, [id]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, type, value, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSpecializationChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      specializations: checked
        ? [...prev.specializations, value]
        : prev.specializations.filter((s) => s !== value),
    }));
  };

  const handleProfileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setProfileImage(e.target.files[0]);
  };

  const handleCertUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setCertifications(Array.from(e.target.files)); // Convert FileList to an array
    }
  };

  const handleResumeUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setResume(e.target.files[0]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const profileUrl = profile_image
        ? await uploadFile(
            profile_image,
            `lawyers/${formData.email}/profile/${profile_image.name}`
          )
        : existingFiles.profileImage;

      const certUrls =
        certifications.length > 0
          ? await Promise.all(
              certifications.map(async (file) => ({
                name: file.name,
                url: await uploadFile(
                  file,
                  `lawyers/${formData.email}/certifications/${file.name}`
                ),
              }))
            )
          : existingFiles.certifications;

      const resumeUrl = resume
        ? await uploadFile(
            resume,
            `lawyers/${formData.email}/resume/${resume.name}`
          )
        : existingFiles.resume;

      const updateData = {
        ...formData,
        profileImage: profileUrl,
        certifications: certUrls,
        resume: resumeUrl,
        updatedAt: new Date().toISOString(),
      };

      await updateDocument("lawyers", id as string, updateData);

      toast.success("Profile Updated", {
        description: "Lawyer profile has been successfully updated",
      });
    } catch (error) {
      console.error("Update error:", error);
      toast.error("Update Failed", {
        description: "Could not update lawyer profile",
      });
    } finally {
      setLoading(false);
    }
  };

  if (initialLoad) return <Loader />;

  return (
    <div id="webcrumbs">
      {loading && <Loader />}
      <div className="w-full bg-white shadow-lg p-8">
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Update Lawyer Profile</h1>
              <p className="text-sm mt-1">
                <span className="hover:underline cursor-pointer">
                  Dashboard
                </span>{" "}
                &gt;
                <span className="hover:underline cursor-pointer ml-1">
                  Lawyers
                </span>{" "}
                &gt;
                <span className="ml-1 font-medium">Update Profile</span>
              </p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all shadow flex items-center"
              >
                <span className="material-symbols-outlined mr-1">save</span>
                Save Changes
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100 transition-all shadow">
                Cancel
              </button>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-8">
            {/* Personal Information Column */}
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
                    className="hidden"
                    id="profile-upload"
                  />
                  <label htmlFor="profile-upload" className="cursor-pointer">
                    {profile_image || existingFiles.profileImage ? (
                      <img
                        src={
                          profile_image
                            ? URL.createObjectURL(profile_image)
                            : existingFiles.profileImage
                        }
                        alt="Profile"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <div className="flex flex-col items-center">
                        <span className="material-symbols-outlined text-4xl text-gray-400 group-hover:text-blue-500">
                          add_photo_alternate
                        </span>
                        <span className="text-xs mt-2">Update Photo</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="material-symbols-outlined text-white">
                        edit
                      </span>
                    </div>
                  </label>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="full_name"
                    value={formData.full_name}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                    readOnly
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Gender
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    name="dob"
                    value={formData.dob}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Professional Details Column */}
            <div className="col-span-3 md:col-span-2 space-y-6">
              {/* Professional Details Section */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">work</span>
                  Professional Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Department
                    </label>
                    <select
                      name="department"
                      value={formData.department}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                    >
                      <option value="">Select Department</option>
                      <option value="consulting">Consulting</option>
                      <option value="litigation">Litigation</option>
                      <option value="customs">Customs</option>
                      <option value="tax">Tax</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Bar Number
                    </label>
                    <input
                      type="text"
                      name="bar_number"
                      value={formData.bar_number}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Experience
                    </label>
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                    >
                      <option value="">Select Experience</option>
                      <option value="0-2">0-2 years</option>
                      <option value="3-5">3-5 years</option>
                      <option value="6-10">6-10 years</option>
                      <option value="11-15">11-15 years</option>
                      <option value="16+">16+ years</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Specializations
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        "Corporate Law",
                        "Criminal Law",
                        "Family Law",
                        "Intellectual Property",
                      ].map((spec) => (
                        <label
                          key={spec}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            value={spec}
                            checked={formData.specializations.includes(spec)}
                            onChange={handleSpecializationChange}
                            className="rounded focus:ring-blue-500"
                          />
                          <span className="text-sm">{spec}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Work & Availability Section */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">
                    calendar_month
                  </span>
                  Work & Availability
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Availability Status
                    </label>
                    <select
                      name="status"
                      value={formData.status}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                    >
                      <option value="available">Available</option>
                      <option value="busy">Busy</option>
                      <option value="leave">On Leave</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Max Cases
                    </label>
                    <input
                      type="number"
                      name="max_cases"
                      value={formData.max_cases}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Hourly Rate ($)
                    </label>
                    <input
                      type="number"
                      name="hourly_rate"
                      value={formData.hourly_rate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Documents Section */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">badge</span>
                  Credentials & Documents
                </h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Certifications
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        multiple
                        ref={certsRef}
                        onChange={handleCertUpload}
                        className="hidden"
                        id="cert-upload"
                      />
                      <label htmlFor="cert-upload" className="cursor-pointer">
                        <div className="text-center">
                          <span className="material-symbols-outlined text-3xl text-gray-400">
                            upload
                          </span>
                          <p className="text-sm mt-2">
                            Click to upload new certifications
                          </p>
                        </div>
                      </label>

                      {existingFiles.certifications.length > 0 && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium mb-2">
                            Current Certifications:
                          </h4>
                          <div className="space-y-2">
                            {existingFiles.certifications.map((cert, index) => (
                              <div
                                key={index}
                                className="flex items-center text-sm"
                              >
                                <span className="material-symbols-outlined mr-2">
                                  description
                                </span>
                                <a
                                  href={cert.url}
                                  target="_blank"
                                  rel="noopener"
                                  className="text-blue-600 hover:underline"
                                >
                                  {cert.name}
                                </a>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Resume/CV
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4">
                      <input
                        type="file"
                        ref={resumeRef}
                        onChange={handleResumeUpload}
                        className="hidden"
                        id="resume-upload"
                      />
                      <label htmlFor="resume-upload" className="cursor-pointer">
                        <div className="text-center">
                          <span className="material-symbols-outlined text-3xl text-gray-400">
                            upload
                          </span>
                          <p className="text-sm mt-2">
                            Click to upload new resume
                          </p>
                        </div>
                      </label>

                      {existingFiles.resume && (
                        <div className="mt-4 text-center">
                          <a
                            href={existingFiles.resume}
                            target="_blank"
                            rel="noopener"
                            className="text-blue-600 hover:underline"
                          >
                            <span className="material-symbols-outlined mr-2">
                              description
                            </span>
                            View Current Resume
                          </a>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1">
                      LinkedIn Profile
                    </label>
                    <div className="flex">
                      <span className="inline-flex items-center px-3 py-2 text-gray-500 bg-gray-100 border border-r-0 border-gray-300 rounded-l-md">
                        linkedin.com/in/
                      </span>
                      <input
                        type="text"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleInputChange}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-r focus:ring-blue-500"
                        placeholder="username"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Case Assignment Section */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">gavel</span>
                  Case Assignment
                </h2>

                <div className="mb-4">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="case_assignment"
                      checked={formData.case_assignment}
                      onChange={handleInputChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 rounded-full peer-checked:bg-blue-600 transition-colors">
                      <div className="peer-checked:translate-x-full bg-white border rounded-full h-5 w-5 transform transition-transform"></div>
                    </div>
                    <span className="ml-3 text-sm font-medium">
                      {formData.case_assignment
                        ? "Auto-Assign Active"
                        : "Enable Auto-Assign"}
                    </span>
                  </label>
                </div>

                {formData.case_assignment && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Assigned Cases
                      </label>
                      <select
                        multiple
                        name="assigned_cases"
                        value={formData.assigned_cases}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 h-32"
                      >
                        {cases.map((caseItem: any) => (
                          <option key={caseItem.id} value={caseItem.id}>
                            Case - {caseItem.caseName}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Case Duration
                        </label>
                        <input
                          type="number"
                          name="case_duration"
                          value={formData.case_duration}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Duration Unit
                        </label>
                        <select
                          name="duration_unit"
                          value={formData.duration_unit}
                          onChange={handleInputChange}
                          className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500"
                        >
                          <option value="days">Days</option>
                          <option value="weeks">Weeks</option>
                          <option value="months">Months</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Notes Section */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200 hover:shadow-md transition-all">
                <h2 className="text-lg font-semibold mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">note</span>
                  Internal Notes
                </h2>
                <textarea
                  name="notes"
                  value={formData.notes}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded focus:ring-blue-500 h-32"
                  placeholder="Administrative notes..."
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
