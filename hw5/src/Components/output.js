import React from 'react'

export default function Output({number, expression}){
    return(
        <div className="displayer">
            <input className="input-display" disabled value={expression} />
            <h1 className="screen">{number}</h1>
        </div>
    ) 
}