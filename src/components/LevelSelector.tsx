import {LevelSelectorProps} from '../context/interfaces';

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