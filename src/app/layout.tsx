import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL('https://milosminic.net'),
  title: {
    default: 'Miloš Minić - Software Engineer',
    template: '%s | Miloš Minić'
  },
  description: 'Software Engineer specializing in frontend development and web technologies',
  keywords: [
    'Software Engineer',
    'Web Development',
    'Frontend Developer',
    'React Developer',
    'TypeScript',
    'Next.js',
    'Miloš Minić'
  ],
  authors: [{ name: 'Miloš Minić' }],
  creator: 'Miloš Minić',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://milosminic.net',
    siteName: 'Miloš Minić - Portfolio',
    title: 'Miloš Minić - Software Engineer',
    description: 'Software Engineer specializing in frontend development and web technologies',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Miloš Minić - Software Engineer'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miloš Minić - Software Engineer',
    description: 'Software Engineer specializing in frontend development and web technologies',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  }
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className="scroll-smooth"
    >
      <body className={`${inter.className} antialiased`}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  )
}