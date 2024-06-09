import { useState } from "react";
import { DifficultSelector } from '../individual/DifficultSelector';
import { ResumeComponent } from "../individual/ResumeComponent";

export const WinScreenComponent = () => {
  const [canGo, setCanGo] = useState(false)

  return (
    <div className="game_screen">
      {canGo
        ? <DifficultSelector onClick={() => {setCanGo(false)}}/>
        : <ResumeComponent onClick={() => {setCanGo(true)}} />
      }
    </div>
  )
}