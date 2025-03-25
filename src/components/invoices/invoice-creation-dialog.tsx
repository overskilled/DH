"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { setToCollection } from "@/functions/add-to-collection";
import { useAuth } from "@/components/context/auth-context";

interface BillingItem {
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
}

const generateInvoiceNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Ensure 2 digits
  const day = String(date.getDate()).padStart(2, "0"); // Ensure 2 digits
  const randomDigits = Math.floor(1000 + Math.random() * 9000); // 4-digit random number

  return `INV-${year}${month}${day}-${randomDigits}`;
};

export const InvoiceCreationDialog = ({
  opened,
  setOpened,
}: {
  opened: boolean;
  setOpened: (open: boolean) => void;
}) => {
  const [selectedClientEmail, setSelectedClientEmail] = useState("");
  const [selectedClientName, setSelectedClientName] = useState("");
  const [selectedCaseId, setSelectedCaseId] = useState("");
  const [selectedCaseName, setSelectedCaseName] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState(generateInvoiceNumber);
  const [dueDate, setDueDate] = useState("");
  const [billingItems, setBillingItems] = useState<BillingItem[]>([
    { description: "", quantity: 1, unitPrice: 0, total: 0 },
  ]);
  const [taxRate, setTaxRate] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState("");
  const [subtotal, setSubtotal] = useState(0);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { clients, cases } = useAuth();
  useEffect(() => {
    const newSubtotal = billingItems.reduce((acc, item) => acc + item.total, 0);
    const taxAmount = newSubtotal * (taxRate / 100);
    const discountAmount = discount;
    const newTotal = newSubtotal + taxAmount - discountAmount;

    setSubtotal(newSubtotal);
    setTotal(newTotal);
  }, [billingItems, taxRate, discount]);

  const addBillingItem = () => {
    setBillingItems([
      ...billingItems,
      { description: "", quantity: 1, unitPrice: 0, total: 0 },
    ]);
  };

  const removeBillingItem = (index: number) => {
    const newItems = billingItems.filter((_, i) => i !== index);
    setBillingItems(newItems);
  };

  const updateBillingItem = (
    index: number,
    field: keyof BillingItem,
    value: any
  ) => {
    const newItems: any = [...billingItems];
    newItems[index][field] = value;

    if (field === "quantity" || field === "unitPrice") {
      newItems[index].total =
        newItems[index].quantity * newItems[index].unitPrice;
    }

    setBillingItems(newItems);
  };

  const handleSendInvoice = async () => {
    if (
      !selectedClientEmail ||
      !selectedCaseId ||
      billingItems.some((item) => !item.description || item.unitPrice <= 0)
    ) {
      setError("Please fill all required fields and valid billing items");
      return;
    }

    setLoading(true);
    setError("");

    try {
      // Prepare invoice data
      const invoiceData = {
        clientEmail: selectedClientEmail,
        clientName: selectedClientName,
        caseId: selectedCaseId,
        caseName: selectedCaseName,
        invoiceNumber,
        dueDate,
        billingItems,
        subtotal,
        taxRate,
        discount,
        total,
        notes,
        status: "sent",
      };
      console.log(invoiceData);

      // Send email using Resend
      const response = await fetch("/api/send-invoice", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          to: selectedClientEmail, // You'll need to get this from your client data
          clientName: selectedClientName, // Extract from selectedClient
          invoiceNumber: invoiceNumber,
          issueDate: new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          dueDate: new Date(dueDate).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          }),
          totalAmount: `$${total.toFixed(2)}`,
          firmName: "DH Avocats",
          firmAddress:
            "Makepeace, Inc.\n123 Legal Avenue, Suite 500\nNew York, NY 10001",
          firmTaxId: "12-3456789",
          billingEmail: "billing@dhavocats.com",
          billingPhone: "670166661",
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send email");
      }

      // Save to Firestore
      const docRef = await setToCollection(
        "invoices",
        invoiceNumber,
        invoiceData
      );

      setOpened(false);
      // Reset form
      setSelectedClientEmail("");
      setSelectedClientName("");
      setSelectedCaseId("");
      setSelectedCaseName("");
      setBillingItems([
        { description: "", quantity: 1, unitPrice: 0, total: 0 },
      ]);
      setNotes("");
    } catch (err) {
      setError("Failed to send invoice. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={opened} onOpenChange={setOpened}>
      <DialogContent className="max-w-[1100px] overflow-y-auto max-h-[90vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-gray-800">
            Create Invoice
          </DialogTitle>
          <p className="text-gray-600 mt-2">
            Generate an invoice for your client
          </p>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-8">
          <div className="space-y-6">
            {/* Client Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Client
              </label>
              <details className="w-full relative">
                <summary className="list-none cursor-pointer flex items-center justify-between border border-gray-300 rounded-md px-4 py-2.5 text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <span>
                    {`${selectedClientName} - ${selectedClientEmail}` ||
                      "Select a client"}
                  </span>
                  <svg
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search clients..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <ul className="max-h-60 overflow-y-auto py-1">
                    {clients.map((client: any) => (
                      <li
                        key={client.id}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedClientEmail(client.email);
                          setSelectedClientName(client.fullName);
                        }}
                      >
                        {client.fullName} - {client.email}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>

            {/* Case Selection */}
            <div className="relative">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Case
              </label>
              <details className="w-full relative">
                <summary className="list-none cursor-pointer flex items-center justify-between border border-gray-300 rounded-md px-4 py-2.5 text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                  <span>{selectedCaseName || "Link to a case"}</span>
                  <svg
                    className="h-5 w-5 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </summary>
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  <div className="p-2">
                    <input
                      type="text"
                      placeholder="Search cases..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <ul className="max-h-60 overflow-y-auto py-1">
                    {cases.map((caseItem: any) => (
                      <li
                        key={caseItem.id}
                        className="px-4 py-2 hover:bg-blue-50 cursor-pointer transition-colors"
                        onClick={() => {
                          setSelectedCaseId(caseItem.id);
                          setSelectedCaseName(caseItem.caseName);
                        }}
                      >
                        {caseItem.caseName}
                      </li>
                    ))}
                  </ul>
                </div>
              </details>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Invoice Number
                </label>
                <div className="flex">
                  <input
                    type="text"
                    value={invoiceNumber}
                    readOnly
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Due Date
                </label>
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 bg-gray-50 p-6 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800">
              Invoice Summary
            </h3>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-medium">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Tax ({taxRate}%)</span>
              <span className="font-medium">
                ${(subtotal * (taxRate / 100)).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Discount</span>
              <span className="font-medium">${discount.toFixed(2)}</span>
            </div>
            <div className="border-t border-gray-300 my-2"></div>
            <div className="flex justify-between font-medium">
              <span>Total</span>
              <span className="text-xl">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">
            Billing Items
          </h3>
          <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Description
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Quantity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unit Price
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {billingItems.map((item, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        placeholder="Item description"
                        value={item.description}
                        onChange={(e) =>
                          updateBillingItem(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="w-full border-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateBillingItem(
                            index,
                            "quantity",
                            parseInt(e.target.value)
                          )
                        }
                        className="w-20 border-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <span className="text-gray-500 mr-1">$</span>
                        <input
                          type="number"
                          min="0"
                          step="0.01"
                          value={item.unitPrice}
                          onChange={(e) =>
                            updateBillingItem(
                              index,
                              "unitPrice",
                              parseFloat(e.target.value)
                            )
                          }
                          className="w-24 border-none focus:ring-2 focus:ring-blue-500 bg-transparent"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-700">
                      ${item.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeBillingItem(index)}
                      >
                        Remove
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <Button variant="ghost" onClick={addBillingItem}>
                Add Another Item
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-2 gap-8">
          <div>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Additional Notes
              </label>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any additional notes..."
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  step="0.01"
                  value={taxRate}
                  onChange={(e) => setTaxRate(parseFloat(e.target.value))}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Discount
                </label>
                <div className="flex">
                  <input
                    type="number"
                    min="0"
                    value={discount}
                    onChange={(e) => setDiscount(parseFloat(e.target.value))}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-end">
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <div className="flex space-x-4 mt-6">
              <Button variant="outline" onClick={() => setOpened(false)}>
                Cancel
              </Button>
              <Button onClick={handleSendInvoice} disabled={loading}>
                {loading ? "Sending..." : "Send Invoice"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
