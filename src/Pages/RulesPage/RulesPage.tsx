import React from 'react';
import { Component, ReactNode, useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom";
import './RulesPage.css'


const RulesPage = () => {
    return (
        <div className="backgd d-flex flex-column min-vh-100">
            <div className="about-container top-space bottom-space">               
                    <h1 className="mb-3 fw-normal text-center">Regulamin</h1>
                    <div>
                        <p>1. Podstawą do wjazdu wyciągiem jest posiadanie ważnego karnetu czasowego lub punktowego. Do kontroli ważności karnetu upoważniona jest obsługa wyciągu.</p>
                        <p>2. Z wjazdu wyciągiem mogą korzystać osoby, które posiadają umiejętności samodzielnego przyjęcia i opuszczenia urządzenia holującego wyciągu oraz potrafią samodzielnie wjechać na całej trasie wjazdowej.</p>
                        <p>3. Dojście do miejsca startu na peronie dolnym odbywa się wyłącznie po trasie wyznaczonej przez obsługę wyciągu.</p>
                        <p>4. Na peronie w miejscu oczekiwania na urządzenie holujące może przebywać tylko jedna osoba. Pozostałe osoby oczekują w kolejce przed bramką wejściową na peron.</p>
                        <p>5. Osoba oczekująca na peronie trzyma kijki narciarskie w jednej ręce. Drugą ręką chwyta za zaczep holujący i talerzyk wkłada pomiędzy uda. Przy starcie należy stać na sztywnych nogach (nie siadać na talerzyku), tak aby wystąpiło zjawisko holowania.</p>
                        <p>6. Na jednym zaczepie holowniczym może wjechać tylko jedna osoba.</p>
                        <p>7. Wjazd odbywa się wyłącznie po wyznaczonym torze wjazdowym. Wyjazd poza tor, zygzakowanie, wyczepianie się na trasie z zaczepu holującego przed dojazdem do peronu górnego są niedozwolone. Zabronione jest również wczepianie się na torze wjazdowym poza peronem dolnym.</p>
                        <p>8. W razie wywrócenia się podczas wjazdu, należy niezwłocznie usunąć się z toru wjazdowego aby nie utrudniać wjazdu następnym narciarzom.</p>
                        <p>9. W czasie wjazdu należy stosować się do znaków umieszczonych na podporach trasowych wyciągu oraz na peronie stacji górnej.</p>
                        <p>10. Po wjeździe na peron górny, należy zwolnić zaczep holujący i odjechać wyznaczoną trasą poza peron, tak aby nie utrudniać ruchu następnym narciarzom. Postój na peronie jest niedozwolony.</p>
                        <p>11. W przypadku zatrzymania wyciągu w czasie wjazdu, można nie wyczepiając się poczekać do ponownego uruchomienia, bądź w przypadku dłuższego postoju z przyczyn technicznych, wyczepić się z zaczepu holującego i zjechać do stacji dolnej.</p>
                        <p>12. Dzieci i młodzież do 16-tego roku życia obowiązuje przy wjeździe wyciągiem i zjeżdżaniu na trasie zjazdowej posiadanie kasku ochronnego, konstrukcyjnie do tego celu przeznaczonego. W przypadku nie spełnienia tego warunku, obsługa wyciągu zobowiązana jest do zabronienia korzystania z wyciągu i trasy zjazdowej danej osobie.</p>
                        <p>13. Obsługa wyciągu może odmówić wstępu na wyciąg lub nakazać opuszczenie terenu Stacji osobie, której zachowanie wyraźnie wskazuje, że znajduje się ona w stanie nietrzeźwości lub pod wpływem środka odurzającego.</p>
<p>14. Do wjazdu poza kolejnością uprawnieni są pracownicy Stacji Narciarskiej Kamienica, ratownicy GOPR w czasie akcji ratunkowej oraz patrole policji.</p>
<p>15. W razie wypadku należy niezwłocznie poinformować najbliższą obsługę wyciągu narciarskiego.</p>
<p>16. Regulamin dotyczy narciarstwa i snowboardu.</p>
<p>17. W sprawach nie objętych niniejszym regulaminem należy stosować się do zaleceń obsługi wyciągu, oraz mają zastosowanie przepisy „Regulaminu dla narciarzy korzystających ze zorganizowanych trenów narciarskich w Stacji Narciarskiej ,,Srebrne Stoki”, który jest dostępny w kasach sprzedających karnety i na stronie internetowej ośrodka</p>
                    </div>
      </div>
        </div>
    )
}

export default RulesPage;