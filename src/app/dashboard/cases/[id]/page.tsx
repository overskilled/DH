// "use client";


// import { listenToSubCollection } from "@/functions/get-a-sub-collection";
// import { useParams, useRouter } from "next/navigation";
// import { useState, useEffect } from "react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { DeleteDialog } from "@/components/deleteDialog";
// import { Timestamp, addDoc, collection } from "firebase/firestore";

// import { db, storage } from "@/functions/firebase";
// import { LawyersBox } from "@/components/caseDetailPage/lawyersBox";
// import { CaseNotesAndComments } from "@/components/caseDetailPage/caseNotesAndComments";
// import CaseFilesBox from "@/components/caseDetailPage/caseFilesBox";
// import { UploadFileDialog } from "@/components/caseDetailPage/uploadFileDialog";
// import { useAuth } from "@/components/context/auth-context";

// export default function Page() {
//   const router = useRouter();
//   const { id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [selectedCase, setSelectedCase] = useState<any>({});
//   const [assignedLawyers, setAssignedLawyers] = useState<any[]>([]);
//   const [client, setClient] = useState<any>({});
//   const { clients, cases, lawyers } = useAuth();
//   const [notes, setNotes] = useState<any[]>([]);
//   const [timeline, setTimeline] = useState<any[]>([]);
//   const [emails, setEmails] = useState<any[]>([]);
//   const [selectedFiles, setSelectedFiles] = useState<File[] | null>(null);
//   const [showUploadDialog, setShowUploadDialog] = useState(false);
//   const [isDeleteOpen, setIsDeleteOpen] = useState(false);

//   useEffect(() => {
//     if (!id || !cases) return;
//     async function getDatas() {
//       setLoading(true);
//       const caseData = cases.find((c: any) => c.id === id);

//       setSelectedCase(caseData);
//       setClient(clients?.find((c: any) => c.id === caseData.selectedClient.id));
//       setAssignedLawyers(
//         lawyers?.filter((l: any) => caseData.assignedLawyers?.includes(l.id)) ||
//           []
//       );

//       const unsubscribeNotes = listenToSubCollection(
//         "cases",
//         id as string,
//         "notes",
//         setNotes
//       );

//       const unsubscribeTimeline = listenToSubCollection(
//         "cases",
//         id as string,
//         "notes",
//         setTimeline
//       );

//       setLoading(false);

//       return () => {
//         if (unsubscribeNotes) unsubscribeNotes();
//         if (unsubscribeTimeline) unsubscribeTimeline();
//       };
//     }

//     getDatas();
//   }, [id, cases, clients, lawyers, router]);

//   const addTimelineEvent = async (event: {
//     title: string;
//     description: string;
//     date: Date;
//   }) => {
//     try {
//       const docRef = await addDoc(
//         collection(db, "cases", id as string, "timeline"),
//         {
//           ...event,
//           createdAt: Timestamp.now(),
//           createdBy: "currentUserID",
//         }
//       );
//       setTimeline((prev) => [...prev, { id: docRef.id, ...event }]);
//     } catch (error) {
//       console.error("Error adding timeline event:", error);
//     }
//   };

//   if (loading || !selectedCase) {
//     return (
//       <div className="w-full bg-gray-50 font-sans p-4 md:p-6 lg:p-8">
//         <header className="bg-white shadow-md p-6 rounded-lg mb-6">
//           <div className="flex justify-between items-center">
//             <Skeleton className="h-8 w-[200px]" />
//             <div className="flex gap-3">
//               <Skeleton className="h-10 w-24" />
//               <Skeleton className="h-10 w-24" />
//             </div>
//           </div>
//         </header>

