import { Navbar } from '@/components/Navbar'
import { RevealText } from '@/components/RevealText'
import { Header } from '@/components/Header'

export default function Proximamente() {
  return (
    <main
      className="min-h-screen flex flex-col"
      data-dark
      style={{ backgroundColor: '#1A3D10', color: '#F5F5F2', '--color-accent': '#A3C4A5' } as React.CSSProperties}
    >
      {/* Logo blanco sobre fondo oscuro */}
      <Header white />

      <section className="flex-1 flex items-center justify-center px-6">
        <RevealText className="text-center">
          <p
            className="font-body text-xs tracking-widest uppercase mb-4"
            style={{ color: 'rgba(245,245,242,0.5)' }}
          >
            siguiente edición
          </p>
          <h1
            style={{
              fontFamily: 'var(--font-big-shoulders)',
              fontWeight: 900,
              fontSize: 'clamp(2.6rem, 7vw, 9rem)',
              color: '#F5F5F2',
              letterSpacing: '-0.02em',
              lineHeight: 0.95,
            }}
          >
            próximamente
          </h1>
          <div
            className="w-12 h-[2px] mx-auto mt-8"
            style={{ backgroundColor: 'rgba(245,245,242,0.4)' }}
          />
        </RevealText>
      </section>

      <footer className="w-full pb-10 px-6">
        <Navbar white />
      </footer>
    </main>
  )
}
