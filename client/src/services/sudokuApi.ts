import axios from "axios"
import { IFetchSudokuData, ISudokuData } from "../types/apiTypes"
import { Difficult } from "../types/gameTypes"

const sudokuApiUrl = 'http://localhost:3001/api'

export const INIT_DATA_SUDOKU: ISudokuData = {
  solved: [],
  unsolved: [],
  difficult: Difficult.Easy
}

export const getSudokuData = async ({difficult, setState}: IFetchSudokuData) => {
  try {
    const {data} = await axios.get(`${sudokuApiUrl}/${difficult}`)
    setState(data)
  } catch(err) {
    console.error(err)
  }
}