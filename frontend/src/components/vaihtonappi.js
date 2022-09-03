import React from 'react';

export default function Vaihtonappi({tila, vaihtoehdot, kohde, func}) {
    if (tila[kohde] === vaihtoehdot[0]) {
        return(
            <div className='row'>
                <button className = 'vaihdaVertailu l valittu' type = 'button' onClick = {() => func(vaihtoehdot[0])}>{vaihtoehdot[0]}</button>
                <button className = 'vaihdaVertailu r' type = 'button' onClick = {() => func(vaihtoehdot[1])}>{vaihtoehdot[1]}</button>
            </div>)
    } else if (tila[kohde] === vaihtoehdot[1]) {
        return(
            <div className='row'>
                <button className = 'vaihdaVertailu l' type = 'button' onClick = {() => func(vaihtoehdot[0])}>{vaihtoehdot[0]}</button>
                <button className = 'vaihdaVertailu r valittu' type = 'button' onClick = {() => func(vaihtoehdot[1])}>{vaihtoehdot[1]}</button>
            </div>)
    }
}