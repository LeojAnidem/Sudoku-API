interface HighlightPart {
  text: string;
  highlight: boolean;
}

/**
 * Procesa un texto para separar las palabras envueltas en doble asterisco (**) 
 * del texto normal, devolviendo una estructura que facilita su renderizado con 'highlight'.
 * * @param {string} text El texto de entrada, por ejemplo: "hola buenos **dias**"
 * @returns {Array<HighlightPart>} Un array de objetos que contienen el fragmento de texto 
 * y un booleano para indicar si debe ser resaltado.
 */
export const highLightText = (text: string): HighlightPart[] => {
  const regex = /(\*\*)/g
  const parts = text.split(regex).filter(p => p.length > 0)
  const result: HighlightPart[] = []
  let inHighlightBlock = false

  for (const part of parts) {
    if (part === "**") {
      inHighlightBlock = !inHighlightBlock
      continue
    }

    result.push({
      text: part,
      highlight: inHighlightBlock
    })
  }

  return result
}