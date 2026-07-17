// Sin O, I, L, 0, 1 — evita confusiones al leer/escribir el código a mano
const ALFABETO = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789'

export function generarCodigo() {
  let sufijo = ''
  for (let i = 0; i < 4; i++) {
    sufijo += ALFABETO[Math.floor(Math.random() * ALFABETO.length)]
  }
  return `TALLER-${sufijo}`
}
