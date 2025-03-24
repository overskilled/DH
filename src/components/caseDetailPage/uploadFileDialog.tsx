import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/functions/firebase";
export const UploadFileDialog = ({
  opened,
  setOpened,
  selectedFiles,
  caseId,
  setSelectedFiles,
  setShowUploadDialog,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<any>>;
  selectedFiles: File[] | null;
  caseId: string;
  setSelectedFiles: React.Dispatch<React.SetStateAction<any>>;
  setShowUploadDialog: React.Dispatch<React.SetStateAction<any>>;
}) => {
  const handleFileUpload = async () => {
    if (!selectedFiles || !caseId) return;

    try {
      const uploadPromises = selectedFiles.map(async (file) => {
        const storageRef = ref(storage, `cases/${caseId}/files/${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(snapshot.ref);

        return {
          name: file.name,
          url: downloadURL,
          type: file.type,
          size: file.size,
          uploadedAt: new Date(),
        };
      });

      const newFiles = await Promise.all(uploadPromises);

      await updateDoc(doc(db, "cases", caseId), {
        files: arrayUnion(...newFiles),
      });
    } catch (error) {
      console.error("File upload failed:", error);
    }
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirm File Upload</DialogTitle>
          <DialogDescription>
            {selectedFiles?.length} file(s) ready to upload
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[300px] overflow-y-auto">
          {selectedFiles?.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-2 border-b"
            >
              <div>
                <p className="font-medium">{file.name}</p>
                <p className="text-sm text-gray-500">
                  {(file.size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
          ))}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              setSelectedFiles([]);
              setShowUploadDialog(false);
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={async () => {
              setShowUploadDialog(false);
              await handleFileUpload();
              setSelectedFiles([]);
            }}
          >
            Confirm Upload
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
