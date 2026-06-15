export interface Credit {
  role: string
  name: string
  url?: string
}

export interface Edition {
  slug: string
  title: string
  subtitle: string
  color: string
  colorLight: string
  date: string
  artists: string[]
  credits: Credit[]
  description: string
  setlist: string[]
  coverImage?: string
  images?: string[]
  video?: string
}

export const editions: Edition[] = [
  {
    slug: 'mellon-collie',
    title: 'Mellon Collie',
    subtitle: 'Primera Edición',
    color: '#E8621A',
    colorLight: '#F07840',
    date: '2026',
    artists: ['Mellon Collie', 'Alejandro Peña'],
    credits: [
      { role: 'músico', name: 'Mellon Collie', url: 'https://instagram.com/mellon_collie_mx' },
      { role: 'artista visual', name: 'Alejandro Peña', url: 'https://instagram.com/marchant.dart' },
      { role: 'lugar', name: 'ATL Café', url: 'https://atlcafe.mx' },
    ],
    description:
      'La primera edición de El Taller sucedió dentro del taller de arte de ATL Café. Mientras Mellon Collie interpretaba una sesión acústica inspirada en el formato Tiny Desk, el artista visual Alejandro Peña pintaba al óleo en vivo un lienzo basado en las emociones que la música le provocaba en tiempo real. Dos disciplinas creativas coexistiendo en el mismo espacio, al mismo tiempo. Ese momento define la esencia de El Taller: crear un punto de encuentro donde la creación sucede frente a ti y la experiencia se vuelve colectiva.',
    coverImage: '/3.jpg',
    setlist: [],
    images: [
      '/1.jpg',
      '/2.jpg',
      '/3.jpg',
      '/4.jpg',
    ],
    video: '/video-mellon.mp4',
  },
]

export function getEdition(slug: string): Edition | undefined {
  return editions.find((e) => e.slug === slug)
}
