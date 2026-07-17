import { Navbar } from '@/components/Navbar'
import { RevealText } from '@/components/RevealText'
import { Header } from '@/components/Header'
import { YOUTUBE_CANAL_URL } from '@/lib/eventoConfig'

export default function Contacto() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="flex-1 flex items-center px-6 md:px-16 lg:px-24 py-12">
        <div className="w-full">
          <RevealText>
            <h1 className="font-display text-[clamp(3rem,10vw,9rem)] leading-none text-fg mb-16">
              contacto
            </h1>
          </RevealText>

          <RevealText delay={100}>
            <a
              href="mailto:eltalleratl@gmail.com"
              className="group flex items-center gap-4 font-display text-[clamp(1.8rem,5vw,4.5rem)] leading-none text-muted hover:text-accent transition-colors duration-300 mb-10"
              data-cursor-hover
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 w-[clamp(1.4rem,3.5vw,3rem)] h-[clamp(1.4rem,3.5vw,3rem)]"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 8.586 6.586a2 2 0 0 0 2.828 0L22 7" />
              </svg>
              eltalleratl@gmail.com
            </a>
          </RevealText>

          <RevealText delay={180}>
            <a
              href="https://instagram.com/eltaller.atl"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 font-display text-[clamp(1.8rem,5vw,4.5rem)] leading-none text-muted hover:text-accent transition-colors duration-300 mb-10"
              data-cursor-hover
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 w-[clamp(1.4rem,3.5vw,3rem)] h-[clamp(1.4rem,3.5vw,3rem)]"
              >
                <rect x="2" y="2" width="20" height="20" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
              </svg>
              @eltaller.atl
            </a>
          </RevealText>

          <RevealText delay={260}>
            <a
              href={YOUTUBE_CANAL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 font-display text-[clamp(1.8rem,5vw,4.5rem)] leading-none text-muted hover:text-accent transition-colors duration-300"
              data-cursor-hover
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 w-[clamp(1.4rem,3.5vw,3rem)] h-[clamp(1.4rem,3.5vw,3rem)]"
              >
                <rect x="2" y="5" width="20" height="14" rx="4" />
                <path d="M10.5 9.2 15 12l-4.5 2.8V9.2Z" fill="currentColor" stroke="none" />
              </svg>
              @ElTaller_AtlCafe
            </a>
          </RevealText>
        </div>
      </section>

      <footer className="w-full pb-10 px-6">
        <Navbar />
      </footer>
    </main>
  )
}
