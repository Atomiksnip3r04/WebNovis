import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WebNovis - Il Tuo Futuro Digitale Inizia Qui',
  description: 'Trasformiamo le tue idee in esperienze digitali straordinarie. Siti web moderni, veloci e ottimizzati che convertono visitatori in clienti.',
  keywords: 'web design, sviluppo web, landing page, siti web professionali, digital marketing, SEO',
  authors: [{ name: 'WebNovis Team' }],
  openGraph: {
    title: 'WebNovis - Il Tuo Futuro Digitale Inizia Qui',
    description: 'Trasformiamo le tue idee in esperienze digitali straordinarie.',
    type: 'website',
    locale: 'it_IT',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WebNovis - Il Tuo Futuro Digitale Inizia Qui',
    description: 'Trasformiamo le tue idee in esperienze digitali straordinarie.',
  },
  robots: 'index, follow',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="it">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  )
}