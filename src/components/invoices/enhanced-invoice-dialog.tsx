"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
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
import { Plus, X, Download, Send, Calculator } from "lucide-react";

interface EnhancedInvoiceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EnhancedInvoiceDialog({
  open,
  onOpenChange,
}: EnhancedInvoiceDialogProps) {
  const [formData, setFormData] = useState<any>({
    clientId: "",
    caseId: "",
    department: "",
    invoiceNumber: `INV-${Date.now()}`,
    dueDate: "",
    taxRate: 10,
    discount: 0,
    notes: "",
    billingItems: [],
    timeEntries: [],
  });

  const [newBillingItem, setNewBillingItem] = useState({
    description: "",
    quantity: 1,
    unitPrice: 0,
  });

  // Mock data
  const clients = [
    { id: "1", name: "TechCorp Inc." },
    { id: "2", name: "Global Industries" },
    { id: "3", name: "Smith Family Trust" },
  ];

  const cases = [
    { id: "1", name: "Contract Negotiation", clientId: "1" },
    { id: "2", name: "Merger & Acquisition", clientId: "2" },
    { id: "3", name: "Estate Planning", clientId: "3" },
  ];

  const departments = [
    { id: "1", name: "Corporate Law", color: "#3b82f6" },
    { id: "2", name: "Litigation", color: "#ef4444" },
    { id: "3", name: "Tax Law", color: "#10b981" },
  ];

  const timeEntries = [
    {
      id: "1",
      description: "Legal research",
      hours: 3.5,
      rate: 150,
      caseId: "1",
    },
    {
      id: "2",
      description: "Document review",
      hours: 2.0,
      rate: 150,
      caseId: "1",
    },
    {
      id: "3",
      description: "Client consultation",
      hours: 1.5,
      rate: 200,
      caseId: "1",
    },
  ];

  const addBillingItem = () => {
    if (newBillingItem.description.trim()) {
      const item = {
        ...newBillingItem,
        id: Date.now().toString(),
        total: newBillingItem.quantity * newBillingItem.unitPrice,
        isTimeEntry: false,
      };
      setFormData((prev: any) => ({
        ...prev,
        billingItems: [...prev.billingItems, item],
      }));
      setNewBillingItem({ description: "", quantity: 1, unitPrice: 0 });
    }
  };

  const removeBillingItem = (itemId: string) => {
    setFormData((prev: any) => ({
      ...prev,
      billingItems: prev.billingItems.filter((item: any) => item.id !== itemId),
    }));
  };

  const addTimeEntry = (timeEntry: any) => {
    const item = {
      id: timeEntry.id,
      description: timeEntry.description,
      quantity: timeEntry.hours,
      unitPrice: timeEntry.rate,
      total: timeEntry.hours * timeEntry.rate,
      isTimeEntry: true,
      timeEntryId: timeEntry.id,
    };
    setFormData((prev: any) => ({
      ...prev,
      billingItems: [...prev.billingItems, item],
      timeEntries: [...prev.timeEntries, timeEntry.id],
    }));
  };

  const calculateTotals = () => {
    const subtotal = formData.billingItems.reduce(
      (sum: any, item: any) => sum + item.total,
      0
    );
    const discountAmount = (subtotal * formData.discount) / 100;
    const taxAmount = ((subtotal - discountAmount) * formData.taxRate) / 100;
    const total = subtotal - discountAmount + taxAmount;
    return { subtotal, discountAmount, taxAmount, total };
  };

  const { subtotal, discountAmount, taxAmount, total } = calculateTotals();

  const handleSendInvoice = async () => {
    const invoiceData = {
      ...formData,
      subtotal,
      discountAmount,
      taxAmount,
      total,
    };
    console.log("Sending invoice:", invoiceData);
    // API call to send invoice
    onOpenChange(false);
  };

  const handleDownloadInvoice = () => {
    console.log("Downloading invoice...");
    // Generate and download PDF
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Create Invoice
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Invoice Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="client">Client</Label>
                  <Select
                    value={formData.clientId}
                    onValueChange={(value) =>
                      setFormData((prev: any) => ({ ...prev, clientId: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select client" />
                    </SelectTrigger>
                    <SelectContent>
                      {clients.map((client) => (
                        <SelectItem key={client.id} value={client.id}>
                          {client.name}
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
                      setFormData((prev: any) => ({ ...prev, caseId: value }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select case" />
                    </SelectTrigger>
                    <SelectContent>
                      {cases
                        .filter(
                          (case_) =>
                            !formData.clientId ||
                            case_.clientId === formData.clientId
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
                  <Label htmlFor="invoiceNumber">Invoice Number</Label>
                  <Input
                    id="invoiceNumber"
                    value={formData.invoiceNumber}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        invoiceNumber: e.target.value,
                      }))
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="dueDate">Due Date</Label>
                  <Input
                    id="dueDate"
                    type="date"
                    value={formData.dueDate}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        dueDate: e.target.value,
                      }))
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time Entries */}
          {formData.caseId && (
            <Card>
              <CardHeader>
                <CardTitle>Available Time Entries</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {timeEntries
                    .filter(
                      (entry) =>
                        entry.caseId === formData.caseId &&
                        !formData.timeEntries.includes(entry.id)
                    )
                    .map((entry) => (
                      <div
                        key={entry.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <p className="font-medium">{entry.description}</p>
                          <p className="text-sm text-gray-600">
                            {entry.hours}h × ${entry.rate}/hour = $
                            {(entry.hours * entry.rate).toFixed(2)}
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
              {/* Add New Item */}
              <div className="border rounded-lg p-4 bg-gray-50">
                <h4 className="font-medium mb-3">Add Billing Item</h4>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  <div className="md:col-span-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      value={newBillingItem.description}
                      onChange={(e) =>
                        setNewBillingItem((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                      placeholder="Service description"
                    />
                  </div>
                  <div>
                    <Label htmlFor="quantity">Quantity</Label>
                    <Input
                      id="quantity"
                      type="number"
                      value={newBillingItem.quantity}
                      onChange={(e) =>
                        setNewBillingItem((prev) => ({
                          ...prev,
                          quantity: Number.parseFloat(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="unitPrice">Unit Price</Label>
                    <Input
                      id="unitPrice"
                      type="number"
                      value={newBillingItem.unitPrice}
                      onChange={(e) =>
                        setNewBillingItem((prev) => ({
                          ...prev,
                          unitPrice: Number.parseFloat(e.target.value) || 0,
                        }))
                      }
                    />
                  </div>
                </div>
                <Button onClick={addBillingItem} className="mt-3">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Item
                </Button>
              </div>

              {/* Items List */}
              <div className="space-y-2">
                {formData.billingItems.map((item: any) => (
                  <div
                    key={item.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{item.description}</p>
                        {item.isTimeEntry && (
                          <Badge variant="outline">Time Entry</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {item.quantity} × ${item.unitPrice} = $
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
              </div>
            </CardContent>
          </Card>

          {/* Totals and Settings */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Invoice Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="taxRate">Tax Rate (%)</Label>
                  <Input
                    id="taxRate"
                    type="number"
                    value={formData.taxRate}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        taxRate: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Discount (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    value={formData.discount}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        discount: Number.parseFloat(e.target.value) || 0,
                      }))
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="notes">Notes</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) =>
                      setFormData((prev: any) => ({
                        ...prev,
                        notes: e.target.value,
                      }))
                    }
                    placeholder="Additional notes or payment terms"
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Invoice Summary</CardTitle>
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

          {/* Actions */}
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button variant="outline" onClick={handleDownloadInvoice}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button onClick={handleSendInvoice}>
              <Send className="h-4 w-4 mr-2" />
              Send Invoice
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
