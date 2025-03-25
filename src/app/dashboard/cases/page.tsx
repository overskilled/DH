"use client";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/context/auth-context";
import { EditCaseLawyersDialog } from "@/components/caseDetailPage/editCaseLawyersDialog";
import { useState } from "react";

export default function Page() {
  const router = useRouter();
  const { cases, lawyers } = useAuth();
  const [isEditLawyerOpened, setIsEditLawyerOpened] = useState(false);
  const [selectedCase, setSelectedCase] = useState<any>({});

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [visibleCases, setVisibleCases] = useState<number>(5);

  // Filter cases based on search and status
  const filteredCases = cases
    .filter((caseItem: any) => {
      const matchesSearch =
        caseItem.caseName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        caseItem.selectedClient.fullName
          .toLowerCase()
          .includes(searchQuery.toLowerCase());

      const matchesStatus =
        selectedStatuses.length === 0 ||
        selectedStatuses.includes(caseItem.caseStatus);

      return matchesSearch && matchesStatus;
    })
    .slice(0, visibleCases);

  // Handle status filter changes
  const handleStatusChange = (status: string) => {
    setSelectedStatuses((prev) =>
      prev.includes(status)
        ? prev.filter((s) => s !== status)
        : [...prev, status]
    );
  };

  // Load more cases
  const loadMoreCases = () => {
    setVisibleCases((prev) => prev + 5);
  };

  return (
    <div className="w-full bg-gray-50 shadow-lg p-4 md:p-6 lg:p-8">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 md:mb-8">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-700 bg-clip-text text-transparent">
          Case Management
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative flex-grow md:flex-grow-0">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">
              search
            </span>
            <input
              type="text"
              placeholder="Search cases or clients..."
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg w-full md:w-[300px] hover:border-blue-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 focus:outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <details className="relative">
              <summary className="px-3 py-2 bg-gray-100 rounded-lg cursor-pointer hover:bg-gray-200 transition-all flex items-center gap-1 text-sm">
                Status
                <span className="material-symbols-outlined text-sm">
                  expand_more
                </span>
              </summary>
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-xl p-2 z-10 border border-gray-100">
                {["ongoing", "pending", "completed"].map((status) => (
                  <label
                    key={status}
                    className="flex items-center p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedStatuses.includes(status)}
                      onChange={() => handleStatusChange(status)}
                      className="form-checkbox h-4 w-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </details>

            <button
              onClick={() => router.push("/dashboard/cases/new")}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all shadow-sm hover:shadow flex items-center gap-1"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span className="hidden sm:inline">New Case</span>
            </button>
          </div>
        </div>
      </header>

      <div className="grid gap-6">
        {filteredCases.map((caseItem: any) => {
          // Get assigned lawyers for the current case
          const assignedLawyers = lawyers.filter((lawyer: any) =>
            caseItem.assignedLawyers.includes(lawyer.id)
          );

          return (
            <div
              key={caseItem.id}
              className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-5 hover:shadow-lg cursor-pointer transition-all duration-300 border border-gray-300 group"
              onClick={() => router.push(`/dashboard/cases/${caseItem.id}`)}
            >
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-all">
                      {caseItem.caseName}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-medium text-xs">
                      {caseItem.caseStatus}
                    </span>
                  </div>
                  <p className="text-gray-600 mt-1 text-sm">
                    Client: {caseItem.selectedClient.fullName}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      router.push(`/dashboard/cases/${caseItem.id}/edit`);
                    }}
                    className="px-2 py-1 text-xs border border-gray-200 rounded-md hover:bg-gray-50 transition-all flex items-center gap-1"
                  >
                    <span className="material-symbols-outlined text-sm">
                      edit
                    </span>
                    <span>Edit</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedCase(caseItem);
                      setIsEditLawyerOpened(true);
                    }}
                    className="px-2 py-1 text-xs border border-blue-200 bg-blue-50 rounded-md hover:bg-blue-100 transition-all flex items-center gap-1 text-blue-700"
                  >
                    <span className="material-symbols-outlined text-sm">
                      person_add
                    </span>
                    <span>Assign</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
                  <span className="material-symbols-outlined text-blue-500">
                    folder
                  </span>
                  <span className="text-sm">Type: {caseItem.caseType}</span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
                  <span className="material-symbols-outlined text-amber-500">
                    description
                  </span>
                  <span className="text-sm">
                    Files: {caseItem.files.length}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
                  <span className="material-symbols-outlined text-emerald-500">
                    schedule
                  </span>
                  <span className="text-sm">
                    Est. Completion: {caseItem.deadline}
                  </span>
                </div>
                <div className="flex items-center gap-2 bg-white p-2 rounded-lg shadow-sm">
                  <span className="material-symbols-outlined text-purple-500">
                    group
                  </span>
                  <span className="text-sm">
                    Lawyers: {caseItem.assignedLawyers.length}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mt-4 pt-3 border-t border-gray-100">
                <div className="flex -space-x-2 hover:-space-x-1 transition-all">
                  {assignedLawyers.length > 0 ? (
                    assignedLawyers.map((lawyer: any) => (
                      <img
                        key={lawyer.id}
                        src={lawyer.profileImage}
                        alt={lawyer.full_name}
                        className="w-8 h-8 rounded-full border-2 border-white hover:transform hover:scale-110 transition-all"
                      />
                    ))
                  ) : (
                    <span className="text-xs text-gray-500">
                      No assigned lawyers
                    </span>
                  )}
                </div>
                <div className="text-xs text-gray-500 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">
                    calendar_today
                  </span>
                  Last Updated:{" "}
                  {caseItem.updatedAt.toDate().toLocaleDateString()}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Load More Button */}
      {cases.length > visibleCases && (
        <div className="mt-6 flex justify-center">
          <button
            onClick={loadMoreCases}
            className="px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 flex items-center gap-2 transition-all"
          >
            <span className="material-symbols-outlined">add</span>
            <span>Load More Cases</span>
          </button>
        </div>
      )}

      <EditCaseLawyersDialog
        opened={isEditLawyerOpened}
        setOpened={setIsEditLawyerOpened}
        selectedCase={selectedCase}
      />
    </div>
  );
}
