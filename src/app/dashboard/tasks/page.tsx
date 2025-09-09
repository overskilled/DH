"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
  Plus,
  Filter,
  Search,
  Calendar,
  Clock,
  AlertTriangle,
} from "lucide-react";

export default function TaskManagement() {
  const [tasks, setTasks] = useState([
    {
      id: "1",
      title: "Review contract amendments",
      description:
        "Review and analyze the proposed amendments to the TechCorp contract",
      assignedTo: ["1", "2"],
      caseId: "1",
      caseName: "TechCorp Contract Review",
      status: "started",
      priority: "high",
      isBillable: true,
      estimatedHours: 4,
      actualHours: 2.5,
      dueDate: new Date(Date.now() + 86400000),
      createdBy: "1",
      createdAt: new Date(Date.now() - 172800000),
    },
    {
      id: "2",
      title: "Prepare court documents",
      description:
        "Draft and prepare all necessary court documents for the Johnson case",
      assignedTo: ["3"],
      caseId: "2",
      caseName: "Johnson vs. Smith",
      status: "review",
      priority: "high",
      isBillable: true,
      estimatedHours: 6,
      actualHours: 5.5,
      dueDate: new Date(Date.now() + 172800000),
      createdBy: "2",
      createdAt: new Date(Date.now() - 259200000),
    },
    {
      id: "3",
      title: "Team meeting preparation",
      description: "Prepare agenda and materials for weekly team meeting",
      assignedTo: ["4"],
      caseId: null,
      caseName: null,
      status: "pending",
      priority: "medium",
      isBillable: false,
      estimatedHours: 1,
      actualHours: 0,
      dueDate: new Date(Date.now() + 86400000),
      createdBy: "1",
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: "4",
      title: "Client consultation follow-up",
      description: "Follow up with client regarding estate planning decisions",
      assignedTo: ["2"],
      caseId: "3",
      caseName: "Estate Planning - Rodriguez",
      status: "blocked",
      priority: "medium",
      isBillable: true,
      estimatedHours: 2,
      actualHours: 0,
      dueDate: new Date(Date.now() + 259200000),
      createdBy: "3",
      createdAt: new Date(Date.now() - 345600000),
    },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    assignee: "all",
    billable: "all",
  });
  const [searchTerm, setSearchTerm] = useState("");

  const users = [
    { id: "1", name: "Sarah Williams", role: "Senior Lawyer" },
    { id: "2", name: "John Smith", role: "Associate" },
    { id: "3", name: "Emily Rodriguez", role: "Paralegal" },
    { id: "4", name: "Michael Brown", role: "Assistant" },
  ];

  const cases = [
    { id: "1", name: "TechCorp Contract Review" },
    { id: "2", name: "Johnson vs. Smith" },
    { id: "3", name: "Estate Planning - Rodriguez" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-100 text-gray-800";
      case "started":
        return "bg-blue-100 text-blue-800";
      case "review":
        return "bg-purple-100 text-purple-800";
      case "validation":
        return "bg-orange-100 text-orange-800";
      case "done":
        return "bg-green-100 text-green-800";
      case "blocked":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filters.status === "all" || task.status === filters.status;
    const matchesPriority =
      filters.priority === "all" || task.priority === filters.priority;
    const matchesAssignee =
      filters.assignee === "all" || task.assignedTo.includes(filters.assignee);
    const matchesBillable =
      filters.billable === "all" ||
      (filters.billable === "billable" && task.isBillable) ||
      (filters.billable === "non-billable" && !task.isBillable);

    return (
      matchesSearch &&
      matchesStatus &&
      matchesPriority &&
      matchesAssignee &&
      matchesBillable
    );
  });

  const tasksByStatus = {
    pending: filteredTasks.filter((t) => t.status === "pending"),
    started: filteredTasks.filter((t) => t.status === "started"),
    review: filteredTasks.filter((t) => t.status === "review"),
    validation: filteredTasks.filter((t) => t.status === "validation"),
    done: filteredTasks.filter((t) => t.status === "done"),
    blocked: filteredTasks.filter((t) => t.status === "blocked"),
  };

  const urgentTasks = filteredTasks.filter(
    (t) => t.priority === "high" && t.status !== "done"
  );
  const nonBillableTasks = filteredTasks.filter((t) => !t.isBillable);

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Task Management</h1>
          <p className="text-gray-600">
            Organize and track all tasks across cases
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Task
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Create New Task</DialogTitle>
            </DialogHeader>
            {/* Task creation form would go here */}
            <div className="space-y-4">
              <p className="text-gray-600">
                Task creation form implementation...
              </p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters and Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="search">Search Tasks</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  id="search"
                  placeholder="Search by title or description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div>
              <Label>Status</Label>
              <Select
                value={filters.status}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, status: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="started">Started</SelectItem>
                  <SelectItem value="review">Review</SelectItem>
                  <SelectItem value="validation">Validation</SelectItem>
                  <SelectItem value="done">Done</SelectItem>
                  <SelectItem value="blocked">Blocked</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select
                value={filters.priority}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, priority: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Assignee</Label>
              <Select
                value={filters.assignee}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, assignee: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Assignees</SelectItem>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Billing</Label>
              <Select
                value={filters.billable}
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, billable: value }))
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tasks</SelectItem>
                  <SelectItem value="billable">Billable</SelectItem>
                  <SelectItem value="non-billable">Non-billable</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="kanban" className="space-y-4">
        <TabsList>
          <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
          <TabsTrigger value="urgent">
            Urgent Tasks ({urgentTasks.length})
          </TabsTrigger>
          <TabsTrigger value="non-billable">
            Non-billable ({nonBillableTasks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="kanban" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {Object.entries(tasksByStatus).map(([status, statusTasks]) => (
              <Card key={status} className="min-h-[400px]">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium capitalize flex items-center justify-between">
                    {status}
                    <Badge variant="outline">{statusTasks.length}</Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {statusTasks.map((task) => (
                    <div
                      key={task.id}
                      className="p-3 border rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="space-y-2">
                        <h4 className="font-medium text-sm">{task.title}</h4>
                        <p className="text-xs text-gray-600 line-clamp-2">
                          {task.description}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          <Badge
                            className={getPriorityColor(task.priority)}
                            variant="outline"
                          >
                            {task.priority}
                          </Badge>
                          <Badge
                            variant={task.isBillable ? "default" : "secondary"}
                          >
                            {task.isBillable ? "Billable" : "Non-billable"}
                          </Badge>
                        </div>

                        {task.caseName && (
                          <p className="text-xs text-blue-600">
                            {task.caseName}
                          </p>
                        )}

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {task.actualHours}h / {task.estimatedHours}h
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {task.dueDate.toLocaleDateString()}
                          </div>
                        </div>

                        <div className="flex items-center gap-1">
                          {task.assignedTo.map((userId) => {
                            const user = users.find((u) => u.id === userId);
                            return (
                              <Avatar key={userId} className="h-6 w-6">
                                <AvatarFallback className="text-xs">
                                  {user?.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="urgent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-500" />
                Urgent Tasks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {urgentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        {task.caseName && (
                          <span className="text-sm text-blue-600">
                            {task.caseName}
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        Due: {task.dueDate.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {task.actualHours}h / {task.estimatedHours}h
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="non-billable" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Non-billable Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {nonBillableTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{task.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        {task.description}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <Badge className={getStatusColor(task.status)}>
                          {task.status}
                        </Badge>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                        <Badge variant="secondary">Non-billable</Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">
                        Due: {task.dueDate.toLocaleDateString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {task.actualHours}h / {task.estimatedHours}h
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
