import React from 'react';
import '../styles/table.css'

export default function Taulukko({data, tila, func, func2, func3}) {
    const arvosanat = ["L", "E", "M", "C", "B", "A", "i+", "i", "i-"]
    let avain = tila.kohde
    let tarkasteltava = data[avain]
    let vuosilista = Object.keys(data).filter((vuosi) => {
        return Object.keys(data[vuosi]).includes(tila.kohde)
    })
    return(
        <table>
            <thead>
                <tr>
                    <td></td>
                    {arvosanat.map((arvosana, i) => {
                        return <td key = {"arvosana " + i} className = 'solu arvosana'>{arvosana}</td>
                    })}
                </tr>
            </thead>
            <tbody>
                {tila.vertailu === "Vuodet" ?
                Object.keys(tarkasteltava).map((aine, i) => {
                    let ainenimi = aine.split(',').concat([''])
                    return <tr key={i}>
                        <td className = 'nimi' ><p>{ainenimi[0] + (ainenimi.length > 2 ? "," : "")}</p><p>{ainenimi[1]}</p></td>
                        {tarkasteltava[aine].map((piste, j)=> {
                            return <td key = {"solu: " + aine + j} className ='piste solu'>{piste}</td>
                        })}
                        </tr>
                }) :
                vuosilista.map((vuosi, i) => {
                    return (
                        <tr>
                            <td className = 'nimi'>{vuosi.charAt(0).toUpperCase() + vuosi.replace("-", " ").replace("a", "ä").slice(1)}</td>
                            {data[vuosi][tila.kohde].map((arvosana, i) => {
                            return (
                                <td className ='piste solu' key = {"solu: " + arvosana + i}>{arvosana}</td>
                            )})}
                        </tr>)
                })}
            </tbody>
        </table>
    );

}