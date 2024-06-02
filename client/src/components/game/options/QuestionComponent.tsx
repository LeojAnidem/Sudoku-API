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
    </button>
  )
}