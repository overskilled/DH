export default function Page() {
  return (
    <div id="webcrumbs">
      <div className="w-full bg-gray-50 min-h-screen font-sans">
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
              <button className="flex items-center bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition duration-300 transform hover:scale-105">
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

        <div className="px-6 py-4">
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
                    <div className="px-4 py-2 hover:bg-indigo-50 cursor-pointer transition duration-300">
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
                  {[
                    {
                      name: "Sarah Johnson",
                      email: "s.johnson@lawfirm.com",
                      phone: "+1 (555) 123-4567",
                      department: "Litigation",
                      cases: 12,
                      status: "Available",
                      img: "https://randomuser.me/api/portraits/women/21.jpg",
                    },
                    {
                      name: "Michael Chen",
                      email: "m.chen@lawfirm.com",
                      phone: "+1 (555) 234-5678",
                      department: "Tax",
                      cases: 8,
                      status: "Busy",
                      img: "https://randomuser.me/api/portraits/men/34.jpg",
                    },
                    {
                      name: "Emily Rodriguez",
                      email: "e.rodriguez@lawfirm.com",
                      phone: "+1 (555) 345-6789",
                      department: "Consulting",
                      cases: 10,
                      status: "On Leave",
                      img: "https://randomuser.me/api/portraits/women/45.jpg",
                    },
                    {
                      name: "David Wilson",
                      email: "d.wilson@lawfirm.com",
                      phone: "+1 (555) 456-7890",
                      department: "Customs",
                      cases: 5,
                      status: "Available",
                      img: "https://randomuser.me/api/portraits/men/56.jpg",
                    },
                    {
                      name: "Alexandra Kim",
                      email: "a.kim@lawfirm.com",
                      phone: "+1 (555) 567-8901",
                      department: "Litigation",
                      cases: 15,
                      status: "Busy",
                      img: "https://randomuser.me/api/portraits/women/67.jpg",
                    },
                  ].map((lawyer, index) => (
                    <tr
                      key={index}
                      className="hover:bg-gray-50 transition duration-300"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full object-cover hover:ring-2 hover:ring-indigo-500 transition duration-300"
                              src={lawyer.img}
                              alt={lawyer.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 hover:text-indigo-600 cursor-pointer transition duration-300">
                              {lawyer.name}
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
                          {lawyer.cases} cases
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            lawyer.status === "Available"
                              ? "bg-green-100 text-green-800"
                              : lawyer.status === "Busy"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {lawyer.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex space-x-2">
                          <button className="text-indigo-600 hover:text-indigo-900 transition duration-300">
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

            <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6 mt-4">
              <div className="flex-1 flex justify-between sm:hidden">
                <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-300">
                  Previous
                </button>
                <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition duration-300">
                  Next
                </button>
              </div>
              <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm text-gray-700">
                    Showing <span className="font-medium">1</span> to{" "}
                    <span className="font-medium">5</span> of{" "}
                    <span className="font-medium">24</span> results
                  </p>
                </div>
                <div>
                  <nav
                    className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                    aria-label="Pagination"
                  >
                    <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-300">
                      <span className="material-symbols-outlined">
                        chevron_left
                      </span>
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600 hover:bg-indigo-100 transition duration-300">
                      1
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300">
                      2
                    </button>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300">
                      3
                    </button>
                    <span className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700">
                      ...
                    </span>
                    <button className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300">
                      5
                    </button>
                    <button className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 transition duration-300">
                      <span className="material-symbols-outlined">
                        chevron_right
                      </span>
                    </button>
                  </nav>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4 flex items-center">
              <span className="material-symbols-outlined mr-2">person</span>
              Lawyer Details
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="col-span-1 bg-gray-50 p-6 rounded-lg">
                <div className="flex flex-col items-center">
                  <img
                    src="https://randomuser.me/api/portraits/women/21.jpg"
                    alt="Sarah Johnson"
                    className="h-32 w-32 rounded-full object-cover mb-4 border-4 border-white shadow-lg hover:scale-105 transition duration-300"
                  />
                  <h3 className="text-xl font-semibold">Sarah Johnson</h3>
                  <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-semibold mt-2">
                    Litigation
                  </span>

                  <div className="flex items-center mt-4">
                    <span className="h-3 w-3 bg-green-500 rounded-full mr-2"></span>
                    <span className="text-sm text-gray-600">Available</span>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="flex items-center mb-3 hover:bg-white p-2 rounded-md transition duration-300 cursor-pointer">
                    <span className="material-symbols-outlined text-gray-500 mr-3">
                      mail
                    </span>
                    <div>
                      <div className="text-sm font-semibold">Email</div>
                      <div className="text-sm text-gray-600">
                        s.johnson@lawfirm.com
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center mb-3 hover:bg-white p-2 rounded-md transition duration-300 cursor-pointer">
                    <span className="material-symbols-outlined text-gray-500 mr-3">
                      call
                    </span>
                    <div>
                      <div className="text-sm font-semibold">Phone</div>
                      <div className="text-sm text-gray-600">
                        +1 (555) 123-4567
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center hover:bg-white p-2 rounded-md transition duration-300 cursor-pointer">
                    <span className="material-symbols-outlined text-gray-500 mr-3">
                      work
                    </span>
                    <div>
                      <div className="text-sm font-semibold">Department</div>
                      <div className="text-sm text-gray-600">Litigation</div>
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
                        <span className="text-sm font-medium">
                          Active Cases
                        </span>
                        <span className="text-sm text-gray-600">12</span>
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
                        <span className="text-sm font-medium">
                          Hours Logged
                        </span>
                        <span className="text-sm text-gray-600">
                          45 hrs / week
                        </span>
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
                        <span className="text-sm font-medium">
                          Case Completion
                        </span>
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
                      <span className="material-symbols-outlined mr-2">
                        folder
                      </span>
                      Assigned Cases
                    </h3>

                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
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
                              className="hover:bg-gray-50 transition duration-300 cursor-pointer"
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
                    <div className="bg-gray-50 p-4 rounded-lg">
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

                    <div className="bg-gray-50 p-4 rounded-lg">
                      <h4 className="font-medium mb-4 flex items-center">
                        <span className="material-symbols-outlined mr-2">
                          update
                        </span>
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

                  <div className="bg-gray-50 p-4 rounded-lg">
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
                            <div className="text-xs text-gray-500">
                              {doc.date}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
