import clsx from 'clsx';
import { useMain } from '../context/MainContextProvider';
import { ActionTypes, GameStatus } from '../context/enums';
import mine from '../mine.png';
import flag from '../flag.png';
import { CellData } from '../context/interfaces';

function Cell(props: { cell: CellData }) {
  const { state, dispatch } = useMain();
  const { id, value, isOpen, isFlagged, hasMine } = props.cell;

  const handleRTClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (isOpen || state.gameStatus !== GameStatus.Active) return;

    dispatch({ type: ActionTypes.TOGGLEFLAG, payload: id });
  };

  const handleLTClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (isOpen || state.gameStatus !== GameStatus.Active || isFlagged) return;

    if(!hasMine && state.openedCells == 0)
      dispatch({type: ActionTypes.TIMERSTART})

    if (hasMine) {
      dispatch({ type: ActionTypes.MINECLICK, payload: id });
      return;
    }else if(value > 0){
      dispatch({type: ActionTypes.CELLWITHVALUECLICKED, payload: id})
    }else{
      dispatch({type: ActionTypes.EMPTYCELLCLICKED, payload: id})
    }
  };

 
  return (
    <div
      className={clsx(
        'cell',
        !isOpen && 'cell--closed',
        isOpen && value > 0 && `cell__color-${value}`,
        isOpen && hasMine && value == -1 && 'mine-clicked',
        isFlagged &&
          !hasMine &&
          state.gameStatus == GameStatus.Fail &&
          'wrong-flag'
      )}
      onClick={handleLTClick}
      onContextMenu={handleRTClick}
    >
      {isOpen ? (
        hasMine ? (
          <img className="cell__img" src={mine} />
        ) : (
          value > 0 && <span> {value} </span>
        )
      ) : (
        isFlagged && <img className="cell__img" src={flag} />
      )}
    </div>
  );
}

export default Cell;
