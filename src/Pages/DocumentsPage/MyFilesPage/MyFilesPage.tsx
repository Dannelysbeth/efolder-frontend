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
  const [documentsA, setDocumentsA] = useState([
    {
      id: 0,
      name: "",
      category: "",
      size: 0,
      uploadFile: "",
    },
  ]);
  const [documentsB, setDocumentsB] = useState([
    {
      id: 0,
      name: "",
      category: "",
      size: 0,
      uploadFile: "",
    },
  ]);
  const [documentsC, setDocumentsC] = useState([
    {
      id: 0,
      name: "",
      category: "",
      size: 0,
      uploadFile: "",
    },
  ]);
  const [documentsD, setDocumentsD] = useState([
    {
      id: 0,
      name: "",
      category: "",
      size: 0,
      uploadFile: "",
    },
  ]);

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
        <div className="flex-column text-center">
          <div className="productsNav">
            <ul className="nav center">
              {" "}
              <li className="center">
                <Link
                  className="btn btn-bold btn-lg button-blue-3"
                  to={{ pathname: `/profil/dokumenty/A` }}
                >
                  {" "}
                  A{" "}
                </Link>
              </li>
              <li className="center">
                <Link
                  className="btn btn-bold btn-lg button-blue-3"
                  to={{ pathname: `/profil/dokumenty/B` }}
                >
                  {" "}
                  B{" "}
                </Link>
              </li>
              <li className="center">
                <Link
                  className="btn btn-bold btn-lg button-blue-3"
                  to={{ pathname: `/profil/dokumenty/C` }}
                >
                  {" "}
                  C{" "}
                </Link>
              </li>
              <li className="center">
                <Link
                  className="btn btn-bold btn-lg button-blue-3"
                  to={{ pathname: `/profil/dokumenty/D` }}
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
