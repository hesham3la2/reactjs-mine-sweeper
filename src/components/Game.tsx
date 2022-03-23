import { useEffect, ChangeEvent } from 'react';
import { useAlert } from 'react-alert';
import clsx from 'clsx';
import { useMain } from '../context/MainContextProvider';
import { ActionTypes, LevelOptions, GameStatus } from '../context/enums';
import useMediaQuery from '../useMediaQuery';
import Cell from './Cell';
import Emoji from './Emoji';
import LevelSelector from './LevelSelector';
import Row from './Row';
import Timer from './Timer';
import { ReactComponent as FlagIco } from '../flagIco.svg';

function Game() {
  const { state, dispatch } = useMain();

  const { level, grid, gameStatus } = state;

  const large = useMediaQuery('(min-width: 924px)');
  const medium = useMediaQuery('(min-width: 516px)');

  let scrollable: boolean = false;

  if ((!large && state.level.name == LevelOptions.Expert) || (!medium && state.level.name == LevelOptions.Intermediate)) {
    scrollable = true;
  }

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
    dispatch({ type: ActionTypes.GAMEPAUSED });
  };

  const restoreGame = () => {
    dispatch({ type: ActionTypes.GAMERESTORED });
  };

  const handleChange = (e: ChangeEvent<HTMLSelectElement>): void => {
    e.preventDefault();
    const selected: LevelOptions = parseInt(e.target.value);
    dispatch({ type: ActionTypes.LEVELCHANGE, payload: selected });
  };

  let emoji = () => {
    switch (gameStatus) {
      case GameStatus.Win:
      case GameStatus.WinWithRecord:
        return '🥳';
      case GameStatus.Fail:
        return '💩';
      case GameStatus.Active:
        return '🤔';
      case GameStatus.Paused:
        return '😴';
    }
  };

  const alert = useAlert();
  if (state.gameStatus == GameStatus.WinWithRecord)
    alert.show('CONGRATULATIONS! NEW RECORD!', { type: 'success' });

  //  const classes: string = [];

  // switch (matches) {
  //   case value:

  //     break;

  //   default:
  //     break;
  // }
console.log(scrollable);

  return (
    <div
      className="container"
      style={scrollable ? { width: '93%' } : {}}
    >
      <div style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <LevelSelector onChange={handleChange} level={level.name} />
        <div className="header-item">
          {' '}
          best score:&nbsp;&nbsp;<div>{state.score[state.level.name]}</div>{' '}
        </div>
      </div>
      <div className="header">
        <div className="counter">
          <FlagIco className="counter-ico" fill="wheat" />
          <div className="counter-num">{state.usedFlags}</div>
        </div>
        <Emoji label="Win" symbol={emoji()} />
        <Timer />
      </div>
      <div className={clsx('board no_selection', scrollable && 'scrollable')}>
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
        {gameStatus == GameStatus.Paused && (
          <div className="paused" onClick={() => restoreGame()}>
            Paused
          </div>
        )}
      </div>
    </div>
  );
}

export default Game;
