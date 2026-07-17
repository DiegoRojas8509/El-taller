export function CupoLleno() {
  return (
    <div>
      <p className="font-body text-xs tracking-widest uppercase mb-4 text-muted">
        cupo agotado
      </p>
      <h1
        className="font-display text-fg mb-6"
        style={{ fontSize: 'clamp(2.2rem, 6vw, 4rem)' }}
      >
        Se llenaron los <span className="text-accent">100 lugares</span>
      </h1>
      <p className="font-body text-base text-fg/80 leading-relaxed">
        Gracias por el interés — el cupo para este evento ya se completó. Si ya te
        registraste antes, tu lugar sigue en proceso de confirmación normal, no
        necesitas hacer nada más.
      </p>
    </div>
  )
}
