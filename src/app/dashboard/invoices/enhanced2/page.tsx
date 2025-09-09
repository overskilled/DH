"use client";
import { useState } from "react";
import { EnhancedInvoiceDialog } from "@/components/invoices/enhanced-invoice-dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function EnhancedInvoicesPage() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Enhanced Invoices</h1>
          <p className="text-gray-600">
            Create and manage invoices with time tracking integration
          </p>
        </div>
        <Button onClick={() => setShowCreateDialog(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Invoice
        </Button>
      </div>

      <EnhancedInvoiceDialog
        open={showCreateDialog}
        onOpenChange={setShowCreateDialog}
      />
    </div>
  );
}
