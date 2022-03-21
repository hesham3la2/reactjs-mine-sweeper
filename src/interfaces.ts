export {}
// import { LevelOptions, GameStatus, ClickType } from './enums';

// export interface CellData {
//   id: string;
//   value: number;
//   isOpen: boolean;
//   isFlagged: boolean;
//   hasMine: boolean;
// }

// export interface Level {
//   id: LevelOptions;
//   numberOfCols: number;
//   numberOfRows: number;
//   numOfMines: number;
// }

// export interface CellProps {
//   location: [number, number];
//   cell: CellData;
//   cellWidth: number;
//   isDisabled: boolean;
//   updateCell: (
//     location: [number, number],
//     newCell: CellData,
//     clickType: ClickType
//   ) => void;
// }

// export interface MainContextState {
//   level: LevelOptions;
//   gameStatus: GameStatus;
//   flagsCount: number;
//   cols: number;
//   grid: CellData[];
// }

// export interface Action {
//   type: string;
//   payload: any;
// }