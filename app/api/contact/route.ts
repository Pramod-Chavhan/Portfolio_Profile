import { NextResponse } from "next/server"
import { profile } from "@/data/profile"

type ContactPayload = {
  name?: string
  email?: string
  subject?: string
  message?: string
}

export async function POST(request: Request) {
  const body = (await request.json()) as ContactPayload
  const { name, email, subject, message } = body

  if (!name?.trim() || !email?.trim() || !subject?.trim() || !message?.trim()) {
    return NextResponse.json({ ok: false, error: "All fields are required." }, { status: 400 })
  }

  const accessKey = process.env.WEB3FORMS_ACCESS_KEY

  if (accessKey) {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        name,
        email,
        subject: `[Portfolio] ${subject}`,
        message,
        from_name: profile.name,
      }),
    })

    const data = (await res.json()) as { success?: boolean; message?: string }
    if (!data.success) {
      return NextResponse.json(
        { ok: false, error: data.message ?? "Failed to send message." },
        { status: 502 },
      )
    }

    return NextResponse.json({ ok: true })
  }

  const res = await fetch(`https://formsubmit.co/ajax/${encodeURIComponent(profile.email)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      name,
      email,
      subject,
      message,
      _subject: `[Portfolio] ${subject}`,
      _template: "table",
      _captcha: "false",
    }),
  })

  const data = (await res.json()) as { success?: string; message?: string }
  if (data.success !== "true") {
    return NextResponse.json(
      { ok: false, error: data.message ?? "Failed to send message." },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
