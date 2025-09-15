import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Loader2, Trash2 } from "lucide-react";
import { deleteFirestoreDocument } from "@/functions/delete-a-document";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DeleteDialogProps {
  onOpen: boolean;
  element: any;
  table: any; // Replace with your table type
  setElement: React.Dispatch<React.SetStateAction<any>>;
}

export function DeleteDialog({
  onOpen,
  element,
  table,
  setElement,
}: DeleteDialogProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const handleDelete = async () => {
    try {
      setLoading(true);

      await deleteFirestoreDocument(`${table}s`, element.id);
      toast.success(`${table} successfully deleted`, {
        description: `The ${table} ${
          element.fullName || element.full_name || element.caseName
        } has been successfully deleted`,
      });
      setElement(false);
      router.push(`/dashboard/${table}s`);
    } catch (error) {
      console.error("Delete failed:", error);
      toast.success(`An error occured`, {
        description: `An error was encountered while deleting, please try again`,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log(element);
  }, [element]);

  return (
    <AlertDialog open={onOpen}>
      {/* <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="hover:bg-red-50 hover:text-red-600 p-2"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger> */}

      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <div className="flex items-center gap-3">
            <div className="bg-red-100 p-2 rounded-full">
              <Trash2 className="h-6 w-6 text-red-600" />
            </div>
            <AlertDialogTitle className="text-left">
              Confirm Deletion
            </AlertDialogTitle>
          </div>
        </AlertDialogHeader>

        <AlertDialogDescription className="text-left pl-4">
          Are you sure you want to delete the {table}{" "}
          {element?.fullName || element?.full_name || element?.caseName} ? This
          action cannot be undone.
        </AlertDialogDescription>

        <AlertDialogFooter className="sm:justify-start pt-4">
          <div className="flex gap-3 w-full">
            <AlertDialogCancel
              onClick={() => setElement(false)}
              className="mt-0 w-full"
            >
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="w-full flex gap-3 bg-red-600 hover:bg-red-700"
            >
              {loading && <Loader2 className="animate-spin" />}
              {loading ? "Deleting..." : "Confirm Delete"}
            </AlertDialogAction>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
