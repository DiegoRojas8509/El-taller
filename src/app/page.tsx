'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { Navbar } from '@/components/Navbar'

export default function Home() {
  const logoRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { opacity: 0, scale: 0.96 },
      { opacity: 1, scale: 1, duration: 1.4, ease: 'power3.out' }
    )
  }, [])

  return (
    <main className="relative h-screen w-full flex flex-col items-center justify-between overflow-hidden">
      {/* Centro — Logo */}
      <div className="flex-1 flex items-center justify-center px-6">
        <div ref={logoRef} className="opacity-0 select-none">
          <Image
            src="/logo-negro.png"
            alt="El Taller"
            width={420}
            height={420}
            priority
            className="w-[clamp(180px,35vw,420px)] h-auto"
          />
        </div>
      </div>

      {/* Abajo — Navegación */}
      <footer className="w-full pb-16 px-6">
        <Navbar />
      </footer>
    </main>
  )
}
