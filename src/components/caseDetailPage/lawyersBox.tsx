import { useState } from "react";
import { EditCaseLawyersDialog } from "./editCaseLawyersDialog";

export const LawyersBox = ({
  selectedCase,
  assignedLawyers,
}: {
  selectedCase: any;
  assignedLawyers: any[];
}) => {
  const [isHandleLawyerDialogOpened, setIsHandleLawyerDialogOpened] =
    useState(false);
  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <div className="flex justify-between items-center mb-4 border-b pb-3">
        <h2 className="text-xl font-semibold">Assigned Lawyers</h2>
        <button
          onClick={() => setIsHandleLawyerDialogOpened(true)}
          className="text-blue-600 hover:text-blue-800 transition"
        >
          <span className="material-symbols-outlined">add_circle</span>
        </button>
        <EditCaseLawyersDialog
          opened={isHandleLawyerDialogOpened}
          setOpened={setIsHandleLawyerDialogOpened}
          selectedCase={selectedCase}
        />
      </div>

      <div className="space-y-4">
        {assignedLawyers.map((lawyer: any) => (
          <div
            key={lawyer.id}
            className="flex gap-3 p-3 hover:bg-gray-50 rounded-lg transition"
          >
            <img
              className="w-12 h-12 rounded-full"
              src={lawyer.profileImage}
              alt={lawyer.full_name}
            />
            <div className="flex-1">
              <div className="flex justify-between">
                <h4 className="font-semibold">{lawyer.full_name}</h4>
                <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                  Associate
                </span>
              </div>
              <p className="text-sm text-gray-500">{lawyer.department}</p>
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
                  Assigned until {selectedCase?.deadline}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
