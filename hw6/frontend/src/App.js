import { React, useState, useEffect } from 'react';
import './App.css';
import { startGame, getStatus, putO } from './axios';



function App() {
  const [loading, finishLoad] = useState(true);
  const [end, setEnd] = useState('true');
  const [board, setBoard] = useState([[{X:0,Y:0,value:'none'}, {X:0,Y:1,value:'none'}, {X:0,Y:2,value:'none'}], [{X:1,Y:0,value:'none'}, {X:1,Y:1,value:'none'}, {X:1,Y:2,value:'none'}], [{X:2,Y:0,value:'none'}, {X:2,Y:1,value:'none'}, {X:2,Y:2,value:'none'}]]);
  //[[{X:0,Y:0,value:'O'}, {X:0,Y:1,value:'none'}, {X:0,Y:2,value:'none'}], [{X:1,Y:0,value:'none'}, {X:1,Y:1,value:'none'}, {X:1,Y:2,value:'none'}], [{X:2,Y:0,value:'none'}, {X:2,Y:1,value:'none'}, {X:2,Y:2,value:'none'}]]
  
  useEffect(() => {
    getStatus().then(({_end, _board}) => {
      setEnd(_end);
      setBoard(_board);
      finishLoad(false);
    })
  }, [loading]);
  
  const handleStartGame = () => {
    startGame().then(({_end, _board}) => {
      setEnd(_end);
      setBoard(_board);
    });
  }

  const handleClickGrid = (grid) => {
    putO(grid.X, grid.Y).then(({_end, _board}) => {
      setEnd(_end);
      setBoard(_board);
    });
  }

  const loadingPage = <h1 className="App-header">Loading...</h1>
  
  const menu = 
    <div className="App-header">
      <h1>Menu</h1>
      <h3>Ready to play Tic-Tac-Toe ?</h3>
      <button onClick={handleStartGame}>Start Game</button>
    </div>

  const gameBoard = 
    <div>
      {end === 'none' ? null : <div className="info-box">{end === 'win' ? 
        <>
          <h1>You win!!!</h1>
          <button onClick={handleStartGame}>restart</button>
        </> : 
        <>
          <h1>{end === 'lose' ? 'You lose :(' : 'It\'s a tie!'}</h1>
          <button onClick={handleStartGame}>Try again</button>
        </>}</div>}
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
    </div>

  return (
    <div className="App">
      {loading ? loadingPage : end === 'true' ? menu : gameBoard}
    </div>
  );
}

export default App;
