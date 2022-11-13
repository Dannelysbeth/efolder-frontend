import React, { useState, useEffect, Fragment } from 'react';
import { Link, Navigate } from 'react-router-dom';
import './BuyTicketPage.css'
import { dictionary } from '../../Actions/dictionary';
import LoadingScreen from 'react-loading-screen'
import { connect } from 'react-redux';




const BuyTicketPage = ({isAuthenticated, user}) => {


    const [prices, setPrices] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingPayment, setLoadingPayment] = useState(false);
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
                
                setLoading(false);
                console.log(prices);
            })
            .catch(error => {
                setLoading(false);
                setError(true);
            });
    };

    const [skiLifts, setskiLifts] = useState([]);
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
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setError(true);
            });
    }
    useEffect(() => {
        getPrices();
        getSkiLifts();
    }, []);

    const [ticketsData, setTicketsData] = useState({
        skiLiftName: '',
        ownerName: user ? user.firstName + " " + user.LastName : "",
        discountType: '',
        numberOfEntries: 0
    });

    const [voucherData, setVoucherData] = useState({
        timePeriod: '',
        ownerNameVoucher: user ? user.firstName + " " + user.LastName : "",
        discountTypeVoucher: ''
    });

    const { ownerName, skiLiftName, discountType, numberOfEntries } = ticketsData;
    const { ownerNameVoucher, timePeriod, discountTypeVoucher } = voucherData;
    //const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onChangeTickets = e => setTicketsData({ ...ticketsData, [e.target.name]: e.target.value });
    const onChangeVouchers = e => setVoucherData({ ...voucherData, [e.target.name]: e.target.value });
    const postPayment = async () => {
        let ticketsEmpty = false;
        let vouchersEmpty = false;
        if(skiLiftName === "" || discountType === "" || numberOfEntries === 0)
            ticketsEmpty = true;
        if(timePeriod === "" || discountTypeVoucher === "")
            vouchersEmpty = true;
        if(ticketsEmpty && vouchersEmpty)
            return;
        setLoadingPayment(true);
        const response = await fetch(`${process.env.REACT_APP_REMOTE_URL}/api/payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            },
            body: JSON.stringify({"tickets": !ticketsEmpty ? [{ownerName, skiLiftName, discountType, numberOfEntries}] : [],"vouchers": !vouchersEmpty ? [{ownerName : ownerNameVoucher, timePeriod, discountType : discountTypeVoucher}] : [] })
        })
        
        const url = await response.text();
        setLoadingPayment(false);
        window.location.replace(url); 
    }



    return (
        <LoadingScreen
        loading={loadingPayment}
        bgColor='#f1f1f1'
        spinnerColor='#9ee5f8'
        textColor='#676767'
    >     
        <div className="d-flex flex-column min-vh-100">
            
            <div className="form-buy top-space bottom-space">
                <form>
                    <h1 className="mb-3 fw-normal text-center">Kup karnet online</h1>
                    <h3 className="mb-3 fw-normal text-center">Sezon 2022/2023</h3>
                    <div className='cennik pages'>
                        <div className='container'>
                            <div className='clearfix'></div>
                            <div className='well clearfix'>
                                <div className='col-left'>
                                    <div className='box'>
                                        <div id='no-more-tables'>
                                            <h4 className='page-header text-center'>Przejazdy czasowe</h4>
                                            <table className='table table-hover'>
                                            <thead>
                                                    <tr><th className='active'></th>
                                                    <th className='active text-center'>Koszt normalny [zł]</th>
                                                    <th className='active text-center'>Koszt ulgowy [zł]</th>
                                                    <th className='active text-center'>Koszt studencki [zł]</th>
                                                    <th className='active text-center'>Koszt senioski [zł]</th>
                                                    <th className='active text-center'>Koszt niepełnosprawnych [zł]</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                { !loading && !error && prices.map(pricesArray => 
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
                                    <div className='box'>
                                        <h4 className='page-header text-center'>Przejazdy pojedyńcze</h4>
                                        <table className='table table-hover'>
                                            <thead>
                                                <tr>
                                                    <th className='text-center active'>Ilość zjazdów</th>
                                                    <th className='active text-center'>Koszt normalny [zł]</th>
                                                    <th className='active text-center'>Koszt ulgowy [zł]</th>
                                                    <th className='active text-center'>Koszt studencki [zł]</th>
                                                    <th className='active text-center'>Koszt senioski [zł]</th>
                                                    <th className='active text-center'>Koszt niepełnosprawnych [zł]</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            { !loading && !error && prices.map(pricesArray => 
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

                                </div>
                            </div>
                        </div>
                    </div>
                    { isAuthenticated && 
                    <Fragment>
                    <div className="row">
                        <div className="day-column col-lg-4 mt-2">
                            <h6>Bilety na przejazdy pojedyńcze</h6>
                        </div>
                        <div className="day-column col-lg-2">
                            <select className="form-select" aria-label="Default select example" name="numberOfEntries" value={numberOfEntries} onChange={onChangeTickets}>
                                <option selected value={''}>Ilość zjazdów</option>
                                { !loading && !error && prices.map(pricesArray => 
                                    <Fragment>
                                    {pricesArray[0]["entries"] && (
                                        <Fragment>
                                            <option value={pricesArray[0]["entries"]}>{pricesArray[0]["entries"]}</option>
                                        </Fragment>
                                    )}
                                    </Fragment>
                                    )}
                            </select>

                        </div>
                        <div className="day-column col-lg-2">
                            <select className="form-select" aria-label="Default select example" name="skiLiftName" value={skiLiftName} onChange={onChangeTickets}>
                                <option selected>Wyciąg</option>
                                { !loading && !error && skiLifts.map(skiLift =>
                                    <Fragment>
                                        <option value={skiLift["name"]}>{skiLift["name"]}</option>
                                    </Fragment>
                                )}
                            </select>

                        </div>
                        <div className="day-column col-lg-2">
                            <select className="form-select" aria-label="Default select example" name="discountType" value={discountType} onChange={onChangeTickets}>
                                <option selected disabled>Ulga</option>
                                <option value={"None"}>Brak</option>
                                <option value={"Child"}>Ulgowy</option>
                                <option value={"Student"}>Studencki</option>
                                <option value={"Senior"}>Senior</option>
                                <option value={"Disabled"}>Dla niepełnosprawnych</option>
                            </select>
                        </div>
                    </div>
                    <div className="row">
                        <div className="day-column col-lg-4 mt-2">
                            <h6>Bilety na przejazdy czasowe</h6>
                        </div>
                        <div className="day-column col-lg-2">
                            <select className="form-select" aria-label="Default select example" value={timePeriod} name="timePeriod" onChange={onChangeVouchers}>
                                <option selected>Czas</option>
                                { !loading && !error && prices.map(pricesArray => 
                                    <Fragment>
                                    {pricesArray[0]["timePeriod"] && (
                                        <Fragment>
                                           <option value={pricesArray[0]["timePeriod"]}>{dictionary[pricesArray[0]["timePeriod"]]}</option>
                                        </Fragment>
                                    )}
                                        
                                    </Fragment>
                                        )}
                            </select>

                        </div>
                        <div className="day-column col-lg-2">
                            <select className="form-select" aria-label="Default select example" value={discountTypeVoucher} name="discountTypeVoucher" onChange={onChangeVouchers}>
                                <option selected>Ulga</option>
                                <option value={"None"}>Brak</option>
                                <option value={"Child"}>Ulgowy</option>
                                <option value={"Student"}>Studencki</option>
                                <option value={"Senior"}>Senior</option>
                                <option value={"Disabled"}>Dla niepełnosprawnych</option>
                            </select>
                        </div>
                    </div>
                    <button onClick={() => postPayment()} className="w-100 btn btn-lg button-blue" type="button">Kup karnety</button>
                    </Fragment>}
                    { !isAuthenticated && <Link to="/login" className="w-100 btn btn-lg button-blue" >Zaloguj się aby kupić</Link>}
                </form>

            </div>
        </div>
        </LoadingScreen>
    )
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    user: state.auth.user
})

export default connect(mapStateToProps)(BuyTicketPage);