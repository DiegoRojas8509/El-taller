'use client'

import { useEffect, useRef, useState } from 'react'
import { YOUTUBE_CANAL_URL } from '@/lib/eventoConfig'

const IG_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'eltaller.atl'
const IG_URL = `https://instagram.com/${IG_HANDLE}`

interface SocialGateProps {
  onContinuar: () => void
}

function IconoInstagram() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
      <rect x="2.5" y="2.5" width="19" height="19" rx="5" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="12" cy="12" r="4.3" stroke="currentColor" strokeWidth="1.8" />
      <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" />
    </svg>
  )
}

function IconoYouTube() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="28" height="28">
      <rect x="2" y="5" width="20" height="14" rx="4" stroke="currentColor" strokeWidth="1.8" />
      <path d="M10.5 9.2L15 12L10.5 14.8V9.2Z" fill="currentColor" />
    </svg>
  )
}

function IconoCheck() {
  return (
    <svg viewBox="0 0 24 24" fill="none" width="16" height="16">
      <path d="M4 12.5L9 17.5L20 6.5" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function SocialGate({ onContinuar }: SocialGateProps) {
  const [igHecho, setIgHecho] = useState(false)
  const [ytHecho, setYtHecho] = useState(false)
  const esperando = useRef<'ig' | 'yt' | null>(null)

  useEffect(() => {
    function onVisibilityChange() {
      if (document.visibilityState !== 'visible' || !esperando.current) return
      if (esperando.current === 'ig') setIgHecho(true)
      if (esperando.current === 'yt') setYtHecho(true)
      esperando.current = null
    }
    document.addEventListener('visibilitychange', onVisibilityChange)
    return () => document.removeEventListener('visibilitychange', onVisibilityChange)
  }, [])

  function abrir(destino: 'ig' | 'yt') {
    esperando.current = destino
    window.open(destino === 'ig' ? IG_URL : YOUTUBE_CANAL_URL, '_blank')
  }

  const ambosListos = igHecho && ytHecho

  return (
    <div>
      <p className="font-body text-xs tracking-widest uppercase mb-4 text-muted">
        requisitos
      </p>
      <h1
        className="font-display text-fg mb-8"
        style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}
      >
        Antes de <span className="text-accent">registrarte</span>
      </h1>

      <p className="font-body text-base mb-8 text-fg/80 leading-relaxed">
        Sigue las redes sociales de El Taller para poder registrarte y obtener tu código para el sorteo {'<3'}
      </p>

      <div className="flex gap-4 mb-8">
        <button
          onClick={() => abrir('ig')}
          data-cursor-hover
          className={`relative flex-1 flex flex-col items-center justify-center gap-2 border rounded-2xl py-6 transition-colors ${
            igHecho ? 'border-accent text-accent' : 'border-fg/20 text-fg hover:border-accent'
          }`}
        >
          {igHecho && (
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <IconoCheck />
            </span>
          )}
          <IconoInstagram />
          <span className="font-body text-xs uppercase tracking-widest">Instagram</span>
        </button>

        <button
          onClick={() => abrir('yt')}
          data-cursor-hover
          className={`relative flex-1 flex flex-col items-center justify-center gap-2 border rounded-2xl py-6 transition-colors ${
            ytHecho ? 'border-accent text-accent' : 'border-fg/20 text-fg hover:border-accent'
          }`}
        >
          {ytHecho && (
            <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center">
              <IconoCheck />
            </span>
          )}
          <IconoYouTube />
          <span className="font-body text-xs uppercase tracking-widest">YouTube</span>
        </button>
      </div>

      <button
        onClick={onContinuar}
        disabled={!ambosListos}
        data-cursor-hover
        className="w-full bg-accent text-[#F5F5F2] font-body tracking-widest uppercase text-sm py-4 rounded-full hover:bg-accent-hover transition-colors disabled:opacity-30 disabled:pointer-events-none"
      >
        Ir a mi registro
      </button>
    </div>
  )
}
