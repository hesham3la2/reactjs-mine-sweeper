import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from './components/Template';
import { MainProvider } from './context/MainContextProvider';
import Game from './components/Game';
import './App.css';

const options = {
  // you can also just use 'bottom center'
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  offset: '30px',
  // you can also just use 'scale'
  transition: transitions.SCALE,
};

function App() {
  return (
    <div className="App">
      <MainProvider>
        <AlertProvider template={AlertTemplate} {...options}>
          <Game />
        </AlertProvider>
      </MainProvider>
    </div>
  );
}

export default App;
