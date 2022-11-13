import React from 'react';
import { Component, ReactNode, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './HelpPage.css'
import code from'./img/code.jpg'
import voucher from './img/voucher.jpg'
import  activecode from './img/activecode.jpg'
import  empty from './img/empty.jpg'
import  google from './img/google.jpg'
import  login from './img/login.jpg'
import  registration from './img/registration.jpg'
import  user from './img/user.jpg'
import  tickets from './img/tickets.jpg'
import loginWeb from './img/loginWeb.png'
import shopWeb from './img/shopWeb.png'
import registerWeb from './img/registerWeb.png'
import page from './img/page.png'
import report from './img/report.png'

const HelpPage = () => {
    return (
        
        <div>
        <div className="about-conteiner">
            <div className="about-container top-space bottom-space">
            <h1 className="mb-3 text-center fw-normal">Jak korzystać z serwisu?</h1>
                <div className="row justify-content-center top-space "> 
                    <div className="col-lg-6">
                    <h1 className="mb-3 text-center fw-normal">Poruszanie się po stronie</h1>
                    <p>Użytkownik może przechodzić do poszczególnych podstron za pomocą panelu nawigacji znajdującego się na górze strony.</p>
                    <p>Wskazówki dojazdu do naszego ośrodka, wraz z mapą na której została zaznaczona lokalizacja znajdują się w sekcji "Kontakt"</p>
                    <p>Zachęcamy do śledzenia aktualnych informacji, które na bieżąco zamieszczamy na stronie "Aktualności</p>
                    <p>Aby zapoznać się z cenami biletów należy przejść do sekcji "Cennik". Na stronie "Wyciągi" zamieściliśmy listę wyciągów.</p>
                    <p>Niezalogowany użytkownik nie może kupować biletów. Aby się zalogować należy przejść do panelu logowania klikając przycisk "Zaloguj"
                    </p>
                    </div>
                   
                </div>
                <div className="row justify-content-center top-space "> 
                <div className="col-lg-6 bottom-space">
                        <img className="image-border-contact img-fluid mx-auto" src={page} alt="Generic placeholder image" width="600" height="600" />
                    </div>  
                </div>

                <div className="row justify-content-center top-space center-help"> 
                    <div className="col-lg-6 top-space ">
                    <h1 className="mb-3 text-center fw-normal">Rejestracja</h1>
                    <p>Użytkownik może zarejestrować się w systemie przechodząc do zakładki "Zaloguj". Na stronie logowania należy nacisnąć przycisk "zarejestruj", 
                        który przeniesie użytkownika do panelu rejestracji.
                    </p>
                    <p>Użytkownik powinien wypełnić formularz podając swoje imię, nazwisko, adres e-mail, login i hasło.</p>
                    <p>Po poprawnym wypełnieniu formularza należy nacisnąć przycisk "Zarejestruj". Jeśli wszystkie dane były prawidłowe,
                        zostało utworzone nowe konto, na które można się zalogować.
                    </p>
                    
                    </div>
                    <div className="col-lg-4 bottom-space">
                        <img className="image-border-contact img-fluid mx-auto" src={registerWeb} alt="Generic placeholder image" width="300" height="300" />
                    </div>
                </div>

                <div className="row justify-content-center top-space center-help"> 
                    <div className="col-lg-6 top-space ">
                    <h1 className="mb-3 text-center fw-normal">Logowanie</h1>
                    <p>Użytkownik może zalogować się do systemu po wpisaniu swojej nazwy użytkownika oraz hasła. Jeśli wprowadzono poprawne dane użytkownik zostanie zalogowany do systemu i będzie miał możliwość zakupienia biletów    
                    </p>
                    <p>Użytkownik ma możliwość zalogowania się za pomocą swojego konta google. W tym celu na stronie logowania należy wybrać opcję "Zaloguj się za pomocą konta Google" i podążać za instrukcjami wyświetlanymi na stronie.</p>
                   
                    </div>
                    <div className="col-lg-4 bottom-space">
                        <img className="image-border-contact img-fluid mx-auto" src={loginWeb} alt="Generic placeholder image" width="300" height="300" />
                    </div>
                </div>


                <div className="row justify-content-center top-space center-help"> 
                    <div className="col-lg-6 top-space ">
                    <h1 className="mb-3 text-center fw-normal">Wybór i zakup biletów</h1>
                    <p>Zalogowany użytkownik ma możliwość zakupienia biletów i karnetów na wyciągi. Aby zakupić bilet należy przejść do zakładki "Karnety Online".</p>
                    <p>Następnie użytkownik może wybrać interesujące go karnety wraz z odpowiednią zniżką i dodać je do koszyka.</p>
                    <p>Po zatwierdzeniu zakupu biletów. Użytkownik zostanie przekierowany do strony systemu płatności PayU.</p>
                    <p>Jeśli płatność została wykonana prawidłowo, bilety będą dostępne w aplikacji mobilnej.</p>
                    <p>W razie problemów proszę kontaktować się z naszymi konsultantami drogą mailową lub telefoniczną. Bardzo chętnie Państwu pomożemy.</p>
                                     
                    </div>
                    <div className="col-lg-4 bottom-space">
                        <img className="image-border-contact img-fluid mx-auto" src={shopWeb} alt="Generic placeholder image" width="600" height="600" />
                    </div>
                </div>

                <div className="row justify-content-center top-space center-help"> 
                    <div className="col-lg-6 top-space ">
                    <h1 className="mb-3 text-center fw-normal">Generowanie raportów</h1>
                    <p>Użytkownik może pobrać raport zakupionych biletów. Po kliknięciu przycisku "Wygeneruj raport" zostanie wygenerowany raport w formacie pdf, który można pobrać na swój komputer.

                    </p>
                    <p>Raport zawiera wszystkie zakupione bilety wraz z imieniem i nazwiskiem osoby, do której należą bilety.</p>
                   
                    </div>
                    <div className="col-lg-4 bottom-space">
                        <img className="image-border-contact img-fluid mx-auto" src={report} alt="Generic placeholder image" width="300" height="300" />
                    </div>
                </div>

            
            </div>
            
        </div>

        <div className="about-conteiner">
            <div className="about-container top-space bottom-space">
            <h1 className="mb-3 text-center fw-normal">Jak korzystać z aplikacji mobilnej?</h1>
                <div className="row justify-content-center top-space">   
                    <div className="col-lg-6 top-space center-help">
                    <h1 className="mb-3 text-center fw-normal">Tworzenie konta</h1>
                    <p>Aby móc korzystać z aplikacji mobilnej, użytkownik musi posiadać konto w systemie. Użytkownik może założyć konto w aplikacji mobilnej.</p>
                    <p>Po kliknięciu przycisku rejestracja należy wypełnić formularz. Użytkownik powinien kolejno podać swoje imię, nazwisko, nazwę użytkownika,
                        adres e-mail oraz hasło, które należy zatwierdzić poprzez wpisanie go drugi raz. </p>
                        <p> Po poprawnym wypełnieniu formularza należy nacisnąć przycisk
                        "Zarejestruj się". Jeśli formularz został wypełniony prawidłowo, zostanie utworzone nowe konto dla użytkownika.
                    </p>
                    </div>
                    <div className="col-lg-4 bottom-space">
                        <img className="image-border-contact img-fluid mx-auto" src={registration} alt="Generic placeholder image" width="300" height="300" />
                    </div>

                    <div className="col-lg-6 top-space center-help">
                    <h1 className="mb-3 text-center fw-normal">Logowanie</h1>
                    <p>Użytkownik posiadający konto w systemie może zalogować się do serwisu za pomocą swojego loginu i hasła podanych przy rejestracji.</p>
                    <p>Po wprowadzeniu danych należy kliknąć przycisk zaloguj się. Jeśli podane dane były poprawne, użytkownik zostanie zalogowany do systemu.</p>
                    </div>
                    <div className="col-lg-4 bottom-space">
                        <img className="image-border-contact img-fluid mx-auto" src={login} alt="Generic placeholder image" width="300" height="300" />
                    </div>


                    <div className="col-lg-6 top-space center-help">
                    <h1 className="mb-3 text-center fw-normal">Logowanie się za pomocą konta google</h1>
                    <p>Użytkownik może zalogować się do systemu również za pomocą konta google. W tym celu należy wybrać odpowiednią opcję w panelu rejestracyjnym </p>
                    <p></p>
                    <p>Następnie należy podać swój adres e-mali i podążać za kolejnymi instrukcjami wyświetlanymi na ekranie. </p></div>
                    <div className="col-lg-4 bottom-space ">
                        <img className="image-border-contact img-fluid mx-auto" src={google} alt="Generic placeholder image" width="300" height="300" />
                    </div>


                    <div className="col-lg-6 top-space center-help">
                    <h1 className="mb-3 text-center fw-normal">Konto użytkownika</h1>
                    <p>Po zalogowaniu się do systemu, użytkownik może przeglądać swoje dane podane podczas logowania. Aby wylogować się z aplikacji należy nacisnąć przycisk "Wyloguj".
                    </p>
                    <p></p>
                  </div>
                    <div className="col-lg-4 bottom-space">
                        <img className="image-border-contact img-fluid mx-auto" src={user} alt="Generic placeholder image" width="300" height="300" />
                    </div>

                    <div className="col-lg-6 top-space center-help">
                    <h1 className="mb-3 text-center fw-normal">Przeglądanie biletów</h1>
                    <p>Zalogowany użytkownik może przeglądać swoje bilety oraz karnety zakupione przez stronę internetową. Jeśli użytkownik nie posiada żadnych biletów,
                        na ekranie wyświetli się odpowiednia informacja.
                    </p>
                    <p></p>
                  </div>
                    <div className="col-lg-4 bottom-space">
                        <img className="image-border-contact img-fluid mx-auto" src={empty} alt="Generic placeholder image" width="300" height="300" />
                    </div>
                    <div className="col-lg-6 top-space center-help">
                    <h1 className="mb-3 text-center fw-normal">Przeglądanie listy dostępnych biletów lub karnetów na dany wyciąg</h1>
                    <p>W aplikacji użytkownik może przeglądać zakupione przez siebie karnety i bilety. Z dołu ekranu należy wybrać odpowiednią zakładkę. 
                         Po wybraniu wyciągu z listy wyświetlają się bilety lub karnety na dany wyciąg. 
                    </p>
                    <p></p>
                  </div>
                    <div className="col-lg-4 bottom-space">
                        <img className="image-border-contact img-fluid mx-auto" src={tickets} alt="Generic placeholder image" width="300" height="300" />
                    </div>

                

                    <div className="col-lg-6 top-space">
                    <h1 className="mb-3 text-center fw-normal">Wyświetlanie kodu QR oraz skanowanie biletu</h1>
                   <p>Po wybraniu biletu lub vouchera z listy, użytkownik może zobaczyć kod QR swojego biletu, który jest potrzebny do skorzystania z wyciągu.</p>
                    <p>Jeśli kod jest aktywny, to narciarz, po przyłożeniu telefonu do skanera zamieszczonego przy wyciągu, będzie mógł przejść przez bramki.</p>
                    <p>Jeżeli kod nie jest aktywny narciarz nie zostanie przepuszczony, a na ekranie skanera zostanie wyświetlony odpowiedni komunikat. Bardzo prosimy o sprawdzenie ważności biletu przed ustawieniem się
                        w kolejce do wyciągu. 
                    </p>
                    <p>Jasność telefonu powinna być ustawiona na co najmniej 70%, dzięki temu skaner bez problemu powinien zeskanować kod QR.</p>
                    <p>W razie jakichkolwiek problemów ze skanowaniem biletu prosimy skontaktować się z obsługą, która jest zawsze chętna do pomocy.</p>
                    </div>
                    <div className="col-lg-4 " >
                        <img className="image-border-contact img-fluid mx-auto" src={activecode} alt="Generic placeholder image" width="300" height="300" />
                    </div>
                </div>
            </div>
        </div>

        
        </div>
        
    )
}

export default HelpPage;