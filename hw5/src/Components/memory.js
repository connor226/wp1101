import React from 'react'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'

export default function Memory({register, currentpos, number, handleMemRead, handleMemClear, handlePosForward, handlePosBack, handleMemSave}) {
    return (
        <div className="memory-container">
            <ButtonGroup size="large">
                <Button disabled={register.length <= 1} onClick={handleMemClear}>MC</Button>
                <Button disabled={register.length <= 1} onClick={handleMemRead}>MR</Button>
                <Button disabled={currentpos >= register.length - 1} onClick={handlePosForward}>M+</Button>
                <Button disabled={currentpos <= 1} onClick={handlePosBack}>M-</Button>
                <Button disabled={number.includes('錯誤')} onClick={handleMemSave}>MS</Button>
            </ButtonGroup>
            <div>
                {
                    register.map(memo => {
                        if(!memo.key)  return null;
                        else  if(register.indexOf(memo) === currentpos){
                            return (
                                <div className="current-item">
                                    <div className="memo-item-title">M[{register.indexOf(memo)}]</div>
                                    <div className="memo-item-expression">{memo.expression}</div>
                                    <h3 className="memo-item-content">{memo.number}</h3>
                                </div>
                            )
                        }
                        return (
                            <div className="memo-item">
                                <div className="memo-item-title">M[{register.indexOf(memo)}]</div>
                                <div>{memo.expression}</div>
                                <h3 className="memo-item-content">{memo.number}</h3>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}