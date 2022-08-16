import GameStatus from './components/GameStatus/GameStatus';
import CardList from './components/CardList/CardList';
import EndScene from './components/EndScene/EndScene';
import { setCards } from './actions/actions';
import './App.css';
import 'bootstrap';

function App() {
  setCards();

  return (
    <>
      <GameStatus />
      <CardList />
      <EndScene />
    </>
  );
}

export default App;
