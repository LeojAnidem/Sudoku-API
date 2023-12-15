import axios from "axios"
import { IFetchSudokuData, ISudokuData } from "../types/apiTypes"
import { IElement } from "../types/gameTypes"
import { createBoardGame } from "../utils/boardFn"

const SUDOKU_API_URL = 'http://localhost:3001/api'

export const INIT_DATA_SUDOKU: IElement[][] = []

export const getSudokuData = async ({difficult, setState}: IFetchSudokuData) => {
  try {
    const {data} : {data: ISudokuData} = await axios.get(`${SUDOKU_API_URL}/${difficult}`)
    const parsedData = createBoardGame(data)
    setState(parsedData)
  } catch(err) {
    console.error(err)
  }
}