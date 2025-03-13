"use client";

import { useAuth } from "@/components/context/auth-context";
import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [lawyer, setLawyer] = useState<any>({});
  const { lawyers } = useAuth();

  useEffect(() => {
    console.log(lawyers?.find((lawyer: any) => lawyer.id === id));
    setLawyer(lawyers?.find((lawyer: any) => lawyer.id === id));
  }, [lawyers]);

  return (
    <div className="bg-gray-50 shadow-md p-6">
      <header className="bg-white shadow-md p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-indigo-800">
              {lawyer?.full_name}
            </h1>
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
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit Lawyer
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">delete</span>
              Delete Lawyer
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">mail</span>
              Email Lawyer
            </button>
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
                    {lawyer?.cases?.length ?? 0}
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
                    {[
                      {
                        name: "Smith vs. Jones Corp",
                        type: "Civil Litigation",
                        status: "Ongoing",
                        client: "M. Smith",
                      },
                      {
                        name: "Trademark Infringement #45-B",
                        type: "Intellectual Property",
                        status: "Ongoing",
                        client: "Acme Inc.",
                      },
                      {
                        name: "Johnson Estate Settlement",
                        type: "Probate",
                        status: "Completed",
                        client: "Johnson Family",
                      },
                      {
                        name: "Downtown Property Dispute",
                        type: "Real Estate",
                        status: "Ongoing",
                        client: "City Properties LLC",
                      },
                      {
                        name: "Martinez Divorce",
                        type: "Family Law",
                        status: "Abandoned",
                        client: "J. Martinez",
                      },
                    ].map((caseItem, index) => (
                      <tr
                        key={index}
                        className="hover:bg-gray-200 transition duration-300 cursor-pointer"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900 hover:text-indigo-600 transition duration-300">
                            {caseItem.name}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {caseItem.type}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <span
                            className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              caseItem.status === "Ongoing"
                                ? "bg-yellow-100 text-yellow-800"
                                : caseItem.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {caseItem.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="text-sm text-gray-500 hover:text-indigo-600 transition duration-300">
                            {caseItem.client}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
                  <li className="border-l-2 border-indigo-500 pl-3 py-1 hover:bg-white transition duration-300 cursor-pointer">
                    <div className="text-sm font-medium">
                      Motion Filing - Smith vs. Jones
                    </div>
                    <div className="text-xs text-gray-500">
                      Tomorrow, 5:00 PM
                    </div>
                  </li>
                  <li className="border-l-2 border-yellow-500 pl-3 py-1 hover:bg-white transition duration-300 cursor-pointer">
                    <div className="text-sm font-medium">
                      Client Meeting - Acme Inc.
                    </div>
                    <div className="text-xs text-gray-500">
                      Wed, Aug 18 - 10:00 AM
                    </div>
                  </li>
                  <li className="border-l-2 border-red-500 pl-3 py-1 hover:bg-white transition duration-300 cursor-pointer">
                    <div className="text-sm font-medium">
                      Court Hearing - Property Dispute
                    </div>
                    <div className="text-xs text-gray-500">
                      Fri, Aug 20 - 9:30 AM
                    </div>
                  </li>
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
                {[
                  {
                    name: "Motion to Dismiss - Smith Case.pdf",
                    date: "Aug 16, 2023",
                    icon: "picture_as_pdf",
                    color: "text-red-500",
                  },
                  {
                    name: "Trademark Evidence - Acme Inc.docx",
                    date: "Aug 15, 2023",
                    icon: "article",
                    color: "text-blue-500",
                  },
                  {
                    name: "Johnson Estate Inventory.xlsx",
                    date: "Aug 14, 2023",
                    icon: "table_chart",
                    color: "text-green-500",
                  },
                  {
                    name: "Property Survey - Downtown.jpg",
                    date: "Aug 12, 2023",
                    icon: "image",
                    color: "text-purple-500",
                  },
                ].map((doc, index) => (
                  <div
                    key={index}
                    className="flex items-center p-3 border border-gray-200 rounded-md hover:shadow-md hover:border-indigo-300 transition duration-300 cursor-pointer bg-white"
                  >
                    <span
                      className={`material-symbols-outlined ${doc.color} mr-3`}
                    >
                      {doc.icon}
                    </span>
                    <div className="overflow-hidden">
                      <div className="text-sm font-medium truncate">
                        {doc.name}
                      </div>
                      <div className="text-xs text-gray-500">{doc.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
