'use client'

import { useEffect, useState } from 'react'
import type { Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'

type Registro = {
  id: string
  nombre: string
  instagram_username: string
  codigo: string
  estado: 'pendiente' | 'confirmado'
  created_at: string
}

export default function Admin() {
  const [session, setSession] = useState<Session | null>(null)
  const [loadingSession, setLoadingSession] = useState(true)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loginError, setLoginError] = useState('')

  const [registros, setRegistros] = useState<Registro[]>([])
  const [cargando, setCargando] = useState(false)
  const [filtro, setFiltro] = useState('')

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoadingSession(false)
    })
    const { data: listener } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
    })
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (session) cargarRegistros()
  }, [session])

  async function cargarRegistros() {
    setCargando(true)
    const { data } = await supabase
      .from('registros')
      .select('*')
      .order('created_at', { ascending: false })
    setRegistros(data ?? [])
    setCargando(false)
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setLoginError('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError('Correo o contraseña incorrectos.')
  }

  async function handleLogout() {
    await supabase.auth.signOut()
  }

  async function toggleEstado(registro: Registro) {
    const nuevoEstado = registro.estado === 'confirmado' ? 'pendiente' : 'confirmado'
    const { error } = await supabase
      .from('registros')
      .update({ estado: nuevoEstado })
      .eq('id', registro.id)
    if (!error) {
      setRegistros((prev) =>
        prev.map((r) => (r.id === registro.id ? { ...r, estado: nuevoEstado } : r))
      )
    }
  }

  const registrosFiltrados = registros.filter((r) => {
    const q = filtro.trim().toLowerCase()
    if (!q) return true
    return (
      r.nombre.toLowerCase().includes(q) ||
      r.instagram_username.toLowerCase().includes(q) ||
      r.codigo.toLowerCase().includes(q)
    )
  })

  if (loadingSession) return null

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center px-6">
        <form onSubmit={handleLogin} className="w-full max-w-sm flex flex-col gap-4">
          <h1 className="font-display text-3xl text-fg mb-4">Panel del sorteo</h1>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Correo"
            required
            className="w-full bg-transparent border-b border-fg/20 pb-3 font-body text-lg focus:outline-none focus:border-accent"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Contraseña"
            required
            className="w-full bg-transparent border-b border-fg/20 pb-3 font-body text-lg focus:outline-none focus:border-accent"
          />
          <button
            type="submit"
            className="mt-2 bg-accent text-[#F5F5F2] font-body tracking-widest uppercase text-sm py-3 rounded-full hover:bg-accent-hover transition-colors"
          >
            Entrar
          </button>
          {loginError && (
            <p className="text-sm text-center" style={{ color: '#c0392b' }}>
              {loginError}
            </p>
          )}
        </form>
      </main>
    )
  }

  return (
    <main className="min-h-screen px-6 py-10 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="font-display text-3xl text-fg">Panel del sorteo</h1>
        <button
          onClick={handleLogout}
          className="font-body text-xs uppercase tracking-widest text-muted hover:text-accent"
        >
          Salir
        </button>
      </div>

      <input
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        placeholder="Buscar por nombre, @ o código..."
        className="w-full bg-transparent border border-fg/20 rounded-full px-5 py-3 font-body mb-6 focus:outline-none focus:border-accent"
      />

      {cargando ? (
        <p className="font-body text-muted">Cargando...</p>
      ) : (
        <div className="flex flex-col gap-2">
          {registrosFiltrados.length === 0 && (
            <p className="font-body text-muted">Sin registros.</p>
          )}
          {registrosFiltrados.map((r) => (
            <div
              key={r.id}
              className="flex items-center justify-between border border-fg/10 rounded-xl px-5 py-4"
            >
              <div>
                <p className="font-body font-semibold text-fg">{r.nombre}</p>
                <p className="font-body text-sm text-muted">
                  @{r.instagram_username} · <span className="text-accent">{r.codigo}</span>
                </p>
              </div>
              <button
                onClick={() => toggleEstado(r)}
                className={`font-body text-xs uppercase tracking-widest px-4 py-2 rounded-full transition-colors ${
                  r.estado === 'confirmado'
                    ? 'bg-accent text-[#F5F5F2]'
                    : 'border border-fg/30 text-muted hover:border-accent hover:text-accent'
                }`}
              >
                {r.estado === 'confirmado' ? 'confirmado' : 'marcar confirmado'}
              </button>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
