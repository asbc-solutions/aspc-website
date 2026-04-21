import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import * as z from "zod";

const bodySchema = z.object({
  fullName: z.string().min(2).max(60),
  companyName: z.string().min(2).max(80),
  emailAddress: z.string().email(),
  phoneNumber: z.string().min(7).max(20),
  serviceInterestedIn: z.string().min(1),
  projectBudget: z.string().min(1),
  message: z.string().min(20).max(600),
});

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const parsed = bodySchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed.", issues: parsed.error.issues }, { status: 422 });
  }

  const { fullName, companyName, emailAddress, phoneNumber, serviceInterestedIn, projectBudget, message } =
    parsed.data;

  const gmailUser = process.env.GMAIL_USER;
  const gmailPass = process.env.GMAIL_APP_PASSWORD;

  if (!gmailUser || !gmailPass) {
    console.error("Missing GMAIL_USER or GMAIL_APP_PASSWORD environment variables.");
    return NextResponse.json({ error: "Mail service not configured." }, { status: 503 });
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: gmailUser,
      pass: gmailPass,
    },
  });

  try {
    await transporter.sendMail({
      from: `"ASPC Website" <${gmailUser}>`,
      to: "tech@asbc-sa.net",
      replyTo: emailAddress,
      subject: `New Contact: ${fullName} — ${serviceInterestedIn}`,
      html: `
        <h2>New Project Enquiry</h2>
        <table cellpadding="8" style="border-collapse:collapse;font-family:sans-serif;font-size:14px">
          <tr><td><strong>Full Name</strong></td><td>${fullName}</td></tr>
          <tr><td><strong>Company</strong></td><td>${companyName}</td></tr>
          <tr><td><strong>Email</strong></td><td><a href="mailto:${emailAddress}">${emailAddress}</a></td></tr>
          <tr><td><strong>Phone</strong></td><td>${phoneNumber}</td></tr>
          <tr><td><strong>Service</strong></td><td>${serviceInterestedIn}</td></tr>
          <tr><td><strong>Budget</strong></td><td>${projectBudget}</td></tr>
          <tr><td valign="top"><strong>Message</strong></td><td style="white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
    });
  } catch (err) {
    console.error("Failed to send email:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
