import { Tab, TabGroup, TabList } from "@tremor/react"
import { Difficult } from "../types/gameTypes"

export const DifficultTab = () => {
  return (
    <TabGroup>
      <TabList>
        {Object.values(Difficult).map(difficult => {
          return (
            <Tab key={`difficultTab-${difficult}`}>
              {difficult}
            </Tab>
          )
        })}
      </TabList>
    </TabGroup>
  )
}