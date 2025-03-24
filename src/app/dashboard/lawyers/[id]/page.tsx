"use client";

import { useAuth } from "@/components/context/auth-context";
import { DeleteDialog } from "@/components/deleteDialog";
import getRealTimeQuery from "@/functions/query-a-collection";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [lawyer, setLawyer] = useState<any>({});
  const [lawyerCases, setLawyerCases] = useState<any>([]);
  const { lawyers, cases } = useAuth();
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    console.log(lawyers?.find((lawyer: any) => lawyer.id === id));
    setLawyer(lawyers?.find((lawyer: any) => lawyer.id === id));
  }, [lawyers, id]);

  useEffect(() => {
    if (!id && !cases) return;
    const hisCase = cases.filter((caseItem: any) =>
      caseItem?.assignedLawyers?.includes(id)
    );
    setLawyerCases(hisCase);
  }, [id, cases]);

  // useEffect(() => {
  //   if (!lawyer.id) return;
  //   const unsubscribe = getRealTimeQuery(
  //     "cases",
  //     "lawyers",
  //     lawyer.id,
  //     setLawyerCases
  //   );

  //   return () => unsubscribe(); // Cleanup on unmount
  // }, [lawyers, lawyer, id, cases]);

  return (
    <div className="bg-gray-50 shadow-md p-6">
      <header className="bg-white shadow-md p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div className="w-full">
            <div className="flex justify-between w-full">
              <h1 className="text-xl sm:text-2xl font-bold text-indigo-800">
                {lawyer?.full_name}
              </h1>

              <div className="flex gap-2 sm:gap-3">
                <button
                  onClick={() =>
                    router.push(`/dashboard/lawyers/${lawyer.id}/edit`)
                  }
                  className="bg-blue-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs sm:text-sm">
                    edit
                  </span>
                  <span className="hidden sm:inline">Edit Lawyer</span>
                </button>

                <button
                  onClick={() => setIsDeleteOpen(!isDeleteOpen)}
                  className="bg-red-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-red-700 transition flex items-center gap-1"
                >
                  <span className="material-symbols-outlined text-xs sm:text-sm">
                    delete
                  </span>
                  <span className="hidden sm:inline">Delete Lawyer</span>
                </button>

                <button className="bg-green-600 text-white px-3 sm:px-4 py-1.5 sm:py-2 rounded-md hover:bg-green-700 transition flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs sm:text-sm">
                    mail
                  </span>
                  <span className="hidden sm:inline">Email Lawyer</span>
                </button>
              </div>
            </div>

            <nav className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <span className="hover:text-blue-600 transition cursor-pointer">
                Dashboard
              </span>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
              <span className="hover:text-blue-600 transition cursor-pointer">
                Lawyers
              </span>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
              <span className="text-gray-700">{lawyer?.full_name}</span>
            </nav>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="col-span-1 bg-gray-200 p-6 rounded-lg">
          <div className="flex flex-col items-center">
            <img
              src="https://randomuser.me/api/portraits/women/21.jpg"
              alt="Sarah Johnson"
              className="h-32 w-32 rounded-full object-cover mb-4 border-4 border-white shadow-lg hover:scale-105 transition duration-300"
            />
            <h3 className="text-xl font-semibold">{lawyer?.full_name}</h3>
            <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold mt-2">
              {lawyer?.department}
            </span>

            <div className="flex items-center mt-4">
              <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
              <span className="text-sm text-gray-600">{lawyer?.status}</span>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex items-center mb-3 hover:bg-white p-2 rounded-md transition duration-300 cursor-pointer">
              <span className="material-symbols-outlined text-gray-500 mr-3">
                mail
              </span>
              <div>
                <div className="text-sm font-semibold">Email</div>
                <div className="text-sm text-gray-600">{lawyer?.email}</div>
              </div>
            </div>

            <div className="flex items-center mb-3 hover:bg-white p-2 rounded-md transition duration-300 cursor-pointer">
              <span className="material-symbols-outlined text-gray-500 mr-3">
                call
              </span>
              <div>
                <div className="text-sm font-semibold">Phone</div>
                <div className="text-sm text-gray-600">{lawyer?.phone}</div>
              </div>
            </div>

            <div className="flex items-center hover:bg-white p-2 rounded-md transition duration-300 cursor-pointer">
              <span className="material-symbols-outlined text-gray-500 mr-3">
                work
              </span>
              <div>
                <div className="text-sm font-semibold">Department</div>
                <div className="text-sm text-gray-600">
                  {lawyer?.department}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <h4 className="text-sm font-semibold uppercase text-gray-500 mb-3">
              Workload Summary
            </h4>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Active Cases</span>
                  <span className="text-sm text-gray-600">
                    {lawyerCases?.length ?? 0}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: "60%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Hours Logged</span>
                  <span className="text-sm text-gray-600">45 hrs / week</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-indigo-600 h-2 rounded-full"
                    style={{ width: "75%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium">Case Completion</span>
                  <span className="text-sm text-gray-600">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-500 h-2 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-2">
          <div className="bg-white mb-6">
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <span className="material-symbols-outlined mr-2">folder</span>
                Assigned Cases
              </h3>

              <div className="overflow-x-auto">
                {lawyerCases.length === 0 ? (
                  <div className="text-center py-12 px-4 bg-gray-50 rounded-lg">
                    <div className="max-w-md mx-auto">
                      <span className="material-symbols-outlined text-6xl text-indigo-300 mb-4">
                        folder_off
                      </span>
                      <h3 className="text-xl font-semibold text-gray-700 mb-2">
                        No Cases Found
                      </h3>
                      <p className="text-gray-500 text-sm">
                        It looks like there are no active cases at the moment.
                        <br />
                        Start by creating a new case or check your filters.
                      </p>
                    </div>
                  </div>
                ) : (
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-200">
                      <tr>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Case
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Type
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Status
                        </th>
                        <th
                          scope="col"
                          className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Client
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {lawyerCases.map((caseItem: any, index: number) => (
                        <tr
                          key={index}
                          className="hover:bg-gray-200 transition duration-300 cursor-pointer"
                        >
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition duration-300">
                              {caseItem.caseName}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {caseItem.caseType}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold capitalize rounded-full ${
                                caseItem.caseStatus === "ongoing"
                                  ? "bg-yellow-100 text-yellow-800"
                                  : caseItem.caseStatus === "completed"
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {caseItem.caseStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="text-sm text-gray-500 hover:text-indigo-600 transition duration-300">
                              {caseItem.selectedClient.fullName}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-medium mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">
                    schedule
                  </span>
                  Upcoming Deadlines
                </h4>
                <ul className="space-y-3">
                  {lawyerCases.length === 0 ? (
                    <li className="text-center py-6 rounded-lg bg-gray-100">
                      <span className="material-symbols-outlined text-4xl text-indigo-300 mb-3 inline-block">
                        event_available
                      </span>
                      <h3 className="text-lg font-semibold text-gray-700 mb-1">
                        No Upcoming Deadlines
                      </h3>
                      <p className="text-gray-500 text-sm">
                        All caught up! Enjoy your clear schedule.
                      </p>
                    </li>
                  ) : (
                    lawyerCases.map((caseItem: any) => (
                      <li
                        key={caseItem.id}
                        className="border-l-2 border-indigo-500 pl-3 py-1 hover:bg-white transition duration-300 cursor-pointer"
                      >
                        <div className="text-sm font-medium">
                          {caseItem.caseName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(caseItem.deadline).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "2-digit",
                              year: "numeric",
                            }
                          )}
                        </div>
                      </li>
                    ))
                  )}
                </ul>
              </div>

              <div className="bg-gray-200 p-4 rounded-lg">
                <h4 className="font-medium mb-4 flex items-center">
                  <span className="material-symbols-outlined mr-2">update</span>
                  Recent Updates
                </h4>
                <div className="space-y-3">
                  <div className="border-b border-gray-200 pb-3 hover:bg-white p-2 rounded-md transition duration-300 cursor-pointer">
                    <div className="flex items-start">
                      <span className="material-symbols-outlined text-indigo-500 mr-2">
                        description
                      </span>
                      <div>
                        <div className="text-sm font-medium">
                          Filed motion in Smith case
                        </div>
                        <div className="text-xs text-gray-500">
                          Yesterday, 3:45 PM
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-b border-gray-200 pb-3 hover:bg-white p-2 rounded-md transition duration-300 cursor-pointer">
                    <div className="flex items-start">
                      <span className="material-symbols-outlined text-green-500 mr-2">
                        person
                      </span>
                      <div>
                        <div className="text-sm font-medium">
                          Client meeting completed
                        </div>
                        <div className="text-xs text-gray-500">
                          Aug 15, 11:30 AM
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="hover:bg-white p-2 rounded-md transition duration-300 cursor-pointer">
                    <div className="flex items-start">
                      <span className="material-symbols-outlined text-blue-500 mr-2">
                        gavel
                      </span>
                      <div>
                        <div className="text-sm font-medium">
                          Received judgment in Martinez case
                        </div>
                        <div className="text-xs text-gray-500">
                          Aug 12, 2:15 PM
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-200 p-4 rounded-lg">
              <h4 className="font-medium mb-4 flex items-center">
                <span className="material-symbols-outlined mr-2">
                  description
                </span>
                Recent Documents
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {lawyerCases.map((caseItem: any) => {
                  // Get the most recent file based on uploadedAt timestamp
                  const latestFile = caseItem.files?.sort(
                    (a: any, b: any) =>
                      b.uploadedAt?.seconds - a.uploadedAt?.seconds
                  )[0];

                  if (!latestFile) return null; // Skip cases with no files

                  // Determine icon and color based on file type
                  const getFileTypeDetails = (type: string) => {
                    if (type.startsWith("image/"))
                      return { icon: "image", color: "text-purple-500" };
                    if (type === "application/pdf")
                      return { icon: "picture_as_pdf", color: "text-red-500" };
                    if (type.includes("spreadsheet"))
                      return { icon: "table_chart", color: "text-green-500" };
                    if (type.includes("document"))
                      return { icon: "article", color: "text-blue-500" };
                    return { icon: "description", color: "text-gray-500" }; // default
                  };

                  const { icon, color } = getFileTypeDetails(latestFile.type);
                  const uploadedDate = new Date(
                    latestFile.uploadedAt
                  ).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  });

                  return (
                    <div
                      key={latestFile.id} // Use actual file ID if available
                      className="flex items-center p-3 border border-gray-200 rounded-md hover:shadow-md hover:border-indigo-300 transition duration-300 cursor-pointer bg-white"
                    >
                      <span
                        className={`material-symbols-outlined ${color} mr-3`}
                      >
                        {icon}
                      </span>
                      <div className="overflow-hidden">
                        <div className="text-sm font-medium truncate">
                          {latestFile.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {uploadedDate || "No upload date"}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {lawyerCases.filter((c: any) => c.files?.length > 0).length ===
                0 && (
                <div className="text-center p-6 rounded-lg bg-gray-50 border-2 border-dashed border-gray-200">
                  <div className="max-w-md mx-auto">
                    <span className="material-symbols-outlined text-4xl text-indigo-300 mb-3 inline-block">
                      folder_off
                    </span>
                    <h3 className="text-lg font-semibold text-gray-700 mb-1">
                      No Recent Files Found
                    </h3>
                    <p className="text-gray-500 text-sm">
                      It looks like there are no files across any cases.
                      <br />
                      Upload your first document to get started.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <DeleteDialog
        onOpen={isDeleteOpen}
        element={lawyer}
        table="lawyers"
        setElement={setIsDeleteOpen}
      />
    </div>
  );
}
