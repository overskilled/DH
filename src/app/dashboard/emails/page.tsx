"use client";
import { useAuth } from "@/components/context/auth-context";
import { CreateAndSendEmailDialog } from "@/components/emails/createAndSendEmailDialog";
import { useState } from "react";

export default function Page() {
  const { emails, clients } = useAuth();
  const [isCreateEmailOpened, setIsCreateEmailOpened] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Filter and sort logic
  const filteredEmails = emails.filter((email: any) => {
    const matchesSearch =
      email.recipientEmail.toLowerCase().includes(searchQuery.toLowerCase()) ||
      email.subject.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFilters =
      selectedFilters.length === 0 ||
      selectedFilters.includes(email.status.toLowerCase());

    return matchesSearch && matchesFilters;
  });

  const sortedEmails = [...filteredEmails].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "asc" ? 1 : -1;
    }
    return 0;
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEmails = sortedEmails.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedEmails.length / itemsPerPage);

  // Handlers
  const handleFilterChange = (status: string) => {
    setSelectedFilters((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
    setCurrentPage(1);
  };

  const handleSort = (key: string) => {
    let direction: "asc" | "desc" = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    setSortConfig({ key, direction });
    setCurrentPage(1);
  };

  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  return (
    <div id="webcrumbs">
      <div className="w-full bg-white rounded-lg shadow-lg p-6 font-sans">
        <div className="w-full flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-blue-700">Email Management</h1>
          <div className="flex items-center gap-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search emails..."
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent w-64 transition-all duration-300"
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
                search
              </span>
            </div>
            <button
              onClick={() => setIsCreateEmailOpened(true)}
              className="bg-blue-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-all duration-300 transform hover:scale-105"
            >
              <span className="material-symbols-outlined">add</span>
              Compose Email
            </button>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-md mb-6">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <details className="relative">
                <summary className="flex items-center gap-2 bg-white px-4 py-2 rounded-md cursor-pointer border border-gray-200 hover:border-primary-400 transition-all duration-200">
                  <span className="material-symbols-outlined text-gray-500">
                    filter_alt
                  </span>
                  Filter
                  <span className="material-symbols-outlined text-gray-500">
                    expand_more
                  </span>
                </summary>
                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md p-3 w-48 z-10 border border-gray-200">
                  <div className="mb-2 font-medium text-gray-700">Status</div>
                  <div className="flex flex-col gap-2">
                    {["sent", "draft", "failed"].map((status) => (
                      <label
                        key={status}
                        className="flex items-center gap-2 hover:bg-gray-50 p-1 rounded cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedFilters.includes(status)}
                          onChange={() => handleFilterChange(status)}
                          className="rounded text-primary-500 focus:ring-primary-400"
                        />
                        <span className="capitalize">{status}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </details>

              <details className="relative">
                <summary className="flex items-center gap-2 bg-white px-4 py-2 rounded-md cursor-pointer border border-gray-200 hover:border-primary-400 transition-all duration-200">
                  <span className="material-symbols-outlined text-gray-500">
                    sort
                  </span>
                  Sort by
                  <span className="material-symbols-outlined text-gray-500">
                    expand_more
                  </span>
                </summary>
                <div className="absolute top-full left-0 mt-1 bg-white shadow-lg rounded-md p-3 w-48 z-10 border border-gray-200">
                  <div className="flex flex-col gap-1">
                    {["date", "recipient", "subject", "status"].map((key) => (
                      <button
                        key={key}
                        onClick={() => handleSort(key)}
                        className="text-left p-2 hover:bg-gray-50 rounded flex items-center justify-between w-full"
                      >
                        <span className="capitalize">{key}</span>
                        {sortConfig?.key === key && (
                          <span className="material-symbols-outlined text-sm">
                            {sortConfig.direction === "asc"
                              ? "arrow_upward"
                              : "arrow_downward"}
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              </details>
            </div>

            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>
                Showing {indexOfFirstItem + 1}-
                {Math.min(indexOfLastItem, sortedEmails.length)} of{" "}
                {sortedEmails.length} emails
              </span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-lg border border-gray-200 mb-6">
          <table className="w-full text-sm">
            <thead className="bg-gray-50">
              <tr className="border-b border-gray-200">
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Recipient
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Subject
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Date Sent
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {emails.map((email: any) => {
                const clientName = clients.find(
                  (client: any) => client.email == email.recipientEmail
                ).fullName;
                return (
                  <tr className="hover:bg-gray-50 transition-colors cursor-pointer">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium">{clientName}</span>
                        <span className="text-gray-500">
                          {email.recipientEmail}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">{email.subject}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                        {email.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {new Date(email.createdAt).toLocaleDateString("en-US", {
                        month: "long",
                        day: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                          title="View"
                        >
                          <span className="material-symbols-outlined text-gray-600">
                            visibility
                          </span>
                        </button>
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                          title="Edit"
                        >
                          <span className="material-symbols-outlined text-gray-600">
                            edit
                          </span>
                        </button>
                        <button
                          className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                          title="Delete"
                        >
                          <span className="material-symbols-outlined text-gray-600">
                            delete
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500">
            Showing {itemsPerPage} of {sortedEmails.length} emails
          </div>

          {/* Pagination buttons - dynamic now but same styling */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined">chevron_left</span>
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`w-9 h-9 flex items-center justify-center rounded-md border transition-colors ${
                  currentPage === page
                    ? "bg-primary-500 text-white border-primary-500 hover:bg-primary-600"
                    : "bg-white border-gray-300 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="w-9 h-9 flex items-center justify-center rounded-md border border-gray-300 bg-white hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              <span className="material-symbols-outlined">chevron_right</span>
            </button>
          </div>

          {/* Items per page selector - same position and styling */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Emails per page:</span>
            <select
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent bg-white"
            >
              {[5, 10, 25, 50].map((value) => (
                <option key={value} value={value}>
                  {value}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
      <CreateAndSendEmailDialog
        opened={isCreateEmailOpened}
        setOpened={setIsCreateEmailOpened}
      />
    </div>
  );
}
