'use client'

import { motion } from 'framer-motion'

interface ContadorCuposProps {
  total: number
  cupoMaximo: number
}

export function ContadorCupos({ total, cupoMaximo }: ContadorCuposProps) {
  return (
    <div className="mb-8 text-center">
      <div className="flex items-baseline justify-center gap-3">
        <motion.span
          key={total}
          initial={{ scale: 1.4, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 14 }}
          className="font-display text-accent leading-none"
          style={{ fontSize: 'clamp(4.5rem, 30vw, 50rem)' }}
        >
          {total}
        </motion.span>
        <span className="font-body text-lg md:text-xl text-muted leading-none">
          / {cupoMaximo}
        </span>
      </div>
      <p className="font-body text-xs tracking-widest uppercase text-muted mt-2">
        lugares registrados
      </p>
    </div>
  )
}
