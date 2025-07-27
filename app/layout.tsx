import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Launch Control - Ryujin Electronics',
  description: 'Operational command centre for Ryujin Electronics. IT support, device management, online store, and tech strategy consulting.',
  keywords: 'IT support, device management, Apple solutions, Canberra, tech consulting',
  authors: [{ name: 'Ryujin Electronics' }],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
} 