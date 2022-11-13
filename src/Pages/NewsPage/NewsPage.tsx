import React from 'react';
import { Component, ReactNode, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './NewsPage.css'


const NewsPage = () => {
    return (
        
        <div>
          <div className="about-container top-space bottom-space">               
                    <h1 className="mb-3 fw-normal text-center">Aktualności</h1>
            </div>
        <div className="about-conteiner">
            <div className="about-container top-space bottom-space">
            <h1 className="mb-3 text-center fw-normal">Zakończenie sezonu 2021/2022</h1>
                <div className="row justify-content-center top-space">   
                    <div className="col-lg-6 top-space">
                      <p>Dziękujemy Państwu za wspólnie spędzony czas i przypominamy, że jesteśmy
                         otwarci również poza sezonem, zapraszamy do skorzystania z naszej oferty
                        gastronomicznej oraz spędzania czasu na wędrówkach górskich po terenie naszego ośrodka.</p>
                        <p>W przyszłym sezonie planujemy otworzyć dwie nowe trasy: jedną dla początkujących narciarzy oraz drugą dla miłośników nocnej jazdy, otwartą przez całą noc.</p>
                    </div>
                    <div className="col-lg-6 ">
                        <img className="image-border-contact img-fluid mx-auto" src="https://i.imgur.com/PGXeDXO.jpg" alt="Generic placeholder image" width="400" height="600" />
                    </div>
                </div>
            </div>
        </div>

        <div className="about-conteiner">
            <div className="about-container top-space bottom-space">
            <h1 className="mb-3 text-center fw-normal">Spędź z nami ferie zimowe</h1>
                <div className="row justify-content-center top-space">   
                    <div className="col-lg-6 top-space">
                      <p></p><p></p><p>Zapraszamy wszystkie dzieci w wieku od 3 do 15 lat na organizowane przez nas co roku półkolonie narciarskie. Prosimy o kontakt z instruktorem w celu
               przydzielenia do odpowiedniej grupy zaawansowania. Gwarantujemy świetną zabawę na śniegu.
               <p></p><p> W cenie półkoloni zapewniamy dzieciom ciepłe napoje oraz obiad w naszej karczmie.
               Istnieje możliwość wypożyczenia sprzętu w naszej wypożyczalni. Dla uczestników półkoloni przygotowaliśmy specjalną zniżkę. <p></p> Zapraszamy do skontaktowania się z nami w razie dodatkowych pytań.</p> 
                  </p>  
                    </div>
                    <div className="col-lg-6 ">
                        <img className="image-border-contact img-fluid mx-auto" src="https://i.imgur.com/Ik3bCYH.jpg" alt="Generic placeholder image" width="400" height="600" />
                    </div>
                </div>
            </div>
        </div>

        <div className="about-conteiner">
            <div className="about-container top-space bottom-space">
            <h1 className="mb-3 text-center fw-normal">Sylwester na stoku</h1>
                <div className="row justify-content-center top-space">   
                    <div className="col-lg-6 top-space">
                      <p>Jak co roku organizujemy dla Państwa zabawę sylwestrową na naszym stoku. Zaplanowaliśmy dla Państwa mnóstwo atrakcji. Wyciągi będą czynne przez całą noc. Zaplanowaliśmy konkursy z nagrodami.
                      <p>O północy planowany jest pokaz sztucznych ogni. Dla każdego narciarza przygotowaliśmy kieliszek szampana, na koszt firmy oraz nieograniczony dostęp do ciepłej herbaty 
                          z domowej roboty sokiem malinowym, w naszej karczmie.
                      </p>
                      <p>Do zobaczenia na stoku!</p>
               <p></p></p>
                    </div>
                    <div className="col-lg-6 ">
                        <img className="image-border-contact img-fluid mx-auto" src="https://i.imgur.com/ypAgbSo.jpg" alt="Generic placeholder image" width="400" height="600" />
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default NewsPage;