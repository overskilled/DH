"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  ArrowRight,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Plus,
} from "lucide-react";

export default function HandoverSystem() {
  const [handovers, setHandovers] = useState([
    {
      id: "1",
      fromUserId: "1",
      fromUserName: "Sarah Williams",
      toUserId: "2",
      toUserName: "John Smith",
      caseId: "1",
      caseName: "TechCorp Contract Review",
      taskIds: ["1", "2"],
      notes:
        "Please review the contract amendments and prepare the final draft. Client meeting scheduled for Friday.",
      status: "pending",
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: "2",
      fromUserId: "3",
      fromUserName: "Emily Rodriguez",
      toUserId: "1",
      toUserName: "Sarah Williams",
      caseId: "2",
      caseName: "Johnson Estate Planning",
      taskIds: ["3"],
      notes:
        "Tax implications have been reviewed. Ready for final client consultation.",
      status: "accepted",
      createdAt: new Date(Date.now() - 172800000),
      completedAt: new Date(Date.now() - 86400000),
    },
    {
      id: "3",
      fromUserId: "2",
      fromUserName: "John Smith",
      toUserId: "4",
      toUserName: "Michael Brown",
      caseId: "3",
      caseName: "Global Industries Merger",
      taskIds: ["4", "5"],
      notes:
        "Due diligence completed. Please handle the final documentation and filing.",
      status: "rejected",
      createdAt: new Date(Date.now() - 259200000),
    },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newHandover, setNewHandover] = useState({
    toUserId: "",
    caseId: "",
    taskIds: [],
    notes: "",
  });

  // Mock data
  const users = [
    {
      id: "1",
      name: "Sarah Williams",
      role: "Senior Lawyer",
      department: "Litigation",
    },
    { id: "2", name: "John Smith", role: "Associate", department: "Corporate" },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Tax Specialist",
      department: "Tax",
    },
    {
      id: "4",
      name: "Michael Brown",
      role: "Paralegal",
      department: "General",
    },
  ];

  const cases = [
    { id: "1", name: "TechCorp Contract Review", status: "active" },
    { id: "2", name: "Johnson Estate Planning", status: "active" },
    { id: "3", name: "Global Industries Merger", status: "active" },
  ];

  const tasks = [
    { id: "1", title: "Review contract amendments", caseId: "1" },
    { id: "2", title: "Prepare final draft", caseId: "1" },
    { id: "3", title: "Client consultation", caseId: "2" },
    { id: "4", title: "Final documentation", caseId: "3" },
    { id: "5", title: "File with authorities", caseId: "3" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "accepted":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
        return <Clock className="h-4 w-4" />;
      case "accepted":
        return <CheckCircle className="h-4 w-4" />;
      case "rejected":
        return <XCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const handleCreateHandover = () => {
    const handover = {
      id: Date.now().toString(),
      fromUserId: "current-user",
      fromUserName: "Current User",
      toUserId: newHandover.toUserId,
      toUserName: users.find((u) => u.id === newHandover.toUserId)?.name || "",
      caseId: newHandover.caseId,
      caseName: cases.find((c) => c.id === newHandover.caseId)?.name || "",
      taskIds: newHandover.taskIds,
      notes: newHandover.notes,
      status: "pending",
      createdAt: new Date(),
    };

    setHandovers((prev) => [handover, ...prev]);
    setNewHandover({ toUserId: "", caseId: "", taskIds: [], notes: "" });
    setIsCreateOpen(false);
  };

  const handleHandoverAction = (
    handoverId: string,
    action: "accept" | "reject"
  ) => {
    setHandovers((prev) =>
      prev.map((handover) =>
        handover.id === handoverId
          ? {
              ...handover,
              status: action === "accept" ? "accepted" : "rejected",
              completedAt: new Date(),
            }
          : handover
      )
    );
  };

  const pendingHandovers = handovers.filter((h) => h.status === "pending");
  const completedHandovers = handovers.filter((h) => h.status !== "pending");

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Handover System</h1>
          <p className="text-gray-600">
            Transfer cases and tasks between team members
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Handover
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Handover</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="toUser">Transfer To</Label>
                <Select
                  value={newHandover.toUserId}
                  onValueChange={(value) =>
                    setNewHandover((prev) => ({ ...prev, toUserId: value }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select team member" />
                  </SelectTrigger>
                  <SelectContent>
                    {users.map((user) => (
                      <SelectItem key={user.id} value={user.id}>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-6 w-6">
                            <AvatarFallback className="text-xs">
                              {user.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.role}</p>
                          </div>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="case">Case</Label>
                <Select
                  value={newHandover.caseId}
                  onValueChange={(value) =>
                    setNewHandover((prev) => ({
                      ...prev,
                      caseId: value,
                      taskIds: [],
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select case" />
                  </SelectTrigger>
                  <SelectContent>
                    {cases.map((case_) => (
                      <SelectItem key={case_.id} value={case_.id}>
                        {case_.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {newHandover.caseId && (
                <div>
                  <Label>Tasks to Transfer</Label>
                  <div className="space-y-2 mt-2">
                    {tasks
                      .filter((task) => task.caseId === newHandover.caseId)
                      .map((task) => (
                        <div
                          key={task.id}
                          className="flex items-center space-x-2"
                        >
                          <input
                            type="checkbox"
                            id={task.id}
                            checked={true}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setNewHandover((prev: any) => ({
                                  ...prev,
                                  taskIds: [...prev.taskIds, task.id],
                                }));
                              } else {
                                setNewHandover((prev) => ({
                                  ...prev,
                                  taskIds: prev.taskIds.filter(
                                    (id) => id !== task.id
                                  ),
                                }));
                              }
                            }}
                          />
                          <Label htmlFor={task.id} className="text-sm">
                            {task.title}
                          </Label>
                        </div>
                      ))}
                  </div>
                </div>
              )}

              <div>
                <Label htmlFor="notes">Handover Notes</Label>
                <Textarea
                  id="notes"
                  value={newHandover.notes}
                  onChange={(e) =>
                    setNewHandover((prev) => ({
                      ...prev,
                      notes: e.target.value,
                    }))
                  }
                  placeholder="Provide context and instructions for the handover..."
                  rows={4}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsCreateOpen(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleCreateHandover}>Create Handover</Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Handovers
            </CardTitle>
            <Clock className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {pendingHandovers.length}
            </div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Completed Today
            </CardTitle>
            <CheckCircle className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {
                completedHandovers.filter(
                  (h) =>
                    h.completedAt &&
                    h.completedAt > new Date(Date.now() - 86400000)
                ).length
              }
            </div>
            <p className="text-xs text-muted-foreground">Handovers processed</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <ArrowRight className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">85%</div>
            <p className="text-xs text-muted-foreground">Acceptance rate</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingHandovers.length})
          </TabsTrigger>
          <TabsTrigger value="completed">
            Completed ({completedHandovers.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingHandovers.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium mb-2">
                  No Pending Handovers
                </h3>
                <p className="text-gray-600">
                  All handovers have been processed
                </p>
              </CardContent>
            </Card>
          ) : (
            pendingHandovers.map((handover) => (
              <Card key={handover.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {handover.fromUserName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <ArrowRight className="h-4 w-4 text-gray-400" />
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {handover.toUserName
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {handover.fromUserName} → {handover.toUserName}
                          </p>
                          <p className="text-sm text-gray-600">
                            {handover.caseName}
                          </p>
                        </div>
                      </div>

                      <div className="mb-3">
                        <p className="text-sm text-gray-700">
                          {handover.notes}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 mb-3">
                        <Badge className={getStatusColor(handover.status)}>
                          {getStatusIcon(handover.status)}
                          <span className="ml-1 capitalize">
                            {handover.status}
                          </span>
                        </Badge>
                        <span className="text-sm text-gray-500">
                          {handover.taskIds.length} task
                          {handover.taskIds.length !== 1 ? "s" : ""}
                        </span>
                        <span className="text-sm text-gray-500">
                          Created {handover.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          handleHandoverAction(handover.id, "reject")
                        }
                      >
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() =>
                          handleHandoverAction(handover.id, "accept")
                        }
                      >
                        Accept
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          {completedHandovers.map((handover) => (
            <Card key={handover.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {handover.fromUserName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <ArrowRight className="h-4 w-4 text-gray-400" />
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>
                          {handover.toUserName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">
                          {handover.fromUserName} → {handover.toUserName}
                        </p>
                        <p className="text-sm text-gray-600">
                          {handover.caseName}
                        </p>
                      </div>
                    </div>

                    <div className="mb-3">
                      <p className="text-sm text-gray-700">{handover.notes}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(handover.status)}>
                        {getStatusIcon(handover.status)}
                        <span className="ml-1 capitalize">
                          {handover.status}
                        </span>
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {handover.taskIds.length} task
                        {handover.taskIds.length !== 1 ? "s" : ""}
                      </span>
                      <span className="text-sm text-gray-500">
                        {handover.completedAt?.toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
