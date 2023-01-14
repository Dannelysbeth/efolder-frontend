import React from "react";
import { Link, Outlet, Navigate } from "react-router-dom";

import { connect } from "react-redux";
import { loadUser } from "../../../Actions/auth";

const DocumentsPage = ({ user }) => {
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
        <div className=" text-center row ">
          <div className="productsNav col-2 center">
            <ul className="nav center flex-column text-center ">
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
          <div className="col-9 top-space bottom-space">
            <Outlet />
          </div>
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
