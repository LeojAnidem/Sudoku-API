import React, { ReactNode, useRef, useState } from "react"
import { formatHtml } from "../../../../utils/formatHtml"
import { IconCopy } from "../../../icons/IconCopy"
import "./styles/linkSpace.css"

interface ILinkSpace extends React.HtmlHTMLAttributes<HTMLDivElement> {
  children: ReactNode
  className?: string
}

/**
 * 
 * @param {ReactNode} children Representa lo que este entre las etiquetas **<LinkSpace></LinkSpace>**
 * @param {string} className Puedes cambiar el estilo del componente agregando un nuevo className
 * se agregaran nuevas clases a los elementos, puedes editarlos como <br>
 * (**className__text**<br>, 
 * **className__btn**<br>, 
 * **className__tooltip**<br> )
 * donde **className** representa el nombre dado en el atributo del mismo nombre.
 * @returns Componente de react con estilos predefinido
 * acompanado de un boton para que el usuario pueda copiar
 * el texto contenido en **children**
 */

export const LinkSpace:React.FC<ILinkSpace> = ({children, className, ...props}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isStartFadeOut, setIsStartFadeOut] = useState(false)
  const spaceRef = useRef<HTMLDivElement>(null)

  const handleOnClic = () => {
    if (spaceRef.current) {
      debugger
      const htmlToCopy = formatHtml(spaceRef.current.innerHTML)
      navigator.clipboard.writeText(htmlToCopy.trim())
        .then(() => {
          setIsVisible(true)

          setTimeout(() => {
            setIsStartFadeOut(true)
          }, 1000)
      
          setTimeout(() => {
            setIsVisible(false)
            setIsStartFadeOut(false)
          }, 1600)
        })
        .catch(err => {
          console.error('Error to copy:', err)
        })
    }
  }

  return (
    <div
      className={`${className ?? "linkSpace"}`}
      {...props}
    >
      <span ref={spaceRef} className={`${className ?? "linkSpace"}__text`}>
        {children}
      </span>
      <button
        className={`${className ?? "linkSpace"}__btn`}
        onClick={handleOnClic}
      >
        <IconCopy/>
        <span className={`${className ?? "linkSpace"}__tooltip 
          ${isVisible ? 'opacity-100' : 'invisible'}
          ${isStartFadeOut ? 'opacity-0' : ''}
          `}
        >
          Copied!
        </span>
      </button>
    </div>
  )
}