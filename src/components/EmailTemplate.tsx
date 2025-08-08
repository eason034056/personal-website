import * as React from 'react'

type Props = {
  name: string
  email: string
  subject: string
  message: string
}

export function EmailTemplate({ name, email, subject, message }: Props) {
  return (
    <div style={{
      fontFamily:
        "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif",
      lineHeight: 1.6,
      color: '#111827'
    }}>
      <h2 style={{ margin: '0 0 8px' }}>New contact message</h2>
      <p style={{ margin: '0 0 8px' }}>
        From: <strong>{name}</strong> &lt;{email}&gt;
      </p>
      <p style={{ margin: '0 0 12px' }}>
        Subject: <strong>{subject}</strong>
      </p>
      <div
        style={{
          padding: 12,
          background: '#F9FAFB',
          border: '1px solid #E5E7EB',
          borderRadius: 8,
          whiteSpace: 'pre-wrap'
        }}
      >
        {message}
      </div>
    </div>
  )
}


