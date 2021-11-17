import { React, useState, useEffect } from 'react';
import './App.css';
import { startGame, getStatus, putO } from './axios';

function App() {
  const [loading, finishLoad] = useState(true);
  const [end, setEnd] = useState('true');
  const [board, setBoard] = useState([[{X:0,Y:0,value:'none'}, {X:0,Y:1,value:'none'}, {X:0,Y:2,value:'none'}], 
                                      [{X:1,Y:0,value:'none'}, {X:1,Y:1,value:'none'}, {X:1,Y:2,value:'none'}], 
                                      [{X:2,Y:0,value:'none'}, {X:2,Y:1,value:'none'}, {X:2,Y:2,value:'none'}]]);
  //[[{X:0,Y:0,value:'O'}, {X:0,Y:1,value:'none'}, {X:0,Y:2,value:'none'}], [{X:1,Y:0,value:'none'}, {X:1,Y:1,value:'none'}, {X:1,Y:2,value:'none'}], [{X:2,Y:0,value:'none'}, {X:2,Y:1,value:'none'}, {X:2,Y:2,value:'none'}]]
  const [error, setError] = useState(false);
  const [line, setLine] = useState([[false, false, false], [false, false, false], [false, false, false]]);

  const handleLoading = () => {
    getStatus().then(({_end, _board}) => {
      setError(false);
      setEnd(_end);
      setBoard(_board);
      finishLoad(false);
    })
    .catch(() => {setError('load')})
  }
  
  const handleStartGame = () => {
    startGame().then(({_end, _board}) => {
      setError(false);
      setEnd(_end);
      setBoard(_board);
    })
    .catch(() => {setError('start')});
  }

  const handleClickGrid = (grid) => {
    putO(grid.X, grid.Y).then(({_end, _board}) => {
      setError(false);
      setEnd(_end);
      setBoard(_board);
      if(_end === 'win' || _end === 'lose'){
        let newLine = [[false, false, false], [false, false, false], [false, false, false]];
        if(_board[0][0].value === _board[0][1].value && _board[0][1].value === _board[0][2].value && _board[0][1].value !== 'none'){
          newLine[0][0] = true;
          newLine[0][1] = true;
          newLine[0][2] = true;
        }
        if(_board[1][0].value === _board[1][1].value && _board[1][1].value === _board[1][2].value && _board[1][1].value !== 'none'){
          newLine[1][0] = true;
          newLine[1][1] = true;
          newLine[1][2] = true;
        }
        if(_board[2][0].value === _board[2][1].value && _board[2][1].value === _board[2][2].value && _board[2][1].value !== 'none'){
          newLine[2][0] = true;
          newLine[2][1] = true;
          newLine[2][2] = true;
        }
        if(_board[0][0].value === _board[1][0].value && _board[1][0].value === _board[2][0].value && _board[0][0].value !== 'none'){
          newLine[0][0] = true;
          newLine[1][0] = true;
          newLine[2][0] = true;
        }
        if(_board[0][1].value === _board[1][1].value && _board[1][1].value === _board[2][1].value && _board[0][1].value !== 'none'){
          newLine[0][1] = true;
          newLine[1][1] = true;
          newLine[2][1] = true;
        }
        if(_board[0][2].value === _board[1][2].value && _board[1][2].value === _board[2][2].value && _board[0][2].value !== 'none'){
          newLine[0][2] = true;
          newLine[1][2] = true;
          newLine[2][2] = true;
        }
        if(_board[0][0].value === _board[1][1].value && _board[1][1].value === _board[2][2].value && _board[1][1].value !== 'none'){
          newLine[0][0] = true;
          newLine[1][1] = true;
          newLine[2][2] = true;
        }
        if(_board[0][2].value === _board[1][1].value && _board[1][1].value === _board[2][0].value && _board[1][1].value !== 'none'){
          newLine[2][0] = true;
          newLine[1][1] = true;
          newLine[0][2] = true;
        }
        setLine(newLine);
      }
    })
    .catch(() => {setError(grid)});
  }

  const handleRetry = () => {
    if(error === 'load')  handleLoading();
    else  if(error === 'start')  handleStartGame();
    else  handleClickGrid(error);
  }

  useEffect(() => {
    handleLoading();
  }, [loading]);

  const errorMessage = 
    <div className="error-box">
      <h1>HTTP 500: Server Not Connected</h1>
      <button onClick={handleRetry}>retry</button>
    </div>

  const loadingPage = 
    <div className="App-header">
      {error ? errorMessage : <h1>Loading...</h1>}
    </div>
  
  const menu = 
    <div className="App-header">
      {error ? errorMessage :
      <>
        <h1>Menu</h1>
        <h3>Ready to play Tic-Tac-Toe ?</h3>
        <button onClick={handleStartGame}>Start Game</button>
      </>}
    </div>

  const gameBoard = 
    <div>
      {error ? errorMessage : null}
      {end === 'none' || error ? null : <div className="info-box">{end === 'win' ? 
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
                return grid.value === 'none' ? 
                  <td>
                    <div className="OX-grid unused" onClick={() => handleClickGrid(grid)}/>
                  </td> : 
                  <td>
                    <div className={`OX-grid ${((end === 'win' || end === 'lose') && line[grid.X][grid.Y]) ? "inLine" : "notInLine"}`}>{grid.value === 'O' ? 
                      <img className="OX-pic" src="O.png" alt="O"/>:
                      <img className="OX-pic" src="X.png" alt="X"/>}
                    </div>
                  </td>;
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
