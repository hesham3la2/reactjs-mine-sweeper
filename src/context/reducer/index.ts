import { ActionTypes, GameStatus, LevelOptions } from '../enums';
import { State, Action, LevelData, Levels } from '../interfaces';
import {
  toogleFlag,
  mineClicked,
  cellWithValueClicked,
  emptyCellClicked,
} from './cellReducer';
import { newGame } from './gridReducer';

export function mainReducer(state: State, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case ActionTypes.TOGGLEFLAG:
      return toogleFlag(state, payload as string);

    case ActionTypes.NEWGAME:
      const grid = newGame(state.level as LevelData);
      return {
        ...state,
        timer: {
          isActive: false,
          seconds: 0
        },
        usedFlags: state.level.numOfMines,
        grid,
      };

    case ActionTypes.LEVELCHANGE:
      const levelData = Levels[payload as LevelOptions];
      return {
        ...state,
        timer: {
          isActive: false,
          seconds: 0
        },
        usedFlags: levelData.numOfMines,
        openedCells: 0,
        level: levelData,
        gameStatus: GameStatus.Active,
        grid: newGame(levelData),
      };

    case ActionTypes.MINECLICK:
      return {
        ...state,
        timer: {
          ...state.timer,
          isActive: false
        },
        gameStatus: GameStatus.Fail,
        grid: mineClicked(state.grid, payload as string),
      };

    case ActionTypes.CELLWITHVALUECLICKED:
      return {
        ...cellWithValueClicked(state, payload as string),
      };

    case ActionTypes.EMPTYCELLCLICKED:
      return {
        ...emptyCellClicked(state, payload as string),
      };

    case ActionTypes.GAMEPAUSED:
      return {
        ...state,
        timer: {
          ...state.timer,
          isActive: false
        },
        gameStatus:
          state.gameStatus == GameStatus.Active
            ? GameStatus.Paused
            : state.gameStatus,
      };

    case ActionTypes.GAMERESTORED:
      return {
        ...state,
        timer: {
          ...state.timer,
          isActive: true,
        },
        gameStatus:
          state.gameStatus == GameStatus.Paused
            ? GameStatus.Active
            : state.gameStatus,
      };

    case ActionTypes.SECSICREMENT:
      return {
        ...state,
        timer: {
          ...state.timer,
          seconds: state.timer.seconds + 1,
        },
      };

      case ActionTypes.TIMERSTART:
      return {
        ...state,
        timer: {
          isActive: true,
          seconds: 0,
        },
      };

    case ActionTypes.RESTARTGAME:
      return {
        ...state,
        timer: {
          isActive: false,
          seconds: 0
        },
        usedFlags: state.level.numOfMines,
        openedCells: 0,
        level: state.level,
        gameStatus: GameStatus.Active,
        grid: newGame(state.level),
      };

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
