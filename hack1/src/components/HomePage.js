/****************************************************************************
  FileName      [ HomePage.js ]
  PackageName   [ src/components ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file generates the Home page.  ]
  Copyright     [ 2021 10 ]
****************************************************************************/

import React, { useState } from 'react';
import './css/HomePage.css';

/* -- TODO 2 -- */
const HomePage = ({startGameOnClick, mineNumOnChange, boardSizeOnChange, mineNum, boardSize /* -- something more... -- */}) => {
    const [showPanel, setShowPanel] = useState(false);      // A boolean variable. If true, the controlPanel will show.
    const [error, setError] = useState(false);              // A boolean variable. If true, means that the numbers of mines and the board size are invalid to build a game.

    /* Some functions may be added here! */
    const difficultyAdjustment = () => {
      setShowPanel(showPanel => showPanel? false: true);
    }

    const handleMineNumChange = (e) => {
      mineNumOnChange(e.target.value);
      if(!error && mineNum > boardSize * boardSize)  setError(true);
      if(error && mineNum <= boardSize * boardSize)  setError(false);
    }

    const handleBoardSizeChange = (e) => {
      boardSizeOnChange(e.target.value);
      if(!error && mineNum > boardSize * boardSize)  setError(true);
      if(error && mineNum <= boardSize * boardSize)  setError(false);
    }

    return(
      <div className = 'HomeWrapper'>
        <p className = 'title'>MineSweeper</p>
          {/* -- TODO 1-1 -- */}
        <button className="btn" onClick={startGameOnClick}>Start Game</button>
        <div className="controlContainer">
          <button className="btn" onClick={difficultyAdjustment}>Difficulty Adjustment</button>
          {/* -- TODO 6-2 -- */}
          {/* Useful Hint: <input type = 'range' min = '...' max = '...' defaultValue = '...'> */}
          <div className="controlWrapper" style={showPanel? {visibility:'visible'}:{visibility:'hidden'}}>
            <div className="error" style={error? {visibility:'visible', color:'darkred'}:{visibility:'hidden'}}>ERROR: Mines number and board size are invalid!</div>
            <div className="controlPanel">
              <div className="controlCol">
                <p className="controlTitle">Mines Number</p>
                <input type = 'range' step = '1' min = '1' max = '50' defaultValue = '10' onChange={handleMineNumChange}></input>
                <p className="controlNum" style={error? {color:'#880000'}:{color:'0f0f4b'}}>{mineNum}</p>
              </div>
              <div className="controlCol">
                <p className="controlTitle">Board Size (n×n)</p>
                <input type = 'range' step = '1' min = '1' max = '20' defaultValue = '8' onChange={handleBoardSizeChange}></input>
                <p className="controlNum" style={error? {color:'#880000'}:{color:'0f0f4b'}}>{boardSize}</p>
              </div>
            </div>
          </div>
            
            {/* Useful Hint: Error color: '#880000', default text color: '#0f0f4b', invisible color: 'transparent' */}
            {/* Reminder: The defaultValue of 'mineNum' is 10, and the defaultValue of 'boardSize' is 8. */}
        </div>
      </div>
    );

}
export default HomePage;   