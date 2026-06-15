'use client'

// ── Crucigrama: 3 palabras con intersecciones válidas ─────────────
// CONEXION(V) cruza COMUNIDAD(H) en N y CREATIVIDAD(H) en I

const ROWS = 8
const COLS = 11

const crossword = [
  { word: 'CONEXION',    h: false, row: 0, col: 5 },   // vertical
  { word: 'COMUNIDAD',   h: true,  row: 2, col: 1 },   // COMUNIDAD[4]=N = CONEXION[2]=N en (2,5) ✓
  { word: 'CREATIVIDAD', h: true,  row: 5, col: 0 },   // CREATIVIDAD[5]=I = CONEXION[5]=I en (5,5) ✓
]

type Cell = { char: string; isVertical: boolean } | null
const grid: Cell[][] = Array.from({ length: ROWS }, () => Array(COLS).fill(null))

crossword.forEach(({ word, h, row, col }) => {
  ;[...word].forEach((ch, i) => {
    const r = h ? row : row + i
    const c = h ? col + i : col
    if (r < ROWS && c < COLS) {
      grid[r][c] = { char: ch, isVertical: !h }
    }
  })
})

const restantes = ['AUTENTICIDAD', 'SENSIBILIDAD', 'INNOVACION', 'EXPRESION', 'RESPETO']

export function ValoresCrucigrama() {
  return (
    <div className="flex-1 grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-0 min-h-0 items-center">

      {/* ── Crucigrama ─────────────────────────────────────── */}
      <div className="flex items-center justify-center h-full py-2">
        <div
          className="grid w-full"
          style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
        >
          {grid.map((row, r) =>
            row.map((cell, c) => (
              <div
                key={`${r}-${c}`}
                className="flex items-center justify-center"
                style={{ aspectRatio: '1/1' }}
              >
                {cell ? (
                  <span
                    className="font-display leading-none select-none"
                    style={{
                      fontSize: 'clamp(1rem, 4.5vw, 4rem)',
                      color: cell.isVertical ? 'var(--color-accent)' : 'var(--color-fg)',
                    }}
                  >
                    {cell.char}
                  </span>
                ) : (
                  <span
                    className="select-none"
                    style={{ fontSize: 'clamp(0.4rem, 0.6vw, 0.5rem)', color: 'rgba(10,10,10,0.08)' }}
                  >
                    ·
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      {/* ── Valores restantes ──────────────────────────────── */}
      <div className="flex flex-col border-l border-fg/10 pl-8 md:pl-10 h-full justify-center gap-3 py-4">
        {restantes.map((v) => (
          <div key={v} className="border-t border-fg/10 pt-3">
            <span
              className="font-display leading-none text-muted hover:text-fg transition-colors duration-300 cursor-default"
              style={{ fontSize: 'clamp(1.2rem, 2.8vw, 2.8rem)' }}
            >
              {v}
            </span>
          </div>
        ))}
        <div className="border-t border-fg/10" />
      </div>

    </div>
  )
}
