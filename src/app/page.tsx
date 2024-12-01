import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <div id="about" className="py-20 bg-white dark:bg-gray-900">
        <About />
      </div>

      {/* Experience Section */}
      <div id="experience" className="py-20 bg-gray-50 dark:bg-gray-800">
        <Experience />
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-20 bg-white dark:bg-gray-900">
        <Contact />
      </div>
    </main>
  )
}

// Metadata for the page
export const metadata = {
  title: 'Miloš Minić - Software Engineer',
  description: 'Portfolio of Miloš Minić, a Software Engineer, specializing in frontend development and system integration.',
  keywords: [
    'Miloš Minić',
    'Software Engineer',
    'Frontend Development',
    'React',
    'TypeScript',
    'JavaScript',
    'Sportradar',
  ],
  authors: [{ name: 'Miloš Minić' }],
  creator: 'Miloš Minić',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'http://www.milosminic.net', // Update this with your domain
    title: 'Miloš Minić - Software Engineer',
    description: 'Software Engineer specializing in frontend development',
    siteName: 'Miloš Minić Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Miloš Minić - Software Engineer',
    description: 'Software Engineer specializing in frontend development',
    creator: '@yourtwitterhandle', // Twitter handle
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
  robots: {
    index: true,
    follow: true,
  },
}

// Loading and Error states
export function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-purple-600"></div>
    </div>
  )
}

export function Error() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Oops!</h1>
        <p className="text-gray-600 dark:text-gray-300">Something went wrong. Please try again later.</p>
      </div>
    </div>
  )
}