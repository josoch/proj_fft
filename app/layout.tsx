import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { FinanceProvider } from '@/context/FinanceContext'
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Family Finance Manager',
  description: 'Track and manage your family finances',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FinanceProvider>
          {children}
          <Toaster />
        </FinanceProvider>
      </body>
    </html>
  )
}