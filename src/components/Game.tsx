import { useEffect, useState, ChangeEvent } from 'react';
import { LevelOptions, GameStatus } from '../enums';
import Cell, { CellData } from './Cell';
import LevelSelector, { Levels } from './LevelSelector';

interface Difficulty {
  cols: number;
  rows: number;
  numOfMines: number;
  level: LevelOptions;
}

function Game() {
  const [difficulty, setDifficulty] = useState<Difficulty>({
    ...Levels[LevelOptions.Easy],
    level: LevelOptions.Easy,
  });
  const [cells, setCells] = useState<CellData[]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Active);
  const { cols, rows, numOfMines, level } = difficulty;

  useEffect(() => {
    startNewGame();
  }, [level]);

  const containerWidth = cols * 25.1 + 20;

  const startNewGame = () => {
    const _cells: CellData[] = [];

    for (let i = 0; i < rows * cols; i++) {
      _cells.push({
        value: 0,
        isOpen: false,
        isFlagged: false,
        hasMine: false,
      });
    }

    let randomMines: number[] = [];
    while (randomMines.length < numOfMines) {
      let randomNum = Math.floor(Math.random() * rows * cols);

      if (!randomMines.includes(randomNum)) {
        randomMines.push(randomNum);

        const currentCell = _cells[randomNum];

        currentCell.hasMine = true;
        const neighboursIndex = loopNeighbours(randomNum);

        neighboursIndex.map((neighbour) => {
          !_cells[neighbour].hasMine && _cells[neighbour].value++;
        });
      }

      setCells(_cells);
    }
  };

  const loopNeighbours = (index: number): number[] => {
    const currentX = index == 0 ? 1 : Math.ceil(index / cols);

    const currentY = index > cols ? index % cols : (index == 0 ? 1 : index);

    const neighbours: number[] = [];
    //Top
    if (currentX > 1) {
      neighbours.push(index - cols);
    }

    //Bottom
    if (currentX < rows - 1) {
      neighbours.push(index + cols);
    }

    //Right
    if (currentY < cols - 1) {
      neighbours.push(index + 1);
    }

    //Left
    if (currentY > 1) {
      neighbours.push(index - 1);
    }

    //Top Right
    if (currentY < cols - 1 && currentX > 1) {
      neighbours.push(index - cols + 1);
    }

    //Top Left
    if (currentY > 1 && currentX > 1) {
      neighbours.push(index - cols - 1);
    }

    //Bottom Right
    if (currentY < cols - 1 && currentX < rows - 1) {
      neighbours.push(index + cols + 1);
    }

    //Bottom Left
    if (currentY > 1 && currentX < rows - 1) {
      neighbours.push(index + cols - 1);
    }

    return neighbours;
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const selected: LevelOptions = parseInt(e.target.value);
    setDifficulty({
      ...Levels[selected],
      level: selected,
    });
  };

  const updateCellData = (index: number, newCell: CellData): void => {
    if (gameStatus == GameStatus.Active) {
      let openCellCounter = 0;
      let emptyNeighbous = [];

      let _cells = cells.map((_cell, i) => {
        if (i == index) {
          if (newCell.isOpen) openCellCounter++;
          return newCell;
        }
        return _cell;
      });

      const openingSpreed = (
        index: number,
        parentNeighbours: number[] = []
      ) => {
        let myNeighbours = loopNeighbours(index);

        let filteredNeighbours = myNeighbours.filter(
          (x) => !parentNeighbours.includes(x)
        );

        for (let i = 0; i < filteredNeighbours.length; i++) {
          let neighbour = filteredNeighbours[i];

          _cells[neighbour].isOpen = true;
        //   console.log({value:_cells[neighbour].value,filteredNeighbours});
          if (_cells[neighbour].value == 0) {
            openingSpreed(neighbour, [
              ...filteredNeighbours,
              ...parentNeighbours
            ]);
          }
        }
      };
      if (!newCell.isFlagged && !newCell.hasMine && newCell.value == 0) {
        openingSpreed(index, [index]);
      }

      if (!newCell.isFlagged && newCell.hasMine == true) {
        _cells[index].value = -1;
        setGameStatus(GameStatus.Fail);
      } else if (
        !newCell.isFlagged &&
        openCellCounter == _cells.length - numOfMines
      ) {
        setGameStatus(GameStatus.Win);
      }

      setCells(_cells);
    }
  };

  return (
    <div className="container" style={{ maxWidth: containerWidth }}>
      <div className="header">
        <LevelSelector onChange={handleChange} level={level} />
      </div>
      <div className="board">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            cellWidth={100 / cols}
            isDisabled={gameStatus == GameStatus.Fail}
            updateCell={updateCellData}
            cell={cell}
          />
        ))}
      </div>
    </div>
  );
}

export default Game;
