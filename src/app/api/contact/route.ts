import { NextResponse } from 'next/server'
import { Resend } from 'resend'

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

const resendApiKey = process.env.RESEND_API_KEY
const contactTo = process.env.CONTACT_TO
const contactFrom = process.env.CONTACT_FROM || 'Portfolio Contact <onboarding@resend.dev>'

function isValidEmail(email: string): boolean {
  // Keep it simple and robust
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request: Request) {
  if (!resendApiKey || !contactTo) {
    return NextResponse.json(
      { error: 'Email service not configured' },
      { status: 500 }
    )
  }

  const resend = new Resend(resendApiKey)

  let body: ContactFormData
  try {
    body = (await request.json()) as ContactFormData
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const { name, email, subject, message } = body || {}

  if (!name || name.trim().length < 2) {
    return NextResponse.json({ error: 'Invalid name' }, { status: 400 })
  }
  if (!email || !isValidEmail(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (!subject || subject.trim().length < 5) {
    return NextResponse.json({ error: 'Invalid subject' }, { status: 400 })
  }
  if (!message || message.trim().length < 10) {
    return NextResponse.json({ error: 'Invalid message' }, { status: 400 })
  }

  const plainText = `New contact message from ${name} <${email}>

Subject: ${subject}

Message:
${message}`

  const html = `
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif; line-height: 1.6; color: #111827;">
    <h2 style="margin: 0 0 8px;">New contact message</h2>
    <p style="margin: 0 0 12px;">From: <strong>${name}</strong> &lt;${email}&gt;</p>
    <p style="margin: 0 0 12px;">Subject: <strong>${subject}</strong></p>
    <div style="padding: 12px; background: #F9FAFB; border: 1px solid #E5E7EB; border-radius: 8px; white-space: pre-wrap;">${message
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/\n/g, '<br/>')}</div>
  </div>
  `

  try {
    const { error } = await resend.emails.send({
      from: contactFrom,
      to: [contactTo],
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      text: plainText,
      html
    })

    if (error) {
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: 'Email service error' }, { status: 500 })
  }
}


