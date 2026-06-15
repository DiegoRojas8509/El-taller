'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { RevealText } from '@/components/RevealText'
import { Navbar } from '@/components/Navbar'
import { Header } from '@/components/Header'
import type { Edition } from '@/lib/editions'

interface Props {
  edition: Edition
}

export function EditionPageClient({ edition }: Props) {
  useEffect(() => {
    document.documentElement.style.setProperty('--color-accent', edition.color)
    document.documentElement.style.setProperty('--color-accent-hover', edition.colorLight)
    return () => {
      document.documentElement.style.removeProperty('--color-accent')
      document.documentElement.style.removeProperty('--color-accent-hover')
    }
  }, [edition])

  return (
    <main className="min-h-screen flex flex-col" data-edition={edition.slug}>
      <Header />

      {/* Hero — número de edición grande + título */}
      <section className="px-6 md:px-16 lg:px-24 pt-6 pb-0">
        <RevealText>
          <Link
            href="/ediciones"
            className="font-body text-base tracking-nav text-muted hover:text-accent transition-colors duration-200 mb-8 inline-block"
          >
            ← ediciones
          </Link>
        </RevealText>

        <RevealText delay={80}>
          <div className="flex items-end gap-6 md:gap-10 mb-2">
            {/* Número de edición — gran presencia del color */}
            <span
              className="font-display leading-none shrink-0"
              style={{
                fontSize: 'clamp(5rem, 14vw, 14rem)',
                color: edition.color,
                lineHeight: 0.85,
              }}
            >
              01
            </span>
            <div className="pb-2">
              <p
                className="font-body text-base tracking-widest uppercase mb-1"
                style={{ color: edition.color }}
              >
                {edition.subtitle} — {edition.date}
              </p>
              <h1
                className="font-display leading-none text-fg"
                style={{ fontSize: 'clamp(3rem, 9vw, 9rem)' }}
              >
                {edition.title}
              </h1>
            </div>
          </div>
        </RevealText>

        <RevealText delay={140}>
          <div className="w-full h-[3px] mt-6 mb-10" style={{ backgroundColor: edition.color }} />
        </RevealText>
      </section>

      {/* Descripción + Créditos */}
      <section className="px-6 md:px-16 lg:px-24 pb-12 grid md:grid-cols-2 gap-10 items-start">
        <RevealText delay={180}>
          <p className="font-body text-lg md:text-xl text-muted leading-relaxed">
            {edition.description}
          </p>
        </RevealText>

        <RevealText delay={240}>
          <div className="space-y-7">
            {edition.credits.map((credit) => (
              <div key={credit.role}>
                <p
                  className="font-body text-sm tracking-widest uppercase mb-1"
                  style={{ color: edition.color }}
                >
                  {credit.role}
                </p>
                {credit.url ? (
                  <a
                    href={credit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display text-4xl md:text-5xl text-fg hover:text-accent transition-colors duration-200"
                    data-cursor-hover
                  >
                    {credit.name}
                  </a>
                ) : (
                  <p className="font-display text-4xl md:text-5xl text-fg">{credit.name}</p>
                )}
              </div>
            ))}
          </div>
        </RevealText>
      </section>

      {/* Video + Galería */}
      <section className="px-6 md:px-16 lg:px-24 pb-24">
        <RevealText delay={280}>
          <div className="grid grid-cols-1 md:grid-cols-[2fr_3fr] items-stretch gap-1">

            {/* Video */}
            <div className="relative overflow-hidden aspect-[9/16] md:aspect-auto md:min-h-0">
              {edition.video ? (
                <video
                  src={edition.video}
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ backgroundColor: '#1A1A1A' }}
                >
                  <p
                    className="font-body text-sm tracking-nav text-center px-6"
                    style={{ color: edition.color }}
                  >
                    video — próximamente
                  </p>
                </div>
              )}
            </div>

            {/* Grid imágenes */}
            <div
              className="grid grid-cols-2"
              style={{ gap: 0, lineHeight: 0, fontSize: 0 }}
            >
              {edition.images && edition.images.length > 0 ? (
                edition.images.map((src, i) => (
                  <div
                    key={i}
                    className="relative overflow-hidden group"
                    style={{ aspectRatio: '1/1', display: 'block', margin: 0, padding: 0 }}
                  >
                    <Image
                      src={src}
                      alt={`${edition.title} — foto ${i + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 30vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      style={{ display: 'block', border: 'none', outline: 'none' }}
                    />
                  </div>
                ))
              ) : (
                Array.from({ length: 4 }).map((_, i) => (
                  <div
                    key={i}
                    className="aspect-square"
                    style={{ backgroundColor: '#1A1A1A', opacity: 0.08 + i * 0.01 }}
                  />
                ))
              )}
            </div>

          </div>
        </RevealText>
      </section>

      <footer className="w-full pb-10 px-6">
        <Navbar />
      </footer>
    </main>
  )
}
