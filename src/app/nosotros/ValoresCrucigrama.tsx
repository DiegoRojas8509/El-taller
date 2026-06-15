'use client'

// CREATIVIDAD (horizontal) = barra superior de la T → color fg
// INNOVACION  (vertical)   = tallo de la T          → color accent
// Intersección: CREATIVIDAD[5] = INNOVACION[0] = 'I'

const ROWS = 10
const COLS = 11

type CellType = 'h' | 'v' | 'both'
const grid: ({ char: string; type: CellType } | null)[][] =
  Array.from({ length: ROWS }, () => Array(COLS).fill(null))

'CREATIVIDAD'.split('').forEach((ch, i) => {
  grid[0][i] = { char: ch, type: i === 5 ? 'both' : 'h' }
})
'INNOVACION'.split('').forEach((ch, i) => {
  if (i === 0) grid[0][5] = { char: ch, type: 'both' }
  else grid[i][5] = { char: ch, type: 'v' }
})

const izquierda = ['RESPETO', 'CONEXIÓN', 'COMUNIDAD']
const derecha   = ['AUTENTICIDAD', 'EXPRESIÓN', 'SENSIBILIDAD']

function CrosswordGrid({ fontSize }: { fontSize: string }) {
  return (
    <div
      className="grid w-full"
      style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
    >
      {grid.map((row, r) =>
        row.map((cell, c) => (
          <div key={`${r}-${c}`} className="flex items-center justify-center" style={{ aspectRatio: '1/1' }}>
            {cell && (
              <span
                className="font-display leading-none select-none"
                style={{
                  fontSize,
                  color: cell.type === 'h' ? 'var(--color-fg)' : 'var(--color-accent)',
                }}
              >
                {cell.char}
              </span>
            )}
          </div>
        ))
      )}
    </div>
  )
}

export function ValoresCrucigrama() {
  return (
    <div className="flex-1 flex flex-col min-h-0 justify-center">

      {/* ── Mobile ─────────────────────────────────────────────── */}
      <div className="flex md:hidden items-center gap-2 w-full">

        {/* Izquierda — texto vertical */}
        <div
          className="flex items-center justify-around shrink-0 gap-3"
          style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}
        >
          {izquierda.map(v => (
            <span
              key={v}
              className="font-display leading-none text-muted cursor-default"
              style={{ fontSize: 'clamp(0.55rem, 2.5vw, 0.9rem)', letterSpacing: '0.05em' }}
            >
              {v}
            </span>
          ))}
        </div>

        {/* T — ocupa todo el espacio restante */}
        <div className="flex-1 min-w-0">
          <CrosswordGrid fontSize="clamp(0.6rem, 6.5vw, 2rem)" />
        </div>

        {/* Derecha — texto vertical */}
        <div
          className="flex items-center justify-around shrink-0 gap-3"
          style={{ writingMode: 'vertical-rl' }}
        >
          {derecha.map(v => (
            <span
              key={v}
              className="font-display leading-none text-muted cursor-default"
              style={{ fontSize: 'clamp(0.55rem, 2.5vw, 0.9rem)', letterSpacing: '0.05em' }}
            >
              {v}
            </span>
          ))}
        </div>

      </div>

      {/* ── Desktop ─────────────────────────────────────────────── */}
      <div className="hidden md:grid md:grid-cols-[1fr_auto_1fr] gap-8 lg:gap-14 items-center flex-1">

        <div className="flex flex-col gap-4 lg:gap-6 justify-center items-start">
          {izquierda.map(v => (
            <span
              key={v}
              className="font-display leading-none text-muted hover:text-fg transition-colors duration-300 cursor-default block"
              style={{ fontSize: 'clamp(1rem, 2vw, 2.6rem)' }}
            >
              {v}
            </span>
          ))}
        </div>

        <CrosswordGrid fontSize="clamp(1rem, 2.8vw, 3rem)" />

        <div className="flex flex-col gap-4 lg:gap-6 justify-center items-end">
          {derecha.map(v => (
            <span
              key={v}
              className="font-display leading-none text-muted hover:text-fg transition-colors duration-300 cursor-default block text-right"
              style={{ fontSize: 'clamp(1rem, 2vw, 2.6rem)' }}
            >
              {v}
            </span>
          ))}
        </div>

      </div>

    </div>
  )
}
