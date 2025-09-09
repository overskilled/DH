"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Search,
  Plus,
  Users,
  UserCheck,
  Clock,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock data for staff members
const mockStaff = [
  {
    id: "1",
    name: "Sarah Johnson",
    email: "sarah.johnson@legalflow.com",
    phone: "+1 (555) 123-4567",
    role: "Senior Lawyer",
    department: "Corporate Law",
    status: "active",
    avatar: "/placeholder.svg",
    specializations: ["Corporate Law", "M&A", "Securities"],
    hourlyRate: 450,
    barNumber: "NY123456",
    location: "New York Office",
  },
  {
    id: "2",
    name: "Michael Chen",
    email: "michael.chen@legalflow.com",
    phone: "+1 (555) 234-5678",
    role: "Legal Secretary",
    department: "Corporate Law",
    status: "active",
    avatar: "/placeholder.svg",
    skills: ["Document Preparation", "Client Communication", "Spanish"],
    typingSpeed: "85 WPM",
    location: "New York Office",
  },
  {
    id: "3",
    name: "Emily Rodriguez",
    email: "emily.rodriguez@legalflow.com",
    phone: "+1 (555) 345-6789",
    role: "Accountant",
    department: "Finance",
    status: "active",
    avatar: "/placeholder.svg",
    certifications: ["CPA", "QuickBooks Certified"],
    software: ["QuickBooks", "SAP", "Excel Advanced"],
    location: "Los Angeles Office",
  },
  {
    id: "4",
    name: "David Wilson",
    email: "david.wilson@legalflow.com",
    phone: "+1 (555) 456-7890",
    role: "Paralegal",
    department: "Litigation",
    status: "busy",
    avatar: "/placeholder.svg",
    skills: ["Legal Research", "Document Review", "Case Management"],
    experience: "5 years",
    location: "Chicago Office",
  },
];

const roleColors = {
  "Senior Lawyer": "bg-blue-100 text-blue-800",
  "Junior Lawyer": "bg-green-100 text-green-800",
  "Legal Secretary": "bg-purple-100 text-purple-800",
  Accountant: "bg-orange-100 text-orange-800",
  Paralegal: "bg-indigo-100 text-indigo-800",
  Assistant: "bg-pink-100 text-pink-800",
  Manager: "bg-red-100 text-red-800",
};

const statusColors = {
  active: "bg-green-100 text-green-800",
  busy: "bg-yellow-100 text-yellow-800",
  away: "bg-gray-100 text-gray-800",
  offline: "bg-red-100 text-red-800",
};

export default function StaffPage() {
  const [staff, setStaff] = useState(mockStaff);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [selectedRole, setSelectedRole] = useState("all");

  const departments = [
    "all",
    ...Array.from(new Set(mockStaff.map((s) => s.department))),
  ];
  const roles = ["all", ...Array.from(new Set(mockStaff.map((s) => s.role)))];

  const filteredStaff = staff.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      member.role.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment =
      selectedDepartment === "all" || member.department === selectedDepartment;
    const matchesRole = selectedRole === "all" || member.role === selectedRole;

    return matchesSearch && matchesDepartment && matchesRole;
  });

  const stats = {
    total: staff.length,
    active: staff.filter((s) => s.status === "active").length,
    lawyers: staff.filter((s) => s.role.includes("Lawyer")).length,
    available: staff.filter((s) => s.status === "active").length,
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Staff Management</h1>
          <p className="text-gray-600 mt-1">
            Manage your team members and their roles
          </p>
        </div>
        <Link href="/dashboard/staff/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Staff Member
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Staff</p>
                <p className="text-2xl font-bold">{stats.total}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <UserCheck className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Active</p>
                <p className="text-2xl font-bold">{stats.active}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Lawyers</p>
                <p className="text-2xl font-bold">{stats.lawyers}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Available</p>
                <p className="text-2xl font-bold">{stats.available}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search staff members..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept === "all" ? "All Departments" : dept}
                </option>
              ))}
            </select>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {roles.map((role) => (
                <option key={role} value={role}>
                  {role === "all" ? "All Roles" : role}
                </option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStaff.map((member) => (
          <Card
            key={member.id}
            className="hover:shadow-lg transition-shadow cursor-pointer"
          >
            <Link href={`/dashboard/staff/${member.id}`}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={member.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-blue-100 text-blue-600">
                      {member.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900 truncate">
                        {member.name}
                      </h3>
                      <Badge
                        className={cn(
                          "text-xs",
                          statusColors[
                            member.status as keyof typeof statusColors
                          ]
                        )}
                      >
                        {member.status}
                      </Badge>
                    </div>

                    <Badge
                      className={cn(
                        "text-xs mb-2",
                        roleColors[member.role as keyof typeof roleColors]
                      )}
                    >
                      {member.role}
                    </Badge>

                    <p className="text-sm text-gray-600 mb-3">
                      {member.department}
                    </p>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Mail className="h-3 w-3" />
                        <span className="truncate">{member.email}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <Phone className="h-3 w-3" />
                        <span>{member.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <MapPin className="h-3 w-3" />
                        <span>{member.location}</span>
                      </div>
                    </div>

                    {/* Role-specific info */}
                    {member.role.includes("Lawyer") && member.hourlyRate && (
                      <div className="mt-3 pt-3 border-t">
                        <p className="text-sm font-medium text-gray-900">
                          ${member.hourlyRate}/hour
                        </p>
                        <p className="text-xs text-gray-500">
                          Bar: {member.barNumber}
                        </p>
                      </div>
                    )}

                    {member.role === "Legal Secretary" &&
                      member.typingSpeed && (
                        <div className="mt-3 pt-3 border-t">
                          <p className="text-sm font-medium text-gray-900">
                            {member.typingSpeed}
                          </p>
                        </div>
                      )}

                    {member.role === "Accountant" && member.certifications && (
                      <div className="mt-3 pt-3 border-t">
                        <div className="flex flex-wrap gap-1">
                          {member.certifications
                            .slice(0, 2)
                            .map((cert, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs"
                              >
                                {cert}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Link>
          </Card>
        ))}
      </div>

      {filteredStaff.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No staff members found
            </h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your search criteria or add a new staff member.
            </p>
            <Link href="/dashboard/staff/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Staff Member
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
