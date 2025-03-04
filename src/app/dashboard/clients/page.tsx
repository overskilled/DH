export default function Page() {
  return (
    <div className="w-full min-h-screen bg-white font-sans">
      <header className="p-6 border-b">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold">Clients</h1>
            <nav className="text-sm">
              <span className="text-gray-500">Dashboard</span>
              <span className="mx-2 text-gray-400">&gt;</span>
              <span className="text-gray-700 font-medium">Clients</span>
            </nav>
          </div>
          <div className="flex space-x-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 transform hover:scale-105">
              <span className="material-symbols-outlined mr-1 text-sm">
                person_add
              </span>
              Add New Client
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center transition-all duration-200 transform hover:scale-105">
              <span className="material-symbols-outlined mr-1 text-sm">
                download
              </span>
              Export Client List
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search clients..."
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-200"
            />
            <span className="material-symbols-outlined absolute left-3 top-2 text-gray-400">
              search
            </span>
          </div>

          <details className="relative group">
            <summary className="flex items-center px-4 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors duration-200 list-none">
              <span className="material-symbols-outlined mr-1 text-sm">
                filter_list
              </span>
              Filters
              <span className="material-symbols-outlined ml-1 text-sm">
                expand_more
              </span>
            </summary>
            <div className="absolute right-0 mt-2 w-72 bg-white shadow-lg rounded-lg p-4 z-10 border">
              <div className="space-y-3">
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <span>Clients with active cases</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                  />
                  <span>Clients with overdue invoices</span>
                </label>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Case type:</p>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    />
                    <span>Consulting</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    />
                    <span>Litigation</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    />
                    <span>Customs</span>
                  </label>
                  <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    />
                    <span>Tax</span>
                  </label>
                </div>
                <div className="pt-2 flex justify-end">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded transition-colors duration-200">
                    Apply
                  </button>
                </div>
              </div>
            </div>
          </details>
        </div>
      </header>

      <main className="p-6">
        <div className="overflow-x-auto rounded-lg border">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Client Name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Phone Number
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Email Address
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
                  Last Update
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {/* Client 1 */}
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                        JD
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                        John Doe
                      </div>
                      <div className="text-xs text-gray-500">
                        Individual Client
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-900">
                      +1 (555) 123-4567
                    </div>
                    <button className="text-green-600 hover:text-green-800 transition-colors">
                      <span className="material-symbols-outlined text-sm">
                        call
                      </span>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-900">
                      john.doe@example.com
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <span className="material-symbols-outlined text-sm">
                        mail
                      </span>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">3</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Sep 24, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="text-red-600 hover:text-red-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Client 2 */}
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-semibold">
                        AC
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                        Acme Corporation
                      </div>
                      <div className="text-xs text-gray-500">
                        Corporate Client
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-900">
                      +1 (555) 987-6543
                    </div>
                    <button className="text-green-600 hover:text-green-800 transition-colors">
                      <span className="material-symbols-outlined text-sm">
                        call
                      </span>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-900">
                      contact@acmecorp.com
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <span className="material-symbols-outlined text-sm">
                        mail
                      </span>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">5</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Oct 2, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="text-red-600 hover:text-red-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Client 3 */}
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold">
                        SJ
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                        Sarah Johnson
                      </div>
                      <div className="text-xs text-gray-500">
                        Individual Client
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-900">
                      +1 (555) 234-5678
                    </div>
                    <button className="text-green-600 hover:text-green-800 transition-colors">
                      <span className="material-symbols-outlined text-sm">
                        call
                      </span>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-900">
                      sarah.j@example.com
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <span className="material-symbols-outlined text-sm">
                        mail
                      </span>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">1</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Sep 18, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="text-red-600 hover:text-red-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>

              {/* Client 4 */}
              <tr className="hover:bg-gray-50 transition-colors duration-150">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <div className="h-10 w-10 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 font-semibold">
                        TT
                      </div>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                        TechTron Industries
                      </div>
                      <div className="text-xs text-gray-500">
                        Corporate Client
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-900">
                      +1 (555) 876-5432
                    </div>
                    <button className="text-green-600 hover:text-green-800 transition-colors">
                      <span className="material-symbols-outlined text-sm">
                        call
                      </span>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center space-x-2">
                    <div className="text-sm text-gray-900">
                      legal@techtron.com
                    </div>
                    <button className="text-blue-600 hover:text-blue-800 transition-colors">
                      <span className="material-symbols-outlined text-sm">
                        mail
                      </span>
                    </button>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">2</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Oct 5, 2023
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">
                        visibility
                      </span>
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">edit</span>
                    </button>
                    <button className="text-red-600 hover:text-red-900 transition-transform hover:scale-110">
                      <span className="material-symbols-outlined">delete</span>
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">4</span> of{" "}
            <span className="font-medium">12</span> clients
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled
            >
              Previous
            </button>
            <button className="px-3 py-1 border border-gray-300 bg-blue-50 text-blue-700 rounded-md hover:bg-blue-100 transition-colors">
              1
            </button>
            <button className="px-3 py-1 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              2
            </button>
            <button className="px-3 py-1 border border-gray-300 bg-white text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              3
            </button>
            <button className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors">
              Next
            </button>
          </div>
        </div>
      </main>

      {/* Client Details Modal (Hidden by default) */}
      <div className="hidden absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-2xl w-[1000px] max-h-[90vh] overflow-y-auto">
          <div className="border-b p-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Client Details</h2>
              <button className="text-gray-500 hover:text-gray-700 transition-colors">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-3 gap-6">
              <div className="col-span-1">
                <div className="p-4 border rounded-lg bg-gray-50 mb-6">
                  <h3 className="text-lg font-semibold mb-4">
                    Client Information
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">Full Name</p>
                      <p className="font-medium">John Doe</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone Number</p>
                      <p className="font-medium flex items-center">
                        +1 (555) 123-4567
                        <button className="ml-2 text-green-600 hover:text-green-800 transition-colors">
                          <span className="material-symbols-outlined text-sm">
                            call
                          </span>
                        </button>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email Address</p>
                      <p className="font-medium flex items-center">
                        john.doe@example.com
                        <button className="ml-2 text-blue-600 hover:text-blue-800 transition-colors">
                          <span className="material-symbols-outlined text-sm">
                            mail
                          </span>
                        </button>
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        123 Main Street, Apt 4B
                        <br />
                        New York, NY 10001
                      </p>
                    </div>
                  </div>
                </div>

                <div className="p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-lg font-semibold mb-4">
                    Invoices & Payments
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">INV-2023-001</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        Paid
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">INV-2023-002</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Pending
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">INV-2023-003</span>
                      <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                        Overdue
                      </span>
                    </div>
                    <button className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-200 transform hover:scale-105">
                      Generate New Invoice
                    </button>
                  </div>
                </div>
              </div>

              <div className="col-span-2">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Cases</h3>
                  <div className="border rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Case Name
                          </th>
                          <th
                            scope="col"
                            className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Type
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
                            Lawyer
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                              Contract Review #2023-A
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Consulting
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Ongoing
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            David Miller
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                              Trademark Dispute
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Litigation
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                              Completed
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Sarah Williams
                          </td>
                        </tr>
                        <tr className="hover:bg-gray-50 transition-colors duration-150">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-blue-600 cursor-pointer hover:underline">
                              Tax Consultation
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Tax
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                              Abandoned
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            Michael Chen
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">
                      Communication & Documents
                    </h3>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center transition-all duration-200 transform hover:scale-105 text-sm">
                        <span className="material-symbols-outlined mr-1 text-sm">
                          upload_file
                        </span>
                        Upload Document
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center transition-all duration-200 transform hover:scale-105 text-sm">
                        <span className="material-symbols-outlined mr-1 text-sm">
                          mail
                        </span>
                        Send Email
                      </button>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <details className="border rounded-lg overflow-hidden bg-gray-50 group">
                      <summary className="px-4 py-3 cursor-pointer list-none flex justify-between items-center font-medium hover:bg-gray-100 transition-colors duration-150">
                        Email & Message History
                        <span className="material-symbols-outlined transform group-open:rotate-180 transition-transform duration-200">
                          expand_more
                        </span>
                      </summary>
                      <div className="p-4 bg-white border-t">
                        <div className="space-y-3">
                          <div className="border-l-4 border-blue-500 pl-3 py-1">
                            <div className="flex justify-between">
                              <div className="text-sm font-medium">
                                Case Update: Contract Review
                              </div>
                              <div className="text-xs text-gray-500">
                                Oct 2, 2023
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Dear Mr. Doe, we've completed the initial review
                              of your contract and have some recommendations to
                              discuss...
                            </p>
                          </div>
                          <div className="border-l-4 border-green-500 pl-3 py-1">
                            <div className="flex justify-between">
                              <div className="text-sm font-medium">
                                Meeting Confirmation
                              </div>
                              <div className="text-xs text-gray-500">
                                Sep 28, 2023
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              This email confirms our meeting scheduled for
                              Tuesday, October 3rd at 2:00 PM in our office...
                            </p>
                          </div>
                          <div className="border-l-4 border-purple-500 pl-3 py-1">
                            <div className="flex justify-between">
                              <div className="text-sm font-medium">
                                Invoice #INV-2023-002 Sent
                              </div>
                              <div className="text-xs text-gray-500">
                                Sep 25, 2023
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              We've sent invoice #INV-2023-002 for the services
                              provided. Payment is due within 30 days...
                            </p>
                          </div>
                        </div>
                      </div>
                    </details>

                    <details className="border rounded-lg overflow-hidden bg-gray-50 group">
                      <summary className="px-4 py-3 cursor-pointer list-none flex justify-between items-center font-medium hover:bg-gray-100 transition-colors duration-150">
                        Documents
                        <span className="material-symbols-outlined transform group-open:rotate-180 transition-transform duration-200">
                          expand_more
                        </span>
                      </summary>
                      <div className="p-4 bg-white border-t">
                        <div className="space-y-3"></div>
                      </div>
                    </details>
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
