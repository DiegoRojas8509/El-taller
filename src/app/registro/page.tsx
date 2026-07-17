'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/Header'
import { Navbar } from '@/components/Navbar'
import { RevealText } from '@/components/RevealText'
import { supabase } from '@/lib/supabase'
import { generarCodigo } from '@/lib/codigo'
import { ContadorCupos } from './ContadorCupos'
import { SocialGate } from './SocialGate'
import { FormularioRegistro } from './FormularioRegistro'
import { ConfirmacionDM } from './ConfirmacionDM'
import { CupoLleno } from './CupoLleno'
import { ContenidoEvento } from './ContenidoEvento'

type Estado =
  | 'cargando'
  | 'error-contador'
  | 'lleno'
  | 'gate'
  | 'formulario'
  | 'enviando'
  | 'listo'
  | 'error'

export default function Registro() {
  const [estado, setEstado] = useState<Estado>('cargando')
  const [total, setTotal] = useState(0)
  const [cupoMaximo, setCupoMaximo] = useState(100)
  const [codigo, setCodigo] = useState('')

  // Carga inicial del contador — decide si mostramos el gate o "cupo lleno"
  // antes de renderizar cualquier otra cosa.
  useEffect(() => {
    let activo = true
    async function cargar() {
      const { data, error } = await supabase
        .from('registro_contador')
        .select('total, cupo_maximo')
        .eq('id', 1)
        .single()
      if (!activo) return
      if (error || !data) {
        setEstado('error-contador')
        return
      }
      setTotal(data.total)
      setCupoMaximo(data.cupo_maximo)
      setEstado(data.total >= data.cupo_maximo ? 'lleno' : 'gate')
    }
    cargar()
    return () => {
      activo = false
    }
  }, [])

  // Suscripción en vivo — actualiza el badge para todos los que tengan la
  // página abierta, y los pasa a "lleno" si el cupo se agota mientras esperan.
  useEffect(() => {
    const canal = supabase
      .channel('contador-registros')
      .on(
        'postgres_changes',
        { event: 'UPDATE', schema: 'public', table: 'registro_contador', filter: 'id=eq.1' },
        (payload) => {
          const nuevoTotal = payload.new.total as number
          setTotal(nuevoTotal)
          setEstado((actual) =>
            (actual === 'gate' || actual === 'formulario') && nuevoTotal >= cupoMaximo
              ? 'lleno'
              : actual
          )
        }
      )
      .subscribe()
    return () => {
      supabase.removeChannel(canal)
    }
  }, [cupoMaximo])

  async function handleSubmit(nombre: string, usuario: string) {
    setEstado('enviando')
    const usernameLimpio = usuario.trim().replace(/^@/, '').toLowerCase()

    for (let intento = 0; intento < 5; intento++) {
      const nuevoCodigo = generarCodigo()
      const { data, error } = await supabase.rpc('registrar_participante', {
        p_nombre: nombre.trim(),
        p_instagram_username: usernameLimpio,
        p_codigo: nuevoCodigo,
      })

      if (!error) {
        setCodigo(data.codigo)
        setTotal((t) => t + 1)
        setEstado('listo')
        return
      }
      if (error.message?.includes('CUPO_LLENO')) {
        setEstado('lleno')
        return
      }
      if (error.code === '23505') continue // colisión de código, reintenta con uno nuevo
      setEstado('error')
      return
    }
    setEstado('error')
  }

  const mostrarContador = estado === 'gate' || estado === 'formulario' || estado === 'enviando'

  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <section className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md">
          {estado === 'cargando' && null}

          {estado === 'error-contador' && (
            <RevealText>
              <p className="font-body text-base text-fg/80 mb-6">
                No pudimos cargar el estado del registro. Intenta de nuevo.
              </p>
              <button
                onClick={() => setEstado('cargando')}
                data-cursor-hover
                className="bg-accent text-[#F5F5F2] font-body tracking-widest uppercase text-sm py-3 px-6 rounded-full hover:bg-accent-hover transition-colors"
              >
                Reintentar
              </button>
            </RevealText>
          )}

          {estado === 'lleno' && (
            <RevealText>
              <CupoLleno />
            </RevealText>
          )}

          {estado === 'gate' && (
            <RevealText>
              {mostrarContador && <ContadorCupos total={total} cupoMaximo={cupoMaximo} />}
              <SocialGate onContinuar={() => setEstado('formulario')} />
            </RevealText>
          )}

          {(estado === 'formulario' || estado === 'enviando') && (
            <RevealText>
              {mostrarContador && <ContadorCupos total={total} cupoMaximo={cupoMaximo} />}
              <FormularioRegistro
                onSubmit={handleSubmit}
                enviando={estado === 'enviando'}
                error={false}
              />
            </RevealText>
          )}

          {estado === 'error' && (
            <RevealText>
              <FormularioRegistro onSubmit={handleSubmit} enviando={false} error />
            </RevealText>
          )}

          {estado === 'listo' && (
            <RevealText>
              <ConfirmacionDM codigo={codigo} />
            </RevealText>
          )}
        </div>
      </section>

      <ContenidoEvento />

      <footer className="w-full pb-10 px-6">
        <Navbar />
      </footer>
    </main>
  )
}
