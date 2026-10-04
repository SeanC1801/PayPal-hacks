import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Business Coach',
  description: 'PayPal AI Hackathon — AI-powered business coach for café owners',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
