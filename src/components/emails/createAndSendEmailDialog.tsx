"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "../context/auth-context";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { addToCollection } from "@/functions/add-to-collection";
export const CreateAndSendEmailDialog = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
}) => {
  const { clients } = useAuth();
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const editor = useEditor({
    extensions: [StarterKit, Underline, Link],
    content: "<p>Compose your email message here...</p>",
  });

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setAttachments((prev) => [...prev, ...files]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index));
  };

  const convertAttachments = async (files: File[]) => {
    return Promise.all(
      files.map(async (file) => {
        const buffer = await file.arrayBuffer();
        return {
          content: Buffer.from(buffer).toString("base64"),
          filename: file.name,
        };
      })
    );
  };

  const sendEmail = async () => {
    if (!subject || !recipient || !editor?.getHTML()) {
      setError("Please fill all required fields");
      return;
    }

    setIsSending(true);
    setError("");

    try {
      const convertedAttachments = await convertAttachments(attachments);

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          to: recipient,
          subject,
          html: editor.getHTML(),
          attachments: convertedAttachments,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || "Failed to send email");
      }

      await addToCollection("emails", {
        recipientEmail: recipient,
        content: editor.getHTML(),
        subject,
        status: "sent",
      });

      setOpened(false);
      setRecipient("");
      setSubject("");
      editor.commands.clearContent();
      setAttachments([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to send email");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogContent className="max-w-[90vw] h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-800">
            Create Email
          </DialogTitle>
          <p className="text-gray-600 mt-1">
            Compose and send professional emails to your clients
          </p>
        </DialogHeader>

        <div className="grid grid-cols-3 gap-8">
          <div className="col-span-2">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Recipient
                </label>
                <div className="relative">
                  <Select value={recipient} onValueChange={setRecipient}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a client or enter email address" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client: any) => (
                        <SelectItem key={client.id} value={client.email}>
                          {client.fullName} - {client.email}
                        </SelectItem>
                      ))}
                      <SelectItem value="new">
                        Enter new email address
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {recipient === "new" && (
                  <input
                    type="email"
                    placeholder="Enter email address"
                    className="mt-2 w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                  />
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <div className="border border-gray-300 rounded-lg overflow-hidden">
                  <div className="bg-gray-50 p-2 border-b border-gray-300 flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => editor?.chain().focus().toggleBold().run()}
                      className={editor?.isActive("bold") ? "bg-gray-200" : ""}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M12.316 7.051c0-2.759-2.242-5.001-5.001-5.001H3.984v16h4.331c2.759 0 5.001-2.242 5.001-5.001 0-1.812-1.209-3.333-2.866-3.999 1.657-.666 2.866-2.187 2.866-3.999zM7.542 17.051H4.984v-6h2.558c1.656 0 3.001 1.345 3.001 3.001s-1.345 2.999-3.001 2.999zm0-8h-2.558v-6h2.558c1.656 0 3.001 1.345 3.001 3.001s-1.345 2.999-3.001 2.999z" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        editor?.chain().focus().toggleItalic().run()
                      }
                      className={
                        editor?.isActive("italic") ? "bg-gray-200" : ""
                      }
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M14.407 3.501v1.5h-2.32l-2.31 10h2.114v1.5h-7.302v-1.5h2.327l2.303-10h-2.12v-1.5h7.308z" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        editor?.chain().focus().toggleUnderline().run()
                      }
                      className={
                        editor?.isActive("underline") ? "bg-gray-200" : ""
                      }
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 15.154c3.944 0 7.145-2.942 7.145-6.572V3.691h-2.452v4.891c0 2.416-2.157 4.121-4.693 4.121-2.535 0-4.692-1.705-4.692-4.121V3.691H2.856v4.891c0 3.63 3.201 6.572 7.144 6.572zM3.856 17.5v-1.5h12.288v1.5H3.856z" />
                      </svg>
                    </Button>
                    <div className="h-6 border-r border-gray-300 mx-1"></div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        editor?.chain().focus().toggleBulletList().run()
                      }
                      className={
                        editor?.isActive("bulletList") ? "bg-gray-200" : ""
                      }
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M4 5.5A1.5 1.5 0 115.5 7 1.5 1.5 0 014 5.5zM4 11.5A1.5 1.5 0 115.5 13 1.5 1.5 0 014 11.5zM4 17.5A1.5 1.5 0 115.5 19 1.5 1.5 0 014 17.5zM8 6h9v1H8V6zM8 12h9v1H8v-1zM8 18h9v1H8v-1z" />
                      </svg>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const url = prompt("Enter URL");
                        if (url)
                          editor?.chain().focus().setLink({ href: url }).run();
                      }}
                      className={editor?.isActive("link") ? "bg-gray-200" : ""}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" />
                      </svg>
                    </Button>
                  </div>
                  <EditorContent
                    editor={editor}
                    className="w-full p-4 outline-none min-h-[300px] prose max-w-none"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button
                  onClick={sendEmail}
                  disabled={isSending}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 transition-all duration-200 shadow-md disabled:opacity-50"
                >
                  {isSending ? "Sending..." : "Send Email"}
                </Button>
                <Button variant="outline" className="px-6 py-3">
                  Save as Draft
                </Button>
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </div>

          <div className="col-span-1 space-y-6">
            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-medium text-lg mb-4">Email Templates</h3>
              <ul className="space-y-2">
                {[
                  "Case Update",
                  "Invoice",
                  "Appointment",
                  "Legal Notice",
                  "General",
                ].map((template) => (
                  <li key={template}>
                    <Button variant="ghost" className="w-full justify-start">
                      <span className="material-symbols-outlined mr-2 text-blue-600">
                        description
                      </span>
                      {template} Template
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
              <h3 className="font-medium text-lg mb-4">Attachments</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  id="file-upload"
                />
                <label htmlFor="file-upload" className="cursor-pointer block">
                  <span className="material-symbols-outlined text-5xl text-gray-400">
                    cloud_upload
                  </span>
                  <p className="text-gray-600 mb-4">
                    Drag and drop files here or
                  </p>
                  <Button variant="default" className="px-4 py-2">
                    Browse Files
                  </Button>
                  <p className="text-xs text-gray-500 mt-2">
                    Max file size: 25MB
                  </p>
                </label>
              </div>
              <div className="mt-4">
                {attachments.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200 mb-2 group hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center">
                      <span className="material-symbols-outlined mr-2 text-red-500">
                        {file.type.startsWith("image/")
                          ? "image"
                          : "description"}
                      </span>
                      <span className="text-sm truncate">{file.name}</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeAttachment(index)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100"
                    >
                      <span className="material-symbols-outlined">close</span>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
