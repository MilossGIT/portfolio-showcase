import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#ffffff] dark:bg-[#0d1117]">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#ffffff] dark:bg-[#0d1117]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f6f8fa] to-transparent dark:from-[#161b22] dark:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative">
        <Hero />

        <div className="relative z-10 bg-[#ffffff] dark:bg-[#0d1117]">
          <About />
        </div>

        <div className="relative z-10 bg-[#f6f8fa] dark:bg-[#161b22]">
          <Experience />
        </div>

        <div className="relative z-10 bg-[#ffffff] dark:bg-[#0d1117]">
          <Projects />
        </div>

        <div className="relative z-10 bg-[#f6f8fa] dark:bg-[#161b22]">
          <Contact />
        </div>
      </div>
    </main>
  )
}

export const metadata = {
  title: 'Home | Miloš Minić',
  description: 'Personal portfolio of Miloš Minić, a Software Engineer specializing in web development.'
}