import { React, useState } from 'react';
import './App.css';
import { startGame } from './axios';

function App() {
  const [end, setEnd] = useState(true);
  const [board, setBoard] = useState([[{X:0,Y:0,value:'O'}, {X:0,Y:1,value:'none'}, {X:0,Y:2,value:'none'}], [{X:1,Y:0,value:'none'}, {X:1,Y:1,value:'none'}, {X:1,Y:2,value:'none'}], [{X:2,Y:0,value:'none'}, {X:2,Y:1,value:'none'}, {X:2,Y:2,value:'none'}]]);
  
  const handleStartGame = () => {
    setEnd(false);
    // startGame();
  }

  const handleClickGrid = (grid) => {
    let newBoard = JSON.parse(JSON.stringify(board));
    newBoard[grid.X][grid.Y].value = 'O';
    setBoard(newBoard);
  }
  
  const menu = 
    <div className="App-header">
      <h1>Menu</h1>
      <h3>Ready to play Tic-Tac-Toe ?</h3>
      <button onClick={handleStartGame}>Start Game</button>
    </div>
  const gameBoard = 
    <table className="App-header">
      <tbody>{
        board.map(row => {
          return <tr>{
            row.map(grid => {
              return grid.value === 'none' ? <td><div className="OX-grid unused" onClick={() => handleClickGrid(grid)}/></td> : <td><div className="OX-grid">{grid.value === 'O' ? <img className="OX-pic" src="O.png" alt="O"/>:<img className="OX-pic" src="X.png" alt="X"/>}</div></td>;
            })
          }</tr>
        })
      }</tbody>
    </table>

  return (
    <div className="App">
      {end ? menu : gameBoard}
    </div>
  );
}

export default App;