//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//           <div className="col-span-1 md:col-span-2">
//             <Skeleton className="h-64 w-full rounded-lg" />
//             <Skeleton className="h-96 w-full rounded-lg" />
//           </div>
//           <div className="space-y-6">
//             <Skeleton className="h-64 w-full rounded-lg" />
//             <Skeleton className="h-64 w-full rounded-lg" />
//           </div>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//           <Skeleton className="h-96 w-full rounded-lg" />
//           <Skeleton className="h-96 w-full rounded-lg" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="w-full bg-gray-50 font-sans p-4 md:p-6 lg:p-8">
//       <header className="bg-white shadow-md p-6 rounded-lg mb-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold text-gray-800">
//               {selectedCase?.caseName}
//             </h1>
//             <nav className="text-sm text-gray-500 flex items-center gap-2 mt-1">
//               <span className="hover:text-blue-600 transition cursor-pointer">
//                 Dashboard
//               </span>
//               <span className="material-symbols-outlined text-xs">
//                 chevron_right
//               </span>
//               <span className="hover:text-blue-600 transition cursor-pointer">
//                 Cases
//               </span>
//               <span className="material-symbols-outlined text-xs">
//                 chevron_right
//               </span>
//               <span className="text-gray-700">{selectedCase?.caseName}</span>
//             </nav>
//           </div>
//           <div className="flex gap-3">
//             <button
//               onClick={() => router.push(`/dashboard/cases/${id}/edit`)}
//               className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition flex items-center gap-1"
//             >
//               <span className="material-symbols-outlined text-sm">edit</span>
//               Edit Case
//             </button>
//             <button
//               onClick={() => setIsDeleteOpen(true)}
//               className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center gap-1"
//             >
//               <span className="material-symbols-outlined text-sm">delete</span>
//               Delete Case
//             </button>
//             <button className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-800 transition flex items-center gap-1">
//               <span className="material-symbols-outlined text-sm">
//                 download
//               </span>
//               Download Files
//             </button>
//             <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-1">
//               <span className="material-symbols-outlined text-sm">mail</span>
//               Email Client
//             </button>
//           </div>
//         </div>
//       </header>
//       <DeleteDialog
//         onOpen={isDeleteOpen}
//         setElement={setIsDeleteOpen}
//         table={"case"}
//         element={selectedCase}
//       />

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
//         <div className="col-span-1 md:col-span-2">
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4 border-b pb-3">
//               Case Overview
//             </h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <p className="text-gray-500 text-sm mb-1">Case Type</p>
//                 <p className="font-medium flex items-center">
//                   <span className="material-symbols-outlined mr-2 text-blue-600">
//                     gavel
//                   </span>
//                   {selectedCase?.caseType}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 text-sm mb-1">Status</p>
//                 <p className="font-medium">
//                   <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold capitalize">
//                     {selectedCase?.caseStatus}
//                   </span>
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 text-sm mb-1">Documents</p>
//                 <p className="font-medium flex items-center">
//                   <span className="material-symbols-outlined mr-2 text-blue-600">
//                     folder
//                   </span>
//                   {selectedCase?.files?.length ?? 0} Files
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 text-sm mb-1">Start Date</p>
//                 <p className="font-medium">
//                   {selectedCase?.createdAt
//                     ?.toDate()
//                     .toLocaleDateString("en-US", {
//                       month: "long",
//                       day: "2-digit",
//                       year: "numeric",
//                     })}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 text-sm mb-1">
//                   Expected Completion
//                 </p>
//                 <p className="font-medium">
//                   {selectedCase?.deadline &&
//                     new Date(selectedCase.deadline).toLocaleDateString(
//                       "en-US",
//                       {
//                         month: "long",
//                         day: "2-digit",
//                         year: "numeric",
//                       }
//                     )}
//                 </p>
//               </div>
//               <div>
//                 <p className="text-gray-500 text-sm mb-1">Assigned Lawyers</p>
//                 <div className="flex -space-x-2 mt-1">
//                   {assignedLawyers.map((lawyer: any) => (
//                     <img
//                       className="w-8 h-8 rounded-full border-2 border-white hover:z-10 hover:scale-110 transition"
//                       src={lawyer.profileImage}
//                       alt={lawyer.full_name}
//                       key={lawyer.id}
//                     />
//                   ))}
//                   {assignedLawyers?.length > 3 && (
//                     <div className="w-8 h-8 rounded-full bg-blue-100 border-2 border-white flex items-center justify-center text-blue-600 text-xs font-bold hover:bg-blue-200 transition cursor-pointer">
//                       {assignedLawyers?.length - 3}
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4 border-b pb-3">
//               Case Progress & Timeline
//             </h2>
//             <div className="relative">
//               <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200"></div>

