import Link from 'next/link'
import Image from 'next/image'
import { editions } from '@/lib/editions'
import { RevealText } from '@/components/RevealText'
import { Navbar } from '@/components/Navbar'
import { Header } from '@/components/Header'

export default function Ediciones() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <section className="flex-1 px-6 md:px-16 lg:px-24 pt-12 pb-12">
        <RevealText>
          <h1 className="font-display text-[clamp(3rem,10vw,9rem)] text-fg leading-none mb-16">
            ediciones
          </h1>
        </RevealText>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {editions.map((edition, i) => (
            <RevealText key={edition.slug} delay={i * 100}>
              <Link
                href={`/ediciones/${edition.slug}`}
                className="group block relative overflow-hidden aspect-[4/3]"
                data-cursor-hover
              >
                {/* Imagen cover */}
                {edition.coverImage ? (
                  <Image
                    src={edition.coverImage}
                    alt={edition.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="absolute inset-0 bg-[var(--color-fg)] opacity-5" />
                )}

                {/* Overlay oscuro para leer el texto */}
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors duration-500" />

                {/* Barra de color superior — siempre visible */}
                <div
                  className="absolute top-0 left-0 right-0 h-[4px]"
                  style={{ backgroundColor: edition.color }}
                />

                {/* Info */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p
                    className="font-body text-sm tracking-widest uppercase mb-2 font-medium"
                    style={{ color: edition.color }}
                  >
                    {edition.subtitle} — {edition.date}
                  </p>
                  <h2 className="font-display text-4xl md:text-6xl text-white">
                    {edition.title}
                  </h2>
                  <p className="font-body text-sm tracking-nav mt-3 text-white/70">
                    {edition.credits.map((c) => c.name).join(' · ')}
                  </p>
                </div>

                {/* Línea de color en hover — inferior */}
                <div
                  className="absolute bottom-0 left-0 h-[4px] w-0 group-hover:w-full transition-all duration-500 ease-out"
                  style={{ backgroundColor: edition.color }}
                />
              </Link>
            </RevealText>
          ))}
        </div>
      </section>

      <footer className="w-full pb-10 px-6">
        <Navbar />
      </footer>
    </main>
  )
}
