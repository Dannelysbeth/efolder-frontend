import React, { Fragment, useState } from "react";
import "./Footer.css";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";

const Footer = () => {
  return (
    <footer className="footer text-white text-center text-md-start mt-auto fixed-bottom">
      <div className="container p-4 pb-0">
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <Link to="/">
              <img
                src="https://i.imgur.com/s3tSg4v.png"
                alt="Logo"
                width="200px"
                className="Logo"
              />
            </Link>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Nawigacja</h5>
            <ul className="list-unstyled mb-0">
              <li>
                <Link to="/aktualnosci" className="link-light active">
                  Aktualności
                </Link>
              </li>
              <li>
                <Link to="/regulamin" className="link-light active">
                  Regulamin
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <div className="footer-space" />
            <ul className="list-unstyled mb-1">
              <li>
                <Link to="/kontakt" className="text-light active">
                  Kontakt
                </Link>
              </li>
              <li>
                <Link to="/login" className="link-light active">
                  Zaloguj się
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center p-3">
        © 2022 All Rights Reserved by eFolder
      </div>
      <a href="#" className="scrollToTop">
        <span className="fas fa-angle-up fa-la"></span>
      </a>
    </footer>
  );
};
export default connect()(Footer);
