import type { Metadata } from 'next'

// Ruta secreta: fuera de buscadores y sin enlaces desde la navegación.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
}

export default function RuletaLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