//               <div className="relative pl-10 pb-8">
//                 <div className="absolute left-0 top-1 bg-green-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md transform hover:scale-110 transition">
//                   <span className="material-symbols-outlined text-white text-sm">
//                     check
//                   </span>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition">
//                   <div className="flex justify-between mb-2">
//                     <h4 className="font-semibold">Initial Case Filing</h4>
//                     <span className="text-sm text-gray-500">
//                       May 3, 2023 • 9:30 AM
//                     </span>
//                   </div>
//                   <p className="text-gray-600 mb-2">
//                     Submitted initial court documents for the copyright
//                     infringement claim against Johnson Inc.
//                   </p>
//                   <div className="flex items-center text-sm text-gray-500">
//                     <img
//                       className="w-6 h-6 rounded-full mr-2"
//                       src="https://randomuser.me/api/portraits/women/12.jpg"
//                       alt="Lawyer"
//                     />
//                     <span>Sarah Williams, Lead lawyer</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="relative pl-10 pb-8">
//                 <div className="absolute left-0 top-1 bg-blue-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md transform hover:scale-110 transition">
//                   <span className="material-symbols-outlined text-white text-sm">
//                     people
//                   </span>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition">
//                   <div className="flex justify-between mb-2">
//                     <h4 className="font-semibold">Client Meeting</h4>
//                     <span className="text-sm text-gray-500">
//                       June 12, 2023 • 2:15 PM
//                     </span>
//                   </div>
//                   <p className="text-gray-600 mb-2">
//                     Met with client to review strategy and gather additional
//                     evidence for the case.
//                   </p>
//                   <div className="flex items-center text-sm text-gray-500">
//                     <img
//                       className="w-6 h-6 rounded-full mr-2"
//                       src="https://randomuser.me/api/portraits/men/32.jpg"
//                       alt="Lawyer"
//                     />
//                     <span>Robert Chen, Associate lawyer</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="relative pl-10">
//                 <div className="absolute left-0 top-1 bg-yellow-500 rounded-full w-6 h-6 flex items-center justify-center shadow-md transform hover:scale-110 transition">
//                   <span className="material-symbols-outlined text-white text-sm">
//                     description
//                   </span>
//                 </div>
//                 <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition">
//                   <div className="flex justify-between mb-2">
//                     <h4 className="font-semibold">Document Discovery</h4>
//                     <span className="text-sm text-gray-500">
//                       July 30, 2023 • 11:45 AM
//                     </span>
//                   </div>
//                   <p className="text-gray-600 mb-2">
//                     Received and analyzed documents from opposing counsel.
//                     Identified key evidence supporting our position.
//                   </p>
//                   <div className="flex items-center text-sm text-gray-500">
//                     <img
//                       className="w-6 h-6 rounded-full mr-2"
//                       src="https://randomuser.me/api/portraits/women/45.jpg"
//                       alt="Lawyer"
//                     />
//                     <span>Emily Rodriguez, Paralegal</span>
//                   </div>
//                 </div>
//               </div>

//               <button className="mt-4 text-blue-600 flex items-center hover:text-blue-800 transition">
//                 <span className="material-symbols-outlined mr-1">add</span>
//                 Add Timeline Entry
//               </button>
//             </div>
//           </div>
//         </div>

