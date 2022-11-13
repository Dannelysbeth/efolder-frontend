import React from 'react';
import { Component, ReactNode, useEffect, useState } from "react"
import { Link } from 'react-router-dom';



const CancelPaymentPage = () => {
    return (
        <div className="backgd d-flex flex-column min-vh-100">
            <div className="about-container top-space bottom-space">               
                    <h1 className="mb-3 fw-normal text-center">Zakup się nie powiód</h1>
                    <div className="bottom-space"></div>
                    <h4 className="mb-3 fw-normal text-center">
                    <Link to="/karnety-online" className='w-100 btn btn-lg button-blue'>Kup ponownie</Link>
                    </h4>
            </div>
        </div>
    )
}

export default CancelPaymentPage;