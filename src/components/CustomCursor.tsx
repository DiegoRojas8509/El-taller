'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX
      mouseY = e.clientY

      gsap.to(dot, {
        x: mouseX,
        y: mouseY,
        duration: 0.1,
        ease: 'power2.out',
      })

      gsap.to(ring, {
        x: mouseX,
        y: mouseY,
        duration: 0.35,
        ease: 'power2.out',
      })
    }

    const onEnterInteractive = () => {
      gsap.to(ring, {
        scale: 2.2,
        backgroundColor: 'var(--color-accent)',
        borderColor: 'var(--color-accent)',
        opacity: 0.35,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: 0,
        duration: 0.2,
      })
    }

    const onLeaveInteractive = () => {
      gsap.to(ring, {
        scale: 1,
        backgroundColor: 'transparent',
        borderColor: 'var(--color-fg)',
        opacity: 1,
        duration: 0.3,
        ease: 'power2.out',
      })
      gsap.to(dot, {
        scale: 1,
        duration: 0.2,
      })
    }

    const interactives = document.querySelectorAll('a, button, [data-cursor-hover]')
    interactives.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive)
      el.addEventListener('mouseleave', onLeaveInteractive)
    })

    window.addEventListener('mousemove', onMove)

    const observer = new MutationObserver(() => {
      const fresh = document.querySelectorAll('a, button, [data-cursor-hover]')
      fresh.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive)
        el.removeEventListener('mouseleave', onLeaveInteractive)
        el.addEventListener('mouseenter', onEnterInteractive)
        el.addEventListener('mouseleave', onLeaveInteractive)
      })
    })
    observer.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', onMove)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      {/* Punto central */}
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#0A0A0A',
          transform: 'translate(-50%, -50%)',
        }}
      />
      {/* Anillo exterior */}
      <div
        ref={ringRef}
        className="cursor-dot"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '2px solid #0A0A0A',
          backgroundColor: 'transparent',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </>
  )
}
