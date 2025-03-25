"use client";
import { useState } from "react";

import { useAuth } from "@/components/context/auth-context";
import { InvoiceCreationDialog } from "@/components/invoices/invoice-creation-dialog";

export default function Page() {
  const { invoices, clients } = useAuth();

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [isCreateInvoiceOpened, setIsCreateInvoiceOpened] = useState(false);
  const [selectedClient, setSelectedClient] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("newest");
  const [searchQuery, setSearchQuery] = useState("");

  // Filtering and sorting logic
  const filteredInvoices = invoices.filter((invoice: any) => {
    const matchesSearch =
      invoice.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      invoice.totalAmount.toString().includes(searchQuery) ||
      invoice.status.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesClient = selectedClient
      ? invoice.clientId === selectedClient
      : true;
    const matchesStatus = selectedStatus
      ? invoice.status === selectedStatus
      : true;

    return matchesSearch && matchesClient && matchesStatus;
  });

  // Sorting logic
  const sortedInvoices = [...filteredInvoices].sort((a: any, b: any) => {
    switch (sortBy) {
      case "oldest":
        return (
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        );
      case "due-soon":
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case "amount-high":
        return b.totalAmount - a.totalAmount;
      case "amount-low":
        return a.totalAmount - b.totalAmount;
      default: // newest first
        return (
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  });

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentInvoices = sortedInvoices.slice(
    indexOfFirstItem,
    indexOfLastItem
  );
  const totalPages = Math.ceil(sortedInvoices.length / itemsPerPage);

  // Pagination controls
  const paginate = (pageNumber: number) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Generate page numbers
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div id="webcrumbs">
      <div className="w-full bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-5 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-800">Invoices</h1>
            <div className="flex space-x-3">
              <div className="relative">
                <button className="flex items-center space-x-1 px-4 py-2 bg-primary-50 hover:bg-primary-100 rounded-md transition-colors duration-200 text-primary-700">
                  <span className="material-symbols-outlined text-sm">
                    file_download
                  </span>
                  <span>Export</span>
                  <span className="material-symbols-outlined text-sm">
                    arrow_drop_down
                  </span>
                </button>
              </div>
              <button className="flex items-center space-x-1 px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-md transition-colors duration-200">
                <span className="material-symbols-outlined text-sm">add</span>
                <span>New Invoice</span>
              </button>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-grow max-w-md">
              <input
                type="text"
                placeholder="Search invoices..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
              />
              <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
                search
              </span>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="relative">
                <select
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white cursor-pointer"
                  value={selectedClient}
                  onChange={(e) => {
                    setSelectedClient(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Clients</option>
                  {clients.map((client: any) => (
                    <option key={client.id} value={client.id}>
                      {client.name}
                    </option>
                  ))}
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-gray-500">
                  expand_more
                </span>
              </div>

              <div className="relative">
                <select
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white cursor-pointer"
                  value={selectedStatus}
                  onChange={(e) => {
                    setSelectedStatus(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="">All Statuses</option>
                  <option value="paid">Paid</option>
                  <option value="pending">Pending</option>
                  <option value="overdue">Overdue</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-gray-500">
                  expand_more
                </span>
              </div>

              <div className="relative">
                <select
                  className="appearance-none pl-3 pr-8 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 bg-white cursor-pointer"
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setCurrentPage(1);
                  }}
                >
                  <option value="newest">Date: Newest First</option>
                  <option value="oldest">Date: Oldest First</option>
                  <option value="due-soon">Due Date: Soonest</option>
                  <option value="amount-high">Amount: Highest</option>
                  <option value="amount-low">Amount: Lowest</option>
                </select>
                <span className="material-symbols-outlined absolute right-2 top-2.5 pointer-events-none text-gray-500">
                  expand_more
                </span>
              </div>
            </div>
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
                  Invoice #
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Client
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Amount
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
                  Date Issued
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Due Date
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
              {invoices.map((invoice: any) => (
                <tr
                  key={invoice.id}
                  className="hover:bg-gray-50 transition-colors duration-150"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-primary-700">
                      {invoice.id}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">{invoice.clientName}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium">
                      XAF{invoice.subTotal}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        invoice.status === "paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.createdAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(invoice.dueDate).toLocaleDateString("en-US", {
                      month: "long",
                      day: "2-digit",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <button className="text-primary-600 hover:text-primary-900 transition-colors">
                        <span className="material-symbols-outlined text-base">
                          visibility
                        </span>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <span className="material-symbols-outlined text-base">
                          edit
                        </span>
                      </button>
                      <button className="text-gray-600 hover:text-gray-900 transition-colors">
                        <span className="material-symbols-outlined text-base">
                          file_download
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
          <div className="text-sm text-gray-500">
            Showing {indexOfFirstItem + 1}-
            {Math.min(indexOfLastItem, sortedInvoices.length)} of{" "}
            {sortedInvoices.length} invoices
          </div>
          <div className="flex space-x-2">
            <button
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {pageNumbers.map((number) => (
              <button
                key={number}
                className={`px-3 py-1 border rounded-md ${
                  currentPage === number
                    ? "border-primary-500 bg-primary-50 text-primary-700 font-medium"
                    : "border-gray-300 bg-white text-gray-500 hover:bg-gray-50"
                }`}
                onClick={() => paginate(number)}
              >
                {number}
              </button>
            ))}
            <button
              className="px-3 py-1 border border-gray-300 rounded-md bg-white text-gray-500 hover:bg-gray-50 disabled:opacity-50"
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      <InvoiceCreationDialog
        opened={isCreateInvoiceOpened}
        setOpened={setIsCreateInvoiceOpened}
      />
    </div>
  );
}
