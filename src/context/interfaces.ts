import { LevelOptions, ActionTypes, GameStatus } from './enums';

export interface CellData {
  id: string;
  value: number;
  isOpen: boolean;
  isFlagged: boolean;
  hasMine: boolean;
}

export interface LevelData {
  numOfCols: number;
  numOfRows: number;
  numOfMines: number;
  name: LevelOptions;
}

export type Dispatch = (action: Action) => void;

export interface MainProviderProps {
  children: React.ReactNode;
}

export interface Action {
  type: ActionTypes;
  payload?: string | LevelData | LevelOptions;
}

export interface State {
  usedFlags: number,
  openedCells: number;
  level: LevelData;
  gameStatus: GameStatus;
  grid: CellData[];
  timer: {
    isActive: boolean;
    seconds: number;
  },
  score:{
    [LevelOptions.Easy]: number,
    [LevelOptions.Intermediate]: number,
    [LevelOptions.Expert]: number,
  }
}

export interface LevelSelectorProps {
  level: LevelOptions,
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

export const Levels = {
  [LevelOptions.Easy]: {
    name: LevelOptions.Easy,
    numOfCols: 9,
    numOfRows: 9,
    numOfMines: 10,
  },
  [LevelOptions.Intermediate]: {
    name: LevelOptions.Intermediate,
    numOfCols: 16,
    numOfRows: 16,
    numOfMines: 40,
  },
  [LevelOptions.Expert]: {
    name: LevelOptions.Expert,
    numOfCols: 30,
    numOfRows: 16,
    numOfMines: 99,
  },
};
