import clsx from 'clsx';
import {ClickType} from '../enums'
import mine from '../mine.png';
import flag from '../flag.png';

export interface CellData {
  value: number;
  isOpen: boolean;
  isFlagged: boolean;
  hasMine: boolean;
}

interface CellProps {
  location: [number, number];
  cell: CellData;
  cellWidth: number;
  isDisabled: boolean;
  updateCell: (location: [number, number], newCell: CellData, clickType: ClickType) => void;
}

function Cell(props: CellProps) {
  const { isDisabled, cellWidth, cell, location, updateCell } = props;

  const handleRTClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (cell.isOpen) return;

    let newCell: CellData = { ...cell };

    newCell.isFlagged = !cell.isFlagged;
    updateCell(location, newCell, ClickType.RT);
  };

  const handleLTClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    if (cell.isOpen || cell.isFlagged) return;

    let newCell: CellData = { ...cell };

    newCell.isOpen = true;
    if (newCell.hasMine) newCell.value = -1;
    updateCell(location, newCell, ClickType.LT);
  };

  return (
    <div
      className={clsx(
        'cell',
        !cell.isOpen && 'cell--closed',
        cell.isOpen && cell.value > 0 && `cell__color-${cell.value}`,
        cell.isOpen &&
          cell.hasMine &&
          isDisabled &&
          cell.value == -1 &&
          'mine-clicked',
        cell.isFlagged && !cell.hasMine && isDisabled && 'wrong-flag'
      )}
      onClick={handleLTClick}
      onContextMenu={handleRTClick}
    >

      {cell.isOpen ? (
        cell.hasMine ? (
          <img className="cell__img" src={mine} />
        ) : (
          cell.value > 0 && <span> {cell.value} </span>
        )
      ) : (
        cell.isFlagged && <img className="cell__img" src={flag} />
      )}

    </div>
  );
}

export default Cell;
