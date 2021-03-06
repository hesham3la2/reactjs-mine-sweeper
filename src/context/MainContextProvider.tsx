import { createContext, useReducer, useContext } from 'react';
import {GameStatus, LevelOptions } from './enums';
import { State, Dispatch, MainProviderProps, Levels } from './interfaces';
import {mainReducer} from './reducer';

const MainStateContext = createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const savedScore = localStorage.getItem('score');
const score = savedScore ? JSON.parse(savedScore) : {
  [LevelOptions.Easy]: 999,
  [LevelOptions.Intermediate]: 999,
  [LevelOptions.Expert]: 999,
};

const initialState: State = {
  usedFlags: 0,
  openedCells: 0,
  level: Levels[LevelOptions.Easy],
  gameStatus: GameStatus.Active,
  grid: [],
  timer: {
    isActive: false,
    seconds: 0,
  },
  score
}


function MainProvider({ children }: MainProviderProps) {
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const value = { state, dispatch };
  return (
    <MainStateContext.Provider value={value}>
      {children}
    </MainStateContext.Provider>
  );
}

function useMain() {
  const context = useContext(MainStateContext);
  if (context === undefined) {
    throw new Error('useMain must be used within a MainProvider');
  }
  return context;
}

export { MainProvider, useMain };