//         <div className="col-span-1">
//           <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//             <h2 className="text-xl font-semibold mb-4 border-b pb-3">
//               Client Information
//             </h2>
//             <div className="flex items-center mb-4">
//               <img
//                 className="w-16 h-16 rounded-full mr-4"
//                 src="https://randomuser.me/api/portraits/men/76.jpg"
//                 alt="Client"
//               />
//               <div>
//                 <h3 className="font-semibold text-lg hover:text-blue-600 cursor-pointer transition">
//                   {client?.fullName}
//                 </h3>
//                 <p className="text-gray-500">{client?.clientType}</p>
//               </div>
//             </div>
//             <div className="space-y-3">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <span className="material-symbols-outlined text-gray-500 mr-2">
//                     call
//                   </span>
//                   <span>{client?.phone}</span>
//                 </div>
//                 <button className="text-blue-600 px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-50 transition">
//                   Call
//                 </button>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center">
//                   <span className="material-symbols-outlined text-gray-500 mr-2">
//                     mail
//                   </span>
//                   <span>{client?.email}</span>
//                 </div>
//                 <button className="text-blue-600 px-3 py-1 rounded-md border border-blue-600 hover:bg-blue-50 transition">
//                   Email
//                 </button>
//               </div>
//               {/* <div className="flex items-center">
//                 <span className="material-symbols-outlined text-gray-500 mr-2">
//                   business
//                 </span>
//                 <span>Smith Creative Studios</span>
//               </div> */}
//               <div className="flex items-center">
//                 <span className="material-symbols-outlined text-gray-500 mr-2">
//                   location_on
//                 </span>
//                 <span>
//                   {client?.zip} {client?.street}, {client?.city},{" "}
//                   {client?.country}
//                 </span>
//               </div>
//             </div>
//           </div>

//           <LawyersBox
//             selectedCase={selectedCase}
//             assignedLawyers={assignedLawyers}
//           />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
//         <CaseFilesBox
//           files={selectedCase?.files}
//           caseId={id as string}
//           setSelectedFiles={setSelectedFiles}
//           setShowUploadDialog={setShowUploadDialog}
//         />

//         <UploadFileDialog
//           opened={showUploadDialog}
//           setOpened={setShowUploadDialog}
//           selectedFiles={selectedFiles}
//           caseId={id as string}
//           setSelectedFiles={setSelectedFiles}
//           setShowUploadDialog={setShowUploadDialog}
//         />

//         <CaseNotesAndComments
//           caseId={id as string}
//           notes={notes}
//           emails={emails}
//         />
//       </div>

//       <div className="grid grid-cols-1 gap-6 mb-6">
//         <div className="bg-white rounded-lg shadow-md p-6">
//           <h2 className="text-xl font-semibold mb-4 border-b pb-3">
//             Invoices & Payments
//           </h2>

