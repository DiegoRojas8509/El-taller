'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { supabase } from '@/lib/supabase'
import { enteroAleatorio } from '@/lib/azar'

type Registro = {
  id: string
  nombre: string
  instagram_username: string
  codigo: string
  estado: 'pendiente' | 'confirmado'
}

type Estado = 'cargando' | 'sin-clave' | 'error' | 'listo' | 'girando' | 'ganador'

const DURACION_MS = 7000
const INTERVALO_INICIAL = 40
const INTERVALO_FINAL = 420

export default function Ruleta() {
  const [estado, setEstado] = useState<Estado>('cargando')
  const [participantes, setParticipantes] = useState<Registro[]>([])
  const [indiceActual, setIndiceActual] = useState(0)
  const [ganador, setGanador] = useState<Registro | null>(null)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    const clave = new URLSearchParams(window.location.search).get('k')
    if (!clave) {
      setEstado('sin-clave')
      return
    }

    let activo = true
    supabase
      .rpc('sortear_participantes', { p_clave: clave })
      .then(({ data, error }) => {
        if (!activo) return
        if (error || !data?.length) {
          setEstado('error')
          return
        }
        setParticipantes(data as Registro[])
        setEstado('listo')
      })

    return () => {
      activo = false
    }
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

  const girar = useCallback(() => {
    setEstado('girando')
    setGanador(null)
    const inicio = performance.now()

    function tick() {
      const transcurrido = performance.now() - inicio
      const progreso = Math.min(transcurrido / DURACION_MS, 1)

      setIndiceActual(enteroAleatorio(participantes.length))

      if (progreso >= 1) {
        // El ganador se elige hasta aquí, con el generador criptográfico:
        // nada de lo que pasó en la animación influye en el resultado.
        const elegido = participantes[enteroAleatorio(participantes.length)]
        setGanador(elegido)
        setEstado('ganador')
        return
      }

      // Arranca rapidísimo y va frenando (ease-out cúbico).
      const freno = 1 - Math.pow(1 - progreso, 3)
      const espera = INTERVALO_INICIAL + (INTERVALO_FINAL - INTERVALO_INICIAL) * freno
      timeoutRef.current = setTimeout(tick, espera)
    }

    tick()
  }, [participantes])

  if (estado === 'cargando') return null

  if (estado === 'sin-clave' || estado === 'error') {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <p className="font-body text-muted">No disponible.</p>
      </main>
    )
  }

  const mostrado = ganador ?? participantes[indiceActual]

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-6 py-16 overflow-hidden">
      <p className="font-body text-xs tracking-widest uppercase text-muted mb-2">
        sorteo · {participantes.length} participantes
      </p>

      {/* Carrete central */}
      <div className="w-full max-w-3xl h-[42vh] flex flex-col items-center justify-center relative">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={ganador ? `ganador-${ganador.id}` : `giro-${indiceActual}`}
            initial={{ opacity: 0, y: estado === 'ganador' ? 0 : 18, scale: estado === 'ganador' ? 0.6 : 1 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -18 }}
            transition={
              estado === 'ganador'
                ? { type: 'spring', stiffness: 260, damping: 16 }
                : { duration: 0.06 }
            }
            className="text-center"
          >
            <p
              className="font-display leading-none text-accent break-words"
              style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}
            >
              {mostrado?.nombre}
            </p>
            <p className="font-body text-base md:text-xl text-muted mt-4">
              @{mostrado?.instagram_username}
            </p>
            {ganador && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="font-display text-2xl tracking-wide text-fg mt-6"
              >
                {ganador.codigo}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Rejilla de todos los participantes parpadeando */}
      <div className="w-full max-w-4xl flex flex-wrap justify-center gap-x-3 gap-y-1 mb-10 min-h-[4rem]">
        {participantes.map((p, i) => {
          const activo = ganador ? p.id === ganador.id : i === indiceActual
          return (
            <span
              key={p.id}
              className="font-body text-[0.65rem] md:text-xs transition-colors duration-75"
              style={{
                color: activo ? 'var(--color-accent)' : 'rgba(136,136,136,0.35)',
                fontWeight: activo ? 700 : 400,
              }}
            >
              @{p.instagram_username}
            </span>
          )
        })}
      </div>

      {estado === 'ganador' && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-body text-xs tracking-widest uppercase text-muted mb-6"
        >
          ganador · {ganador?.estado === 'confirmado' ? 'confirmado' : 'pendiente de confirmar'}
        </motion.p>
      )}

      {estado !== 'girando' && (
        <button
          onClick={girar}
          className="bg-accent text-[#F5F5F2] font-body tracking-widest uppercase text-sm py-4 px-12 rounded-full hover:bg-accent-hover transition-colors"
        >
          {estado === 'ganador' ? 'Sortear otra vez' : 'Girar'}
        </button>
      )}
    </main>
  )
}
