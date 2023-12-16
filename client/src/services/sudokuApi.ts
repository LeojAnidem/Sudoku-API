import axios from "axios"
import { IFetchSudokuData, ISudokuData } from "../types/apiTypes"
import { IElement } from "../types/gameTypes"
import { createBoardGame } from "../utils/boardFn"

const SUDOKU_API_URL = 'http://localhost:3001/api'

export const getSudokuData = async ({difficult}: IFetchSudokuData) => {
  try {
    const {data} : {data: ISudokuData} = await axios.get(`${SUDOKU_API_URL}/${difficult}`)
    return createBoardGame(data)
  } catch(err) {
    const data: IElement[][] = []
    console.error(err)
    return data
  }
}