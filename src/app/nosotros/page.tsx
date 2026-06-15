'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Navbar } from '@/components/Navbar'
import { Header } from '@/components/Header'
import { ValoresCrucigrama } from './ValoresCrucigrama'

const tabs = ['esencia', 'historia', 'valores', 'experiencia'] as const
type Tab = (typeof tabs)[number]

const valores = [
  'Comunidad', 'Conexión', 'Creatividad', 'Autenticidad',
  'Sensibilidad', 'Innovación', 'Expresión', 'Respeto',
]

const fases = [
  { n: '01', titulo: 'Identidad',      texto: 'Un color define la estética, la emoción y el universo visual de la edición.' },
  { n: '02', titulo: 'Comunidad',      texto: 'La comunidad conoce a los artistas antes del evento. La experiencia empieza antes de empezar.' },
  { n: '03', titulo: 'En vivo',        texto: 'El espacio se convierte en parte de la obra. Varias disciplinas creativas al mismo tiempo.' },
  { n: '04', titulo: 'Documentación',  texto: 'Foto, video y contenido documental extienden la experiencia mucho más allá del evento.' },
  { n: '05', titulo: 'Taller',         texto: 'El artista abre su proceso. La gente deja de ser espectadora y se vuelve participante.' },
]

export default function Nosotros() {
  const [active, setActive] = useState<Tab>('esencia')

  return (
    <main className="flex flex-col" style={{ height: '100dvh' }}>
      <Header />

      {/* Tabs */}
      <nav className="px-6 md:px-16 lg:px-24 flex gap-8 border-b border-fg/10 shrink-0">
        {tabs.map((t) => (
          <button
            key={t}
            onClick={() => setActive(t)}
            className={`font-body text-[0.65rem] tracking-widest uppercase pb-3 border-b-2 transition-all duration-200 ${
              active === t ? 'border-accent text-accent' : 'border-transparent text-muted hover:text-fg'
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      {/* Contenido — ocupa el espacio restante */}
      <section className="flex-1 min-h-0 overflow-hidden px-6 md:px-16 lg:px-24 pt-8 pb-4 flex flex-col">

        {/* ── ESENCIA ─────────────────────────────────────────────── */}
        {active === 'esencia' && (
          <div className="flex-1 grid md:grid-cols-[3fr_2fr] gap-10 min-h-0 items-start pt-4">

            {/* Izquierda — statement + descripción apilados */}
            <div className="flex flex-col gap-8 justify-center h-full">
              <h1
                className="font-display leading-[0.92] text-fg"
                style={{ fontSize: 'clamp(2.4rem, 4.5vw, 5.8rem)' }}
              >
                <span style={{ color: 'var(--color-accent)' }}>El Taller</span> es una experiencia{' '}
                <span style={{ color: 'var(--color-accent)' }}>multisensorial</span> en vivo.
              </h1>

              <p
                className="font-display leading-[0.92] text-muted"
                style={{ fontSize: 'clamp(1.8rem, 3.8vw, 4.5rem)' }}
              >
                Más que un evento, es un punto de encuentro donde la creación sucede
                en tiempo real y la experiencia se vuelve colectiva.
              </p>

              <p className="font-body text-xs tracking-widest text-muted/40 uppercase">
                música · arte · comunidad
              </p>
            </div>

            {/* Derecha — dos bloques centrados horizontalmente */}
            <div className="flex flex-col gap-8 border-l border-fg/10 pl-8 md:pl-10 items-end justify-center h-full text-right">
              <div>
                <p className="font-body text-s tracking-widest uppercase text-muted mb-4">¿para quién?</p>
                <p
                  className="font-display leading-none text-fg mb-4"
                  style={{ fontSize: 'clamp(1.8rem, 2.8vw, 3rem)' }}
                >
                  Personas creativas.
                </p>
                <p className="font-body text-base text-muted leading-relaxed" style={{ textWrap: 'balance' } as React.CSSProperties}>
                  No necesitas ser artista. Basta con tener la apertura de sentir, conectar
                  y vivir experiencias culturales desde un lugar más profundo.
                </p>
              </div>

              <div className="border-t border-fg/10 pt-8">
                <p className="font-body text-s tracking-widest uppercase text-muted mb-3">equipo</p>
                <p
                  className="font-display leading-none text-fg mb-4"
                  style={{ fontSize: 'clamp(1.8rem, 2.8vw, 3rem)' }}
                >
                  Construido colectivamente.
                </p>
                <p className="font-body text-base text-muted leading-relaxed" style={{ textWrap: 'balance' } as React.CSSProperties}>
                  Producción audiovisual, diseño de experiencias y desarrollo digital, en
                  colaboración con ATL Café, artistas musicales, visuales y creativos independientes.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ── HISTORIA ────────────────────────────────────────────── */}
        {active === 'historia' && (
          <div className="flex-1 grid md:grid-cols-3 gap-0 min-h-0">

            <div className="flex flex-col justify-between pr-8 border-r border-fg/10 min-h-0">
              <div>
                <p className="font-body text-[0.6rem] tracking-widest uppercase text-muted mb-4">historia</p>
                <h2
                  className="font-display leading-none text-fg"
                  style={{ fontSize: 'clamp(2.5rem, 5vw, 6rem)' }}
                >
                  Nace de<br />ATL Café.
                </h2>
              </div>
              <span
                className="font-display leading-none select-none"
                style={{ fontSize: 'clamp(5rem, 9vw, 10rem)', color: 'rgba(10,10,10,0.06)' }}
              >
                2026
              </span>
            </div>

            <div className="flex flex-col justify-center px-8 border-r border-fg/10 gap-4 min-h-0">
              <p className="font-body text-[0.6rem] tracking-widest uppercase text-muted">el origen</p>
              <p className="font-body text-base md:text-lg text-muted leading-relaxed">
                ATL Café siempre funcionó como un espacio seguro para la creación.
                El Taller surge de esa necesidad: generar experiencias más humanas dentro del arte.
              </p>
              <p className="font-body text-base md:text-lg text-muted leading-relaxed">
                La intención es construir comunidad real — donde artistas y público
                compartan el mismo espacio desde una posición cercana y horizontal.
                Al mismo tiempo funciona como plataforma para impulsar talento independiente.
              </p>
            </div>

            <div className="flex flex-col justify-center pl-8 gap-6 min-h-0">
              <p className="font-body text-[0.6rem] tracking-widest uppercase text-muted">primera edición</p>

              {/* Mellon Collie */}
              <div className="flex items-center gap-4 border-t border-fg/10 pt-4">
                <Image
                  src="/mellon%20borde%20negro.png"
                  alt="Mellon Collie"
                  width={120} height={60}
                  className="h-10 w-auto object-contain shrink-0"
                />
                <div>
                  <p className="font-body text-[0.6rem] tracking-widest uppercase text-muted mb-1">músico</p>
                  <p className="font-display text-xl text-fg leading-none">Mellon Collie</p>
                </div>
              </div>

              {/* Alejandro Pequeña */}
              <div className="flex items-center gap-4 border-t border-fg/10 pt-4">
                <Image
                  src="/alejandro%20negro%20letras%20blancas.png"
                  alt="Alejandro Pequeña"
                  width={120} height={60}
                  className="h-10 w-auto object-contain shrink-0"
                />
                <div>
                  <p className="font-body text-[0.6rem] tracking-widest uppercase text-muted mb-1">artista visual</p>
                  <p className="font-display text-xl text-fg leading-none">Alejandro Pequeña</p>
                </div>
              </div>

              {/* ATL Café */}
              <div className="flex items-center gap-4 border-t border-fg/10 pt-4">
                <Image
                  src="/atl%20negro.png"
                  alt="ATL Café"
                  width={120} height={60}
                  className="h-10 w-auto object-contain shrink-0"
                />
                <div>
                  <p className="font-body text-[0.6rem] tracking-widest uppercase text-muted mb-1">lugar</p>
                  <p className="font-display text-xl text-fg leading-none">ATL Café</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── VALORES — crucigrama tipográfico ────────────────────── */}
        {active === 'valores' && <ValoresCrucigrama />}

        {/* ── EXPERIENCIA ─────────────────────────────────────────── */}
        {active === 'experiencia' && (
          <div className="flex-1 flex flex-col min-h-0">
            <p className="font-body text-sm text-muted leading-relaxed mb-5 max-w-2xl shrink-0">
              Cada edición es un ciclo creativo completo — no es solo un evento.
              El arte se vive, se documenta y se comparte.
            </p>
            <div className="flex-1 grid grid-cols-2 md:grid-cols-5 min-h-0">
              {fases.map((f, i) => (
                <div
                  key={f.n}
                  className={`flex flex-col justify-between p-4 border-t border-fg/10 group ${i < fases.length - 1 ? 'border-r border-fg/10' : ''}`}
                >
                  <div>
                    <span
                      className="font-display leading-none text-fg/8 block mb-3"
                      style={{ fontSize: 'clamp(3rem, 6vw, 7rem)' }}
                    >
                      {f.n}
                    </span>
                    <h3
                      className="font-display leading-none text-fg group-hover:text-accent transition-colors duration-300 mb-3"
                      style={{ fontSize: 'clamp(1.4rem, 2.5vw, 2.8rem)' }}
                    >
                      {f.titulo}
                    </h3>
                  </div>
                  <p className="font-body text-xs md:text-sm text-muted leading-relaxed">
                    {f.texto}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

      </section>

      <footer className="shrink-0 pb-6 px-6 md:px-16 lg:px-24">
        <Navbar />
      </footer>
    </main>
  )
}
