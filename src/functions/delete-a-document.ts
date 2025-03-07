import { doc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function deleteFirestoreDocument(collectionName: string, docId: string) {
  try {
    const docRef = doc(db, collectionName, docId);
    await deleteDoc(docRef);
    console.log(`Document with ID ${docId} deleted successfully.`);
  } catch (error) {
    console.error("Error deleting document:", error);
    throw new Error("Failed to delete document");
  }
}