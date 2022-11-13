import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MainPage.css";

const MainPage = () => {
  return (
    <div className="main ">
      <div
        id="carouselExampleIndicators"
        className="carousel slide"
        data-ride="carousel"
      >
        <ol className="carousel-indicators">
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="0"
            className="active"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="1"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="2"
          ></li>
          <li
            data-bs-target="#carouselExampleIndicators"
            data-bs-slide-to="3"
          ></li>
        </ol>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              className="d-block w-100"
              src="https://i.imgur.com/P7vtNin.png"
              alt="First slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://i.imgur.com/pXs6vHD.png"
              alt="Second slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://i.imgur.com/VoAI5uo.png"
              alt="Third slide"
            />
          </div>
          <div className="carousel-item">
            <img
              className="d-block w-100"
              src="https://i.imgur.com/ylrn2Pj.png"
              alt="Forth slide"
            />
          </div>
        </div>
        <a
          className="carousel-control-prev"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Poprzedni</span>
        </a>
        <a
          className="carousel-control-next"
          href="#carouselExampleIndicators"
          role="button"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="sr-only">Następny</span>
        </a>
      </div>
      <div className="container top-space bottom-space">
        <div className="row justify-content-center">
          <div className="col-md-5">
            <h2 className="featurette-heading">
              Poznaj wartości naszej firmy!
            </h2>
            <p className="lead">
              Nasze osobiste wyzwanie i misja: przenosimy konkurencyjność
              naszych klientów w świecie cyfrowym na wyższy poziom.
            </p>
            <p>
              <Link to="/wyciagi" className="btn button-blue active">
                Czytaj więcej &raquo;
              </Link>
            </p>
          </div>
          <div className="col-md-5">
            <Link to="/wyciagi">
              <img
                className="img-featurette image-main-border img-fluid mx-auto"
                src="https://i.imgur.com/vv73HTm.jpg"
                alt="Generic placeholder image"
                width="400"
                height="600"
              />
            </Link>
          </div>
        </div>

        <hr className="featurette-divider"></hr>

        <div className="row justify-content-center">
          <div className="col-md-5 order-md-2">
            <h2 className="featurette-heading">Zdobądź szczyt! </h2>
            <p className="lead">
              Wjedź jednym z naszych wyciągów na szczyt i podziwiaj w czasie
              jazdy przepiękną malowniczą scenerię górską.
            </p>
            <p>
              <Link to="/wyciagi" className="btn button-blue active">
                Czytaj więcej &raquo;
              </Link>
            </p>
          </div>
          <div className="col-md-5 order-md-1">
            <Link to="/wyciagi">
              <img
                className="img-featurette image-main-border img-fluid mx-auto"
                src="https://i.imgur.com/Ux4KQ5n.jpg"
                alt="Generic placeholder image"
                width="730"
                height="500"
              />
            </Link>
          </div>
        </div>

        <hr className="featurette-divider"></hr>

        <div className="row justify-content-center">
          <div className="col-md-5">
            <h2 className="featurette-heading">
              Sporty zimowe dla dużych i małych!
            </h2>
            <p className="lead">
              Bez względu na to czy jesteś już zaawansowanym narciarzem, czy
              dopiero rozpoczynasz swoją przygodę z nartami, mamy dla ciebie
              przygotowane atrakcje, które na pewno spełnią twoje oczekiwania.
            </p>
            <p>
              <Link to="/wyciagi" className="btn button-blue active">
                Czytaj więcej &raquo;
              </Link>
            </p>
          </div>
          <div className="col-md-5">
            <Link to="/wyciagi">
              <img
                className="img-featurette image-main-border img-fluid mx-auto"
                src="https://i.imgur.com/Ik3bCYH.jpg"
                alt="Generic placeholder image"
                width="400"
                height="600"
              />
            </Link>
          </div>
        </div>
      </div>
      <div className="divider"></div>
      <div className="featurette-divider"></div>
      <div className="container row">
        <div className="col-lg-4">
          <Link to="/godziny-otwarcia">
            <img
              className="rounded-circle"
              src="https://i.imgur.com/U6eIJDg.jpg"
              alt="Generic placeholder image"
              width="140"
              height="140"
            />
          </Link>
          <h2>Zmiana godzin otwarcia!</h2>
          <p>
            Przyszedł czas na zmianę sezonu, a co za tym idzie zmianę godzin
            otwarcia naszych stoków!{" "}
          </p>
          <p>
            <Link to="/godziny-otwarcia" className="btn button-blue active">
              Czytaj więcej &raquo;
            </Link>
          </p>
        </div>
        <div className="col-lg-4">
          <Link to="/o-nas">
            <img
              className="rounded-circle"
              src="https://i.imgur.com/ypAgbSo.jpg"
              alt="Generic placeholder image"
              width="140"
              height="140"
            />
          </Link>
          <h2>
            <p>Wypożyczalnia sprzętu </p>
            <p>"Przy stoku"</p>
          </h2>
          <p>
            Chcesz aktywnie spędzić swój wypoczynek , ale nie masz sprzętu?
            Żaden problem nasza wyporzyczalnie ma wszystko czego potrzebujesz!
          </p>
          <p>
            <Link to="/o-nas" className="btn button-blue active">
              Czytaj więcej &raquo;
            </Link>
          </p>
        </div>
        <div className="col-lg-4">
          <Link to="/aktualnosci">
            <img
              className="rounded-circle"
              src="https://i.imgur.com/N7qMLZk.jpg"
              alt="Generic placeholder image"
              width="140"
              height="140"
            />
          </Link>
          <h2>Koniec sezonu zimowego</h2>
          <p>
            Dziękujemy wszystkim narciarzom i snowboardzistom za wspaniały
            wspólny sezon! Koniec zimy nie znaczy jednak, że zamykamy naszą
            stację - w żadnym wypadku.
          </p>
          <p>
            <Link to="/aktualnosci" className="btn button-blue active">
              Czytaj więcej &raquo;
            </Link>
          </p>
        </div>
      </div>
      <div className="divider"></div>
    </div>
  );
};

export default MainPage;
