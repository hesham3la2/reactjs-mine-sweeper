export {}
// import { ActionTypes, GameStatus, LevelOptions } from './enums';
// import { MainContextState, Action, CellData } from './interfaces';
// import { locToString, loopNeighbours, getCellValue } from './context/helper';

// const Levels = {
//   [LevelOptions.Easy]: {
//     numberOfCols: 9,
//     numberOfRows: 9,
//     numOfMines: 10,
//   },
//   [LevelOptions.Intermediate]: {
//     numberOfCols: 16,
//     numberOfRows: 16,
//     numOfMines: 40,
//   },
//   [LevelOptions.Expert]: {
//     numberOfCols: 30,
//     numberOfRows: 16,
//     numOfMines: 99,
//   },
// };

// const toggleFlag = (grid: CellData[], payload: string) => {
//   const _grid = [...grid];
//   const index = _grid.findIndex((obj) => obj.id == payload);
//   _grid[index].isFlagged = !_grid[index].isFlagged;
//   return _grid;
// };

// const newGame = (state: MainContextState, payload: LevelOptions) => {
//   const level = payload || state.level;
//   const { numOfMines, numberOfCols, numberOfRows } = Levels[level];

//   const randomMines: string[] = [];
//   const cellsNearMine: string[] = [];

//   while (randomMines.length < numOfMines) {
//     const id = locToString(
//       Math.floor(Math.random() * numberOfRows),
//       Math.floor(Math.random() * numberOfCols)
//     );

//     if (!randomMines.includes(id)) {
//       randomMines.push(id);
//     }
//   }

//   randomMines.map((id) => {
//     loopNeighbours(id, numberOfRows, numOfMines).map((neighbourId) => !randomMines.includes(neighbourId) && cellsNearMine.push(neighbourId))  
//   })


//   let grid: CellData[] = [];
//   for (let x = 0; x < numberOfRows; x++) {
//     for (let y = 0; y < numberOfCols; y++) {
//       let id = locToString(x, y);
//       grid.push({
//         id,
//         value: getCellValue(cellsNearMine, id),
//         isOpen: false,
//         isFlagged: false,
//         hasMine: randomMines.includes(id),
//       });
//     }
//   }

//   return {
//     level,
//     grid,
//     cols: numberOfCols,
//     gameStatus: GameStatus.Active,
//     flagsCount: numOfMines,
//   };
// };

// const levelChangeReducer = (state: MainContextState, payload: LevelOptions) => {
//     return {
//         ...state,
//         level: payload
//     }
// }

// export const reducer = (state: MainContextState, action: Action) => {
//   switch (action.type) {
//     case ActionTypes.ToggleFlag:
//       return {
//         ...state,
//         grid: toggleFlag(state.grid, action.payload),
//       };
//       break;

//     case ActionTypes.NewGame:
//       newGame(state, action.payload);
//       break;

//     case ActionTypes.LevelChange:
//       levelChangeReducer(state, action.payload);
//       newGame(state, action.payload);
//       break;



//     default:
//       break;
//   }
// };

// export default reducer;
