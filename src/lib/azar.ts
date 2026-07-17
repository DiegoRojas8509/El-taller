// Entero aleatorio en [0, n) sin sesgo.
//
// `Math.random() * n` y `valor % n` reparten mal: cuando n no divide
// exactamente el rango, los primeros índices salen un pelo más seguido que
// los últimos. En un sorteo real eso beneficia a unos sobre otros, así que
// usamos el generador criptográfico del navegador y descartamos los valores
// que caen en el sobrante (rejection sampling).
export function enteroAleatorio(n: number): number {
  if (n <= 0) throw new Error('n debe ser mayor a 0')

  const limite = Math.floor(0x100000000 / n) * n
  const buffer = new Uint32Array(1)

  let valor: number
  do {
    crypto.getRandomValues(buffer)
    valor = buffer[0]
  } while (valor >= limite)

  return valor % n
}
