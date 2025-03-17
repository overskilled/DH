"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/context/auth-context";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Page() {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const { lawyers } = useAuth();

  useEffect(() => {
    console.log(lawyers);
  }, [lawyers]);

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total pages
  const totalPages = Math.ceil((lawyers.length ?? 0) / itemsPerPage);

  // Slice data for pagination
  const displayedLawyers = lawyers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Handle pagination
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div id="webcrumbs">
      <div className="w-full bg-gray-50 min-h-screen p-6 font-sans">
        <header className="bg-white shadow-md p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Lawyers</h1>
              <div className="text-sm text-gray-500 flex items-center mt-1">
                <span className="hover:text-indigo-600 transition duration-300 cursor-pointer">
                  Dashboard
                </span>
                <span className="mx-2">&gt;</span>
                <span className="text-indigo-600">Lawyers</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => router.push("/dashboard/lawyers/new")}
                className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300 transform hover:scale-105"
              >
                <span className="material-symbols-outlined mr-2">
                  person_add
                </span>
                Add New Lawyer
              </button>
              <button className="flex items-center border border-indigo-600 text-indigo-600 hover:bg-indigo-50 px-4 py-2 rounded-md transition duration-300 transform hover:scale-105">
                <span className="material-symbols-outlined mr-2">download</span>
                Export Lawyer List
              </button>
            </div>
          </div>
        </header>

        <div className="py-4">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-center mb-6">
              <div className="relative w-full md:w-96 mb-4 md:mb-0">
                <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  search
                </span>
                <input
                  type="text"
                  placeholder="Search by name, email or department..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300"
                />
              </div>
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <details className="relative">
                  <summary className="flex items-center cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition duration-300">
                    <span className="material-symbols-outlined mr-2 text-gray-500">
                      filter_list
                    </span>
                    Department
                    <span className="material-symbols-outlined ml-2 text-gray-500">
                      expand_more
                    </span>
                  </summary>
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 z-10 w-48">
                    <div className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition duration-300">
                      Consulting
                    </div>
                    <div className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition duration-300">
                      Litigation
                    </div>
                    <div className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition duration-300">
                      Customs
                    </div>
                    <div className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition duration-300">
                      Tax
                    </div>
                  </div>
                </details>
                <details open={isOpen} className="relative">
                  <summary
                    onClick={(e: any) => {
                      e.preventDefault();
                      setIsOpen((prev) => !prev);
                    }}
                    className="flex items-center cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition duration-300"
                  >
                    <span className="material-symbols-outlined mr-2 text-gray-500">
                      work
                    </span>
                    Active Cases
                    <span className="material-symbols-outlined ml-2 text-gray-500">
                      expand_more
                    </span>
                  </summary>
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 z-10 w-48">
                    <div
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition duration-300"
                    >
                      All Lawyers
                    </div>
                    <div className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition duration-300">
                      With Active Cases
                    </div>
                    <div className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition duration-300">
                      No Active Cases
                    </div>
                  </div>
                </details>
                <details className="relative">
                  <summary className="flex items-center cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition duration-300">
                    <span className="material-symbols-outlined mr-2 text-gray-500">
                      sort
                    </span>
                    Workload
                    <span className="material-symbols-outlined ml-2 text-gray-500">
                      expand_more
                    </span>
                  </summary>
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 z-10 w-48">
                    <div className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition duration-300">
                      Highest First
                    </div>
                    <div className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition duration-300">
                      Lowest First
                    </div>
                  </div>
                </details>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Lawyer
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Contact
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Department
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Cases
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedLawyers?.map((lawyer: any, index: any) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 cursor-pointer transition duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="relative h-10 w-10">
                              <Image
                                src={lawyer.profileImage}
                                alt={lawyer.full_name}
                                fill
                                className="rounded-full object-cover hover:ring-2 hover:ring-indigo-500 transition duration-300"
                              />
                            </div>
                          </div>
                          <div className="ml-4">
                            <div
                              onClick={() =>
                                router.push(`/dashboard/lawyers/${lawyer.id}`)
                              }
                              className="text-sm font-medium text-gray-900 hover:text-indigo-600 cursor-pointer transition duration-300"
                            >
                              {lawyer.full_name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 mb-1">
                          {lawyer.email}
                        </div>
                        <div className="text-sm text-gray-500">
                          {lawyer.phone}
                        </div>
                        <div className="flex mt-2 gap-2">
                          <button className="text-xs flex items-center text-indigo-600 hover:text-indigo-800 transition duration-300">
                            <span className="material-symbols-outlined text-sm mr-1">
                              mail
                            </span>
                            Email
                          </button>
                          <button className="text-xs flex items-center text-green-600 hover:text-green-800 transition duration-300">
                            <span className="material-symbols-outlined text-sm mr-1">
                              call
                            </span>
                            Call
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {lawyer.department}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="flex items-center">
                          <span className="material-symbols-outlined mr-1 text-indigo-500">
                            folder
                          </span>
                          {lawyer?.cases?.length ?? 0} cases
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            lawyer.status === "available"
                              ? "bg-green-100 text-green-800"
                              : lawyer.status === "busy"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {lawyer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button
                            onClick={() =>
                              router.push(`/dashboard/lawyers/${lawyer.id}`)
                            }
                            className="text-indigo-600 hover:text-indigo-900 transition duration-300"
                          >
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </button>
                          <button className="text-blue-600 hover:text-blue-900 transition duration-300">
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </button>
                          <button className="text-red-600 hover:text-red-900 transition duration-300">
                            <span className="material-symbols-outlined">
                              delete
                            </span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-between items-center border-t border-gray-200 px-4 py-3">
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 border rounded-md text-sm ${
                  currentPage === 1
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Previous
              </button>
              <p className="text-sm text-gray-700">
                Page <span className="font-medium">{currentPage}</span> of{" "}
                <span className="font-medium">{totalPages}</span>
              </p>
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 border rounded-md text-sm ${
                  currentPage === totalPages
                    ? "text-gray-400 cursor-not-allowed"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
