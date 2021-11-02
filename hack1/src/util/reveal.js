/****************************************************************************
  FileName      [ reveal.js ]
  PackageName   [ src/util ]
  Author        [ Cheng-Hua Lu, Chin-Yi Cheng ]
  Synopsis      [ This file states the reaction when left clicking a cell. ]
  Copyright     [ 2021 10 ]
****************************************************************************/

export const revealed = (board, x, y, newNonMinesCount, boardSize) => {
    {/* -- TODO 4-2 -- */}
    const newboard = JSON.parse(JSON.stringify(board));
    {/* Useful Hint: If the cell is already revealed, do nothing. */}
    {/* Useful Hint: If the value of the cell is not 0, only show the cell value. */}
    if(board[x][y].value !== 0){
      newboard[x][y].revealed = true;
      newNonMinesCount -= 1;
    }
    /* -- TODO 4-2 -- */
    /* Useful Hint: If the value of the cell is 0, we should try to find the value of adjacent cells until the value we found is not 0. */
    else{
      let tmp = newNonMinesCount;
      newNonMinesCount -= 1;
      newboard[x][y].revealed = true;
      const queue = [[x, y]];
      const dirs = [[1,0], [-1,0], [0,1], [0,-1], [1,1], [1,-1], [-1,1], [-1,-1]];
      while(queue.length > 0){
        const pos = queue[0];
        queue.shift();
        dirs.forEach(dir => {
          if(pos[0] + dir[0] >= 0 && pos[0] + dir[0] < boardSize && pos[1] + dir[1] >= 0 && pos[1] + dir[1] < boardSize){
            if(!newboard[pos[0] + dir[0]][pos[1] + dir[1]].revealed && typeof(board[pos[0] + dir[0]][pos[1] + dir[1]].value) === 'number'){
              newNonMinesCount -= 1;
              newboard[pos[0] + dir[0]][pos[1] + dir[1]].revealed = true;
              if(board[pos[0] + dir[0]][pos[1] + dir[1]].value === 0)  queue.push([pos[0] + dir[0], pos[1] + dir[1]]);
            }
          }
        })
      }
    }
    /* Useful Hint: The input variables 'newNonMinesCount' and 'board' may be changed in this function. */
    
    
    return {newboard, newNonMinesCount};
};
