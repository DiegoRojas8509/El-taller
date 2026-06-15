'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Solo en dispositivos con cursor real (desktop)
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Empieza invisible hasta primer movimiento
    gsap.set([dot, ring], { opacity: 0 })

    const onMove = (e: MouseEvent) => {
      gsap.set([dot, ring], { opacity: 1 })
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.1, ease: 'power2.out' })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.35, ease: 'power2.out' })
    }

    const onEnter = () => {
      gsap.to(ring, { scale: 2.2, backgroundColor: 'var(--color-accent)', borderColor: 'var(--color-accent)', opacity: 0.35, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }

    const onLeave = () => {
      gsap.to(ring, { scale: 1, backgroundColor: 'transparent', borderColor: 'var(--color-fg)', opacity: 1, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    const attachListeners = () => {
      document.querySelectorAll('a, button, [data-cursor-hover]').forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    attachListeners()
    window.addEventListener('mousemove', onMove)

    const observer = new MutationObserver(attachListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: '#0A0A0A', transform: 'translate(-50%, -50%)' }}
      />
      <div
        ref={ringRef}
        className="cursor-dot"
        style={{ width: 36, height: 36, borderRadius: '50%', border: '2px solid #0A0A0A', backgroundColor: 'transparent', transform: 'translate(-50%, -50%)' }}
      />
    </>
  )
}
