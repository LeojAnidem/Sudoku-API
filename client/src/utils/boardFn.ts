import { ISudokuData } from "../types/apiTypes";
import { IElement } from "../types/gameTypes";

const organizeToBoardElement = (boardData:IElement[][]) => {
	const organizeArr = [];

  for (let i = 0; i < boardData.length; i += 3) {
    for (let j = 0; j < boardData[i].length; j += 3) {
      const subArray = [];

      for (let k = 0; k < 3; k++) {
        subArray.push(...boardData[i + k].slice(j, j + 3));
      }

      organizeArr.push(subArray);
    }
  }

  return organizeArr;
}

const convertBoardToData = (board: ISudokuData) => {
  const boardData = [];
	const {solved, unsolved} = board

  for (let row = 0; row < solved.length; row++) {
    const group = [];

    for (let col = 0; col < solved[row].length; col++) {
			const elt: IElement = {
				value: solved[row][col],
				pos: {col, row},
				isUnsolved: unsolved[row][col] === 0,
			}
			group.push(elt);
		}
    boardData.push(group);
  }

  return boardData;
}

export const createBoardGame = (board: ISudokuData) => {
	const boardData = convertBoardToData(board)
	return organizeToBoardElement(boardData)
}