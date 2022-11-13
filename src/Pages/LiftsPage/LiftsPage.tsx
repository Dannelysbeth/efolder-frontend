import React from 'react';
import { Component, ReactNode, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './LiftsPage.css'


const LiftsPage = () => {


    const [skiLifts, setskiLifts] = useState([]);
    const [loadingSkiLifts, setLoadingSkiLifts] = useState(true);
    const [error, setError] = useState(false);
    const getSkiLifts = () => {
        return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/skiLift`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                setskiLifts(responseJson);
                setLoadingSkiLifts(false);
            })
            .catch(error => {
                setLoadingSkiLifts(false);
                setError(true);
            });
    }
    useEffect(() => {
        getSkiLifts();
    }, []);

    return (
        <div className="backgd d-flex flex-column min-vh-100">
            <div className="lifts top-space bottom-space shadow-large">               
                    <h1 className="h3 mb-3 fw-normal text-center">Mapa stoku</h1>
                    <div className="col-left text-center">
                        <img src='https://i.imgur.com/4BFu5yf.jpg' className='image-border image-zoom' alt='' />
                        <h4 className='page-header box top-space'>Trasy narciarskie</h4>
                        <div className='box'><div id='no-more-tables'>
                            <table className='table table-hover'>
                                <thead>
                                    <tr><th className='active text-center'>Numer</th>
                                        <th className='active text-center'>Kolor</th>
                                        <th className='active text-center'>Długość [m]</th>
                                        <th className='active text-center'>Różnica poziomu [m]</th>
                                        <th className='active text-center'>Naśnieżona</th>
                                        <th className='active text-center'>Oświetlona</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr><td className='text-center' data-title='Numer'>1</td>
                                        <td className='text-center' data-title='Kolor'>niebieska</td>
                                        <td className='text-center' data-title='Długość [m]'>1300</td>
                                        <td className='text-center' data-title='Różnica poziomu [m]'>220</td>
                                        <td className='text-center' data-title='Naśnieżona'>tak</td>
                                        <td className='text-center' data-title='Oświetlona'>tak</td>
                                    </tr>
                                    <tr><td className='text-center' data-title='Numer'>2</td>
                                        <td className='text-center' data-title='Kolor'>niebieska</td>
                                        <td className='text-center' data-title='Długość [m]'>800</td>
                                        <td className='text-center' data-title='Różnica poziomu [m]'>120</td>
                                        <td className='text-center' data-title='Naśnieżona'>tak</td>
                                        <td className='text-center' data-title='Oświetlona'>tak</td>
                                    </tr>
                                    <tr><td className='text-center' data-title='Numer'>3</td>
                                        <td className='text-center' data-title='Kolor'>niebieska</td>
                                        <td className='text-center' data-title='Długość [m]'>800</td>
                                        <td className='text-center' data-title='Różnica poziomu [m]'>120</td>
                                        <td className='text-center' data-title='Naśnieżona'>tak</td>
                                        <td className='text-center' data-title='Oświetlona'>tak</td>
                                    </tr>
                                    <tr><td className='text-center' data-title='Numer'>4</td>
                                        <td className='text-center' data-title='Kolor'>niebieska</td>
                                        <td className='text-center' data-title='Długość [m]'>550</td>
                                        <td className='text-center' data-title='Różnica poziomu [m]'>100</td>
                                        <td className='text-center' data-title='Naśnieżona'>tak</td>
                                        <td className='text-center' data-title='Oświetlona'>nie</td>
                                    </tr>
                                    <tr><td className='text-center' data-title='Numer'>5</td>
                                        <td className='text-center' data-title='Kolor'>niebieska</td>
                                        <td className='text-center' data-title='Długość [m]'>90</td>
                                        <td className='text-center' data-title='Różnica poziomu [m]'>17</td>
                                        <td className='text-center' data-title='Naśnieżona'>tak</td>
                                        <td className='text-center' data-title='Oświetlona'>tak</td>
                                    </tr>
                                    <tr><td className='text-center' data-title='Numer'>6</td>
                                        <td className='text-center' data-title='Kolor'>niebieska</td>
                                        <td className='text-center' data-title='Długość [m]'>220</td>
                                        <td className='text-center' data-title='Różnica poziomu [m]'>21</td>
                                        <td className='text-center' data-title='Naśnieżona'>tak</td>
                                        <td className='text-center' data-title='Oświetlona'>tak</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                        <div className='clearfix'></div>
                        <div className='separator'></div>
                        <h4 className='page-header box top-space'>Wyciągi narciarskie</h4>
                        <div className='box'>
                            <div id='no-more-tables'>
                                <table className='table table-hover'>
                                    <thead>
                                        <tr><th className='active'>Nazwa</th>
                                            <th className='active text-center'>&nbsp;</th>
                                            <th className='active text-center'>Długość [m]</th>
                                            <th className='active text-center'>Wysokość [m n.p.m.]</th>
                                            <th className='active text-center'>Uruchomiony</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        { !loadingSkiLifts && !error && skiLifts.map(skiLift => 
                                        <tr>
                                            <td data-title='Nazwa'>{skiLift["name"]}</td>
                                            <td className='text-center' data-title='&nbsp;'>{skiLift["id"]}</td>
                                            <td className='text-center' data-title='Długość [m]'>{skiLift["skiRunLength"]}</td>
                                            <td className='text-center' data-title='Wysokość [m n.p.m.]'>{skiLift["maxHeight"]}</td>
                                            <td className='text-center' data-title='Uruchomiony'>{skiLift["active"] ? "tak" : "nie"}</td>
                                        </tr>
                                            )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                
            </div>
        </div>
    )
}

export default LiftsPage;