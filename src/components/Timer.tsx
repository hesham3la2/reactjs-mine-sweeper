import { useEffect } from 'react';
import { ActionTypes } from '../context/enums';
import { useMain } from '../context/MainContextProvider';
import { ReactComponent as Stopwatch } from '../stopwatch.svg';

function Timer() {
  const { state, dispatch } = useMain();
  const { isActive, seconds } = state.timer;

  useEffect(() => {
    let interval: NodeJS.Timer;
    if (isActive && seconds < 999) {
      interval = setInterval(() => {
        dispatch({ type: ActionTypes.SECSICREMENT });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isActive, seconds]);

  return (
    <div className="counter">
      <Stopwatch className='counter-ico' fill="wheat" />
      <div className="counter-num">{seconds}</div>
    </div>
  );
}

export default Timer;
