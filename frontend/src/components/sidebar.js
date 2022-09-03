import React from 'react';
import Vaihtonappi from './vaihtonappi.js'
export default function Sidebar({data, tila, scrapertila, func1, func2, func3}) {
    let ainelista = []
    if (tila.vertailu === "Aineet") {
        for (let i in data) {
            let lista = Object.keys(data[i]).filter(aine =>
                {return !ainelista.includes(aine)})
            ainelista.push(...lista)
        }
    }
    return(
        <div className = "side">
            <div className = "row">
                <h2>Pisterajat</h2>
            </div>
            <Vaihtonappi tila = {tila} vaihtoehdot = {["Vuodet", "Aineet"]} kohde = {"vertailu"} func = {func2}/>
            <ul>{tila.vertailu === "Vuodet" ? 
                Object.keys(data).map((aika, i) => {
                    return <li key={"lista: " + i}><button className = 'astext linkki'type='button' onClick = {() => func1(aika)}>{aika.charAt(0).toUpperCase() + aika.replace("-", " ").replace("a", "ä").slice(1)}</button></li>
                }) :
                ainelista.map((aine, i) => {
                    return <li key={"lista: " + i}><button className = 'astext linkki' type='button' onClick = {() => func1(aine)}>{aine}</button></li>
                })}         
            </ul>
        </div>);
};