'use client'

import { useState } from 'react'

const IG_HANDLE = process.env.NEXT_PUBLIC_INSTAGRAM_HANDLE || 'eltaller.atl'

interface ConfirmacionDMProps {
  codigo: string
}

export function ConfirmacionDM({ codigo }: ConfirmacionDMProps) {
  const [copiado, setCopiado] = useState(false)

  function copiarCodigo() {
    navigator.clipboard.writeText(codigo)
    setCopiado(true)
    setTimeout(() => setCopiado(false), 2000)
  }

  function abrirInstagram() {
    // Aunque no le hayan dado a "copiar" antes, este botón copia el mensaje
    // completo (no solo el código) para que quede listo para pegar y mandar.
    const mensaje = `Hola Taller! Les mando mi código ${codigo} para confirmar mi registro al evento :)`
    navigator.clipboard.writeText(mensaje)
    window.open(`https://ig.me/m/${IG_HANDLE}`, '_blank')
  }

  return (
    <div>
      <p className="font-body text-xs tracking-widest uppercase mb-4 text-muted">
        último paso
      </p>
      <h1
        className="font-display text-fg mb-6"
        style={{ fontSize: 'clamp(2rem, 5vw, 3.2rem)' }}
      >
        Confirma tu lugar
      </h1>

      <p className="font-body text-base mb-6 text-fg/80 leading-relaxed">
        Mándanos este código por DM a <strong>@{IG_HANDLE}</strong> para confirmar tu asistencia al evento.
      </p>

      <div className="flex items-center justify-between border border-fg/20 rounded-2xl px-6 py-5 mb-6">
        <span className="font-display text-2xl tracking-wide text-accent">{codigo}</span>
        <button
          onClick={copiarCodigo}
          data-cursor-hover
          className="font-body text-xs uppercase tracking-widest text-muted hover:text-accent transition-colors"
        >
          {copiado ? 'copiado' : 'copiar'}
        </button>
      </div>

      <button
        onClick={abrirInstagram}
        data-cursor-hover
        className="w-full bg-accent text-[#F5F5F2] font-body tracking-widest uppercase text-sm py-4 rounded-full hover:bg-accent-hover transition-colors"
      >
        Enviar por DM a Instagram
      </button>
    </div>
  )
}
