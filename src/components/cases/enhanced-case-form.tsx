"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, Users, Calendar, FileText } from "lucide-react";

export function EnhancedCaseForm() {
  const [formData, setFormData] = useState<any>({
    caseName: "",
    caseType: "",
    department: "",
    priority: "medium",
    currentPhase: "research",
    selectedClient: null,
    assignedCollaborators: [],
    deadline: "",
    description: "",
    tasks: [],
  });

  const [newTask, setNewTask] = useState<any>({
    title: "",
    description: "",
    assignedTo: [],
    priority: "medium",
    isBillable: true,
    estimatedHours: "",
  });

  const departments = [
    { id: "1", name: "Litigation", color: "#ef4444" },
    { id: "2", name: "Corporate Law", color: "#3b82f6" },
    { id: "3", name: "Tax Law", color: "#10b981" },
    { id: "4", name: "Family Law", color: "#f59e0b" },
  ];

  const collaborators = [
    {
      id: "1",
      name: "Sarah Williams",
      role: "Senior Lawyer",
      department: "Litigation",
    },
    {
      id: "2",
      name: "John Smith",
      role: "Associate",
      department: "Corporate Law",
    },
    {
      id: "3",
      name: "Emily Rodriguez",
      role: "Paralegal",
      department: "Tax Law",
    },
    {
      id: "4",
      name: "Michael Brown",
      role: "Assistant",
      department: "Family Law",
    },
  ];

  const addTask = () => {
    if (newTask.title.trim()) {
      setFormData((prev: any) => ({
        ...prev,
        tasks: [...prev.tasks, { ...newTask, id: Date.now().toString() }],
      }));
      setNewTask({
        title: "",
        description: "",
        assignedTo: [],
        priority: "medium",
        isBillable: true,
        estimatedHours: "",
      });
    }
  };

  const removeTask = (taskId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      tasks: prev.tasks.filter((task: any) => task.id !== taskId),
    }));
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

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "research":
        return "bg-blue-100 text-blue-800";
      case "writing":
        return "bg-purple-100 text-purple-800";
      case "review":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Create New Case</h1>
          <p className="text-gray-600">
            Set up a new case with tasks and collaborators
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Create Case</Button>
        </div>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="collaborators">Team</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="timeline">Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="basic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Case Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="caseName">Case Name</Label>
                  <Input
                    id="caseName"
                    value={formData.caseName}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        caseName: e.target.value,
                      }))
                    }
                    placeholder="Enter case name"
                  />
                </div>
                <div>
                  <Label htmlFor="caseType">Case Type</Label>
                  <Select
                    value={formData.caseType}
                    onValueChange={(value) =>
                      setFormData((prev: any) => ({ ...prev, caseType: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select case type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="litigation">Litigation</SelectItem>
                      <SelectItem value="consulting">Consulting</SelectItem>
                      <SelectItem value="customs">Customs</SelectItem>
                      <SelectItem value="tax">Tax</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="department">Department</Label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        department: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      {departments.map((dept) => (
                        <SelectItem key={dept.id} value={dept.id}>
                          <div className="flex items-center gap-2">
                            <div
                              className="w-3 h-3 rounded-full"
                              style={{ backgroundColor: dept.color }}
                            />
                            {dept.name}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="priority">Priority Level</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) =>
                      setFormData((prev: any) => ({ ...prev, priority: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High Priority</SelectItem>
                      <SelectItem value="medium">Medium Priority</SelectItem>
                      <SelectItem value="low">Low Priority</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="currentPhase">Current Phase</Label>
                  <Select
                    value={formData.currentPhase}
                    onValueChange={(value) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        currentPhase: value,
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="research">Research</SelectItem>
                      <SelectItem value="writing">Writing</SelectItem>
                      <SelectItem value="review">Review</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="deadline">Deadline</Label>
                  <Input
                    id="deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        deadline: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="description">Case Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev: any) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Provide a detailed description of the case"
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collaborators" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Assign Team Members
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Available Collaborators</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
                  {collaborators.map((collaborator) => (
                    <div
                      key={collaborator.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        formData.assignedCollaborators.includes(collaborator.id)
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => {
                        setFormData((prev: any) => ({
                          ...prev,
                          assignedCollaborators:
                            prev.assignedCollaborators.includes(collaborator.id)
                              ? prev.assignedCollaborators.filter(
                                  (id: any) => id !== collaborator.id
                                )
                              : [
                                  ...prev.assignedCollaborators,
                                  collaborator.id,
                                ],
                        }));
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{collaborator.name}</h4>
                          <p className="text-sm text-gray-600">
                            {collaborator.role}
                          </p>
                        </div>
                        <Badge variant="outline">
                          {collaborator.department}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {formData.assignedCollaborators.length > 0 && (
                <div>
                  <Label>Selected Team Members</Label>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {formData.assignedCollaborators.map((id: any) => {
                      const collaborator = collaborators.find(
                        (c) => c.id === id
                      );
                      return (
                        <Badge
                          key={id}
                          variant="default"
                          className="flex items-center gap-1"
                        >
                          {collaborator?.name}
                          <X
                            className="h-3 w-3 cursor-pointer"
                            onClick={() => {
                              setFormData((prev: any) => ({
                                ...prev,
                                assignedCollaborators:
                                  prev.assignedCollaborators.filter(
                                    (cId: any) => cId !== id
                                  ),
                              }));
                            }}
                          />
                        </Badge>
                      );
                    })}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Case Tasks</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Add New Task Form */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-3">Add New Task</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="taskTitle">Task Title</Label>
                    <Input
                      id="taskTitle"
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask((prev: any) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                      placeholder="Enter task title"
                    />
                  </div>
                  <div>
                    <Label htmlFor="taskPriority">Priority</Label>
                    <Select
                      value={newTask.priority}
                      onValueChange={(value) =>
                        setNewTask((prev: any) => ({
                          ...prev,
                          priority: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="md:col-span-2">
                    <Label htmlFor="taskDescription">Description</Label>
                    <Textarea
                      id="taskDescription"
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask((prev: any) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Task description"
                      rows={2}
                    />
                  </div>
                  <div>
                    <Label htmlFor="estimatedHours">Estimated Hours</Label>
                    <Input
                      id="estimatedHours"
                      type="number"
                      value={newTask.estimatedHours}
                      onChange={(e) =>
                        setNewTask((prev: any) => ({
                          ...prev,
                          estimatedHours: e.target.value,
                        }))
                      }
                      placeholder="0"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="isBillable"
                      checked={newTask.isBillable}
                      onChange={(e) =>
                        setNewTask((prev: any) => ({
                          ...prev,
                          isBillable: e.target.checked,
                        }))
                      }
                    />
                    <Label htmlFor="isBillable">Billable Task</Label>
                  </div>
                </div>
                <Button onClick={addTask} className="mt-3">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Task
                </Button>
              </div>

              {/* Task List */}
              <div className="space-y-3">
                {formData.tasks.map((task: any) => (
                  <div key={task.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-600 mt-1">
                          {task.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge className={getPriorityColor(task.priority)}>
                            {task.priority}
                          </Badge>
                          <Badge
                            variant={task.isBillable ? "default" : "secondary"}
                          >
                            {task.isBillable ? "Billable" : "Non-billable"}
                          </Badge>
                          {task.estimatedHours && (
                            <span className="text-sm text-gray-500">
                              Est. {task.estimatedHours}h
                            </span>
                          )}
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTask(task.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Case Timeline & Phases
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-blue-600">
                        1
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">Research Phase</h4>
                      <p className="text-sm text-gray-600">
                        Gather information and analyze case details
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      formData.currentPhase === "research"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-600"
                    }
                  >
                    {formData.currentPhase === "research"
                      ? "Current"
                      : "Pending"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-purple-600">
                        2
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">Writing Phase</h4>
                      <p className="text-sm text-gray-600">
                        Draft documents and prepare materials
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      formData.currentPhase === "writing"
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-600"
                    }
                  >
                    {formData.currentPhase === "writing"
                      ? "Current"
                      : formData.currentPhase === "research"
                      ? "Pending"
                      : "Completed"}
                  </Badge>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                      <span className="text-sm font-medium text-orange-600">
                        3
                      </span>
                    </div>
                    <div>
                      <h4 className="font-medium">Review Phase</h4>
                      <p className="text-sm text-gray-600">
                        Final review and case completion
                      </p>
                    </div>
                  </div>
                  <Badge
                    className={
                      formData.currentPhase === "review"
                        ? "bg-orange-100 text-orange-800"
                        : "bg-gray-100 text-gray-600"
                    }
                  >
                    {formData.currentPhase === "review" ? "Current" : "Pending"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
