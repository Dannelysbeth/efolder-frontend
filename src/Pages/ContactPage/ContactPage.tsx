import React from 'react';
import { Component, ReactNode, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './ContactPage.css'
import Map from './Map';

const ContactPage = () => {
    return (
        <div className="backgd d-flex flex-column min-vh-100">
            <div className="about-container top-space bottom-space">
                <div className="row justify-content-center top-space">
                    <div className="col-lg-6 text-center">
                        <h1 className="mb-3 fw-normal">Kontakt</h1>
                        <p>SREBRNE&nbsp; STOKI&nbsp; STACJA&nbsp; NARCIARSKA</p>
                        <p>42-606 Tarnowskie Góry</p><p> ul. Podleśna 54</p>
                        <p><strong>tel. &nbsp;w sezonie zimowym&nbsp;</strong><a href="tel:+48731001313">+ 48 &nbsp;731 001 313&nbsp;</a></p>
                        <p><strong>tel. &nbsp;poza sezonem </strong><a href="tel:+48338564100">+ 48&nbsp;505 035 683 </a></p>
                        <p><strong>e-mail</strong>:&nbsp;<a href="mailto:srebrnestoki@wp.pl">srebrnestoki@wp.pl</a></p>
                        <p>Parkingi</p>
                        <p>Stacja Narciarska posiada trzy duże parkingi: </p> <p> Parking A, Parking B oraz Parking C dla ok. 250 samochodów. </p>
                    </div>
                    <div className="col-lg-6 top-space">
                        <img className="image-border-contact img-fluid mx-auto" src="https://i.imgur.com/PGXeDXO.jpg" alt="Generic placeholder image" width="400" height="600" />
                    </div>
                </div>
                <h1 className="mb-3 fw-normal text-center top-space">Dojazd</h1>
                <Map></Map>

            </div>
        </div>
    )
}

export default ContactPage;