import { MainProvider } from './context/MainContextProvider';
import Game from './components/Game';

import './App.css';

function App() {
  return (
    <div className="App">
      <MainProvider>
        <Game />
      </MainProvider>
    </div>
  );
}

export default App;
