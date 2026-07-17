import type { Metadata, Viewport } from 'next'
import { Bebas_Neue, Inter, Big_Shoulders_Display } from 'next/font/google'
import './globals.css'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const bigShoulders = Big_Shoulders_Display({
  weight: ['900'],
  subsets: ['latin'],
  variable: '--font-big-shoulders',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'El Taller',
  description:
    'Una experiencia multisensorial en vivo. Música, arte y comunidad coexistiendo.',
  manifest: '/manifest.json',
  icons: {
    icon: [
      { url: '/logo-negro.png', media: '(prefers-color-scheme: light)', type: 'image/png' },
      { url: '/logo-blanco.png', media: '(prefers-color-scheme: dark)', type: 'image/png' },
    ],
    apple: '/icon-192.png',
  },
  openGraph: {
    title: 'El Taller',
    description: 'Una experiencia multisensorial en vivo.',
    type: 'website',
  },
}

export const viewport: Viewport = {
  themeColor: '#E8621A',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className={`${bebasNeue.variable} ${inter.variable} ${bigShoulders.variable}`}>
      <body className="bg-[var(--color-bg)] text-[var(--color-fg)] font-body antialiased">
        {children}
      </body>
    </html>
  )
}
