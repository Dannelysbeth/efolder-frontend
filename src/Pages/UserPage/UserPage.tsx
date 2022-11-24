import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import "./UserPage.css";
import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import { saveAs } from "file-saver";

const UserPage = ({ user }) => {
  // const [vouchers, setVouchers] = useState([]);
  const [files, setFiles] = useState(documents);
  const [info, setInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const infoOfUser = () => (
    <div className="row">
      <div className="column col-lg-3">
        <img
          src={
            user.imageUrl ? user.imageUrl : "https://i.imgur.com/teiJw8H.png"
          }
          className="profile-pic rounded-circle no-padding "
          height="200"
          width="200"
          alt="Profile picture"
          loading="lazy"
        />
      </div>
      <div className="column col-lg-3">
        <p>Imię:</p>
        <p>{user.middleName ? "Drugie Imię:" : ""}</p>
        <p>Nazwisko:</p>
        <p>E-mail:</p>
        <p>{user.gender ? "Płeć:" : ""}</p>
        <p>{user.birthdate ? "Data urodzenia:" : ""}</p>
      </div>
      <div className="column col-lg-3">
        <p>{user.firstName}</p>
        <p>{user.middleName ? user.middleName : ""}</p>
        <p>{user.lastName}</p>
        <p>{user.email}</p>
        <p>{user.gender ? user.gender : ""}</p>
        <p>{user.birthdate ? user.birthdate : ""}</p>
      </div>
    </div>
  );
  const adressInfo = () => (
    <div className="row">
      <div className="column col-lg-3">
        <p>ul. Akademicka 16</p>
        <p>44-100 Gliwice</p>
        <p>Polska</p>
        {/* <p>E-mail:</p>
        <p>{user.gender ? "Płeć:" : ""}</p>
        <p>{user.birthdate ? "Data urodzenia:" : ""}</p> */}
      </div>
      {/* <div className="column col-lg-3">
        <p>Polska</p>
        <p>Śląskie</p>
        <p>Gliwice</p>
        <p>{user.email}</p>
        <p>{user.gender ? user.gender : ""}</p>
        <p>{user.birthdate ? user.birthdate : ""}</p>
      </div> */}
    </div>
  );

  return (
    <div className="backgd d-flex flex-column min-vh-100">
      <div className="user-container top-space bottom-space">
        <h1 className="caption">Dane osobowe</h1>
        <hr></hr>
        <h4 className="userPage-text mt-3">
          {user !== null ? infoOfUser() : "Osoba niezalogowana "}
        </h4>
      </div>
      <div className="user-container top-space bottom-space">
        <h1 className="caption">Infomacje o zatrudnieniu</h1>
        <hr></hr>
        <h4 className="userPage-text mt-3">
          {user !== null ? adressInfo() : "Osoba niezalogowana "}
        </h4>
      </div>
      <div className="user-container top-space bottom-space">
        <h1 className="column col-lg-3 caption">Adres</h1>
        <hr></hr>
        <h4 className="userPage-text mt-3">
          {user !== null ? adressInfo() : "Osoba niezalogowana "}
        </h4>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
});

export default connect(mapStateToProps)(UserPage);
