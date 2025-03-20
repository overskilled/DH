"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuth } from "@/components/context/auth-context";
import Image from "next/image";
import { DeleteDialog } from "@/components/deleteDialog";

export default function Page() {
  const router = useRouter();
  const { lawyers, cases } = useAuth();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [elementToDelete, setElementToDelete] = useState<any>({});

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [activeCasesFilter, setActiveCasesFilter] = useState("all");
  const [workloadSort, setWorkloadSort] = useState<"none" | "high" | "low">(
    "none"
  );

  // Pagination
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  // Filtered lawyers calculation
  const filteredLawyers = (lawyers || [])
    .filter((lawyer: any) => {
      const searchMatches = [
        lawyer.full_name?.toLowerCase(),
        lawyer.email?.toLowerCase(),
        lawyer.department?.toLowerCase(),
      ].some((value) => value?.includes(searchQuery.toLowerCase()));

      const departmentMatches =
        !selectedDepartment || lawyer.department === selectedDepartment;

      const caseFilterMatches =
        activeCasesFilter === "all" ||
        (activeCasesFilter === "with" &&
          (cases.filter((caseItem: any) =>
            caseItem?.assignedLawyers?.includes(lawyer.id)
          ).length || 0) > 0) ||
        (activeCasesFilter === "without" &&
          (cases.filter((caseItem: any) =>
            caseItem?.assignedLawyers?.includes(lawyer.id)
          ).length || 0) === 0);

      return searchMatches && departmentMatches && caseFilterMatches;
    })
    .sort((a: any, b: any) => {
      if (workloadSort === "high")
        return (
          (cases.filter((caseItem: any) =>
            caseItem?.assignedLawyers?.includes(b.id)
          ).length || 0) -
          (cases.filter((caseItem: any) =>
            caseItem?.assignedLawyers?.includes(a.id)
          ).length || 0)
        );
      if (workloadSort === "low")
        return (
          (cases.filter((caseItem: any) =>
            caseItem?.assignedLawyers?.includes(a.id)
          ).length || 0) -
          (cases.filter((caseItem: any) =>
            caseItem?.assignedLawyers?.includes(b.id)
          ).length || 0)
        );
      return 0;
    });

  // Pagination calculations
  const totalPages = Math.ceil(filteredLawyers.length / itemsPerPage);
  const displayedLawyers = filteredLawyers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset pagination on filter changes
  useEffect(
    () => setCurrentPage(1),
    [searchQuery, selectedDepartment, activeCasesFilter, workloadSort]
  );

  const handleOpenDelete = (element: any) => {
    setElementToDelete(element);
    setIsDeleteOpen(true);
  };
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
                <input
                  type="text"
                  placeholder="Search by name, email or department..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 transition duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <span className="material-symbols-outlined absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                  search
                </span>
              </div>

              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                {/* Department Filter */}
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
                    {["", "consulting", "litigation", "customs", "tax"].map(
                      (dept) => (
                        <div
                          key={dept}
                          onClick={() =>
                            setSelectedDepartment(
                              dept === selectedDepartment ? "" : dept
                            )
                          }
                          className={`px-4 py-2 cursor-pointer capitalize ${
                            dept === selectedDepartment
                              ? "bg-indigo-100 text-indigo-700"
                              : "hover:bg-indigo-50"
                          }`}
                        >
                          {dept || "All Departments"}
                        </div>
                      )
                    )}
                  </div>
                </details>

                {/* Active Cases Filter */}
                <details className="relative">
                  <summary className="flex items-center cursor-pointer bg-white border border-gray-300 rounded-md px-4 py-2 hover:bg-gray-50 transition duration-300">
                    <span className="material-symbols-outlined mr-2 text-gray-500">
                      work
                    </span>
                    Active Cases
                    <span className="material-symbols-outlined ml-2 text-gray-500">
                      expand_more
                    </span>
                  </summary>
                  <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md py-2 z-10 w-48">
                    {["all", "with", "without"].map((filter) => (
                      <div
                        key={filter}
                        onClick={() => setActiveCasesFilter(filter)}
                        className={`px-4 py-2 cursor-pointer ${
                          activeCasesFilter === filter
                            ? "bg-indigo-100 text-indigo-700"
                            : "hover:bg-indigo-50"
                        }`}
                      >
                        {filter === "all" && "All Lawyers"}
                        {filter === "with" && "With Active Cases"}
                        {filter === "without" && "No Active Cases"}
                      </div>
                    ))}
                  </div>
                </details>

                {/* Workload Sort */}
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
                    {["none", "high", "low"].map((sort) => (
                      <div
                        key={sort}
                        onClick={() =>
                          setWorkloadSort(sort as typeof workloadSort)
                        }
                        className={`px-4 py-2 cursor-pointer ${
                          workloadSort === sort
                            ? "bg-indigo-100 text-indigo-700"
                            : "hover:bg-indigo-50"
                        }`}
                      >
                        {sort === "none" && "Default"}
                        {sort === "high" && "Highest First"}
                        {sort === "low" && "Lowest First"}
                      </div>
                    ))}
                  </div>
                </details>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Lawyer
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Department
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Cases
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {displayedLawyers.map((lawyer: any) => (
                    <tr
                      key={lawyer.id}
                      className="hover:bg-gray-50 cursor-pointer transition duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="relative h-10 w-10">
                            <Image
                              src={lawyer.profileImage}
                              alt={lawyer.full_name}
                              fill
                              className="rounded-full object-cover hover:ring-2 hover:ring-indigo-500 transition duration-300"
                            />
                          </div>
                          <div className="ml-4">
                            <div
                              onClick={() =>
                                router.push(`/dashboard/lawyers/${lawyer.id}`)
                              }
                              className="text-sm font-medium text-gray-900 hover:text-indigo-600 cursor-pointer"
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
                          <button className="text-xs flex items-center text-indigo-600 hover:text-indigo-800">
                            <span className="material-symbols-outlined text-sm mr-1">
                              mail
                            </span>
                            Email
                          </button>
                          <button className="text-xs flex items-center text-green-600 hover:text-green-800">
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
                          {cases.filter((caseItem: any) =>
                            caseItem?.assignedLawyers?.includes(lawyer.id)
                          ).length || 0}{" "}
                          cases
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
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            <span className="material-symbols-outlined">
                              visibility
                            </span>
                          </button>
                          <button
                            onClick={() =>
                              router.push(
                                `/dashboard/lawyers/${lawyer.id}/edit`
                              )
                            }
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <span className="material-symbols-outlined">
                              edit
                            </span>
                          </button>
                          <button
                            onClick={() => handleOpenDelete(lawyer)}
                            className="text-red-600 hover:text-red-900"
                          >
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

              {filteredLawyers.length === 0 && (
                <div className="text-center py-8">
                  <span className="material-symbols-outlined text-4xl text-gray-400 mb-4">
                    search_off
                  </span>
                  <p className="text-gray-500">
                    No lawyers found matching your criteria
                  </p>
                </div>
              )}
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

              <div className="hidden sm:flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 rounded-md text-sm ${
                      currentPage === i + 1
                        ? "bg-indigo-600 text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>

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
      <DeleteDialog
        onOpen={isDeleteOpen}
        element={elementToDelete}
        setElement={setIsDeleteOpen}
        table={"lawyers"}
      />
    </div>
  );
}
