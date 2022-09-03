import React from 'react';

export default function Checkbox({selected, func, text}) {
    return(
        <div className = "tightrow">
            <button className = {selected ? "selectedBox" : "unselectedBox"} onClick = {func}></button>
            <p>{text}</p>
        </div>
    )
}