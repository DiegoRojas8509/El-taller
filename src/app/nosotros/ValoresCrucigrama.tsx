'use client'

// ── Crucigrama: 3 palabras con intersecciones válidas ─────────────
// CONEXION(V) col 5. COMUNIDAD(H) arranca en la C de CONEXION (row 0, col 5).
// CREATIVIDAD(H) cruza CONEXION en I (row 5, col 5).

const ROWS = 8
const COLS = 14

const crossword = [
  { word: 'CONEXION',    h: false, row: 0, col: 5 },   // vertical,  C en (0,5)
  { word: 'COMUNIDAD',   h: true,  row: 0, col: 5 },   // horizontal, C[0] = CONEXION[0] en (0,5) ✓
  { word: 'CREATIVIDAD', h: true,  row: 5, col: 0 },   // horizontal, I[5] = CONEXION[5] en (5,5) ✓
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
    <div className="flex-1 flex flex-col md:grid md:grid-cols-[3fr_2fr] gap-6 md:gap-0 min-h-0 md:items-center overflow-y-auto md:overflow-hidden">

      {/* ── Crucigrama ─────────────────────────────────────── */}
      <div className="flex items-center justify-center shrink-0 md:h-full md:py-2">
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
                      fontSize: 'clamp(0.75rem, 3.5vw, 3.5rem)',
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
      <div className="flex flex-col md:border-l border-t md:border-t-0 border-fg/10 md:pl-10 pt-4 md:pt-0 md:h-full md:justify-center gap-2 shrink-0">
        {restantes.map((v) => (
          <div key={v} className="border-b border-fg/10 pb-2">
            <span
              className="font-display leading-none text-muted hover:text-fg transition-colors duration-300 cursor-default"
              style={{ fontSize: 'clamp(1.2rem, 2.8vw, 2.8rem)' }}
            >
              {v}
            </span>
          </div>
        ))}
      </div>

    </div>
  )
}
