// components/InvoiceEmail.tsx
import React from "react";

interface InvoiceEmailProps {
  invoiceNumber: string;
  clientName: string;
  issueDate: string;
  dueDate: string;
  totalAmount: string;
  firmName: string;
  firmAddress: string;
  firmTaxId: string;
  billingEmail: string;
  billingPhone: string;
}

export const InvoiceEmailTemplate: React.FC<InvoiceEmailProps> = ({
  invoiceNumber,
  clientName,
  issueDate,
  dueDate,
  totalAmount,
  firmName,
  firmAddress,
  firmTaxId,
  billingEmail,
  billingPhone,
}) => {
  return (
    <div className="w-[600px] bg-white rounded-lg shadow-lg font-sans p-6 border border-gray-200">
      <div className="text-center mb-6">
        <div className="flex justify-center mb-2">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 text-white"
            >
              <path
                fillRule="evenodd"
                d="M1.5 9.832v1.793c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875V9.832a3 3 0 00-.722-1.952l-3.285-3.832A3 3 0 0016.215 3h-8.43a3 3 0 00-2.278 1.048L2.222 7.88A3 3 0 001.5 9.832zM14.25 21H9.75a.75.75 0 010-1.5h4.5a.75.75 0 010 1.5zm6.75-9.75a.75.75 0 00-.75-.75H3.75a.75.75 0 000 1.5h16.5a.75.75 0 00.75-.75zM4.5 19.5h15a1.5 1.5 0 001.5-1.5v-5.25H3v5.25a1.5 1.5 0 001.5 1.5z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
        <h1 className="text-2xl font-bold text-gray-800">
          Invoice {invoiceNumber} from {firmName}
        </h1>
      </div>

      <div className="mb-6">
        <p className="text-lg font-semibold mb-2">Dear {clientName},</p>
        <p className="text-gray-700 mb-4">
          We hope this email finds you well. Please find attached your invoice
          for legal services provided between October 1-31, 2023.
        </p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
          <div className="flex justify-between mb-2">
            <span className="font-medium">Invoice Number:</span>
            <span>{invoiceNumber}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Issue Date:</span>
            <span>{issueDate}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="font-medium">Due Date:</span>
            <span className="font-semibold text-blue-600">{dueDate}</span>
          </div>
          <div className="flex justify-between pt-2 border-t border-gray-200">
            <span className="font-semibold">Total Amount Due:</span>
            <span className="font-bold text-lg">{totalAmount}</span>
          </div>
        </div>

        <p className="text-gray-700 mb-6">
          A PDF version of this invoice has been attached to this email for your
          records. Please review the details and reach out if you have any
          questions.
        </p>
      </div>

      <div className="mb-6">
        <div className="text-gray-700 mb-6">
          <p className="mb-2">
            If you have any questions about this invoice, please contact our
            billing department at{" "}
            <a
              href={`mailto:${billingEmail}`}
              className="text-blue-600 hover:underline"
            >
              {billingEmail}
            </a>{" "}
            or call {billingPhone}.
          </p>
          <p>Thank you for your business.</p>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex items-start">
          <div className="mr-4">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">
              {firmName.substring(0, 2)}
            </div>
          </div>
          <div>
            <p className="font-bold text-gray-800">{firmName}</p>
            <p className="text-sm text-gray-600">{firmAddress}</p>
            <p className="text-sm text-gray-600">Tax ID: {firmTaxId}</p>
          </div>
        </div>
        <div className="mt-4 text-xs text-gray-500">
          <p>
            This email and any files transmitted with it are confidential and
            intended solely for the use of the individual or entity to whom they
            are addressed.
          </p>
        </div>
      </div>
    </div>
  );
};
