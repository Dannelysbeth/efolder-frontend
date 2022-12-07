import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import { loadUser, changePassword } from "../../Actions/auth";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";

import {
  Link,
  useNavigate,
  useParams,
  Outlet,
  Navigate,
} from "react-router-dom";
// import Avatar from 'react-avatar-edit';
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

const DocumentsPage = ({ user, loadUser }) => {
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

  function checkIfRegularEmployee(): boolean {
    if (user != null && user.roles != null)
      for (var i of user.roles) {
        if (i == "ROLE_REGULAR_EMPLOYEE") return true;
      }
    return false;
  }

  function checkIfLogged(): boolean {
    loadUser();
    if (user !== null) return true;
    return false;
  }

  const returnUserPage = () => (
    <div>
      {checkIfRegularEmployee() ? (
        <div className=" d-flex flex-column min-vh-100">
          <div className="productsNav">
            <ul className="nav nav-tabs">
              {" "}
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={{ pathname: `/kartoteka/dokumenty` }}
                >
                  {" "}
                  Dokumenty{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={{ pathname: `/kartoteka/dodajDokumenty` }}
                >
                  {" "}
                  Dodaj dokument{" "}
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      ) : (
        <ForbiddenPage />
      )}
    </div>
  );

  return <div>{returnUserPage()}</div>;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { loadUser })(DocumentsPage);
