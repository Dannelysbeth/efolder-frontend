import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { Link, useNavigate, useParams, Outlet } from "react-router-dom";
// import Avatar from 'react-avatar-edit';
import "./UserPage.css";
import a_documents from "../../Data/documentsA";
import b_documents from "../../Data/documentsA";
import List from "../MyDocumentsPage/DocumentList";

import { connect } from "react-redux";
import documents from "../../Data/documentsA";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";

const AnotherUserPage = ({ user }) => {
  const { username } = useParams();
  const [employee, setEmployee] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  const getEmployee = () => {
    return fetch(
      `${process.env.REACT_APP_REMOTE_URL}/api/employment/info/${username}`,
      {
        method: "GET",
        mode: "cors",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access")}`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((responseJson) => {
        setEmployee(responseJson);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        setError(true);
      });
  };
  useEffect(() => {
    getEmployee();
  }, []);

  return (
    <div className="backgd d-flex flex-column min-vh-100">
      <div className="">
        <div className="card-profile-image shadows ">
          <img
            src={
              employee["user"] && employee["user"]["imageUrl"]
                ? employee["user"]["imageUrl"]
                : "https://i.imgur.com/teiJw8H.png"
            }
            className="rounded-circle user-pic shadow"
          />
        </div>
        <div className="row user-container text">
          <h3>
            {employee["user"] && employee["user"]["firstname"]}{" "}
            {employee["user"] && employee["user"]["middleName"]
              ? employee["user"] && employee["user"]["middleName"] + " "
              : null}
            {employee["user"] && employee["user"]["lastname"]}
          </h3>
          <div className="h5 font-weight-300 ">
            <i className="ni location_pin mr-2"></i>
            {employee["address"] && employee["address"]["city"]} ,{" "}
            {employee["address"] && employee["address"]["country"]}
          </div>
          <div className="h5 mt-4">
            <i className="ni business_briefcase-24 mr-2"></i>
            {employee["employment"] && employee["employment"]["positionName"]}
          </div>
          <div>
            <i className="ni education_hat mr-2"></i>
            {employee["employment"] && employee["employment"]["teamName"]}
          </div>
        </div>
      </div>
      <div className="productsNav">
        <ul className="nav nav-tabs">
          {" "}
          <li className="nav-item">
            <Link
              className="nav-link active"
              to={{ pathname: `/user/${username}/daneOsobowe` }}
            >
              {" "}
              Dane osobowe{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              to={{ pathname: `/user/${username}/kartoteka` }}
            >
              {" "}
              Kartoteka{" "}
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              to={{ pathname: `/user/${username}/dodajDokumenty` }}
            >
              {" "}
              Dodaj dokumenty{" "}
            </Link>
            {/* <a className="nav-link" href="#">
              Link
            </a> */}
          </li>
          <li className="nav-item">
            <Link
              className="nav-link active"
              to={{ pathname: `/user/${username}/zmienHaslo` }}
            >
              {" "}
              {user != null && user.username !== username
                ? "Zmień hasło"
                : `Zresetuj hasło`}
              {/* Zmień hasło{" "} */}
            </Link>
            {/* <a className="nav-link disabled" href="#" aria-disabled="true">
              Disabled
            </a> */}
          </li>
        </ul>
      </div>
      <Outlet />
    </div>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.anotherUser,
});

export default connect(mapStateToProps)(AnotherUserPage);
