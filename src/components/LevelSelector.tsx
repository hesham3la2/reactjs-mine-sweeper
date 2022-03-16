import {LevelOptions} from '../enums';

export const Levels = {
    [LevelOptions.Easy]: {
        cols: 9,
        rows: 9,
        numOfMines: 10,
    },
    [LevelOptions.Intermediate]: {
        cols: 16,
        rows: 16,
        numOfMines: 40
    },
    [LevelOptions.Expert]: {
        cols: 30,
        rows: 16,
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