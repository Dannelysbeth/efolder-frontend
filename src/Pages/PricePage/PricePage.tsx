import React, { Fragment } from 'react';
import { Component, ReactNode, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import { dictionary } from '../../Actions/dictionary';
import './PricePage.css'


const PricePage = () => {

    const [prices, setPrices] = useState([]);
    const [loadingPrices, setLoadingPrices] = useState(true);
    const [error, setError] = useState(false);
    const getPrices = () => {
        return fetch(`${process.env.REACT_APP_REMOTE_URL}/api/prices/current`, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => response.json())
            .then(responseJson => {
                const res = [];
                for (let i = 0; i < responseJson.length; i += 5) {
                    const chunk = responseJson.slice(i, i + 5);
                    res.push(chunk);
                }
                setPrices(res);
                
                setLoadingPrices(false);
            })
            .catch(error => {
                setLoadingPrices(false);
                setError(true);
            });
    }
    useEffect(() => {
        getPrices();
    }, []);
    return (
        <div className="d-flex flex-column min-vh-100">
            <div className="form-price top-space bottom-space">
                <form>
                    <h1 className="mb-3 fw-normal text-center">Cennik</h1>
                    <h3 className="mb-3 fw-normal text-center">Sezon 2022/2023</h3>
                    <div className='cennik pages'>
                        <div className='container'>
                            <div className='clearfix'></div>
                            <div className='well clearfix'>
                                <div className='col-left'>
                                    <div className='box'>
                                        <div id='no-more-tables'>
                                            <table className='table table-hover'>
                                                <thead>
                                                    
                                                    <tr><th className='active'></th>
                                                        <th className='active text-center'>normalna</th>
                                                        <th className='active text-center'>ulgowa**</th>
                                                        <th className='active text-center'>studencka</th>
                                                        <th className='active text-center'>seniorska</th>
                                                        <th className='active text-center'>dla niepełnosprawnych</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { !loadingPrices && !error && prices.map(pricesArray => 
                                                <tr>
                                                    {pricesArray[0]["timePeriod"] && (
                                                        <Fragment>
                                                            <td data-title=''>{dictionary[pricesArray[0]["timePeriod"]]}</td>
                                                            <td className='text-center' data-title='normalna'>{Math.round(pricesArray[0]["price"])}</td>
                                                            <td className='text-center' data-title='ulgowa**'>{Math.round(pricesArray[1]["price"])}</td>
                                                            <td className='text-center' data-title='normalna'>{Math.round(pricesArray[2]["price"])}</td>
                                                            <td className='text-center' data-title='ulgowa**'>{Math.round(pricesArray[3]["price"])}</td>
                                                            <td className='text-center' data-title='ulgowa**'>{Math.round(pricesArray[4]["price"])}</td>
                                                        </Fragment>
                                                    )}
                                                    
                                                </tr>
                                                    )}
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className='clearfix'></div>
                                    <div className='separator'></div>
                                    <div className='box'><ul>
                                        <li>karnet&nbsp;terminowy&nbsp;upoważnia do korzystania z kolei krzesełkowych,&nbsp;wyciąg&oacute;w orczykowych oraz przenośnik&oacute;w taśmowych</li>
                                        <li>z karnetu&nbsp;może korzystać tylko jedna osoba</li>
                                        <li>karnet&nbsp;w chwili przyłożenia do czytnika bramkowego blokuje się na określony czas</li>
                                        <li>ilość przejazd&oacute;w na karnecie czasowym&nbsp;jest nieograniczona</li>
                                        <li>podane ceny są cenami w złotych polskich (brutto z Vat)</li>
                                        <li><strong>* Sezon trwa&nbsp;-&nbsp;od 25&nbsp;grudnia 2021r&nbsp;do&nbsp;27&nbsp;lutego 2022r</strong></li>
                                    </ul>

                                        <p>​</p>
                                    </div><div className='clearfix'></div><div className='box'><h4 className='page-header'>** Cena ulgowa przysługuje</h4><ul>
                                        <li>dzieci urodzone w roku 2017&nbsp;i młodsze - przejazdy darmowe</li>
                                        <li>dzieci urodzone w latach 2006&nbsp;do 2016&nbsp;- ceny ulgowe</li>
                                        <li>osoby urodzone w latach 1961&nbsp;do 2005&nbsp;- ceny normalne</li>
                                        <li>osoby urodzone w latach 1946&nbsp;do 1960&nbsp;- ceny ulgowe</li>
                                        <li>osoby urodzone w roku 1945&nbsp;i starsze - cena dzienna za 10 zł</li>
                                    </ul>
                                    </div>
                                    <div className='clearfix'></div>
                                    <div className='box'>
                                        <h4 className='page-header'>Cennik przejazdów pojedyńczych</h4>
                                        <table className='table table-hover'>
                                            <thead>
                                                <tr><th className='text-center active'>Ilość zjazdów</th>
                                                    <th className='active text-center'>Koszt normalny [zł]</th>
                                                    <th className='active text-center'>Koszt ulgowy [zł]</th>
                                                    <th className='active text-center'>Koszt studencki [zł]</th>
                                                    <th className='active text-center'>Koszt senioski [zł]</th>
                                                    <th className='active text-center'>Koszt niepełnosprawnych [zł]</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            { !loadingPrices && !error && prices.map(pricesArray => 
                                                <tr>
                                                    {pricesArray[0]["entries"] && (
                                                        <Fragment>
                                                            <td className='text-center' data-title='Nazwa'>{pricesArray[0]["entries"]}</td>
                                                            <td className='text-center' data-title=''>{Math.round(pricesArray[0]["price"])}</td>
                                                            <td className='text-center' data-title=''>{Math.round(pricesArray[1]["price"])}</td>
                                                            <td className='text-center' data-title=''>{Math.round(pricesArray[2]["price"])}</td>
                                                            <td className='text-center' data-title=''>{Math.round(pricesArray[3]["price"])}</td>
                                                            <td className='text-center' data-title=''>{Math.round(pricesArray[4]["price"])}</td>
                                                        </Fragment>
                                                    )}
                                                    
                                                </tr>
                                                    )}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className='clearfix'></div>
                                    <div className='box'>
                                        <div className='clearfix'></div>
                                        <div className='separator'></div>
                                        <ul>
                                            <li>przejazdy pojedyncze upoważniają do korzystania z kolei krzesełkowych,&nbsp;wyciąg&oacute;w orczykowych i przenośnik&oacute;w taśmowych</li>
                                            <li>niewykorzystane przejazdy są ważne cały sezon</li>
                                            <li>zakupione bilety działają na wszystkich wyciągach i zużywane są niezależnie od długości trasy</li>
                                            <li>podane ceny są cenami w złotych polskich (brutto z Vat)</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
                <div className="bottom-space"></div>
            </div>


        </div>
    )
}

export default PricePage;