import { Tab, TabGroup, TabList } from "@tremor/react"
import { Difficult } from "../types/gameTypes"
import { useContext } from "react"
import { GameContext } from "../context/GameProvider"

export const DifficultTab = () => {
  const { dispatch } = useContext(GameContext)

  const handlerOnClic = (difficult: Difficult) => {
    dispatch({ type: 'CHANGE_DIFFICULT', difficult })
  }

  return (
    <TabGroup>
      <TabList>
        {Object.values(Difficult).map(difficult => {
          return (
            <Tab
              key={`difficultTab-${difficult}`}
              onClick={() => handlerOnClic(difficult)}
            >
              {difficult}
            </Tab>
          )
        })}
      </TabList>
    </TabGroup>
  )
}