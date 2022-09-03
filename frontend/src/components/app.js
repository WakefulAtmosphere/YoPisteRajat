import {useState} from 'react';
import React from 'react';
import Sidebar from './sidebar.js'
import Taulukko from './taulukko.js'
import '../styles/app.css'

export default function App({data}) {
    let [tila, asetaTila] = useState({
        havainnollistus: "Taulukko",
        display: [1, 0, 0, 0, 0, 0, 0, 0, 0],
        vertailu: "Vuodet",
        kohde: "syksy-2021"
    })
    let [scraperTila, asetaScraperTila] = useState("odotakäyttajä");
    let vakioTila = {
        Vuodet: "syksy-2021",
        Aineet: "Äidinkieli, suomi"
    }
    let otsikko = ""
    if (tila.vertailu === "Vuodet") {
        otsikko = tila.kohde.charAt(0).toUpperCase() + tila.kohde.replace("-", " ").replace("a", "ä").slice(1)
    } else {
        otsikko = tila.kohde
    }
    const paivita = (uusiTila) => {
        asetaTila(() => {
            return {...tila, kohde: uusiTila}
        })
    }
    const vaihdaHavainnollistus = (uusiHavainnollistus) => {
        asetaTila(() => {
            return {...tila, havainnollistus: uusiHavainnollistus}
        })
    }
    const paivitaVertailu = (uusiVertailu) => {
        asetaTila(() => {
            return {...tila, vertailu: uusiVertailu, kohde: vakioTila[uusiVertailu], display: (uusiVertailu === "Vuodet" ? [1, 0, 0, 0, 0, 0, 0, 0, 0] : [1, 1, 1, 1, 1, 1, 0, 0, 0])}
        })
    }
    const virkista = (uusiTila) => {
        
        asetaScraperTila(() => {
            return uusiTila
        })
    }
    const setDisplay = (target) => {
        asetaTila(()=> {
            return {...tila, display: tila.display.slice(0, target).concat(!tila.display[target], tila.display.slice(target + 1, tila.display.length))}
        }) 
    }
    const setDisplay2 = (target) => {
        asetaTila(()=> {
            return {...tila, display: tila.display.map((i, j) => j === target)}
        }) 
    }
    return(
        <>
            <header className = 'otsikko'>
                <h1>{otsikko}</h1>
            </header>
            <div className='row tablecontainer'>
                <Taulukko data = {data} tila = {tila} func = {vaihdaHavainnollistus} func2 = {setDisplay} func3 = {setDisplay2}/>
                <Sidebar data = {data} tila = {tila} scraperTila = {scraperTila} func1 = {paivita} func2 = {paivitaVertailu} func3 = {virkista}/>
            </div>
        </>
    )
}
