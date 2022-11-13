import React from 'react';
import { Component, ReactNode, useEffect, useState } from "react"
import { Link } from 'react-router-dom';



const EndpaymentPage = () => {
    return (
        <div className="backgd d-flex flex-column min-vh-100">
            <div className="about-container top-space bottom-space">               
                    <h1 className="mb-3 fw-normal text-center">Dziękujemy za zakup</h1>
                    <div className="bottom-space"></div>
                    <h4 className="mb-3 fw-normal text-center">
                    <Link to="/konto" className='w-100 btn btn-lg button-blue'>Zobacz Karnety</Link>
                    </h4>
            </div>
        </div>
    )
}

export default EndpaymentPage;