import {React, useState} from 'react';
import './App.css';

function App() {
  const [end, setEnd] = useState(true);
  const [board, setBoard] = useState([['none', 'none', 'none'], ['none', 'none', 'none'], ['none', 'none', 'none']]);
  const menu = 
    <div className="App-header">
      <h1>Menu</h1>
      <h3>Ready to play Tic-Tac-Toe ?</h3>
      <button>Start Game</button>
    </div>
  const gameBoard = 
    <table className="App-header">{
      board.map(row => {
        return <tr>{
          row.map(grid => {
            return grid === 'none' ? <td><div className="OX-grid"></div></td> : <td><div className="OX-grid">{grid === 'O' ? <img src="O.png" alt="O"/>:<img src="X.png" alt="X"/>}</div></td>;
          })
        }</tr>
      })
    }</table>
  return (
    <div className="App">
      {end ? menu : gameBoard}
    </div>
  );
}

export default App;
