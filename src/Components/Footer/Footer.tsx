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

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0"></div>
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
