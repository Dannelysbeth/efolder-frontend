import React from 'react';
import { Component, ReactNode, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './AboutUsPage.css'


const AboutUsPage = () => {
    return (
        <div className="backgd d-flex flex-column min-vh-100">
            <div className="about-container top-space bottom-space">               
                    <h1 className="mb-3 fw-normal text-center">Kim jesteśmy?</h1>
                    <div className="bottom-space"></div>
                    <h4 className="mb-3 fw-normal text-center">
                    <p>Stacja Narciarska Srebrne Stoki to kompleksowa oferta dla miłośników białego szaleństwa - od noclegów po szkołę narciarstwa i snowboardu.</p>
                    <p>Obiekty i teren przeznaczony do uprawiania sportów zimowych są położone głeboko w dolinie na północnych stokach, co gwarantuje utrzymanie śniegu aż do późnej wiosny! </p>
                    <p>Stacja narciarska Srebrne Stoki istnieje już od wielu lat, jej oferta jest z sezonu na sezon poszerzana o nowe atrakcje i udogodnienia. Obecnie w jego ramach funkcjonuje snowpark - dla fanów freestylu, cztery oświetlone trasy zjazdowe wraz z nowoczesnymi wyciągami.</p>
                    <p>Zaczynasz przygodę z narciarstwem? Spokojnie, nasi wykwalifikowani instruktorzy z szkoły narciarskiej nauczą każdego, bez wzgledu na wiek i umiejętności!</p>
                    <p>Już nie musisz być rannym ptaszkiem, by cieszyć się jazdą na sztruksie.</p>
                    <p>Nocna Jazda to idealny sposób na relaks po ciężkim dniu pracy. Specjalnie dla Was ratrakujemy stoki podczas przerwy od 16:00 do 18:00 co pozwala na jazdę po świeżo przygotowanym stoku i bez muld także wieczorem. </p>
                    </h4>
                    <h5 className="text-end italic">Zapraszamy!</h5>
            </div>
        </div>
    )
}

export default AboutUsPage;