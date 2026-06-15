import { notFound } from 'next/navigation'
import { getEdition, editions } from '@/lib/editions'
import { EditionPageClient } from './EditionPageClient'

export function generateStaticParams() {
  return editions.map((e) => ({ slug: e.slug }))
}

interface Props {
  params: { slug: string }
}

export default function EdicionPage({ params }: Props) {
  const edition = getEdition(params.slug)
  if (!edition) notFound()

  return <EditionPageClient edition={edition} />
}
