import { NextResponse } from 'next/server'
import { Resend } from 'resend'
import { EmailTemplate } from '@/components/EmailTemplate'

type ContactFormData = {
  name: string
  email: string
  subject: string
  message: string
}

const resendApiKey = process.env.RESEND_API_KEY
const contactTo = process.env.CONTACT_TO
const contactFrom = process.env.CONTACT_FROM || 'Eason Wu <contact@easonwu.com>'

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

  // Use React email template rendered by Resend

  try {
    const { error } = await resend.emails.send({
      from: contactFrom,
      to: [contactTo],
      subject: `Portfolio Contact: ${subject}`,
      replyTo: email,
      react: EmailTemplate({ name, email, subject, message })
    })

    if (error) {
      console.error('Resend API Error:', error)
      return NextResponse.json({ 
        error: 'Failed to send email',
        details: error.message,
      }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('Unexpected error:', err)
    const errorMessage = err instanceof Error ? err.message : 'Unknown error'
    return NextResponse.json({ 
      error: 'Email service error',
      details: errorMessage
    }, { status: 500 })
  }
}


