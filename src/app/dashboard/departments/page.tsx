"use client";
import { useState } from "react";
import type React from "react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Plus,
  Edit,
  Trash2,
  Users,
  UserPlus,
  X,
  Building2,
  Crown,
} from "lucide-react";
import { useAuth } from "@/components/context/auth-context";

interface Department {
  id: string;
  name: string;
  color: string;
  headOfDepartment?: string;
  members: string[];
  description?: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function DepartmentManagement() {
  const { lawyers } = useAuth();
  const [departments, setDepartments] = useState<Department[]>([
    {
      id: "1",
      name: "Litigation",
      color: "#ef4444",
      headOfDepartment: lawyers.length > 0 ? lawyers[0]?.id : undefined,
      members: lawyers
        .slice(0, 3)
        .map((l: any) => l.id)
        .filter(Boolean),
      description: "Handles all litigation and court proceedings",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "2",
      name: "Corporate Law",
      color: "#3b82f6",
      headOfDepartment: lawyers.length > 3 ? lawyers[3]?.id : undefined,
      members: lawyers
        .slice(3, 5)
        .map((l: any) => l.id)
        .filter(Boolean),
      description: "Corporate transactions, mergers, and acquisitions",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "3",
      name: "Tax Law",
      color: "#10b981",
      headOfDepartment: lawyers.length > 5 ? lawyers[5]?.id : undefined,
      members: lawyers
        .slice(5, 8)
        .map((l: any) => l.id)
        .filter(Boolean),
      description: "Tax planning, compliance, and disputes",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: "4",
      name: "Family Law",
      color: "#f59e0b",
      headOfDepartment: lawyers.length > 8 ? lawyers[8]?.id : undefined,
      members: lawyers
        .slice(8, 10)
        .map((l: any) => l.id)
        .filter(Boolean),
      description: "Divorce, custody, and family-related legal matters",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isManageMembersOpen, setIsManageMembersOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(
    null
  );
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    color: "#3b82f6",
    description: "",
    headOfDepartment: "",
  });

  // Show loading if lawyers haven't loaded yet
  if (!lawyers || lawyers.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold flex items-center gap-2">
              <Building2 className="h-8 w-8" />
              Department Management
            </h2>
            <p className="text-gray-600 mt-1">Loading lawyers data...</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-3 bg-gray-200 rounded-t-lg" />
              <CardHeader>
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="h-4 bg-gray-200 rounded w-1/2 mt-2" />
              </CardHeader>
              <CardContent>
                <div className="h-4 bg-gray-200 rounded w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingDepartment) {
      // Update existing department
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === editingDepartment.id
            ? { ...dept, ...formData, updatedAt: new Date() }
            : dept
        )
      );
    } else {
      // Create new department
      const newDepartment: Department = {
        id: Date.now().toString(),
        ...formData,
        members: formData.headOfDepartment ? [formData.headOfDepartment] : [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      setDepartments((prev) => [...prev, newDepartment]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: "",
      color: "#3b82f6",
      description: "",
      headOfDepartment: "",
    });
    setEditingDepartment(null);
    setIsCreateOpen(false);
  };

  const handleEdit = (department: Department) => {
    setEditingDepartment(department);
    setFormData({
      name: department.name,
      color: department.color,
      description: department.description || "",
      headOfDepartment: department.headOfDepartment || "",
    });
    setIsCreateOpen(true);
  };

  const handleDelete = (departmentId: string) => {
    if (confirm("Are you sure you want to delete this department?")) {
      setDepartments((prev) => prev.filter((dept) => dept.id !== departmentId));
    }
  };

  const handleManageMembers = (department: Department) => {
    setSelectedDepartment(department);
    setIsManageMembersOpen(true);
  };

  const addMemberToDepartment = (lawyerId: string) => {
    if (selectedDepartment) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === selectedDepartment.id
            ? {
                ...dept,
                members: [...dept.members, lawyerId],
                updatedAt: new Date(),
              }
            : dept
        )
      );
      setSelectedDepartment((prev) =>
        prev ? { ...prev, members: [...prev.members, lawyerId] } : null
      );
    }
  };

  const removeMemberFromDepartment = (lawyerId: string) => {
    if (selectedDepartment) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === selectedDepartment.id
            ? {
                ...dept,
                members: dept.members.filter((id) => id !== lawyerId),
                headOfDepartment:
                  dept.headOfDepartment === lawyerId
                    ? undefined
                    : dept.headOfDepartment,
                updatedAt: new Date(),
              }
            : dept
        )
      );
      setSelectedDepartment((prev) =>
        prev
          ? {
              ...prev,
              members: prev.members.filter((id) => id !== lawyerId),
              headOfDepartment:
                prev.headOfDepartment === lawyerId
                  ? undefined
                  : prev.headOfDepartment,
            }
          : null
      );
    }
  };

  const setDepartmentHead = (lawyerId: string) => {
    if (selectedDepartment) {
      setDepartments((prev) =>
        prev.map((dept) =>
          dept.id === selectedDepartment.id
            ? { ...dept, headOfDepartment: lawyerId, updatedAt: new Date() }
            : dept
        )
      );
      setSelectedDepartment((prev) =>
        prev ? { ...prev, headOfDepartment: lawyerId } : null
      );
    }
  };

  const getLawyerById = (id: string) =>
    lawyers.find((lawyer: any) => lawyer.id === id);
  const getAvailableLawyers = () => {
    if (!selectedDepartment) return [];
    return lawyers.filter(
      (lawyer: any) => !selectedDepartment.members.includes(lawyer.id)
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold flex items-center gap-2">
            <Building2 className="h-8 w-8" />
            Department Management
          </h2>
          <p className="text-gray-600 mt-1">
            Organize your legal team into specialized departments
          </p>
        </div>
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>
                {editingDepartment
                  ? "Edit Department"
                  : "Create New Department"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name">Department Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, name: e.target.value }))
                  }
                  placeholder="e.g., Corporate Law"
                  required
                />
              </div>

              <div>
                <Label htmlFor="color">Department Color</Label>
                <div className="flex gap-2 items-center">
                  <Input
                    id="color"
                    type="color"
                    value={formData.color}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        color: e.target.value,
                      }))
                    }
                    className="w-16 h-10"
                  />
                  <Input
                    value={formData.color}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        color: e.target.value,
                      }))
                    }
                    placeholder="#3b82f6"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="headOfDepartment">Head of Department</Label>
                <Select
                  value={formData.headOfDepartment}
                  onValueChange={(value) =>
                    setFormData((prev) => ({
                      ...prev,
                      headOfDepartment: value,
                    }))
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select department head" />
                  </SelectTrigger>
                  <SelectContent>
                    {lawyers.map((lawyer: any) => (
                      <SelectItem key={lawyer.id} value={lawyer.id}>
                        {lawyer.fullName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  placeholder="Brief description of the department's focus"
                  rows={3}
                />
              </div>

              <div className="flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={resetForm}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDepartment ? "Update" : "Create"} Department
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => {
          const headLawyer = department.headOfDepartment
            ? getLawyerById(department.headOfDepartment)
            : null;

          return (
            <Card
              key={department.id}
              className="relative hover:shadow-lg transition-shadow"
            >
              <div
                className="h-3 rounded-t-lg"
                style={{ backgroundColor: department.color }}
              />
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <CardTitle className="text-xl flex items-center gap-2">
                      {department.name}
                      <div
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: department.color }}
                      />
                    </CardTitle>
                    {headLawyer && (
                      <div className="flex items-center gap-2 mt-2">
                        <Crown className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">
                          Head: {headLawyer.fullName}
                        </span>
                      </div>
                    )}
                    {department.description && (
                      <p className="text-sm text-gray-600 mt-2">
                        {department.description}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleEdit(department)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDelete(department.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-600">
                      {department.members.length} member
                      {department.members.length !== 1 ? "s" : ""}
                    </span>
                  </div>
                  <Badge
                    style={{
                      backgroundColor: department.color + "20",
                      color: department.color,
                      border: `1px solid ${department.color}40`,
                    }}
                  >
                    {department.name}
                  </Badge>
                </div>

                {/* Member Avatars */}
                <div className="flex -space-x-2">
                  {department.members.slice(0, 5).map((memberId) => {
                    const member = getLawyerById(memberId);
                    if (!member || !member.fullName) return null;
                    return (
                      <Avatar
                        key={memberId}
                        className="border-2 border-white w-8 h-8"
                      >
                        <AvatarImage
                          src={member.profileImage || "/placeholder.svg"}
                        />
                        <AvatarFallback className="text-xs">
                          {member.fullName
                            .split(" ")
                            .map((n: string) => n[0])
                            .join("")
                            .toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    );
                  })}
                  {department.members.length > 5 && (
                    <div className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white flex items-center justify-center">
                      <span className="text-xs text-gray-600">
                        +{department.members.length - 5}
                      </span>
                    </div>
                  )}
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  size="sm"
                  onClick={() => handleManageMembers(department)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  Manage Members
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Manage Members Dialog */}
      <Dialog open={isManageMembersOpen} onOpenChange={setIsManageMembersOpen}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Manage {selectedDepartment?.name} Members
            </DialogTitle>
          </DialogHeader>

          {selectedDepartment && (
            <div className="space-y-6">
              {/* Current Members */}
              <div>
                <h3 className="font-medium mb-3">
                  Current Members ({selectedDepartment.members.length})
                </h3>
                <div className="space-y-2">
                  {selectedDepartment.members.map((memberId) => {
                    const member = getLawyerById(memberId);
                    if (!member || !member.fullName) return null;
                    const isHead =
                      selectedDepartment.headOfDepartment === memberId;

                    return (
                      <div
                        key={memberId}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarImage
                              src={member.profileImage || "/placeholder.svg"}
                            />
                            <AvatarFallback>
                              {member.fullName
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium flex items-center gap-2">
                              {member.fullName}
                              {isHead && (
                                <Crown className="h-4 w-4 text-yellow-500" />
                              )}
                            </p>
                            <p className="text-sm text-gray-600">
                              {member.email || "No email"}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {!isHead && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDepartmentHead(memberId)}
                            >
                              Make Head
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeMemberFromDepartment(memberId)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                  {selectedDepartment.members.length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                      No members assigned yet
                    </p>
                  )}
                </div>
              </div>

              {/* Available Lawyers */}
              <div>
                <h3 className="font-medium mb-3">Available Lawyers</h3>
                <div className="space-y-2">
                  {getAvailableLawyers().map((lawyer: any) => (
                    <div
                      key={lawyer.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage
                            src={lawyer.profileImage || "/placeholder.svg"}
                          />
                          <AvatarFallback>
                            {lawyer.fullName &&
                              lawyer.fullName
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")
                                .toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">
                            {lawyer.fullName || "Unknown"}
                          </p>
                          <p className="text-sm text-gray-600">
                            {lawyer.email || "No email"}
                          </p>
                        </div>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => addMemberToDepartment(lawyer.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add
                      </Button>
                    </div>
                  ))}
                  {getAvailableLawyers().length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                      All lawyers are already assigned
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end">
            <Button onClick={() => setIsManageMembersOpen(false)}>Done</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
