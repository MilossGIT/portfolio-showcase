import { About } from '@/components/sections/About'
import { Contact } from '@/components/sections/Contact'
import { Experience } from '@/components/sections/Experience'
import { Hero } from '@/components/sections/Hero'
import { Projects } from '@/components/sections/Projects'

export default function Home() {
  return (
    <main className="relative flex min-h-screen flex-col bg-[#ffffff] dark:bg-[#0d1117] overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-[#ffffff] dark:bg-[#0d1117]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#f6f8fa] to-transparent dark:from-[#161b22] dark:to-transparent" />
      </div>

      {/* Content */}
      <div className="relative">
        {/* Hero Section */}
        <div className="relative z-10">
          <Hero />
        </div>

        {/* About Section */}
        <div id="about" className="relative z-10 bg-[#ffffff] dark:bg-[#0d1117] scroll-mt-16">
          <About />
        </div>

        {/* Experience Section */}
        <div id="experience" className="relative z-10 bg-[#f6f8fa] dark:bg-[#161b22] scroll-mt-16">
          <Experience />
        </div>

        {/* Projects Section */}
        <div id="projects" className="relative z-10 bg-[#ffffff] dark:bg-[#0d1117] scroll-mt-16">
          <Projects />
        </div>

        {/* Contact Section */}
        <div id="contact" className="relative z-10 bg-[#f6f8fa] dark:bg-[#161b22] scroll-mt-16">
          <Contact />
        </div>
      </div>
    </main>
  )
}