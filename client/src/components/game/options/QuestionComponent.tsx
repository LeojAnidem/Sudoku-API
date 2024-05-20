import { IconInformation } from "../../icons/IconInformation"

export const QuestionComponent = () => {
  return (
    <button
      className="
        w-12 h-12 select-none cursor-pointer
        stroke-tremor-brand-emphasis

        hover:stroke-tremor-brand-subtle
      "
    >
      <IconInformation className="w-full h-full"/>
    </button>
  )
}