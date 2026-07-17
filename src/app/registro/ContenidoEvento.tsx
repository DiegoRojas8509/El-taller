import { RevealText } from '@/components/RevealText'

export function ContenidoEvento() {
  return (
    <div className="flex flex-col gap-20 px-6 md:px-16 lg:px-24 py-20 max-w-3xl mx-auto">
      <RevealText>
        <p className="font-body text-xs tracking-widest uppercase mb-4 text-muted">
          Lo que debes de saber :)
        </p>
        <h2
          className="font-display text-fg mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          Conoce a los artistas
        </h2>
        <p className="font-body text-base text-fg/80 leading-relaxed">
          <strong>Mellon Collie</strong> (banda) y <strong>Alejandro Peña</strong> (pintor
          ) fueron los invitados de la primera edición de El Taller. Mientras Mellon
          Collie interpretaba una sesión acústica inspirada en el formato Tiny Desk,
          Alejandro pintaba al óleo en vivo un lienzo basado en las emociones que la
          música le provocaba en tiempo real — dos disciplinas coexistiendo en el mismo
          espacio, al mismo tiempo. Para comenzar nos van a compartir un poco de quiénes
          son, qué hacen y cómo vivieron esa experiencia dentro de El Taller.
        </p>
      </RevealText>

      <RevealText>
        
        <h2
          className="font-display text-fg mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          Presentación del video oficial
        </h2>
        <p className="font-body text-base text-fg/80 leading-relaxed">
          Una producción audiovisual profesional que comparte por completo la primera
          edición, con los créditos y los nombres de todas las personas que fueron parte
          de esa noche. Se proyecta en vivo dentro de una de las salas de TV4.
        </p>
      </RevealText>

      <RevealText>
      
        <h2
          className="font-display text-fg mb-4"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)' }}
        >
          La hora del sorteo
        </h2>
        <p className="font-body text-base text-fg/80 leading-relaxed">
          Entre todos los participantes y asistentes se sortea la pintura original que
          Alejandro Peña creó en vivo durante la primera edición — entregada en persona
          por los colaboradores y por el propio Alejandro.
        </p>
      </RevealText>
    </div>
  )
}
