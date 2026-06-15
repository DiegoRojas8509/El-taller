import Link from 'next/link'
import Image from 'next/image'

interface HeaderProps {
  white?: boolean
}

export function Header({ white = false }: HeaderProps) {
  return (
    <header className="w-full px-6 md:px-16 lg:px-24 pt-8 pb-0 flex justify-center">
      <Link href="/" data-cursor-hover aria-label="Regresar al inicio">
        <Image
          src={white ? '/logo-blanco.png' : '/logo-negro.png'}
          alt="El Taller"
          width={80}
          height={80}
          className="w-[80px] md:w-[96px] h-auto"
        />
      </Link>
    </header>
  )
}
