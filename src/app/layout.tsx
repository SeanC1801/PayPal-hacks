import type { Metadata } from 'next'
import './globals.css'
import { Header } from '@/components/header'

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
      <body className="min-h-screen bg-slate-50 text-slate-950 antialiased">
        <Header />
        <main>{children}</main>
      </body>
    </html>
  )
}
