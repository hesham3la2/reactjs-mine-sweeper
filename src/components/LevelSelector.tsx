import {LevelOptions} from '../enums';

export const Levels = {
    [LevelOptions.Easy]: {
        numberOfCols: 9,
        numberOfRows: 9,
        numOfMines: 10,
    },
    [LevelOptions.Intermediate]: {
        numberOfCols: 16,
        numberOfRows: 16,
        numOfMines: 40
    },
    [LevelOptions.Expert]: {
        numberOfCols: 30,
        numberOfRows: 16,
        numOfMines: 99
    }
}

interface LevelSelectorProps {
    level: LevelOptions,
    onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

function LevelSelector(props: LevelSelectorProps) {

    const { onChange, level} = props;

    return (
        <select onChange={onChange} value={level}>
          <option value="0">Beginner</option>
          <option value="1">Intermediate</option>
          <option value="2">Expert</option>
        </select>
    );
}

export default LevelSelector;