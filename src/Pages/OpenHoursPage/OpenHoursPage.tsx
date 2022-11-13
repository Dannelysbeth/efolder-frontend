import React from 'react';
import { Component, ReactNode, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './OpenHoursPage.css'


const OpenHoursPage = () => {
    return (
        <div className="backgd d-flex flex-column min-vh-100">
            <div className="about-container top-space bottom-space">
                <h1 className="mb-3 fw-normal text-center">Godziny otwarcia*</h1>
            </div>
            <div className="row bottom-space d-flex justify-content-center">
                <div className="col-lg-4 open-container bottom-space">
                    <h1 className="mb-3 fw-normal text-center">W sezonie</h1>
                    <div className="row">
                        <div className="day-column col-lg-6">
                            <h4 className="fw-normal text-end">
                                <p>Poniedziałek: </p>
                                <p>Wtorek: </p>
                                <p>Środa: </p>
                                <p>Czwartek: </p>
                                <p>Piątek: </p>
                                <p>Sobota: </p>
                                <p>Niedziela: </p>
                            </h4>
                        </div>
                        <div className="hours-column col-lg-6">
                            <h4 className="fw-normal text-start">
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                            </h4>
                        </div>
                    </div>
                </div>
                <div className="col-lg-4 open-container bottom-space">
                    <h1 className="mb-3 fw-normal text-center">Poza sezonem</h1>
                    <div className="row">
                        <div className="day-column col-lg-6">
                            <h4 className="fw-normal text-end">
                                <p>Poniedziałek: </p>
                                <p>Wtorek: </p>
                                <p>Środa: </p>
                                <p>Czwartek: </p>
                                <p>Piątek: </p>
                                <p>Sobota: </p>
                                <p>Niedziela: </p>
                            </h4>
                        </div>
                        <div className="hours-column col-lg-6">
                            <h4 className="fw-normal text-start">
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                                <p>8:00-21:00</p>
                            </h4>
                        </div>
                    </div>
                </div>
            </div>
            <div className="mb-3 fw-normal text-start h7">
            <p>*Harmonogram godzin otwarcia nie obowiązuje w święta Bożego Narodzenia, Sylwestra oraz Śięto Trzech Króli. Szczegółowe informacje w sprawie godzin otwarcia w te dni można znaleźć w aktualnościach.</p>
            </div>
        </div>
    )
}

export default OpenHoursPage;