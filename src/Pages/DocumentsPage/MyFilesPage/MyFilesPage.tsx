import React from "react";
import { Component, ReactNode, useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useParams,
  Outlet,
  Navigate,
} from "react-router-dom";
// import Avatar from 'react-avatar-edit';
// import "./UserPage.css";

import { connect } from "react-redux";
import {
  MDBInput,
  MDBBtn,
  MDBCheckbox,
  MDBRow,
  MDBCol,
} from "mdb-react-ui-kit";
import { loadUser } from "../../../Actions/auth";

const DocumentsPage = ({ user, isAuthenticated }) => {
  const { username } = useParams();
  const [employee, setEmployee] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true);

  function checkIfRegularEmployee(): boolean {
    loadUser();
    if (user != null && user.roles != null)
      for (var i of user.roles) {
        if (i == "ROLE_REGULAR_EMPLOYEE") return true;
      }
    return false;
  }

  const returnUserNotAdmin = () => (
    <div>
      {user == null} ? (<Navigate to="/login" />) : (
      <Navigate to="/forbidden" />)
    </div>
  );

  const returnUserPage = () => (
    <div>
      {checkIfRegularEmployee() ? (
        <div>
          <div className="productsNav">
            <ul className="nav nav-tabs">
              {" "}
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={{ pathname: `/kartoteka/dokumenty/A` }}
                >
                  {" "}
                  A{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={{ pathname: `/kartoteka/dokumenty/B` }}
                >
                  {" "}
                  B{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={{ pathname: `/kartoteka/dokumenty/C` }}
                >
                  {" "}
                  C{" "}
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link active"
                  to={{ pathname: `/kartoteka/dokumenty/D` }}
                >
                  {" "}
                  D{" "}
                </Link>
              </li>
            </ul>
          </div>
          <Outlet />
        </div>
      ) : (
        returnUserNotAdmin()
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
