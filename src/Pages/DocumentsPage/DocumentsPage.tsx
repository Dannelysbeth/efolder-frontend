import React from "react";
import { useEffect, useState } from "react";
import { loadUser } from "../../Actions/auth";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";

import { Link, useParams, Outlet } from "react-router-dom";

import { connect } from "react-redux";

const DocumentsPage = ({ user }) => {
  const { username } = useParams();
  const [employee, setEmployee] = useState([]);
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
      .catch(() => {
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

  const returnUserPage = () => (
    <div className="backgd-3">
      {checkIfRegularEmployee() ? (
        <div className=" d-flex flex-column min-vh-100">
          <div className="productsNav">
            <ul className="nav   center">
              {" "}
              <li className=" center ">
                <Link
                  className="btn btn-lg    button-blue-2"
                  to={{ pathname: `/kartoteka/dokumenty` }}
                >
                  {" "}
                  Dokumenty{" "}
                </Link>
              </li>
              <li className="center  ">
                <Link
                  className="btn btn-lg  active  button-blue-2 "
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
