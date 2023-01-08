import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import "./HomePage.css";
import MyNavbar from "../../Components/NavBar/MainNavbar";
import MyFooter from "../../Components/Footer/Footer";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardTitle,
  Form,
  Input,
  // InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col,
} from "reactstrap";

const HomePage = () => {
  document.documentElement.classList.remove("nav-open");
  window.location.reload();

  React.useEffect(() => {
    document.body.classList.add("profile-page");
    return function cleanup() {
      document.body.classList.remove("profile-page");
    };
  });
  return (
    <>
      <div className="main">
        <div className="section text-center">
          <div className="text-center">
            <h4>
              <strong>Carousel</strong>
            </h4>
            <a
              className="btn btn-primary mb-5"
              href="https://mdbootstrap.com/docs/standard/components/carousel/"
              role="button"
            >
              Docs &amp; more examples
            </a>
          </div>

          {/* <!-- Carousel wrapper --> */}
          <div
            id="carouselExampleCaptions"
            className="carousel slide carousel-fade shadow-3-strong"
            data-mdb-ride="carousel"
          >
            {/* <!-- Indicators --> */}
            <ol className="carousel-indicators">
              <li
                data-mdb-target="#carouselExampleCaptions"
                data-mdb-slide-to="0"
                className=""
              ></li>
              <li
                data-mdb-target="#carouselExampleCaptions"
                data-mdb-slide-to="1"
                className=""
              ></li>
              <li
                data-mdb-target="#carouselExampleCaptions"
                data-mdb-slide-to="2"
                className="active"
                aria-current="true"
              ></li>
            </ol>

            {/* <!-- Inner --> */}
            <div className="carousel-inner">
              {/* <!-- Single item --> */}
              <div className="carousel-item">
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(15).jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>First slide label</h5>
                  <p>
                    Nulla vitae elit libero, a pharetra augue mollis interdum.
                  </p>
                </div>
              </div>

              {/* <!-- Single item --> */}
              <div className="carousel-item">
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(22).jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Second slide label</h5>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  </p>
                </div>
              </div>

              {/* <!-- Single item --> */}
              <div className="carousel-item active">
                <img
                  src="https://mdbootstrap.com/img/Photos/Slides/img%20(23).jpg"
                  className="d-block w-100"
                  alt="..."
                />
                <div className="carousel-caption d-none d-md-block">
                  <h5>Third slide label</h5>
                  <p>
                    Praesent commodo cursus magna, vel scelerisque nisl
                    consectetur.
                  </p>
                </div>
              </div>
            </div>
            {/* <!-- Inner -->

          <!-- Controls --> */}
            <a
              className="carousel-control-prev"
              href="#carouselExampleCaptions"
              role="button"
              data-mdb-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </a>
            <a
              className="carousel-control-next"
              href="#carouselExampleCaptions"
              role="button"
              data-mdb-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
};
export default HomePage;
