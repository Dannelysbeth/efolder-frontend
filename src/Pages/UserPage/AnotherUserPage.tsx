import React from "react";
import { useEffect, useState } from "react";
import { Link, useParams, Outlet } from "react-router-dom";
import ForbiddenPage from "../ForbiddenPage/ForbiddenPage";
import NotFoundPage from "../NotFoundPage/NotFoundPage";

import { connect } from "react-redux";

const AnotherUserPage = ({ user }) => {
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
        setEmployee(null);
        setLoading(false);
        setError(true);
      });
  };
  useEffect(() => {
    getEmployee();
  }, []);

  function checkIfAdmin(): boolean {
    if (user != null && user.roles != null)
      for (var i of user.roles) {
        if (i == "ROLE_SUPER_ADMIN" || i == "ROLE_HR_ADMIN") return true;
      }
    return false;
  }

  function checkIfUserExists(): boolean {
    if (employee["user"] == null) return false;

    return true;
  }

  const returnUserPage = () => (
    <div>
      {checkIfUserExists() ? (
        <div>
          {checkIfAdmin() ? (
            <div className="backgd ">
              <div className="">
                <div className="center">
                  <div className="profile-picture-1 ">
                    <img
                      src={
                        employee["user"] && employee["user"]["imageUrl"]
                          ? employee["user"]["imageUrl"]
                          : "https://i.imgur.com/teiJw8H.png"
                      }
                      height="200"
                      width="200"
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </div>
                <div className="row user-container-2 justify-content-center center">
                  <h3 className="justify-content-center center-text-2">
                    {employee["user"] && employee["user"]["firstName"]}{" "}
                    {employee["user"] && employee["user"]["middleName"]
                      ? employee["user"] && employee["user"]["middleName"] + " "
                      : null}
                    {employee["user"] && employee["user"]["lastName"]} (
                    {employee["user"] && employee["user"]["username"]})
                  </h3>
                  <div className="h6 font-weight-500 center-text-2">
                    <i className="ni location_pin mr-2"></i>
                    {employee["address"] && employee["user"]["email"]}
                  </div>
                  <div className="h5 center">
                    <i className="ni location_pin mr-2"></i>
                    {employee["address"] && employee["address"]["city"]},{" "}
                    {employee["address"] && employee["address"]["country"]}
                  </div>{" "}
                  <div className="h4 font-weight-500 center-text-2">
                    <i className="ni business_briefcase-24 mr-2"></i>
                    {employee["employment"] &&
                      employee["employment"]["positionName"]}
                  </div>
                  <div className="center-text-2">
                    <i className="ni education_hat mr-2 "></i>
                    {employee["employment"] &&
                      employee["employment"]["teamName"]}
                  </div>
                </div>
              </div>
              <div>
                <div className="productsNav">
                  <ul className="nav center">
                    {" "}
                    <li className="center">
                      <Link
                        className="btn btn-lg button-blue-3"
                        to={{ pathname: `/user/${username}/daneOsobowe` }}
                      >
                        {" "}
                        Dane osobowe{" "}
                      </Link>
                    </li>
                    <li className="center">
                      <Link
                        className="btn btn-lg button-blue-3"
                        to={{ pathname: `/user/${username}/kartoteka` }}
                      >
                        {" "}
                        Kartoteka{" "}
                      </Link>
                    </li>
                    <li className="center">
                      <Link
                        className="btn btn-lg button-blue-3"
                        to={{ pathname: `/user/${username}/dodajDokumenty` }}
                      >
                        {" "}
                        Dodaj dokumenty{" "}
                      </Link>
                    </li>
                    <li className="center">
                      <Link
                        className="btn btn-lg button-blue-3"
                        to={{ pathname: `/user/${username}/zmienHaslo` }}
                      >
                        {" "}
                        {user != null && user.username !== username
                          ? "Zmień hasło"
                          : `Zresetuj hasło`}
                      </Link>
                    </li>
                    <li className="center">
                      <Link
                        className="btn btn-lg button-blue-3"
                        to={{ pathname: `/user/${username}/adminRole` }}
                      >
                        Narzędzia Administratora
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <Outlet />
            </div>
          ) : (
            <ForbiddenPage />
          )}
        </div>
      ) : (
        <NotFoundPage />
      )}
    </div>
  );

  return <div>{returnUserPage()}</div>;
};

const mapStateToProps = (state) => ({
  user: state.auth.user,
  errors: state.auth.errors,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(AnotherUserPage);
