import { addToSubCollection } from "@/functions/add-to-a-sub-collection";
import { useState } from "react";
import { useAuth } from "../context/auth-context";
import { Loader2 } from "lucide-react";
export const CaseNotesAndComments = ({
  notes,
  emails,
  caseId,
}: {
  notes: any[];
  emails: any[];
  caseId: string;
}) => {
  const [activeTab, setActiveTab] = useState<"notes" | "communications">(
    "notes"
  );
  const [newNote, setNewNote] = useState("");
  const { userInfo } = useAuth();
  const [loading, setLoading] = useState(false);
  const addCaseNote = async () => {
    console.log(userInfo);
    if (!newNote.trim() || !userInfo) return;

    try {
      setLoading(true);
      const docRef = await addToSubCollection(
        {
          content: newNote,
          createdBy: {
            id: userInfo.id,
            role: userInfo.role,
            name: userInfo.name,
          },
        },
        "cases",
        caseId as string,
        "notes"
      );
      setLoading(false);
      setNewNote("");
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4 border-b pb-3">
        Case Notes & Comments
      </h2>

      <div className="flex gap-4 mb-4">
        <button
          className={`bg-blue-600 text-white px-4 py-2 rounded-md flex-1 hover:bg-blue-700 transition ${
            activeTab === "notes"
              ? ""
              : "bg-gray-200 text-gray-700 hover:bg-gray-300"
          }`}
          onClick={() => setActiveTab("notes")}
        >
          Internal Notes
        </button>
        <button
          className={`bg-gray-200 text-gray-700 px-4 py-2 rounded-md flex-1 hover:bg-gray-300 transition ${
            activeTab === "communications"
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : ""
          }`}
          onClick={() => setActiveTab("communications")}
        >
          Client Communications
        </button>
      </div>

      <div className="space-y-4 max-h-[250px] overflow-y-auto pr-2">
        {activeTab === "notes"
          ? notes.map((note) => (
              <div key={note.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    {/* <img
                      className="w-8 h-8 rounded-full mr-2"
                      src={
                        note.createdBy?.profileImage ||
                        "https://randomuser.me/api/portraits/women/12.jpg"
                      }
                      alt="lawyer"
                    /> */}
                    <span className="font-medium">
                      {note.createdBy?.name || "Unknown User"}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {note.createdAt?.toDate().toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{note.content}</p>
                <div className="flex gap-2 text-sm">
                  <button className="text-blue-600 hover:text-blue-800 transition">
                    Reply
                  </button>
                  <button className="text-gray-500 hover:text-gray-700 transition">
                    Edit
                  </button>
                </div>
              </div>
            ))
          : emails.map((email) => (
              <div key={email.id} className="bg-gray-50 p-4 rounded-lg">
                <div className="flex justify-between mb-2">
                  <div className="flex items-center">
                    <span className="material-symbols-outlined mr-2">mail</span>
                    <span className="font-medium">{email.subject}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {email.sentAt?.toDate().toLocaleDateString()}
                  </span>
                </div>
                <p className="text-gray-700 mb-2">{email.body}</p>
                <div className="text-sm text-gray-500">
                  To: {email.recipient}
                </div>
              </div>
            ))}
      </div>

      {/* Original Note Input Section */}
      <div className="mt-4 relative">
        <textarea
          className="w-full border rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          placeholder="Add a note or comment..."
          value={newNote}
          onChange={(e) => setNewNote(e.target.value)}
        ></textarea>
        <button
          className="absolute right-3 bottom-3 text-blue-600 hover:text-blue-800 transition"
          onClick={addCaseNote}
          disabled={loading}
        >
          {loading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <span className="material-symbols-outlined">send</span>
          )}
        </button>
      </div>
    </div>
  );
};
