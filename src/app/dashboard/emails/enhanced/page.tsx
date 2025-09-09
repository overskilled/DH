"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { EmailDetailDialog } from "@/components/emails/emailDetailDialog";
import { Plus, Search, Mail, Send, Clock, CheckCircle } from "lucide-react";

export default function EmailsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // Mock email data
  const emails = [
    {
      id: "1",
      recipient: "john.doe@example.com",
      subject: "Case Update - Contract Negotiation",
      status: "sent",
      sentAt: "2024-01-20T10:30:00Z",
      priority: "normal",
      attachments: 2,
    },
    {
      id: "2",
      recipient: "jane.smith@company.com",
      subject: "Invoice #INV-2024-001",
      status: "delivered",
      sentAt: "2024-01-19T14:15:00Z",
      priority: "high",
      attachments: 1,
    },
    {
      id: "3",
      recipient: "client@business.org",
      subject: "Appointment Confirmation",
      status: "draft",
      sentAt: null,
      priority: "normal",
      attachments: 0,
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "sent":
        return <Send className="h-4 w-4" />;
      case "delivered":
        return <CheckCircle className="h-4 w-4" />;
      case "draft":
        return <Clock className="h-4 w-4" />;
      default:
        return <Mail className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent":
        return "bg-blue-100 text-blue-800";
      case "delivered":
        return "bg-green-100 text-green-800";
      case "draft":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredEmails = emails.filter(
    (email) =>
      email.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      email.recipient.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Mail className="h-8 w-8" />
            Email Management
          </h1>
          <p className="text-gray-600 mt-1">
            Send and manage client communications
          </p>
        </div>
        <Button
          onClick={() => setIsCreateDialogOpen(true)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4 mr-2" />
          Compose Email
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search emails..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email List */}
      <div className="grid gap-4">
        {filteredEmails.map((email) => (
          <Card key={email.id} className="hover:shadow-md transition-shadow">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-semibold">{email.subject}</h3>
                    <Badge className={getStatusColor(email.status)}>
                      {getStatusIcon(email.status)}
                      <span className="ml-1 capitalize">{email.status}</span>
                    </Badge>
                    {email.priority === "high" && (
                      <Badge variant="destructive">High Priority</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span>To: {email.recipient}</span>
                    {email.sentAt && (
                      <span>
                        Sent: {new Date(email.sentAt).toLocaleDateString()}
                      </span>
                    )}
                    {email.attachments > 0 && (
                      <span>
                        {email.attachments} attachment
                        {email.attachments > 1 ? "s" : ""}
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                  {email.status === "draft" && <Button size="sm">Send</Button>}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <EmailDetailDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
      />
    </div>
  );
}
