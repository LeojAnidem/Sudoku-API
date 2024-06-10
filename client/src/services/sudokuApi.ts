import axios from "axios"
import { IFetchSudokuData, ISudokuData } from "../types/apiTypes"
import { ElementType } from "../types/gameTypes"
import { createBoardGame } from "../utils/boardFn"

// remover 'window.location.href' cuando se vaya a hacer deploy
const SUDOKU_API_URL = `${window.location.href ?? 'http://localhost:3001/'}api`

export const getSudokuData = async ({difficult}: IFetchSudokuData) => {
  try {
    const {data} : {data: ISudokuData} = await axios.get(`${SUDOKU_API_URL}/${difficult}`, {
      headers: {
        "ngrok-skip-browser-warning": "69420"
      }
    })
    return createBoardGame(data)
  } catch(err) {
    const data: ElementType[][] = []
    console.error(err)
    return data
  }
}