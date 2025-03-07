import { db } from "./firebase";
import { collection, addDoc } from "firebase/firestore";

export const addToCollection = async (collectionName: string, data: any) => {
    try {
        const collectionRef = collection(db, collectionName);
        const docRef = await addDoc(collectionRef, data);
        console.log("Document successfully added with ID:", docRef.id);
        return docRef.id;
    } catch (error) {
        console.error("Error adding document:", error);
        return null;
    }
};
