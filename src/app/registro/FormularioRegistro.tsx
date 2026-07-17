'use client'

import { useState } from 'react'

interface FormularioRegistroProps {
  onSubmit: (nombre: string, usuario: string) => void
  enviando: boolean
  error: boolean
}

export function FormularioRegistro({ onSubmit, enviando, error }: FormularioRegistroProps) {
  const [nombre, setNombre] = useState('')
  const [usuario, setUsuario] = useState('')
  const [errorNombre, setErrorNombre] = useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const partes = nombre.trim().split(/\s+/).filter(Boolean)
    if (partes.length < 2) {
      setErrorNombre(true)
      return
    }
    if (!usuario.trim()) return
    setErrorNombre(false)
    onSubmit(nombre, usuario)
  }

  return (
    <div>
      <p className="font-body text-xs tracking-widest uppercase mb-4 text-muted">
        Un pasito más
      </p>
      <h1
        className="font-display text-fg mb-8"
        style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}
      >
        Regístrate al <span className="text-accent">evento</span>
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="font-body text-xs tracking-widest uppercase  block mb-2">
            Tu nombre
          </label>
          <input
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value)
              setErrorNombre(false)
            }}
            required
            className="w-full bg-transparent border-b border-fg/20 pb-3 font-body text-lg focus:outline-none focus:border-accent transition-colors"
            placeholder="Nombre y apellido"
          />
          {errorNombre && (
            <p className="text-sm mt-2" style={{ color: '#c0392b' }}>
              Escribe tu nombre y apellido.
            </p>
          )}
        </div>

        <div>
          <label className="font-body text-xs tracking-widest uppercase text-accent block mb-2">
            Tu usuario de Instagram
          </label>
          <input
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
            className="w-full bg-transparent border-b border-fg/20 pb-3 font-body text-lg focus:outline-none focus:border-accent transition-colors"
            placeholder="@tu.usuario"
          />
        </div>

        <button
          type="submit"
          disabled={enviando}
          data-cursor-hover
          className="mt-4 bg-accent text-[#F5F5F2] font-body tracking-widest uppercase text-sm py-4 rounded-full hover:bg-accent-hover transition-colors disabled:opacity-50"
        >
          {enviando ? 'Registrando...' : 'Generar mi código'}
        </button>

        {error && (
          <p className="text-sm text-center" style={{ color: '#c0392b' }}>
            Algo salió mal. Intenta de nuevo.
          </p>
        )}
      </form>
    </div>
  )
}
