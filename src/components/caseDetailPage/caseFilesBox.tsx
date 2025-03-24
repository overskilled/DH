import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { AlertDialogFooter, AlertDialogHeader } from "../ui/alert-dialog";
import { useState } from "react";
import { doc, updateDoc, arrayRemove } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { db, storage } from "@/functions/firebase";

const CaseFilesBox = ({
  files,
  caseId,
  setSelectedFiles,
  setShowUploadDialog,
}: {
  files: any[];
  caseId: string;
  setSelectedFiles: React.Dispatch<React.SetStateAction<any>>;
  setShowUploadDialog: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const handleDeleteFile = async (fileName: string) => {
    try {
      const storageRef = ref(storage, `cases/files/${fileName}`);
      await deleteObject(storageRef);
      await updateDoc(doc(db, "cases", caseId as string), {
        files: arrayRemove(files.find((f: any) => f.name === fileName)),
      });
    } catch (error) {
      console.error("File deletion failed:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-3">
        Documents & Attachments
      </h2>

      {/* Drag & Drop Area */}
      <div
        className={`border-2 border-dashed rounded-lg p-8 text-center mb-4 transition-colors
      ${
        isDraggedOver
          ? "border-blue-500 bg-blue-50"
          : "border-gray-300 hover:bg-gray-50"
      }`}
        onDragOver={(e) => {
          e.preventDefault();
          setIsDraggedOver(true);
        }}
        onDragLeave={() => setIsDraggedOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDraggedOver(false);
          const files = Array.from(e.dataTransfer.files);
          setSelectedFiles(files);
          setShowUploadDialog(true);
        }}
        onClick={() => document.getElementById("file-input")?.click()}
      >
        <input
          type="file"
          id="file-input"
          className="hidden"
          multiple
          onChange={(e) => {
            const files = Array.from(e.target.files || []);
            setSelectedFiles(files);
            setShowUploadDialog(true);
          }}
        />
        <span className="material-symbols-outlined text-4xl text-gray-400 mb-2">
          cloud_upload
        </span>
        <p className="text-gray-600 mb-1">
          Drag & drop files here or click to browse
        </p>
        <p className="text-xs text-gray-500">Maximum file size: 25MB</p>
      </div>

      {/* Upload Confirmation Dialog */}

      {/* File Listing (Keep original design) */}
      <div className="space-y-3">
        {files?.map((file: any) => (
          <div
            key={file.name}
            className="flex items-center p-3 rounded-lg border border-gray-200 hover:bg-gray-50 transition"
          >
            <span
              className={`material-symbols-outlined mr-3 ${
                file.type.includes("pdf")
                  ? "text-red-600"
                  : file.type.includes("sheet")
                  ? "text-green-600"
                  : "text-blue-600"
              }`}
            >
              {file.type.includes("pdf")
                ? "picture_as_pdf"
                : file.type.includes("sheet")
                ? "table_chart"
                : "description"}
            </span>
            <div className="flex-1">
              <h4 className="font-medium">{file.name}</h4>
              <p className="text-xs text-gray-500">
                Uploaded{" "}
                {file.uploadedAt &&
                  new Date(file.uploadedAt).toLocaleDateString("en-US", {
                    month: "long",
                    day: "2-digit",
                    year: "numeric",
                  })}{" "}
                • {(file.size / 1024 / 1024).toFixed(1)}MB
              </p>
            </div>
            <div className="flex gap-2">
              <button
                className="text-gray-500 hover:text-blue-600 transition"
                onClick={() => window.open(file.url, "_blank")}
              >
                <span className="material-symbols-outlined">visibility</span>
              </button>
              <button
                className="text-gray-500 hover:text-blue-600 transition"
                onClick={() => {
                  // Add download logic here
                  const link = document.createElement("a");
                  link.href = file.url;
                  link.download = file.name;
                  link.click();
                }}
              >
                <span className="material-symbols-outlined">download</span>
              </button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button className="text-gray-500 hover:text-red-600 transition">
                    <span className="material-symbols-outlined">delete</span>
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Delete</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete {file.name}? This action
                      cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleDeleteFile(file.name)}
                    >
                      Confirm Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ))}

        {/* Original View All Button */}
        <div className="flex items-center justify-center mt-4">
          <button className="text-blue-600 hover:text-blue-800 transition flex items-center">
            <span className="material-symbols-outlined mr-1">expand_more</span>
            View All Documents ({files?.length || 0} total)
          </button>
        </div>
      </div>
    </div>
  );
};

export default CaseFilesBox;
