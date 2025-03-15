"use client";
import { useAuth } from "@/components/context/auth-context";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  const [client, setClient] = useState<any>({});
  const { clients, cases } = useAuth();

  useEffect(() => {
    console.log(clients?.find((client: any) => client?.id === id));
    setClient(clients?.find((client: any) => client?.id === id));
  }, [clients]);

  return (
    <div id="webcrumbs">
      <div className="w-full bg-gray-50 font-sans overflow-hidden">
        <header className="bg-white shadow-md p-6 m-6 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-indigo-800">
                {client?.fullName}
              </h1>
              <nav className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                <span className="hover:text-blue-600 transition cursor-pointer">
                  Dashboard
                </span>
                <span className="material-symbols-outlined text-xs">
                  chevron_right
                </span>
                <span className="hover:text-blue-600 transition cursor-pointer">
                  Clients
                </span>
                <span className="material-symbols-outlined text-xs">
                  chevron_right
                </span>
                <span className="text-gray-700">{client?.fullName}</span>
              </nav>
            </div>
            <div className="flex gap-3">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">edit</span>
                Edit Client
              </button>
              <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  delete
                </span>
                Delete Client
              </button>
              <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">
                  receipt
                </span>
                Generate Invoice
              </button>
              <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">mail</span>
                Email Client
              </button>
            </div>
          </div>
        </header>

        <main className="p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  Client Information
                </h2>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-3">
                      person
                    </span>
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">{client?.fullName}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-3">
                      phone
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <div className="flex items-center">
                        <p className="font-medium">{client?.phone}</p>
                        <button className="ml-2 bg-green-100 text-green-600 p-1 rounded hover:bg-green-200 transition-colors duration-200">
                          <span className="material-symbols-outlined text-sm">
                            call
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-3">
                      email
                    </span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-500">Email Address</p>
                      <div className="flex items-center">
                        <p className="font-medium">{client?.email}</p>
                        <button className="ml-2 bg-blue-100 text-blue-600 p-1 rounded hover:bg-blue-200 transition-colors duration-200">
                          <span className="material-symbols-outlined text-sm">
                            send
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-3">
                      home
                    </span>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        {client?.street}, {client?.city}, {client?.country}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-3">
                      calendar_month
                    </span>
                    <div>
                      <p className="text-sm text-gray-500">Registration Date</p>
                      <p className="font-medium">{client?.createdAt}</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <span className="material-symbols-outlined text-indigo-500 mr-3">
                      folder
                    </span>
                    <div>
                      <p className="text-sm text-gray-500">Total Cases</p>
                      <p className="font-medium">4 Cases</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* <div className="bg-white rounded-lg shadow-md p-6 mt-6 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  Notes & Internal Comments
                </h2>
                <div className="space-y-4 max-h-[300px] overflow-y-auto">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">Sarah Johnson</p>
                      <p className="text-xs text-gray-500">May 12, 2023</p>
                    </div>
                    <p className="text-sm mt-1">
                      Client expressed concerns about timeline for the tax case.
                      Needs reassurance during next meeting.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">Michael Brown</p>
                      <p className="text-xs text-gray-500">April 28, 2023</p>
                    </div>
                    <p className="text-sm mt-1">
                      Reviewed all documents for the customs case. All paperwork
                      appears to be in order.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex justify-between items-start">
                      <p className="font-medium">Emma Wilson</p>
                      <p className="text-xs text-gray-500">March 15, 2023</p>
                    </div>
                    <p className="text-sm mt-1">
                      Client may need additional support for upcoming hearing.
                      Consider assigning a second attorney.
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <textarea
                    className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                    placeholder="Add a new note..."
                  ></textarea>
                  <button className="mt-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 w-full">
                    Add Note
                  </button>
                </div>
              </div> */}

              <div className="bg-white rounded-lg shadow-md p-6 mt-6 hover:shadow-lg transition-shadow duration-300">
                <h2 className="text-xl font-semibold mb-4 border-b pb-2">
                  Case Actions & Reminders
                </h2>
                <div className="space-y-3">
                  <div className="flex items-center bg-yellow-50 p-3 rounded-lg border-l-4 border-yellow-500">
                    <span className="material-symbols-outlined text-yellow-500 mr-2">
                      alarm
                    </span>
                    <div>
                      <p className="font-medium">Tax Case Filing Deadline</p>
                      <p className="text-sm text-gray-600">
                        Due in 3 days - May 15, 2023
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center bg-blue-50 p-3 rounded-lg border-l-4 border-blue-500">
                    <span className="material-symbols-outlined text-blue-500 mr-2">
                      event
                    </span>
                    <div>
                      <p className="font-medium">Client Meeting</p>
                      <p className="text-sm text-gray-600">
                        Tomorrow - 2:00 PM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="mt-4">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 w-full mb-2 flex items-center justify-center">
                    <span className="material-symbols-outlined mr-1">
                      add_alert
                    </span>
                    Set New Reminder
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 w-full flex items-center justify-center">
                    <span className="material-symbols-outlined mr-1">sms</span>
                    Send Client Notification
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Case History</h2>
                  <div className="flex space-x-2">
                    <div className="relative">
                      <details className="group">
                        <summary className="flex items-center border rounded-lg py-2 px-3 bg-white hover:bg-gray-50 cursor-pointer transition-colors duration-200">
                          <span className="material-symbols-outlined mr-1 text-gray-600">
                            filter_list
                          </span>
                          <span>Filter</span>
                          <span className="material-symbols-outlined ml-1 text-gray-600 group-open:rotate-180 transition-transform duration-200">
                            expand_more
                          </span>
                        </summary>
                        <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-10 p-2">
                          <div className="py-1">
                            <label className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                              <input
                                type="checkbox"
                                className="mr-2 form-checkbox text-indigo-600"
                              />
                              <span>Ongoing</span>
                            </label>
                            <label className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                              <input
                                type="checkbox"
                                className="mr-2 form-checkbox text-indigo-600"
                              />
                              <span>Completed</span>
                            </label>
                            <label className="flex items-center px-3 py-2 hover:bg-gray-100 rounded-md cursor-pointer">
                              <input
                                type="checkbox"
                                className="mr-2 form-checkbox text-indigo-600"
                              />
                              <span>Abandoned</span>
                            </label>
                          </div>
                          <div className="border-t pt-1 mt-1">
                            <button className="w-full text-center py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md">
                              Apply Filters
                            </button>
                          </div>
                        </div>
                      </details>
                    </div>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3 text-gray-400">
                        search
                      </span>
                      <input
                        type="text"
                        placeholder="Search cases..."
                        className="pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:outline-none w-full"
                      />
                    </div>
                  </div>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Assigned Lawyer(s)
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Last Updated
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      {cases.map((caseItem: any, index: any) => (
                        <tr className="hover:bg-gray-50 transition-colors duration-200 cursor-pointer">
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-indigo-600">
                              {caseItem?.name}
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              {caseItem?.type}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              {caseItem?.status}
                            </span>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap">
                            <div className="flex -space-x-2">
                              <img
                                className="h-8 w-8 rounded-full border-2 border-white"
                                src="https://randomuser.me/api/portraits/women/42.jpg"
                                alt="Sarah Johnson"
                              />
                              <img
                                className="h-8 w-8 rounded-full border-2 border-white"
                                src="https://randomuser.me/api/portraits/men/32.jpg"
                                alt="Michael Brown"
                              />
                            </div>
                          </td>
                          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                            {caseItem?.createdAt}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Invoices & Payments</h2>
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center">
                    <span className="material-symbols-outlined mr-1">add</span>
                    Generate New Invoice
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Invoice #
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Issue Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Due Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          INV-2023-001
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          $2,500.00
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          May 01, 2023
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          May 15, 2023
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                            Pending
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200">
                              View
                            </button>
                            <button className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200">
                              Remind
                            </button>
                            <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                              Mark Paid
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          INV-2023-002
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          $1,800.00
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          April 15, 2023
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          April 29, 2023
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                            Overdue
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200">
                              View
                            </button>
                            <button className="text-yellow-600 hover:text-yellow-900 transition-colors duration-200">
                              Remind
                            </button>
                            <button className="text-green-600 hover:text-green-900 transition-colors duration-200">
                              Mark Paid
                            </button>
                          </div>
                        </td>
                      </tr>
                      <tr className="hover:bg-gray-50 transition-colors duration-200">
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          INV-2023-003
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          $3,200.00
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          March 10, 2023
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                          March 24, 2023
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                            Paid
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-900 transition-colors duration-200">
                              View
                            </button>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div> */}

              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    Client Communications & Documents
                  </h2>
                  <div className="flex space-x-2">
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center">
                      <span className="material-symbols-outlined mr-1">
                        email
                      </span>
                      New Email
                    </button>
                    <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105 flex items-center">
                      <span className="material-symbols-outlined mr-1">
                        upload_file
                      </span>
                      Upload Document
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Email & Message Log
                    </h3>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      <div className="border rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between">
                          <span className="font-medium flex items-center">
                            <span className="material-symbols-outlined text-indigo-500 mr-1">
                              outgoing_mail
                            </span>
                            Sent
                          </span>
                          <span className="text-sm text-gray-500">
                            May 8, 2023
                          </span>
                        </div>
                        <p className="text-sm font-medium mt-1">
                          Tax Case Update
                        </p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          Dear Mr. Doe, I'm writing to update you on the
                          progress of your tax compliance case. We've made
                          significant progress...
                        </p>
                        <div className="text-right mt-1">
                          <button className="text-indigo-600 text-sm hover:text-indigo-800 transition-colors duration-200">
                            View Full Email
                          </button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between">
                          <span className="font-medium flex items-center">
                            <span className="material-symbols-outlined text-green-500 mr-1">
                              incoming_mail
                            </span>
                            Received
                          </span>
                          <span className="text-sm text-gray-500">
                            May 5, 2023
                          </span>
                        </div>
                        <p className="text-sm font-medium mt-1">
                          RE: Contract Questions
                        </p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          Thank you for the clarification on the contract terms.
                          I still have concerns about section 3.2 regarding
                          liability...
                        </p>
                        <div className="text-right mt-1">
                          <button className="text-indigo-600 text-sm hover:text-indigo-800 transition-colors duration-200">
                            View Full Email
                          </button>
                        </div>
                      </div>

                      <div className="border rounded-lg p-3 hover:shadow-md transition-shadow duration-200">
                        <div className="flex justify-between">
                          <span className="font-medium flex items-center">
                            <span className="material-symbols-outlined text-indigo-500 mr-1">
                              outgoing_mail
                            </span>
                            Sent
                          </span>
                          <span className="text-sm text-gray-500">
                            April 30, 2023
                          </span>
                        </div>
                        <p className="text-sm font-medium mt-1">
                          Contract Explanation
                        </p>
                        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                          Dear Mr. Doe, As discussed in our meeting, I'm sending
                          you a detailed explanation of the contract terms we
                          reviewed...
                        </p>
                        <div className="text-right mt-1">
                          <button className="text-indigo-600 text-sm hover:text-indigo-800 transition-colors duration-200">
                            View Full Email
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-3">
                      Uploaded Documents
                    </h3>
                    <div className="space-y-3 max-h-[300px] overflow-y-auto">
                      <div className="border rounded-lg p-3 hover:shadow-md transition-shadow duration-200 flex items-center">
                        <span className="material-symbols-outlined text-red-500 mr-3">
                          picture_as_pdf
                        </span>
                        <div className="flex-1">
                          <p className="font-medium">Tax_Return_2022.pdf</p>
                          <p className="text-sm text-gray-500">
                            Uploaded: May 2, 2023
                          </p>
                        </div>
                        <div className="flex space-x-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
