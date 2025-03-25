import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { to, subject, html, attachments } = await request.json();

    const { data, error } = await resend.emails.send({
      from: "LegalCRM <testing@onevisaplace.com>",
      to,
      subject,
      html,
      attachments: attachments.map((att: any) => ({
        content: att.content,
        filename: att.filename,
      })),
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

export const runtime = "edge";
