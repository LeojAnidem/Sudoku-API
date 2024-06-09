import { FC } from "react"
import { statics } from "../../../types/gameTypes"

export const StatisticsComponent: FC<{statics: statics[]}> = ({statics}) => {
  const sortStatics = structuredClone(statics)
    .sort((a, b) => a.name.length - b.name.length)

  const INITIAL_VAl : {
    names: string[], 
    values: (number | string)[]
  } = { names: [], values: [] }

  const objSortByKey = sortStatics.reduce((acc, cur) => {
    acc.names.push(cur.name)
    acc.values.push(cur.value)
    return acc
  }, INITIAL_VAl)
  
  return (
    <div
      className="
        grid row-auto grid-flow-row grid-col-[1fr_min-content]
        gap-2 items-center text-base select-none cursor-pointer
      "
      onContextMenu={(e) => {e.preventDefault()}}
    >
      {objSortByKey.names.map((name, i) => {
        return (
          <span
            className={`
              p-2 rounded-md leading-none
              col-start-1 row-start-${i + 1}
              bg-dark-tremor-brand-subtle
            `}
            key={`staticts-name-${i}`}
          >
            {name}
          </span>
        )
      })}
      {objSortByKey.values.map((value, i) => {
        return (
          <span
            className={`
              border-b-2 text-center
              col-start-2 row-start-${i + 1}
              border-dark-tremor-brand-subtle
            `}
            key={`staticts-value-${i}`}
          >
            {value}
          </span>
        )
      })}
    </div>
  )
}