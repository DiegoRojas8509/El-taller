'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const links = [
  { href: '/nosotros', label: 'nosotros' },
  { href: '/ediciones', label: 'ediciones' },
  { href: '/registro', label: 'registro' },
  { href: '/proximamente', label: 'próximamente' },
  { href: '/contacto', label: 'contacto' },
]

interface NavbarProps {
  white?: boolean
}

export function Navbar({ white = false }: NavbarProps) {
  const pathname = usePathname()

  return (
    <nav className="flex items-center justify-center gap-5 md:gap-16 lg:gap-24">
      {links.map(({ href, label }) => (
        <Link
          key={href}
          href={href}
          className={`nav-link font-body tracking-nav ${
            pathname.startsWith(href) ? 'active' : ''
          }`}
          style={
            white
              ? {
                  color: pathname.startsWith(href)
                    ? '#F5F5F2'
                    : 'rgba(245,245,242,0.45)',
                }
              : undefined
          }
        >
          {label}
        </Link>
      ))}
    </nav>
  )
}