//           <div className="flex justify-between mb-4">
//             <div>
//               <span className="text-gray-500">Total Billed</span>
//               <p className="text-2xl font-bold">XAF24,750.00</p>
//             </div>
//             <div>
//               <span className="text-gray-500">Remaining Balance</span>
//               <p className="text-2xl font-bold text-red-600">XAF8,250.00</p>
//             </div>
//             <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition flex items-center gap-1">
//               <span className="material-symbols-outlined text-sm">add</span>
//               New Invoice
//             </button>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="min-w-full">
//               <thead>
//                 <tr className="bg-gray-50">
//                   <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Invoice #
//                   </th>
//                   <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Date
//                   </th>
//                   <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Amount
//                   </th>
//                   <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Status
//                   </th>
//                   <th className="py-2 px-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                     Actions
//                   </th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 <tr className="hover:bg-gray-50 transition">
//                   <td className="py-3 px-3 whitespace-nowrap text-blue-600 hover:text-blue-800 transition font-medium cursor-pointer">
//                     #INV-2023-0042
//                   </td>
//                   <td className="py-3 px-3 whitespace-nowrap">Aug 15, 2023</td>
//                   <td className="py-3 px-3 whitespace-nowrap font-medium">
//                     XAF5,500.00
//                   </td>
//                   <td className="py-3 px-3 whitespace-nowrap">
//                     <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-semibold">
//                       Pending
//                     </span>
//                   </td>
//                   <td className="py-3 px-3 whitespace-nowrap">
//                     <div className="flex gap-2">
//                       <button className="text-gray-500 hover:text-blue-600 transition">
//                         <span className="material-symbols-outlined">
//                           visibility
//                         </span>
//                       </button>
//                       <button className="text-gray-500 hover:text-blue-600 transition">
//                         <span className="material-symbols-outlined">
//                           download
//                         </span>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr className="hover:bg-gray-50 transition">
//                   <td className="py-3 px-3 whitespace-nowrap text-blue-600 hover:text-blue-800 transition font-medium cursor-pointer">
//                     #INV-2023-0036
//                   </td>
//                   <td className="py-3 px-3 whitespace-nowrap">July 12, 2023</td>
//                   <td className="py-3 px-3 whitespace-nowrap font-medium">
//                     XAF8,750.00
//                   </td>
//                   <td className="py-3 px-3 whitespace-nowrap">
//                     <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-semibold">
//                       Overdue
//                     </span>
//                   </td>
//                   <td className="py-3 px-3 whitespace-nowrap">
//                     <div className="flex gap-2">
//                       <button className="text-gray-500 hover:text-blue-600 transition">
//                         <span className="material-symbols-outlined">
//                           visibility
//                         </span>
//                       </button>
//                       <button className="text-gray-500 hover:text-blue-600 transition">
//                         <span className="material-symbols-outlined">
//                           download
//                         </span>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr className="hover:bg-gray-50 transition">
//                   <td className="py-3 px-3 whitespace-nowrap text-blue-600 hover:text-blue-800 transition font-medium cursor-pointer">
//                     #INV-2023-0028
//                   </td>
//                   <td className="py-3 px-3 whitespace-nowrap">June 8, 2023</td>
//                   <td className="py-3 px-3 whitespace-nowrap font-medium">
//                     XAF6,250.00
//                   </td>
//                   <td className="py-3 px-3 whitespace-nowrap">
//                     <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-semibold">
//                       Paid
//                     </span>
//                   </td>
//                   <td className="py-3 px-3 whitespace-nowrap">
//                     <div className="flex gap-2">
//                       <button className="text-gray-500 hover:text-blue-600 transition">
//                         <span className="material-symbols-outlined">
//                           visibility
//                         </span>
//                       </button>
//                       <button className="text-gray-500 hover:text-blue-600 transition">
//                         <span className="material-symbols-outlined">
//                           download
//                         </span>
//                       </button>
//                     </div>
//                   </td>
//                 </tr>
//                 <tr className="hover:bg-gray-50 transition">
//                   <td className="py-3 px-3 whitespace-nowrap text-blue-600 hover:text-blue-800 transition font-medium cursor-pointer">
//                     #INV-2023-0019
//                   </td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client"

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { useStore } from '@/hooks/useStore';
import { useAuth } from '@/hooks/useAuth';
import { KanbanBoard } from '@/components/KanbanBoard';
import { UserAvatar } from '@/components/UserAvatar';
import { StatusBadge } from '@/components/StatusBadge';
import { DepartmentBadge } from '@/components/DepartmentBadge';
import { SEED_USERS } from '@/lib/seed-data';
import { useParams, useRouter } from 'next/navigation';

