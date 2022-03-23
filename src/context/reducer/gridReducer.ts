import {LevelData, CellData} from '../interfaces';
import {locToString, loopNeighbours, getCellValue} from '../../helper';

export const newGame = (payload: LevelData): CellData[] => {
    const { numOfMines, numOfCols, numOfRows } = payload;
  
    const randomMines: string[] = [];
    const cellsNearMine: string[] = [];
  
    while (randomMines.length < numOfMines) {
      const id = locToString(
        Math.floor(Math.random() * numOfRows),
        Math.floor(Math.random() * numOfCols)
      );
  
      if (!randomMines.includes(id)) {
        randomMines.push(id);
      }
    }
  
    randomMines.map((id) => {
      loopNeighbours(id, numOfRows, numOfMines).map((neighbourId) => !randomMines.includes(neighbourId) && cellsNearMine.push(neighbourId))  
    })
  
  
    let grid: CellData[] = [];
    for (let x = 0; x < numOfRows; x++) {
      for (let y = 0; y < numOfCols; y++) {
        let id = locToString(x, y);
        grid.push({
          id,
          value: getCellValue(cellsNearMine, id),
          isOpen: false,
          isFlagged: false,
          hasMine: randomMines.includes(id),
        });
      }
    }
  
    return grid;
  };
  