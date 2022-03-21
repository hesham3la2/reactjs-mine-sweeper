import { CellData, State } from '../interfaces';
import { loopNeighbours, stringToLoc } from '../helper';
import { GameStatus } from '../enums';

export const toogleFlag = (state: State, payload: string): State => {
  let usedFlagsCounter = state.usedFlags;
  const _grid = state.grid.map((cell) => {
    let _cell = { ...cell };
    if (cell.id == payload) {
      if (_cell.isFlagged) 
        usedFlagsCounter++;
      else 
        usedFlagsCounter--;

      _cell.isFlagged = !cell.isFlagged;
    }
    return { ..._cell };
  });

  return {
    ...state,
    usedFlags: usedFlagsCounter,
    grid: _grid,
  };
};

export const mineClicked = (grid: CellData[], payload: string): CellData[] => {
  const _grid = grid.map((cell) => {
    let _cell = { ...cell };
    if (cell.id == payload) {
      _cell.value = -1;
      _cell.isOpen = true;
    } else if (cell.hasMine) {
      _cell.isOpen = true;
    }
    return { ..._cell };
  });

  return _grid;
};

export const cellWithValueClicked = (state: State, payload: string): State => {
  const { numOfCols, numOfMines, numOfRows } = state.level;
  let counter = state.openedCells;
  const _grid = state.grid.map((cell) => {
    let _cell = { ...cell };
    if (cell.id == payload) {
      counter++;
      _cell.isOpen = true;
    }
    return { ..._cell };
  });

  const nonMineCells = numOfCols * numOfRows - numOfMines;

  return {
    ...state,
    openedCells: counter,
    gameStatus: nonMineCells == counter ? GameStatus.Win : GameStatus.Active,
    grid: _grid,
  };
};

export const emptyCellClicked = (state: State, payload: string): State => {
  const { numOfCols, numOfRows, numOfMines } = state.level;
  let counter = state.openedCells;

  function propagateOpening(id: string, collection: string[] = []) {
    let [x, y] = stringToLoc(id);
    let deepNeighbours: string[] = [];
    let filteredCollection: string[] = [];
    let newCollection = loopNeighbours(id, numOfRows, numOfCols);

    filteredCollection = newCollection.filter((newId) => {
      const index = state.grid.findIndex((cell) => cell.id == newId);
      return (
        !collection.includes(newId) &&
        !state.grid[index].isFlagged &&
        !state.grid[index].isOpen
      );
    });

    for (let i = 0; i < filteredCollection.length; i++) {
      const filteredId = filteredCollection[i];
      const index = state.grid.findIndex((cell) => cell.id == filteredId);
      let neighbour = state.grid[index];
      if (neighbour.value == 0)
        deepNeighbours = deepNeighbours.concat(
          propagateOpening(filteredId, [...collection, ...filteredCollection])
        );
    }

    return [...filteredCollection, ...deepNeighbours];
  }

  let emptyNeighbours = [payload, ...propagateOpening(payload)];

  let _grid = state.grid.map((cell, i) => {
    if (emptyNeighbours.length) {
      if (emptyNeighbours.includes(cell.id)) {
        counter++;
        return { ...cell, isOpen: true };
      }
      return { ...cell };
    } else if (cell.id == payload) {
      counter++;
      return { ...cell, isOpen: true };
    } else {
      return { ...cell };
    }
  });

  const nonMineCells = numOfCols * numOfRows - numOfMines;

  return {
    ...state,
    openedCells: counter,
    gameStatus: nonMineCells == counter ? GameStatus.Win : GameStatus.Active,
    grid: _grid,
  };
};
