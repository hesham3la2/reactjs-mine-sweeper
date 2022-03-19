import { useEffect, useState, ChangeEvent } from 'react';
import { LevelOptions, GameStatus, ClickType } from '../enums';
import Cell, { CellData } from './Cell';
import Emoji from './Emoji';
import LevelSelector, { Levels } from './LevelSelector';

interface Difficulty {
  numberOfCols: number;
  numberOfRows: number;
  numOfMines: number;
  level: LevelOptions;
}

function Game() {
  const [difficulty, setDifficulty] = useState<Difficulty>({
    ...Levels[LevelOptions.Easy],
    level: LevelOptions.Easy,
  });
  const [grid, setGrid] = useState<CellData[][]>([]);
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.Active);
  const { numberOfCols, numberOfRows, numOfMines, level } = difficulty;

  useEffect(() => {
    startNewGame();
  }, [level]);

  const rowWidth = numberOfCols * 30;

  const startNewGame = () => {
    let grid: CellData[][] = [];
    for (let i = 0; i < numberOfRows; i++) {
      let rows: CellData[] = [];
      grid.push(rows);
      for (let j = 0; j < numberOfCols; j++) {
        rows.push({
          value: 0,
          isOpen: false,
          isFlagged: false,
          hasMine: false,
        });
      }
    }

    let randomMines: [number, number][] = [];
    while (randomMines.length < numOfMines) {
      let randomX = Math.floor(Math.random() * numberOfRows);
      let randomY = Math.floor(Math.random() * numberOfCols);

      if (
        !randomMines.some(([x, y]) => {
          return randomX == x && randomY == y;
        })
      ) {
        randomMines.push([randomX, randomY]);

        grid[randomX][randomY].hasMine = true;

        const neighbours = loopNeighbours(randomX, randomY);

        neighbours.map(([x, y]) => {
          !grid[x][y].hasMine && grid[x][y].value++;
        });
      }

      setGrid(grid);
    }
  };

  const loopNeighbours = (x: number, y: number): [number, number][] => {
    const neighbours: [number, number][] = [];
    //Top
    if (x > 0) {
      neighbours.push([x - 1, y]);
    }

    //Bottom
    if (x < numberOfRows - 1) {
      neighbours.push([x + 1, y]);
    }

    //Right
    if (y < numberOfCols - 1) {
      neighbours.push([x, y + 1]);
    }

    //Left
    if (y > 0) {
      neighbours.push([x, y - 1]);
    }

    //Top Right
    if (y < numberOfCols - 1 && x > 0) {
      neighbours.push([x - 1, y + 1]);
    }

    //Top Left
    if (y > 0 && x > 0) {
      neighbours.push([x - 1, y - 1]);
    }

    //Bottom Right
    if (y < numberOfCols - 1 && x < numberOfRows - 1) {
      neighbours.push([x + 1, y + 1]);
    }

    //Bottom Left
    if (y > 0 && x < numberOfRows - 1) {
      neighbours.push([x + 1, y - 1]);
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
    setGameStatus(GameStatus.Active);
  };

  const updateCellData = (
    location: [number, number],
    newCell: CellData,
    clickType: ClickType 
  ): void => {
    // win

    function propagateOpening(
      location: [number, number],
      collection: [number, number][] = []
    ) {
      let [x, y] = location;
      let deepNeighbours: [number, number][] = [];
      let filteredCollection: [number, number][] = [];
      let newCollection = loopNeighbours(x, y);

      filteredCollection = newCollection.filter(
        ([newX, newY]) =>
          !collection.some(([collX, collY]) => newX == collX && newY == collY)
      );

      for (let i = 0; i < filteredCollection.length; i++) {
        const [filX, filY] = filteredCollection[i];
        let neighbour = grid[filX][filY];
        if (neighbour.value == 0)
          deepNeighbours = deepNeighbours.concat(
            propagateOpening(
              [filX, filY],
              [...collection, ...filteredCollection]
            )
          );
      }

      return [...filteredCollection, ...deepNeighbours];
    }

    if (gameStatus == GameStatus.Active) {
      let openCellCounter = 0;
      let emptyNeighbours: [number, number][] = [];
      let [x, y] = location;

      if ((clickType == ClickType.LT) && !newCell.hasMine && newCell.value == 0) {
        emptyNeighbours = [location, ...propagateOpening(location)];
      }

      if((clickType == ClickType.LT) && newCell.value > 0) openCellCounter++;

      let _grid = grid.map((row, currentX) => {
        return row.map((cell, currentY) => {
            if(cell.isOpen) openCellCounter++

          if (emptyNeighbours.length) {
            if (
              emptyNeighbours.some(
                ([empX, empY]) => empX == currentX && empY == currentY
              )
            ) {
                openCellCounter++
              return { ...cell, isOpen: true };
            }
            return cell;
          } else {
            return x == currentX && y == currentY ? newCell : cell;
          }
        });
      });

      if ((clickType == ClickType.LT) && newCell.hasMine) {
        setGameStatus(GameStatus.Fail);
      } else if (
        (clickType == ClickType.LT) &&
        openCellCounter == numberOfCols * numberOfRows - numOfMines
      ) {
          
        setGameStatus(GameStatus.Win);
      }

      setGrid(_grid);
    }
  };

  let emoji = () => {
    switch (gameStatus) {
        case GameStatus.Win:
            return '🥳'
        case GameStatus.Fail:
            return '💩'
        case GameStatus.Active:
            return '🤔'
        case GameStatus.Paused:
            return '😴'
    }
  }

  return (
    <div className="container" style={{ maxWidth: rowWidth + 20 }}>
      <div className="header">
        <LevelSelector onChange={handleChange} level={level} />
        <div className="emoji">
          <Emoji
            label="Win"
            symbol={emoji()}
          />
        </div>
      </div>
      <div className="board no_selection" style={{ minWidth: rowWidth }}>
        {grid.map((row, x) => (
          <div key={x} className="row">
            {row.map((cell, y) => (
              <Cell
                key={`${x}-${y}`}
                location={[x, y]}
                cellWidth={100 / numberOfCols}
                isDisabled={gameStatus == GameStatus.Fail}
                updateCell={updateCellData}
                cell={cell}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Game;
