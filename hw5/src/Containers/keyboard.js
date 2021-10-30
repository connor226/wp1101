import React from 'react';
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import Stack from '@mui/material/Stack'
import BackspaceIcon from '@mui/icons-material/Backspace';

const buttons = {
    basic: [['%','AC',<BackspaceIcon />,'/'],
            ['7','8','9','*'],
            ['4','5','6','-'],
            ['1','2','3','+'],
            ['+/-','0','.','=']],
};

export default function Keyboard({type, changeExpression}){
    return (
        <Stack className="keyboard-container">
            {
                buttons[type].map(row => {
                    return <ButtonGroup size="large">{
                        row.map(butt => {
                            if(butt === "="){
                                return <Button key={butt} className="equal" sx={{width: '60px', background: '#ffa0e0', '&:hover':{background: '#ff80b0'}}} onClick={changeExpression}>{butt}</Button>
                            }
                            return <Button key={butt} sx={{width: '60px'}} onClick={changeExpression}>{butt}</Button>
                        })
                    }</ButtonGroup>
                })
            }
        </Stack>
    )
}