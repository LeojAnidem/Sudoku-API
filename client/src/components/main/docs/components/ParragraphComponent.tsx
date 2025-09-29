import React from "react"
import { highLightText } from "../../../../utils/highLightText"
import "./styles/ParragraphStyles.css"

interface IParragraph extends React.ParamHTMLAttributes<HTMLParagraphElement> {
  children: string,
  className?: string,
}

/**
 * Procesa un texto para encontrar palabras entre ** y las resalta.
 * @param {string} children El texto de entrada, por ejemplo: "hola **mundo** como **estas**"
 * @param {string} className Puedes cambiar el estilo del componente agregando un nuevo className,
 * tambien se creeara un **className__highlight** donde podras cambiar el estilo de resaltado, donde **className**
 * hace referencia al nombre usado en el atributo del mismo nombre.
 */
export const ParragraphComponent: React.FC<IParragraph> = ({children, className, ...props}) => {  
  return (
    <p 
      className={`${className ?? 'parragraph__text'}`}
      {...props}
    >
      {highLightText(children).map((fragment, i) => {
        return(
          <span
            key={`Parragraph-${i}`}
            className={`${fragment.highlight && `${className ?? 'parragraph'}__highlight`}`}
          >
            {fragment.text}
          </span>
        )
      })}
    </p>
  )
}