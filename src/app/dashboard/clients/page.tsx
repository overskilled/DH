"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/auth-context";
import { useEffect, useState } from "react";
import { DeleteDialog } from "@/components/deleteDialog";

export default function Page() {
  const router = useRouter();
  const { clients, cases } = useAuth();

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<any>({});
  // Calculate total pages
  const totalPages = Math.ceil((clients.length ?? 0) / itemsPerPage);

  // Filter and search state
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCaseTypes, setSelectedCaseTypes] = useState<string[]>([]);
  const [activeCasesFilter, setActiveCasesFilter] = useState(false);
  const [overdueInvoicesFilter, setOverdueInvoicesFilter] = useState(false);

  // Filtered clients calculation
  const filteredClients = (clients || []).filter((client: any) => {
    const searchMatches = [client.fullName, client.email].some((value) =>
      value?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const clientCases = cases.filter(
      (caseItem: any) => caseItem.selectedClient?.id === client.id
    );

    const caseTypeMatch =
      selectedCaseTypes.length === 0 ||
      clientCases.some((c: any) => selectedCaseTypes.includes(c.caseType));

    const activeCasesMatch = !activeCasesFilter || clientCases.length > 0;
    const overdueMatch = !overdueInvoicesFilter || client.hasOverdue;

    return searchMatches && caseTypeMatch && activeCasesMatch && overdueMatch;
  });

  // Slice data for pagination
  const displayedClients = filteredClients?.slice(
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

  // Reset pagination on filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedCaseTypes,
    activeCasesFilter,
    overdueInvoicesFilter,
  ]);

  const handleOpenDelete = (client: any) => {
    setSelectedClient(client);
    setIsDeleteOpen(true);
  };

  const handleCaseTypeChange = (type: string) => {
    setSelectedCaseTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

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
            <button
              onClick={() => router.push("/dashboard/clients/new")}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-all duration-200 transform hover:scale-105"
            >
              <span className="material-symbols-outlined mr-1 text-sm">
                person_add
              </span>
              <span className="hidden sm:inline">Add New Client</span>
            </button>
            <button className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-lg flex items-center transition-all duration-200 transform hover:scale-105">
              <span className="material-symbols-outlined mr-1 text-sm">
                download
              </span>
              <span className="hidden sm:inline">Export Client List</span>
            </button>
          </div>
        </div>

        <div className="flex justify-between items-center mb-6">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search clients by name or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
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
                    checked={activeCasesFilter}
                    onChange={(e) => setActiveCasesFilter(e.target.checked)}
                  />
                  <span>Clients with active cases</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4 text-blue-600 rounded"
                    checked={overdueInvoicesFilter}
                    onChange={(e) => setOverdueInvoicesFilter(e.target.checked)}
                  />
                  <span>Clients with overdue invoices</span>
                </label>
                <div className="space-y-1">
                  <p className="text-sm font-medium">Case type:</p>
                  {["consulting", "litigation", "customs", "tax"].map(
                    (type) => (
                      <label
                        key={type}
                        className="flex items-center space-x-2 cursor-pointer hover:bg-gray-50 p-1 rounded"
                      >
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-blue-600 rounded"
                          value={type}
                          checked={selectedCaseTypes.includes(type)}
                          onChange={(e) => handleCaseTypeChange(type)}
                        />
                        <span className="capitalize">{type}</span>
                      </label>
                    )
                  )}
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
              {displayedClients.map((client: any) => (
                <tr
                  key={client.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold">
                          JD
                        </div>
                      </div>
                      <div className="ml-4">
                        <div
                          onClick={() =>
                            router.push(`/dashboard/clients/${client.id}`)
                          }
                          className="text-sm font-medium text-blue-600 cursor-pointer hover:underline"
                        >
                          {client.fullName}
                        </div>
                        <div className="text-xs text-gray-500">
                          {client.clientType}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-2">
                      <div className="text-sm text-gray-900">
                        {client.phone}
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
                        {client.email}
                      </div>
                      <button className="text-blue-600 hover:text-blue-800 transition-colors">
                        <span className="material-symbols-outlined text-sm">
                          mail
                        </span>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {cases.filter(
                        (caseItem: any) =>
                          caseItem.selectedClient.id === client.id
                      ).length ?? 0}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {client?.createdAt?.toDate().toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      <button
                        onClick={() =>
                          router.push(`/dashboard/clients/${client.id}`)
                        }
                        className="text-indigo-600 hover:text-indigo-900 transition-transform hover:scale-110"
                      >
                        <span className="material-symbols-outlined">
                          visibility
                        </span>
                      </button>
                      <button
                        onClick={() =>
                          router.push(`/dashboard/clients/${client.id}/edit`)
                        }
                        className="text-blue-600 hover:text-blue-900 transition-transform hover:scale-110"
                      >
                        <span className="material-symbols-outlined">edit</span>
                      </button>
                      <button
                        onClick={() => handleOpenDelete(client)}
                        className="text-red-600 hover:text-red-900 transition-transform hover:scale-110"
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
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing{" "}
            <span className="font-medium">
              {(currentPage - 1) * itemsPerPage + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(currentPage * itemsPerPage, clients.length)}
            </span>{" "}
            of <span className="font-medium">{clients.length}</span> clients
          </div>
          <div className="flex space-x-2">
            <button
              onClick={goToPrevPage}
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={currentPage === 1}
            >
              Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 border border-gray-300 rounded-md transition-colors ${
                  currentPage === page
                    ? "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    : "bg-white text-gray-700 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={goToNextPage}
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </main>
      <DeleteDialog
        onOpen={isDeleteOpen}
        element={selectedClient}
        setElement={setIsDeleteOpen}
        table={"client"}
      />
    </div>
  );
}
