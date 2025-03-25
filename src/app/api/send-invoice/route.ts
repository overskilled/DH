import { NextResponse } from "next/server";
import { Resend } from "resend";
import { renderToString } from "react-dom/server";
import { InvoiceEmailTemplate } from "@/components/email-templates/invoice-email-template";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const {
      to,
      clientName,
      invoiceNumber,
      issueDate,
      dueDate,
      totalAmount,
      firmName,
      firmAddress,
      firmTaxId,
      billingEmail,
      billingPhone,
    } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "Billing <billing@yourdomain.com>",
      to: [to],
      subject: `Invoice ${invoiceNumber} from ${firmName}`,
      react: InvoiceEmailTemplate({
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
      }),
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
