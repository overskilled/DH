"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Plus,
  X,
  Download,
  Send,
  Calculator,
  Clock,
  DollarSign,
} from "lucide-react";
import { useAuth } from "@/components/context/auth-context";

interface InvoiceCreationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface BillingItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  isTimeEntry?: boolean;
  timeEntryId?: string;
}

export function InvoiceCreationDialog({
  open,
  onOpenChange,
}: InvoiceCreationDialogProps) {
  const { clients } = useAuth();
  const [formData, setFormData] = useState({
    clientId: "",
    caseId: "",
    department: "",
    invoiceNumber: `INV-${Date.now()}`,
    dueDate: "",
    taxRate: 10,
    discount: 0,
    notes: "",
    paymentTerms: "Net 30",
  });

  const [billingItems, setBillingItems] = useState<BillingItem[]>([]);
  const [newItem, setNewItem] = useState({
    description: "",
    quantity: 1,
    unitPrice: 0,
  });
  const [isSending, setIsSending] = useState(false);

  // Mock data
  const cases = [
    { id: "1", name: "Contract Negotiation", clientId: "1" },
    { id: "2", name: "Merger & Acquisition", clientId: "2" },
    { id: "3", name: "Estate Planning", clientId: "3" },
    { id: "4", name: "Litigation Case", clientId: "1" },
  ];

  const departments = [
    { id: "1", name: "Corporate Law", color: "#3b82f6" },
    { id: "2", name: "Litigation", color: "#ef4444" },
    { id: "3", name: "Tax Law", color: "#10b981" },
    { id: "4", name: "Family Law", color: "#f59e0b" },
  ];

  const timeEntries = [
    {
      id: "1",
      description: "Legal research and analysis",
      hours: 3.5,
      rate: 250,
      caseId: "1",
      date: "2024-01-15",
    },
    {
      id: "2",
      description: "Document review and preparation",
      hours: 2.0,
      rate: 200,
      caseId: "1",
      date: "2024-01-16",
    },
    {
      id: "3",
      description: "Client consultation meeting",
      hours: 1.5,
      rate: 300,
      caseId: "1",
      date: "2024-01-17",
    },
    {
      id: "4",
      description: "Court appearance",
      hours: 4.0,
      rate: 350,
      caseId: "2",
      date: "2024-01-18",
    },
  ];

  const addBillingItem = () => {
    if (newItem.description.trim()) {
      const item: BillingItem = {
        id: Date.now().toString(),
        description: newItem.description,
        quantity: newItem.quantity,
        unitPrice: newItem.unitPrice,
        total: newItem.quantity * newItem.unitPrice,
        isTimeEntry: false,
      };
      setBillingItems((prev) => [...prev, item]);
      setNewItem({ description: "", quantity: 1, unitPrice: 0 });
    }
  };

  const removeBillingItem = (itemId: string) => {
    setBillingItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const addTimeEntry = (timeEntry: any) => {
    const item: BillingItem = {
      id: `time-${timeEntry.id}`,
      description: `${timeEntry.description} (${timeEntry.date})`,
      quantity: timeEntry.hours,
      unitPrice: timeEntry.rate,
      total: timeEntry.hours * timeEntry.rate,
      isTimeEntry: true,
      timeEntryId: timeEntry.id,
    };
    setBillingItems((prev) => [...prev, item]);
  };

  const calculateTotals = () => {
    const subtotal = billingItems.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = (subtotal * formData.discount) / 100;
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = (taxableAmount * formData.taxRate) / 100;
    const total = taxableAmount + taxAmount;
    return { subtotal, discountAmount, taxAmount, total };
  };

  const { subtotal, discountAmount, taxAmount, total } = calculateTotals();

  const handleSendInvoice = async () => {
    if (!formData.clientId || !formData.dueDate || billingItems.length === 0) {
      alert(
        "Please fill in all required fields and add at least one billing item"
      );
      return;
    }

    setIsSending(true);
    
  };

  const handleDownloadPDF = () => {
    // Mock PDF generation
    alert("PDF download functionality would be implemented here");
  };

  const selectedClient = clients.find((c: any) => c.id === formData.clientId);
  const availableTimeEntries = timeEntries.filter(
    (entry) =>
      entry.caseId === formData.caseId &&
      !billingItems.some((item) => item.timeEntryId === entry.id)
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Create Invoice
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Invoice Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="client">Client *</Label>
                    <Select
                      value={formData.clientId}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          clientId: value,
                          caseId: "",
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select client" />
                      </SelectTrigger>
                      <SelectContent>
                        {clients.map((client: any) => (
                          <SelectItem key={client.id} value={client.id}>
                            {client.fullName}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="case">Case (Optional)</Label>
                    <Select
                      value={formData.caseId}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, caseId: value }))
                      }
                      disabled={!formData.clientId}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select case" />
                      </SelectTrigger>
                      <SelectContent>
                        {cases
                          .filter(
                            (case_) => case_.clientId === formData.clientId
                          )
                          .map((case_) => (
                            <SelectItem key={case_.id} value={case_.id}>
                              {case_.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Select
                      value={formData.department}
                      onValueChange={(value) =>
                        setFormData((prev) => ({ ...prev, department: value }))
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
                    <Label htmlFor="invoiceNumber">Invoice Number</Label>
                    <Input
                      value={formData.invoiceNumber}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          invoiceNumber: e.target.value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <Label htmlFor="dueDate">Due Date *</Label>
                    <Input
                      type="date"
                      value={formData.dueDate}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          dueDate: e.target.value,
                        }))
                      }
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="paymentTerms">Payment Terms</Label>
                    <Select
                      value={formData.paymentTerms}
                      onValueChange={(value) =>
                        setFormData((prev) => ({
                          ...prev,
                          paymentTerms: value,
                        }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Net 15">Net 15</SelectItem>
                        <SelectItem value="Net 30">Net 30</SelectItem>
                        <SelectItem value="Net 45">Net 45</SelectItem>
                        <SelectItem value="Due on Receipt">
                          Due on Receipt
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Time Entries */}
            {formData.caseId && availableTimeEntries.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Available Time Entries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {availableTimeEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-3 border rounded-lg bg-gray-50"
                      >
                        <div className="flex-1">
                          <p className="font-medium">{entry.description}</p>
                          <p className="text-sm text-gray-600">
                            {entry.date} • {entry.hours}h × ${entry.rate}/hour =
                            ${(entry.hours * entry.rate).toFixed(2)}
                          </p>
                        </div>
                        <Button size="sm" onClick={() => addTimeEntry(entry)}>
                          Add to Invoice
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Billing Items */}
            <Card>
              <CardHeader>
                <CardTitle>Billing Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Add New Item Form */}
                <div className="border rounded-lg p-4 bg-gray-50">
                  <h4 className="font-medium mb-3">Add Billing Item</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                    <div className="md:col-span-2">
                      <Label>Description</Label>
                      <Input
                        value={newItem.description}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        placeholder="Service description"
                      />
                    </div>
                    <div>
                      <Label>Quantity</Label>
                      <Input
                        type="number"
                        value={newItem.quantity}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            quantity: Number.parseFloat(e.target.value) || 0,
                          }))
                        }
                        min="0"
                        step="0.1"
                      />
                    </div>
                    <div>
                      <Label>Unit Price ($)</Label>
                      <Input
                        type="number"
                        value={newItem.unitPrice}
                        onChange={(e) =>
                          setNewItem((prev) => ({
                            ...prev,
                            unitPrice: Number.parseFloat(e.target.value) || 0,
                          }))
                        }
                        min="0"
                        step="0.01"
                      />
                    </div>
                  </div>
                  <Button
                    onClick={addBillingItem}
                    className="mt-3"
                    disabled={!newItem.description.trim()}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Item
                  </Button>
                </div>

                {/* Items List */}
                <div className="space-y-2">
                  {billingItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between p-3 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{item.description}</p>
                          {item.isTimeEntry && (
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              Time Entry
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">
                          {item.quantity} × ${item.unitPrice.toFixed(2)} = $
                          {item.total.toFixed(2)}
                        </p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBillingItem(item.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                  {billingItems.length === 0 && (
                    <p className="text-center text-gray-500 py-4">
                      No billing items added yet
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle>Additional Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Additional notes, payment instructions, or terms..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Client Info */}
            {selectedClient && (
              <Card>
                <CardHeader>
                  <CardTitle>Client Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="font-medium">{selectedClient.fullName}</p>
                    <p className="text-sm text-gray-600">
                      {selectedClient.email}
                    </p>
                    <p className="text-sm text-gray-600">
                      {selectedClient.phone}
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Invoice Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Invoice Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    type="number"
                    value={formData.taxRate}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        taxRate: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    type="number"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        discount: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                    min="0"
                    max="100"
                    step="0.1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Invoice Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  Invoice Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {formData.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({formData.discount}%):</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Tax ({formData.taxRate}%):</span>
                  <span>${taxAmount.toFixed(2)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between font-bold text-lg">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-2 pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button variant="outline" onClick={handleDownloadPDF}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
          <Button
            onClick={handleSendInvoice}
            disabled={isSending || billingItems.length === 0}
          >
            {isSending ? "Sending..." : "Send Invoice"}
            <Send className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
