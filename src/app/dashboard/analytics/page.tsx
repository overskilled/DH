"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Clock, DollarSign, TrendingUp } from "lucide-react";

export default function ReportingDashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("this-month");
  const [selectedDepartment, setSelectedDepartment] = useState("all");

  // Mock data - in real app, this would come from your database
  const analyticsData = {
    timeTracking: {
      totalHours: 1247,
      billableHours: 1089,
      nonBillableHours: 158,
      averageDaily: 8.2,
    },
    revenue: {
      totalBilled: 163350,
      totalPaid: 142800,
      pending: 20550,
      overdue: 8750,
    },
    tasks: {
      completed: 89,
      inProgress: 34,
      pending: 12,
      blocked: 3,
    },
    departments: [
      {
        name: "Litigation",
        hours: 456,
        revenue: 68400,
        tasks: 45,
        color: "#ef4444",
      },
      {
        name: "Corporate Law",
        hours: 389,
        revenue: 58350,
        tasks: 38,
        color: "#3b82f6",
      },
      {
        name: "Tax Law",
        hours: 267,
        revenue: 26700,
        tasks: 28,
        color: "#10b981",
      },
      {
        name: "Family Law",
        hours: 135,
        revenue: 9900,
        tasks: 27,
        color: "#f59e0b",
      },
    ],
    clients: [
      { name: "TechCorp Inc.", hours: 234, revenue: 35100, cases: 3 },
      { name: "Global Industries", hours: 189, revenue: 28350, cases: 2 },
      { name: "Smith Family Trust", hours: 156, revenue: 15600, cases: 4 },
      { name: "Johnson Enterprises", hours: 134, revenue: 20100, cases: 2 },
    ],
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reporting</h1>
          <p className="text-gray-600">
            Track performance and generate insights
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-week">This Week</SelectItem>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="this-quarter">This Quarter</SelectItem>
              <SelectItem value="this-year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Select
            value={selectedDepartment}
            onValueChange={setSelectedDepartment}
          >
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Departments</SelectItem>
              <SelectItem value="litigation">Litigation</SelectItem>
              <SelectItem value="corporate">Corporate Law</SelectItem>
              <SelectItem value="tax">Tax Law</SelectItem>
              <SelectItem value="family">Family Law</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Hours</CardTitle>
            <Clock className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.timeTracking.totalHours}h
            </div>
            <p className="text-xs text-muted-foreground">
              {analyticsData.timeTracking.billableHours}h billable
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${analyticsData.revenue.totalBilled.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              ${analyticsData.revenue.pending.toLocaleString()} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Tasks Completed
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-purple-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {analyticsData.tasks.completed}
            </div>
            <p className="text-xs text-muted-foreground">
              {analyticsData.tasks.inProgress} in progress
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Efficiency Rate
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87.3%</div>
            <p className="text-xs text-muted-foreground">
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="departments" className="space-y-4">
        <TabsList>
          <TabsTrigger value="departments">By Department</TabsTrigger>
          <TabsTrigger value="clients">By Client</TabsTrigger>
          <TabsTrigger value="time">Time Analysis</TabsTrigger>
          <TabsTrigger value="revenue">Revenue Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="departments" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Department Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.departments.map((dept) => (
                  <div
                    key={dept.name}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: dept.color }}
                      />
                      <div>
                        <h4 className="font-medium">{dept.name}</h4>
                        <p className="text-sm text-gray-600">
                          {dept.tasks} tasks completed
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${dept.revenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {dept.hours}h tracked
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="clients" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Top Clients</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {analyticsData.clients.map((client, index) => (
                  <div
                    key={client.name}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                        <span className="text-sm font-medium">{index + 1}</span>
                      </div>
                      <div>
                        <h4 className="font-medium">{client.name}</h4>
                        <p className="text-sm text-gray-600">
                          {client.cases} active cases
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        ${client.revenue.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-600">
                        {client.hours}h tracked
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="time" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Time Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>Billable Hours</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-500 h-2 rounded-full"
                          style={{
                            width: `${
                              (analyticsData.timeTracking.billableHours /
                                analyticsData.timeTracking.totalHours) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {analyticsData.timeTracking.billableHours}h
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Non-billable Hours</span>
                    <div className="flex items-center gap-2">
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-gray-400 h-2 rounded-full"
                          style={{
                            width: `${
                              (analyticsData.timeTracking.nonBillableHours /
                                analyticsData.timeTracking.totalHours) *
                              100
                            }%`,
                          }}
                        />
                      </div>
                      <span className="text-sm font-medium">
                        {analyticsData.timeTracking.nonBillableHours}h
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Daily Average</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">
                    {analyticsData.timeTracking.averageDaily}h
                  </div>
                  <p className="text-gray-600">Average hours per day</p>
                  <Badge className="mt-2" variant="outline">
                    Target: 8.0h
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="revenue" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-600">Total Billed</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${analyticsData.revenue.totalBilled.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">This month</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-blue-600">Paid</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${analyticsData.revenue.totalPaid.toLocaleString()}
                </div>
                <p className="text-sm text-gray-600">
                  {(
                    (analyticsData.revenue.totalPaid /
                      analyticsData.revenue.totalBilled) *
                    100
                  ).toFixed(1)}
                  % collection rate
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-orange-600">Outstanding</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ${analyticsData.revenue.pending.toLocaleString()}
                </div>
                <p className="text-sm text-red-600">
                  ${analyticsData.revenue.overdue.toLocaleString()} overdue
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
