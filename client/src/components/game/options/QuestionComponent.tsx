import { IconInformation } from "../../icons/IconInformation"

export const QuestionComponent = () => {
  return (
    <button
      className="w-12 h-12 select-none cursor-pointer relative"
    >
      <IconInformation
        className="
          w-full h-full stroke-tremor-brand-emphasis
          hover:stroke-tremor-brand-subtle
        "
      />
      { false && 
        <div
          className={`
            absolute w-72 -top-16 -right-0 p-2 rounded-lg 
            text-white font-semibold text-sm
            bg-dark-tremor-brand-subtle
            shadow-black shadow-md
          `}
        >
          Los números no deben repetirse en ninguna fila, columna o subcuadrícula.
          <div
            className="
              absolute w-0 h-0 -bottom-2.5 right-3
              border-l-[12px] border-l-transparent
              border-t-[20px] border-t-dark-tremor-brand-subtle
              border-r-[12px] border-r-transparent
            "
          />
        </div>
      }
    </button>
  )
}