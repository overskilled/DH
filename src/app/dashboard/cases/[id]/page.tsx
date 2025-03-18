"use client";
import { useAuth } from "@/components/context/auth-context";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [selectedCase, setSelectedCase] = useState<any>({});
  const { clients, cases } = useAuth();

  useEffect(() => {
    console.log(cases?.find((caseItem: any) => caseItem?.id === id));
    setSelectedCase(cases?.find((caseItem: any) => caseItem?.id === id));
  }, [cases, id]);

  return (
    <div className="w-full bg-gray-50 font-sans p-4 md:p-6 lg:p-8">
      <header className="bg-white shadow-md p-6 rounded-lg mb-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {selectedCase?.caseName}
            </h1>
            <nav className="text-sm text-gray-500 flex items-center gap-2 mt-1">
              <span className="hover:text-blue-600 transition cursor-pointer">
                Dashboard
              </span>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
              <span className="hover:text-blue-600 transition cursor-pointer">
                Cases
              </span>
              <span className="material-symbols-outlined text-xs">
                chevron_right
              </span>
              <span className="text-gray-700">{selectedCase?.caseName}</span>
            </nav>
          </div>
          <div className="flex gap-3">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">edit</span>
              Edit Case
            </button>
            <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">delete</span>
              Delete Case
            </button>
            <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">
                download
              </span>
              Download Files
            </button>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">mail</span>
              Email Client
            </button>
          </div>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <div className="col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-3">
              Case Overview
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 text-sm mb-1">Case Type</p>
                <p className="font-medium flex items-center">
                  <span className="material-symbols-outlined mr-2 text-blue-600">
                    gavel
                  </span>
                  {selectedCase?.caseType}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Status</p>
                <p className="font-medium">
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold capitalize">
                    {selectedCase?.caseStatus}
                  </span>
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Documents</p>
                <p className="font-medium flex items-center">
                  <span className="material-symbols-outlined mr-2 text-blue-600">
                    folder
                  </span>
                  {selectedCase?.files?.length ?? 0} Files
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Start Date</p>
                <p className="font-medium">
                  {selectedCase?.createdAt
                    .toDate()
                    .toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">
                  Expected Completion
                </p>
                <p className="font-medium">
                  {selectedCase?.deadline.toDate().toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}
                </p>
              </div>
              <div>
                <p className="text-gray-500 text-sm mb-1">Assigned Lawyers</p>
                <div className="flex -space-x-2 mt-1">
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white hover:z-10 hover:scale-110 transition"
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    alt="Lawyer"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white hover:z-10 hover:scale-110 transition"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Lawyer"
                  />
                  <img
                    className="w-8 h-8 rounded-full border-2 border-white hover:z-10 hover:scale-110 transition"
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Lawyer"
                  />
                  <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 text-xs font-bold hover:bg-blue-200 transition cursor-pointer">
                    +2
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-3">
              Case Progress & Timeline
            </h2>
            <div className="relative">
              <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              <div className="relative pl-10 pb-8">
                <div className="absolute left-0 top-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md transform hover:scale-110 transition">
                  <span className="material-symbols-outlined text-white text-sm">
                    check
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold">Initial Case Filing</h4>
                    <span className="text-sm text-gray-500">
                      May 3, 2023 • 9:30 AM
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Submitted initial court documents for the copyright
                    infringement claim against Johnson Inc.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <img
                      className="w-6 h-6 rounded-full mr-2"
                      src="https://randomuser.me/api/portraits/women/12.jpg"
                      alt="Lawyer"
                    />
                    <span>Sarah Williams, Lead Attorney</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-10 pb-8">
                <div className="absolute left-0 top-1 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md transform hover:scale-110 transition">
                  <span className="material-symbols-outlined text-white text-sm">
                    people
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold">Client Meeting</h4>
                    <span className="text-sm text-gray-500">
                      June 12, 2023 • 2:15 PM
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Met with client to review strategy and gather additional
                    evidence for the case.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <img
                      className="w-6 h-6 rounded-full mr-2"
                      src="https://randomuser.me/api/portraits/men/32.jpg"
                      alt="Lawyer"
                    />
                    <span>Robert Chen, Associate Attorney</span>
                  </div>
                </div>
              </div>

              <div className="relative pl-10">
                <div className="absolute left-0 top-1 bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md transform hover:scale-110 transition">
                  <span className="material-symbols-outlined text-white text-sm">
                    description
                  </span>
                </div>
                <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition">
                  <div className="flex justify-between mb-2">
                    <h4 className="font-semibold">Document Discovery</h4>
                    <span className="text-sm text-gray-500">
                      July 30, 2023 • 11:45 AM
                    </span>
                  </div>
                  <p className="text-gray-600 mb-2">
                    Received and analyzed documents from opposing counsel.
                    Identified key evidence supporting our position.
                  </p>
                  <div className="flex items-center text-sm text-gray-500">
                    <img
                      className="w-6 h-6 rounded-full mr-2"
                      src="https://randomuser.me/api/portraits/women/45.jpg"
                      alt="Lawyer"
                    />
                    <span>Emily Rodriguez, Paralegal</span>
                  </div>
                </div>
              </div>

              <button className="mt-4 text-blue-600 flex items-center hover:text-blue-800 transition">
                <span className="material-symbols-outlined mr-1">add</span>
                Add Timeline Entry
              </button>
            </div>
          </div>
        </div>

        <div className="col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-semibold mb-4 border-b pb-3">
              Client Information
            </h2>
            <div className="flex items-center mb-4">
              <img
                className="w-16 h-16 rounded-full mr-4"
                src="https://randomuser.me/api/portraits/men/76.jpg"
                alt="Client"
              />
              <div>
                <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer transition">
                  Thomas Smith
                </h3>
                <p className="text-gray-500">Business Owner</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-gray-500 mr-2">
                    call
                  </span>
                  <span>(555) 123-4567</span>
                </div>
                <button className="text-blue-600 px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-50 transition">
                  Call
                </button>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className="material-symbols-outlined text-gray-500 mr-2">
                    mail
                  </span>
                  <span>tsmith@example.com</span>
                </div>
                <button className="text-blue-600 px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-50 transition">
                  Email
                </button>
              </div>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-gray-500 mr-2">
                  business
                </span>
                <span>Smith Creative Studios</span>
              </div>
              <div className="flex items-center">
                <span className="material-symbols-outlined text-gray-500 mr-2">
                  location_on
                </span>
                <span>1234 Main St, Los Angeles, CA</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <div className="flex justify-between items-center mb-4 border-b pb-3">
              <h2 className="text-xl font-semibold">Assigned Lawyers</h2>
              <button className="text-blue-600 hover:text-blue-800 transition">
                <span className="material-symbols-outlined">add_circle</span>
              </button>
            </div>

            <div className="space-y-4">
              <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://randomuser.me/api/portraits/women/12.jpg"
                  alt="Lawyer"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">Sarah Williams</h4>
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                      Lead Attorney
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Intellectual Property Specialist
                  </p>
                  <div className="flex gap-2 mt-1">
                    <button className="text-gray-500 hover:text-blue-600 transition">
                      <span className="material-symbols-outlined text-sm">
                        call
                      </span>
                    </button>
                    <button className="text-gray-500 hover:text-blue-600 transition">
                      <span className="material-symbols-outlined text-sm">
                        mail
                      </span>
                    </button>
                    <span className="text-xs text-gray-500 ml-auto mt-1">
                      Assigned until Dec 2023
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Lawyer"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">Robert Chen</h4>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      Associate
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">Litigation Support</p>
                  <div className="flex gap-2 mt-1">
                    <button className="text-gray-500 hover:text-blue-600 transition">
                      <span className="material-symbols-outlined text-sm">
                        call
                      </span>
                    </button>
                    <button className="text-gray-500 hover:text-blue-600 transition">
                      <span className="material-symbols-outlined text-sm">
                        mail
                      </span>
                    </button>
                    <span className="text-xs text-gray-500 ml-auto mt-1">
                      Assigned until Nov 2023
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition">
                <img
                  className="w-12 h-12 rounded-full"
                  src="https://randomuser.me/api/portraits/women/45.jpg"
                  alt="Lawyer"
                />
                <div className="flex-1">
                  <div className="flex justify-between">
                    <h4 className="font-semibold">Emily Rodriguez</h4>
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                      Paralegal
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    Research & Documentation
                  </p>
                  <div className="flex gap-2 mt-1">
                    <button className="text-gray-500 hover:text-blue-600 transition">
                      <span className="material-symbols-outlined text-sm">
                        call
                      </span>
                    </button>
                    <button className="text-gray-500 hover:text-blue-600 transition">
                      <span className="material-symbols-outlined text-sm">
                        mail
                      </span>
                    </button>
                    <span className="text-xs text-gray-500 ml-auto mt-1">
                      Assigned until Dec 2023
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3">
            Documents & Attachments
          </h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 hover:bg-gray-50 transition cursor-pointer">
            <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
              cloud_upload
            </span>
            <p className="text-gray-600 mb-1">
              Drag & drop files here or click to browse
            </p>
            <p className="text-xs text-gray-500">Maximum file size: 25MB</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <span className="material-symbols-outlined text-blue-600 mr-3">
                description
              </span>
              <div className="flex-1">
                <h4 className="font-medium">
                  Copyright_Claim_Initial_Filing.pdf
                </h4>
                <p className="text-xs text-gray-500">
                  Uploaded May 3, 2023 • 2.4MB
                </p>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-blue-600 transition">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
                <button className="text-gray-500 hover:text-blue-600 transition">
                  <span className="material-symbols-outlined">download</span>
                </button>
                <button className="text-gray-500 hover:text-red-600 transition">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>

            <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <span className="material-symbols-outlined text-green-600 mr-3">
                table_chart
              </span>
              <div className="flex-1">
                <h4 className="font-medium">Financial_Damages_Analysis.xlsx</h4>
                <p className="text-xs text-gray-500">
                  Uploaded June 15, 2023 • 1.8MB
                </p>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-blue-600 transition">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
                <button className="text-gray-500 hover:text-blue-600 transition">
                  <span className="material-symbols-outlined">download</span>
                </button>
                <button className="text-gray-500 hover:text-red-600 transition">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>

            <div className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition">
              <span className="material-symbols-outlined text-red-600 mr-3">
                picture_as_pdf
              </span>
              <div className="flex-1">
                <h4 className="font-medium">Expert_Witness_Statement.pdf</h4>
                <p className="text-xs text-gray-500">
                  Uploaded July 28, 2023 • 5.1MB
                </p>
              </div>
              <div className="flex gap-2">
                <button className="text-gray-500 hover:text-blue-600 transition">
                  <span className="material-symbols-outlined">visibility</span>
                </button>
                <button className="text-gray-500 hover:text-blue-600 transition">
                  <span className="material-symbols-outlined">download</span>
                </button>
                <button className="text-gray-500 hover:text-red-600 transition">
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center mt-4">
              <button className="text-blue-600 hover:text-blue-800 transition flex items-center">
                <span className="material-symbols-outlined mr-1">
                  expand_more
                </span>
                View All Documents (29 more)
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3">
            Case Notes & Comments
          </h2>

          <div className="flex gap-4 mb-4">
            <button className="bg-blue-600 text-white px-4 py-2 rounded-md flex-1 hover:bg-blue-700 transition">
              Internal Notes
            </button>
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex-1 hover:bg-gray-300 transition">
              Client Communications
            </button>
          </div>

          <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <img
                    className="w-8 h-8 rounded-full mr-2"
                    src="https://randomuser.me/api/portraits/women/12.jpg"
                    alt="Attorney"
                  />
                  <span className="font-medium">Sarah Williams</span>
                </div>
                <span className="text-xs text-gray-500">Today at 10:23 AM</span>
              </div>
              <p className="text-gray-700 mb-2">
                Opposing counsel reached out to discuss a potential settlement.
                Their initial offer is significantly lower than our target. I
                recommend we counter with our previously discussed amount and
                prepare for a potential mediation session.
              </p>
              <div className="flex gap-2 text-sm">
                <button className="text-blue-600 hover:text-blue-800 transition">
                  Reply
                </button>
                <button className="text-gray-500 hover:text-gray-700 transition">
                  Edit
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <img
                    className="w-8 h-8 rounded-full mr-2"
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    alt="Attorney"
                  />
                  <span className="font-medium">Robert Chen</span>
                </div>
                <span className="text-xs text-gray-500">
                  Yesterday at 4:17 PM
                </span>
              </div>
              <p className="text-gray-700 mb-2">
                {`Reviewed the latest evidence package from Johnson Inc. Their
                financial records don't match up with their claims about
                damages. We should highlight this discrepancy in our next
                filing.`}
              </p>
              <div className="flex gap-2 text-sm">
                <button className="text-blue-600 hover:text-blue-800 transition">
                  Reply
                </button>
                <button className="text-gray-500 hover:text-gray-700 transition">
                  Edit
                </button>
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <div className="flex justify-between mb-2">
                <div className="flex items-center">
                  <img
                    className="w-8 h-8 rounded-full mr-2"
                    src="https://randomuser.me/api/portraits/women/45.jpg"
                    alt="Paralegal"
                  />
                  <span className="font-medium">Emily Rodriguez</span>
                </div>
                <span className="text-xs text-gray-500">Aug 27, 2023</span>
              </div>
              <p className="text-gray-700 mb-2">
                {`Finished compiling all the evidence of prior use of our client's
                trademarked logo. Found 17 instances dating back to 2015, which
                should solidify our position on first use in commerce.`}
              </p>
              <div className="flex gap-2 text-sm">
                <button className="text-blue-600 hover:text-blue-800 transition">
                  Reply
                </button>
                <button className="text-gray-500 hover:text-gray-700 transition">
                  Edit
                </button>
              </div>
            </div>
          </div>

          <div className="mt-4 relative">
            <textarea
              className="w-full border rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Add a note or comment..."
            ></textarea>
            <button className="absolute right-3 bottom-3 text-blue-600 hover:text-blue-800 transition">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 border-b pb-3">
            Invoices & Payments
          </h2>

          <div className="flex justify-between mb-4">
            <div>
              <span className="text-gray-500">Total Billed</span>
              <p className="text-2xl font-bold">XAF24,750.00</p>
            </div>
            <div>
              <span className="text-gray-500">Remaining Balance</span>
              <p className="text-2xl font-bold text-red-600">XAF8,250.00</p>
            </div>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">add</span>
              New Invoice
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-50">
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Invoice #
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50 transition">
                  <td className="py-3 px-3 whitespace-nowrap text-blue-600 hover:text-blue-800 transition font-medium cursor-pointer">
                    #INV-2023-0042
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">Aug 15, 2023</td>
                  <td className="py-3 px-3 whitespace-nowrap font-medium">
                    XAF5,500.00
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Pending
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-blue-600 transition">
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 transition">
                        <span className="material-symbols-outlined">
                          download
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition">
                  <td className="py-3 px-3 whitespace-nowrap text-blue-600 hover:text-blue-800 transition font-medium cursor-pointer">
                    #INV-2023-0036
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">July 12, 2023</td>
                  <td className="py-3 px-3 whitespace-nowrap font-medium">
                    XAF8,750.00
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Overdue
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-blue-600 transition">
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 transition">
                        <span className="material-symbols-outlined">
                          download
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition">
                  <td className="py-3 px-3 whitespace-nowrap text-blue-600 hover:text-blue-800 transition font-medium cursor-pointer">
                    #INV-2023-0028
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">June 8, 2023</td>
                  <td className="py-3 px-3 whitespace-nowrap font-medium">
                    XAF6,250.00
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
                      Paid
                    </span>
                  </td>
                  <td className="py-3 px-3 whitespace-nowrap">
                    <div className="flex gap-2">
                      <button className="text-gray-500 hover:text-blue-600 transition">
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                      <button className="text-gray-500 hover:text-blue-600 transition">
                        <span className="material-symbols-outlined">
                          download
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr className="hover:bg-gray-50 transition">
                  <td className="py-3 px-3 whitespace-nowrap text-blue-600 hover:text-blue-800 transition font-medium cursor-pointer">
                    #INV-2023-0019
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
