import { NextResponse } from "next/server";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
const ALLOWED_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

export async function POST(request: Request) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  if (!apiUrl)
    return NextResponse.json({ message: "API not configured." }, { status: 503 });

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ message: "Invalid form data." }, { status: 400 });
  }

  const file = formData.get("cv");
  if (!(file instanceof File))
    return NextResponse.json({ message: "No CV file provided." }, { status: 400 });

  if (file.size > MAX_FILE_SIZE)
    return NextResponse.json(
      { message: "File exceeds the 5 MB limit." },
      { status: 413 },
    );

  if (!ALLOWED_TYPES.includes(file.type))
    return NextResponse.json(
      { message: "Only PDF and Word documents (.pdf, .doc, .docx) are accepted." },
      { status: 415 },
    );

  try {
    const proxyForm = new FormData();
    proxyForm.append("cv", file);

    const res = await fetch(`${apiUrl}/careers/upload`, {
      method: "POST",
      body: proxyForm,
    });

    const text = await res.text().catch(() => "");
    let payload: unknown = null;
    try {
      payload = text ? JSON.parse(text) : null;
    } catch { /* non-JSON */ }

    return NextResponse.json(
      payload ?? { message: text.trim() || (res.ok ? "Uploaded." : "Upload failed.") },
      { status: res.status },
    );
  } catch {
    return NextResponse.json(
      { message: "Could not reach the backend server." },
      { status: 503 },
    );
  }
}
