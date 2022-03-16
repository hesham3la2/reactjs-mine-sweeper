import clsx from 'clsx';
import mine from '../mine.png';
import flag from '../flag.png';
import { isDisabled } from '@testing-library/user-event/dist/utils';

export interface CellData {
  value: number;
  isOpen: boolean;
  isFlagged: boolean;
  hasMine: boolean;
}

interface CellProps {
  id: number;
  cell: CellData;
  cellWidth: number;
  isDisabled: boolean;
  updateCell: (index: number, newCell: CellData) => void;
}

function Cell(props: CellProps) {
  const { updateCell, isDisabled, cellWidth, cell, id } = props;

  const handleRTClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (cell.isOpen) return;

    let newCell: CellData = { ...cell };

    newCell.isFlagged = !cell.isFlagged;
    updateCell(id, newCell);

    // if (cell.isFlagged) {
    //   cell.isFlagged = false;
    //   newCells[index] = cell;
    //   setCells(newCells);
    // } else if (cell.value == -1) {
    //   for (let i = 0; i < newCells.length; i++) {
    //     newCells[i].isOpen = true;
    //     if (i == index) newCells[i].value = -2;
    //   }
    //   setCells(newCells);
    // } else {
    //   cell.isOpen = true;
    //   newCells[index] = cell;
    //   setCells(newCells);
    // }
  };

  const handleLTClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (cell.isOpen) return;

    let newCell: CellData = { ...cell };

    if (cell.isFlagged) {
      newCell.isFlagged = false;
      updateCell(id, newCell);
    } else {
      newCell.isOpen = true;
      if (newCell.hasMine) newCell.value = -1;
      updateCell(id, newCell);
    }
  };

  return (
    <div
      className={clsx(
        'cell no_selection',
        !cell.isOpen && 'cell--closed',
        cell.value > 0 && `cell__color-${cell.value}`,
        cell.hasMine && isDisabled && cell.value == -1 && 'mine-clicked',
        cell.isFlagged && !cell.hasMine && isDisabled && 'wrong-flag'
      )}
      style={{ flex: `1 0 ${cellWidth}%` }}
      onClick={handleLTClick}
      onContextMenu={handleRTClick}
    >
      {/* {
         //colors
         cell.value > 0 => font-color-{cell.value} 
         cell.isFlagged && !cell.hasMine && isDisabled => color red
         cell.hasMine && isDisabled && cell.value == -1 => color red

         
        //color is red if disabled and !hasMine
        cell.isFlagged && <img className="cell__img" src={flag} />  
            //color is red if the clicked mine
            cell.hasMine && isDisabled && <img className={'cell__img'} src={mine} />
                //color according to cell value
                cell.isOpen && cell.value > 0 && cell.value
                  
                  show nothing
            
       } */}


      {/* {cell.isFlagged ? (
        <img className="cell__img" src={flag} />
      ) : cell.hasMine && isDisabled ? (
        <img className={'cell__img'} src={mine} />
      ) : (
        cell.isOpen && cell.value > 0 && cell.value
      )} */}

      {cell.hasMine?<img className={'cell__img'} src={mine} />: cell.value}

      {/* {isOpen ? (
        !isFlagged ? (
          value < 0 ? (
            <img className={'cell__img'} src={mine} />
          ) : (
            value > 0 && value
          )
        ) : (
          <img className="cell__img" src={flag} />
        )
      ) : (
        isFlagged && <img className="cell__img" src={flag} />
      )} */}
    </div>
  );
}

export default Cell;
