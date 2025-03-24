import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/context/auth-context";
import {
  Timestamp,
  addDoc,
  collection,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
} from "firebase/firestore";
import { db } from "@/functions/firebase";

export const EditCaseLawyersDialog = ({
  opened,
  setOpened,
  selectedCase,
}: {
  opened: boolean;
  setOpened: React.Dispatch<React.SetStateAction<any>>;
  selectedCase: any;
}) => {
  const { lawyers } = useAuth();

  const handleLawyerUpdate = async (
    lawyerId: string,
    action: "add" | "remove"
  ) => {
    try {
      await updateDoc(doc(db, "cases", selectedCase.id as string), {
        assignedLawyers:
          action === "add" ? arrayUnion(lawyerId) : arrayRemove(lawyerId),
      });
    } catch (error) {
      console.error("Error updating lawyers:", error);
    }
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Manage Lawyers</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {lawyers?.map((lawyer: any) => (
            <div
              key={lawyer.id}
              className="flex items-center justify-between p-2 border rounded"
            >
              <div className="flex items-center gap-3">
                <img
                  src={lawyer.profileImage}
                  alt={lawyer.full_name}
                  className="w-8 h-8 rounded-full"
                />
                <span>{lawyer.full_name}</span>
              </div>
              {selectedCase.assignedLawyers?.includes(lawyer.id) ? (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleLawyerUpdate(lawyer.id, "remove")}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  size="sm"
                  onClick={() => handleLawyerUpdate(lawyer.id, "add")}
                >
                  Add
                </Button>
              )}
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};