const CaseDetail = () => {
  const params = useParams()
  const router = useRouter();
  const { user } = useAuth();
  const { getCaseById, getMilestonesByCaseId, getDossierById } = useStore();
  const [selectedMilestoneId, setSelectedMilestoneId] = useState<string | null>(null);

  const caseId = params.id as string;
  const caseData = getCaseById(caseId || '');
  const milestones = getMilestonesByCaseId(caseId || '');
  const dossier = caseData ? getDossierById(caseData.dossierId) : null;

  if (!caseData || !user) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">Case not found</p>
      </div>
    );
  }

  const budgetProgress = (caseData.spent / caseData.budget) * 100;
  const assignees = caseData.assignees
    .map(id => SEED_USERS.find(u => u.id === id))
    .filter(Boolean);

  const activeMilestone = selectedMilestoneId 
    ? milestones.find(m => m.id === selectedMilestoneId)
    : milestones[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <Button
          variant="ghost"
          onClick={() => router.push(`/dashboard/dossiers/${caseData.dossierId}`)}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Dossier
        </Button>

        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-4xl font-bold">{caseData.title}</h1>
              <StatusBadge status={caseData.status} type="dossier" />
            </div>
            <p className="text-muted-foreground">{caseData.description}</p>
          </div>
        </div>

        {/* Breadcrumb */}
        {dossier && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span
              className="hover:text-foreground cursor-pointer"
              onClick={() => router.push(`/dashboard/dossier/${dossier.id}`)}
            >
              {dossier.title}
            </span>
            <span>/</span>
            <span className="text-foreground font-medium">{caseData.title}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Case Info */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Case Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm text-muted-foreground mb-1">Budget Usage</div>
                <div className="text-2xl font-bold mb-2">{budgetProgress.toFixed(0)}%</div>
                {/* <Progress value={Math.min(budgetProgress, 100)} className="h-2" /> */}
                <div className="flex justify-between text-xs mt-1 text-muted-foreground">
                  <span>{caseData.spent.toLocaleString()} FCFA</span>
                  <span>{caseData.budget.toLocaleString()} FCFA</span>
                </div>
              </div>

              {dossier && (
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Department</div>
                  <DepartmentBadge departmentId={dossier.departmentId} />
                </div>
              )}

              <div>
                <div className="text-sm text-muted-foreground mb-2">Assignees</div>
                <div className="space-y-2">
                  {assignees.map((assignee) => (
                    assignee && (
                      <div key={assignee.id} className="flex items-center gap-2">
                        <UserAvatar user={assignee} size="sm" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium truncate">{`${assignee.firstName} ${assignee.lastName}`}</div>
                          <div className="text-xs text-muted-foreground">
                            {assignee.role.toUpperCase()}
                          </div>
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Milestones */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Milestones</CardTitle>
              <CardDescription>{milestones.length} total</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {milestones.map((milestone) => (
                  <motion.div
                    key={milestone.id}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedMilestoneId(milestone.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-all ${
                      activeMilestone?.id === milestone.id
                        ? 'bg-primary text-primary-foreground shadow-md'
                        : 'bg-muted hover:bg-muted/80'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate mb-1">
                          {milestone.title}
                        </h4>
                        <p className={`text-xs line-clamp-2 ${
                          activeMilestone?.id === milestone.id
                            ? 'text-primary-foreground/80'
                            : 'text-muted-foreground'
                        }`}>
                          {milestone.description}
                        </p>
                      </div>
                      {milestone.completed && (
                        <div className={`text-xs px-2 py-1 rounded ${
                          activeMilestone?.id === milestone.id
                            ? 'bg-primary-foreground/20 text-primary-foreground'
                            : 'bg-background'
                        }`}>
                          Done
                        </div>
                      )}
                    </div>
                    <div className={`text-xs mt-2 ${
                      activeMilestone?.id === milestone.id
                        ? 'text-primary-foreground/70'
                        : 'text-muted-foreground'
                    }`}>
                      Due: {new Date(milestone.dueDate).toLocaleDateString()}
                    </div>
                  </motion.div>
                ))}

                {milestones.length === 0 && (
                  <div className="text-center py-6 text-muted-foreground text-sm">
                    No milestones yet
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content - Kanban */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>
                    {activeMilestone ? activeMilestone.title : 'Select a Milestone'}
                  </CardTitle>
                  <CardDescription>
                    {activeMilestone ? 'Manage tasks with drag & drop' : 'Choose a milestone to view tasks'}
                  </CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="h-4 w-4" />
                  Add Task
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {activeMilestone ? (
                // <KanbanBoard milestoneId={activeMilestone.id} />
                <></>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  Select a milestone to view and manage tasks
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CaseDetail;
