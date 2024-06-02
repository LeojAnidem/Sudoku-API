import { IconInformation } from "../../icons/IconInformation"

export const DrawComponent = () => {
  return (
    <button
      className="
        w-12 h-12 select-none cursor-pointer relative
      "
      onContextMenu={(e) => e.preventDefault()}
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