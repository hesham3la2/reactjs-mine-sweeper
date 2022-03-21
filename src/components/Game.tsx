import { useEffect, ChangeEvent, useContext } from 'react';
import { useMain } from '../context/MainContextProvider';
import { ActionTypes, LevelOptions, GameStatus } from '../context/enums';
import Cell from './Cell';
import Emoji from './Emoji';
import LevelSelector from './LevelSelector';
import Row from './Row';

function Game() {
  const { state, dispatch } = useMain();

  const { level, grid, gameStatus } = state;

  useEffect(() => {
    dispatch({ type: ActionTypes.NEWGAME, payload: level });
  }, []);

  useEffect(() => {
    // window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    return () => {
      // window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, []);

  // const onFocus = () => {
  //   console.log('focus');
  // };

  const onBlur = () => {
    dispatch({type: ActionTypes.GAMEPAUSED})
  };
  
  const restoreGame = () => {
    dispatch({type: ActionTypes.GAMERESTORED})
  }

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const selected: LevelOptions = parseInt(e.target.value);
    dispatch({ type: ActionTypes.LEVELCHANGE, payload: selected });
  };

  let emoji = () => {
    switch (gameStatus) {
      case GameStatus.Win:
        return '🥳';
      case GameStatus.Fail:
        return '💩';
      case GameStatus.Active:
        return '🤔';
      case GameStatus.Paused:
        return '😴';
    }
  };

  return (
    <div className="container">
      <div className="header">
        <LevelSelector onChange={handleChange} level={level.name} />
        <div className="emoji">
          <Emoji label="Win" symbol={emoji()} />
        </div>
        <div>{state.usedFlags}</div>
      </div>
      <div className="board no_selection">
        {grid.length &&
          [...Array(level.numOfRows)].map((raw, i) => {
            let start = i * level.numOfCols;
            return (
              <Row key={i}>
                {grid.slice(start, start + level.numOfCols).map((cell, i) => (
                  <Cell key={cell.id} cell={cell} />
                ))}
              </Row>
            );
          })}
      {gameStatus == GameStatus.Paused && <div className="paused" onClick={() => restoreGame()}>Paused</div>}
      </div>
    </div>
  );
}

export default Game;
