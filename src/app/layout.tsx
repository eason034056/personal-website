import { Inter } from 'next/font/google'
import '../styles/globals.css'
import { metadata } from './metadata'
import ClientLayout from './ClientLayout'

// Google 字體載入 - Inter 是現代、清晰的無襯線字體
const inter = Inter({ subsets: ['latin'] })

export { metadata }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ClientLayout>
          {children}
        </ClientLayout>
      </body>
    </html>
  )
}