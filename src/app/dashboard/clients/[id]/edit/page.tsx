"use client";

import { updateDocument } from "@/functions/update-doc-in-collection";
import { Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuth } from "@/components/context/auth-context";

export default function UpdateClientPage() {
  const router = useRouter();
  const { id } = useParams();
  const [clientType, setClientType] = useState("personal");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [initialDataLoaded, setInitialDataLoaded] = useState(false);
  const { clients } = useAuth();

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

  useEffect(() => {
    const fetchClientData = async () => {
      try {
        const clientData = clients?.find((client: any) => client.id === id);

        if (clientData) {
          setFormData((prev) => ({
            ...prev,
            ...clientData,
          }));
          setClientType(clientData.clientType || "personal");
          setInitialDataLoaded(true);
        } else {
          toast.error("Client not found");
        }
      } catch (error) {
        console.error("Error fetching client data:", error);
        toast.error("Error loading client data");
      }
    };

    fetchClientData();
  }, [id, clients]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updateData = {
        ...formData,
        updatedAt: new Date().toISOString(),
      };

      await updateDocument("users", id as string, {
        email: formData.email,
        name: formData.fullName,
        phone: formData.phone,
      });

      await updateDocument("clients", id as string, updateData);

      toast.success("Client Updated", {
        description: "Client information has been successfully updated",
      });
      router.push(`/dashboard/clients/${id}`);
    } catch (error) {
      console.error("Error updating client:", error);
      toast.error("Update Failed", {
        description: "Could not update client information",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!initialDataLoaded) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-12 w-12 text-blue-600" />
      </div>
    );
  }

  return (
    <div id="webcrumbs">
      <div className="w-full bg-white shadow-lg p-6 font-sans">
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Update Client</h1>
              <div className="text-sm text-gray-500 mb-4">
                <span className="hover:text-blue-600 transition-colors cursor-pointer">
                  Dashboard
                </span>{" "}
                &gt;
                <span className="hover:text-blue-600 transition-colors cursor-pointer ml-1">
                  Clients
                </span>{" "}
                &gt;
                <span className="text-gray-700 ml-1">{formData.fullName}</span>
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-2 mt-4 md:mt-0">
              <button
                type="button"
                onClick={() => router.push("/dashboard/clients")}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all transform hover:scale-105"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="clientForm"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md"
              >
                Save Changes
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>

                    {clientType === "personal" && (
                      <>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Gender
                          </label>
                          <select
                            id="gender"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                          <label className="block text-sm font-medium text-gray-700 mb-1">
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
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Company Registration Number{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="text"
                          id="companyReg"
                          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                          value={formData.companyReg}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    )}

                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        {clientType === "personal"
                          ? "National ID / Passport Number"
                          : "Tax Identification Number"}
                      </label>
                      <input
                        type="text"
                        id="idNumber"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Street Address
                      </label>
                      <input
                        type="text"
                        id="street"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={formData.street}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        City
                      </label>
                      <input
                        type="text"
                        id="city"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={formData.city}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        State/Province
                      </label>
                      <input
                        type="text"
                        id="state"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={formData.state}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Zip/Postal Code
                      </label>
                      <input
                        type="text"
                        id="zip"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={formData.zip}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Country
                      </label>
                      <input
                        type="text"
                        id="country"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                        value={formData.country}
                        onChange={handleInputChange}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Preferred Contact Method
                      </label>
                      <select
                        id="contactMethod"
                        className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
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
                      <label className="flex w-full items-center justify-between cursor-pointer text-sm font-medium text-gray-700">
                        Send Welcome Email?
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="welcomeEmail"
                            className="sr-only peer"
                            checked={formData.welcomeEmail}
                            onChange={handleInputChange}
                          />
                          <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </div>
                      </label>
                    </div>

                    <div className="flex items-center justify-between">
                      <label className="flex w-full items-center justify-between cursor-pointer text-sm font-medium text-gray-700">
                        Enable Invoice Generation?
                        <div className="relative">
                          <input
                            type="checkbox"
                            id="invoiceGeneration"
                            className="sr-only peer"
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
                      className="h-6 w-6 text-blue-600 mt-0.5 mr-2"
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
                        Update Client
                      </h3>
                      <p className="text-sm text-blue-700 mt-1">
                        Review all changes before submitting
                      </p>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex justify-center gap-5 w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-all transform hover:scale-105 shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting && <Loader2 className="animate-spin" />}
                    {isSubmitting ? "Updating..." : "Update Client"}
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
