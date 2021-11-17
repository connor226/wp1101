const express = require('express');
const router = express.Router();

let end = 'true';
let board = [[{X:0,Y:0,value:'none'}, {X:0,Y:1,value:'none'}, {X:0,Y:2,value:'none'}], 
            [{X:1,Y:0,value:'none'}, {X:1,Y:1,value:'none'}, {X:1,Y:2,value:'none'}], 
            [{X:2,Y:0,value:'none'}, {X:2,Y:1,value:'none'}, {X:2,Y:2,value:'none'}]];

function checkWin(){
    let ret = false;
    if(board[0][0].value === board[0][1].value && board[0][1].value === board[0][2].value && board[0][1].value !== 'none')  ret = true;// 1
    else  if(board[1][0].value === board[1][1].value && board[1][1].value === board[1][2].value && board[1][1].value !== 'none')  ret = true;// 2
    else  if(board[2][0].value === board[2][1].value && board[2][1].value === board[2][2].value && board[2][1].value !== 'none')  ret = true;// 3
    else  if(board[0][0].value === board[1][0].value && board[1][0].value === board[2][0].value && board[0][0].value !== 'none')  ret = true;// 4
    else  if(board[0][1].value === board[1][1].value && board[1][1].value === board[2][1].value && board[0][1].value !== 'none')  ret = true;// 5
    else  if(board[0][2].value === board[1][2].value && board[1][2].value === board[2][2].value && board[0][2].value !== 'none')  ret = true;// 6
    else  if(board[0][0].value === board[1][1].value && board[1][1].value === board[2][2].value && board[1][1].value !== 'none')  ret = true;// 7
    else  if(board[0][2].value === board[1][1].value && board[1][1].value === board[2][0].value && board[1][1].value !== 'none')  ret = true;// 8
    return ret;
}
function checkTie(){
    let emptyGrid = [];
    board.forEach(row => {
        row.forEach(grid => {
            if(grid.value === 'none'){
                emptyGrid.push({X: grid.X, Y: grid.Y});
            }
        })
    })
    return !emptyGrid.length;
}
function putX(){
    let emptyGrid = [];
    board.forEach(row => {
        row.forEach(grid => {
            if(grid.value === 'none'){
                emptyGrid.push({X: grid.X, Y: grid.Y});
            }
        })
    })
    if(emptyGrid.length){
        const Xchoice = Math.floor(Math.random() * emptyGrid.length);
        board[emptyGrid[Xchoice].X][emptyGrid[Xchoice].Y].value = 'X';
    }
}

router.get('/', (_, res) => {
    res.status(200).send({_end: end, _board: board});
})

router.post('/start', (_, res) => {
    end = 'none';
    board = [[{X:0,Y:0,value:'none'}, {X:0,Y:1,value:'none'}, {X:0,Y:2,value:'none'}], 
            [{X:1,Y:0,value:'none'}, {X:1,Y:1,value:'none'}, {X:1,Y:2,value:'none'}], 
            [{X:2,Y:0,value:'none'}, {X:2,Y:1,value:'none'}, {X:2,Y:2,value:'none'}]];
    res.status(200).send({_end: end, _board: board});
})

router.post('/grid', (req, res) => {
    if(board[req.body.posX][req.body.posY].value === 'none'){
        board[req.body.posX][req.body.posY].value = 'O';
        if(checkWin()){
            end = 'true';
            res.status(200).send({_end: 'win', _board: board});
        }
        else{
            putX();
            if(checkWin()){
                res.status(200).send({_end: 'lose', _board: board});
            }
            else  if(checkTie())  res.status(200).send({_end: 'tie', _board: board});
            else  res.status(200).send({_end: end, _board: board});
        }
    }
})

module.exports = router;