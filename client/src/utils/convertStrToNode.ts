interface Iacc {
  isATag: Boolean,
  startTag?: string,
  endTag?: string,
  text?: string,
}

interface IaccDef {
  items: Iacc[],
  skipIdx: number[]
}

/**
 * nodifity es una funcion que prepara los objetos para poder
 * renderizarlos en LinkSpace con sus correspondientes colores y etiquetas
 * 
 * @param array
 * @returns 
 */

export const nodifity = (array: string[]) => {
  const accDefault: IaccDef = {
    items: [],
    skipIdx: []
  }

  const verifyIsATag = (str: string) => str.startsWith('<') && str.endsWith('>')
  const removeTab = (str: string) => str.slice(str.indexOf('<'), str.length+1)

  return array.reduce((acc, elt, i, arr) => {
    if (acc.skipIdx.find(idx => idx === i)) return acc

    let startTag = ''
    let endTag = ''
    let isATag = false
    let text = ''

    const setUpElt = removeTab(elt)
    isATag = verifyIsATag(setUpElt)
    
    if (isATag) {
      startTag = setUpElt
      const idxEndFirstTag = setUpElt.indexOf('>')
      const firstTag = setUpElt.slice(0, idxEndFirstTag+1)
      
      const sliceElt = setUpElt.slice(idxEndFirstTag+1, setUpElt.length + 1)
      const idxStrSecondTag = sliceElt.indexOf('<')
      
      if (idxStrSecondTag !== -1) {
        // lo ideal seria que se agregue un nuevo elemento al array
        text = sliceElt.slice(0, idxStrSecondTag)
        startTag = firstTag
        endTag = sliceElt.slice(idxStrSecondTag, sliceElt.length + 1)
      }
      
      const idxEndTag = arr.findIndex((e, y) =>
        e.search(elt) &&
        y!==i &&
        e.lastIndexOf(' ') == elt.lastIndexOf(' ')
      )
    
      if (idxEndTag !== -1) {
        endTag = removeTab(arr[idxEndTag])
        acc.skipIdx.push(i, idxEndTag)
      }
    } else {
      text = elt
    }

    acc.items.push(
      {
        isATag,
        startTag,
        endTag,
        text
      }
    )
    
    return acc
  }, accDefault)
}